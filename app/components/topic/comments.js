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

const { View, ListView, Text, Image } = React;
export default class TopicComments extends Component {
  static propTypes = {
    comments: PropTypes.array,
  }

  static defaultProps = {
    comments: [],
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(this.props.comments),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.comments === nextProps.comments) {
      return false;
    }
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      dataSource: ds.cloneWithRows(nextProps.comments),
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.comments !== nextProps.comments;
  }

  renderRow(comment, _, i) {
    const str = ` #${+i + 1} · ${comment.member.username} · ${comment.created}`;
    const avatar = `http:${comment.member.avatar_normal}`;
    return (
      <View key={comment.id} style={styles.comment}>
        <View style={styles.listRow}>
          <Image style={styles.avatar} source={{ uri: avatar }} />
          <Text style={styles.time}>{str}</Text>
        </View>
        <View>
          <Text style={styles.content}>{comment.content}</Text>
        </View>
      </View>
    );
  }

  render() {
    if (this.props.comments) {
      if (this.props.comments.length === 0) {
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
              <Text>{`${this.props.comments.length} 回复`}</Text>
            </View>
            <View style={styles.container}>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                pageSize={20}
              />
            </View>
          </View>
        );
      }
    } else {
      return null;
    }
  }
}
