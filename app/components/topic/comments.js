import React, { Component, PropTypes, StyleSheet, PixelRatio } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listRow: {
    flexDirection: 'row',
    paddingBottom: 4,
  },
  avatar: {
    width: 18,
    height: 18,
    marginRight: 5,
    backgroundColor: '#CCCCCC',
    borderRadius: 3,
  },
  time: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666666',
  },
  header: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    padding: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#E2E2E2',
  },
  comment: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#E2E2E2',
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
  },
});

const { View, Text, Image } = React;
export default class TopicComments extends Component {
  static propTypes = {
    topic: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = { comments: [], loaded: false };
  }

  componentWillMount() {
    this.fetchData(this.props.topic);
  }

  async fetchData(id) {
    const uri = `https://v2ex.com/api/replies/show.json?topic_id=${id}`;
    const response = await fetch(uri);
    const json = await response.json();
    this.setState({ comments: json, loaded: true });
  }

  renderComment(comment, i) {
    const str = ` #${i + 1} · ${comment.member.username} · ${comment.created}`;
    const avatar = `http:${comment.member.avatar_normal}`;
    return (
      <View key={comment.id} style={styles.comment}>
        <View style={styles.listRow}>
          <Image style={styles.avatar} source={{uri: avatar}} />
          <Text style={styles.time}>{str}</Text>
        </View>
        <View>
          <Text style={styles.content}>{comment.content}</Text>
        </View>
      </View>
    );
  }

  render() {
    if (this.state.loaded) {
      if (this.state.comments.length === 0) {
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text>{`暂无回复`}</Text>
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text>{`${this.state.comments.length} 回复`}</Text>
            </View>
            {this.state.comments.map(this.renderComment)}
          </View>
        );
      }
    } else {
      return null;
    }
  }

}
