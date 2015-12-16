import React, { Component, PropTypes, StyleSheet, PixelRatio } from 'react-native';

import * as parser from '../../lib/parser';
import HTMLView from '../HTMLView/index';
import CommentView from './comments';


const styles = StyleSheet.create({
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

const { View, Text, ScrollView, Image } = React;
export default class TopicDetail extends Component {
  static displayName = 'TopicDetail'
  static propTypes = {
    topic: PropTypes.object,
  }

  static defaultProps = {
    topic: {
      uri: '/t/234251#reply3',
      title: '[创新工场｝ python 后端实习生',
      time: '1小时31分钟前',
      node: { name: '酷工作', uri: '/go/jobs' },
      author: {
        avatar: 'http://cdn.v2ex.co/avatar/2636/74f3/31313_large.png?m=1386751127',
        name: 'thesecretapp',
        uri: 'https://v2ex.com/member/thesecretapp',
      },
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      topic: this.props.topic,
    };
  }

  componentWillMount() {
    this.fetchData(this.props.topic);
  }

  async fetchData(topic) {
    const response = await fetch('https://v2ex.com' + topic.uri);
    const html = await response.text();
    const json = parser.getTopicDetail(html);
    this.setState({
      topic: {
        ...topic,
        content: json.content,
        addition: json.addition,
      },
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
    console.log(this.state.topic);
    const str = `${this.state.topic.author.name} · ${this.state.topic.time}`;
    return (
      <ScrollView>
        <View>
          <View style={styles.header}>
            <Text style={[styles.textWrapper, styles.title]}>{this.state.topic.title}</Text>
            <View style={styles.listRow}>
              <Image style={styles.avatar} source={{uri: this.state.topic.author.avatar}} />
              <Text style={styles.time}>{str}</Text>
            </View>
          </View>
          {this.renderContent(this.state.topic)}
        </View>
        <CommentView topic={this.props.topic.id} />
      </ScrollView>
    );
  }
}
