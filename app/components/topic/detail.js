import React, { Component, PropTypes, StyleSheet, PixelRatio, ActivityIndicatorIOS } from 'react-native';

import HTMLView from '../HTMLView/index';
import CommentView from './comments';


const styles = StyleSheet.create({
  container: {
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
    topicDetailView: PropTypes.string,
    storage: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = { renderPlaceholderOnly: true };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderPlaceholderOnly: false });
    });
  }

  renderContent() {
    const topic = this.props.storage[this.props.topicDetailView];
    if (this.state.renderPlaceholderOnly || !topic.loaded) {
      return (
        <View style={{ height: 100, justifyContent: 'center' }}>
          <ActivityIndicatorIOS />
        </View>
      );
    }

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

  renderComments() {
    const topic = this.props.storage[this.props.topicDetailView];
    if (this.state.renderPlaceholderOnly || !topic.loaded) {
      return null;
    }
    return (
      <CommentView comments={topic.comments} />
    );
  }

  render() {
    const topic = this.props.storage[this.props.topicDetailView];
    const str = `${topic.author.name} · ${topic.time}`;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.textWrapper, styles.title]}>{topic.title}</Text>
          <View style={styles.listRow}>
            <Image style={styles.avatar} source={{ uri: topic.author.avatar }} />
            <Text style={styles.time}>{str}</Text>
          </View>
        </View>
        {this.renderContent()}
        {this.renderComments()}
      </View>
    );
  }
}
