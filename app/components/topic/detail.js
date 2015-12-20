import React, { Component, PropTypes, StyleSheet, PixelRatio } from 'react-native';

import HTMLView from '../HTMLView/index';
import CommentView from './comments';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: '#E2E2E2',
  },
  header: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#E2E2E2',
  },
  listRow: {
    flexDirection: 'row',
  },
  avatar: {
    width: 18,
    height: 18,
    marginRight: 5,
    backgroundColor: '#CCCCCC',
    borderRadius: 3,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    lineHeight: 26,
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666666',
  },
});

const { View, Text, Image, InteractionManager } = React;
export default class TopicDetail extends Component {
  static displayName = 'TopicDetail'
  static propTypes = {
    topic: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = { renderPlaceholderOnly: true };
  }

  componentDidMount() {
    console.time('a');
    InteractionManager.runAfterInteractions(() => {
      console.timeEnd('a');
      this.setState({ renderPlaceholderOnly: false });
    });
  }

  renderContent(topic) {
    const result = [];
    if (topic.content) {
      result.push(
        <View key="content" style={styles.header}>
          <HTMLView>{topic.content}</HTMLView>
        </View>
      );
    }
    // 附言
    if (topic.addition) {
      topic.addition.map(data => {
        result.push(
          <View key={data.title} style={styles.header}>
            <Text style={styles.time}>{data.title}</Text>
            <HTMLView>{data.content}</HTMLView>
          </View>
        );
      });
    }
    return result;
  }

  render() {
    if (this.state.renderPlaceholderOnly) {
      return null;
    }

    const str = `${this.props.topic.author.name} · ${this.props.topic.time}`;
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Text style={[styles.textWrapper, styles.title]}>{this.props.topic.title}</Text>
            <View style={styles.listRow}>
              <Image style={styles.avatar} source={{ uri: this.props.topic.author.avatar }} />
              <Text style={styles.time}>{str}</Text>
            </View>
          </View>
          {this.renderContent(this.props.topic)}
        </View>
        <CommentView comments={this.props.topic.comments} />
      </View>
    );
  }
}
