import React, { Component, PropTypes, StyleSheet, PixelRatio } from 'react-native';

import TopicDetail from './detail';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  listRow: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#E2E2E2',
  },
  avatar: {
    width: 36,
    height: 36,
    marginRight: 10,
    backgroundColor: '#CCCCCC',
    borderRadius: 5,
  },
  textWrapper: {
    flex: 1,
  },
  paragraph: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: '#666666',
  },
});

const { View, ListView, Text, TouchableHighlight, Image } = React;
export default class TopicList extends Component {
  static displayName = 'TopicList'
  static propTypes = {
    navigator: PropTypes.object,
    topics: PropTypes.object,
    fetchTopic: PropTypes.func,
    fetchTopics: PropTypes.func,
    fetchComments: PropTypes.func,
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.topics.data),
    };
  }

  componentWillMount() {
    console.log('TopicList will mount');
  }

  componentDidMount() {
    this.props.fetchTopics();
  }

  componentWillReceiveProps(nextProps) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(nextProps.topics.data),
    });
  }

  componentWillUnmount() {
    console.log('TopicList unmount');
  }

  onSelectTopic(data) {
    // data = {
    //   uri: '/t/234251#reply3',
    //   title: '[创新工场｝ python 后端实习生',
    //   time: '1小时31分钟前',
    //   node: { name: '酷工作', uri: '/go/jobs' },
    //   author: {
    //     avatar: 'http://cdn.v2ex.co/avatar/2636/74f3/31313_large.png?m=1386751127',
    //     name: 'thesecretapp',
    //     uri: 'https://v2ex.com/member/thesecretapp',
    //   },
    // };

    this.props.navigator.push({
      component: TopicDetail,
      title: '话题详情',
      passProps: { topic: data },
    });
  }

  renderRow(data) {
    const str = `[${data.node.name}] · ${data.author.name} · ${data.time}`;
    return (
      <TouchableHighlight onPress={() => this.onSelectTopic(data)}>
        <View style={styles.listRow}>
          <Image style={styles.avatar} source={{uri: data.author.avatar}} />
          <View style={styles.textWrapper}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.time}>{str}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          pageSize={20} />
      </View>
    );
  }
}
