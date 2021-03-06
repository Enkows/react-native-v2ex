import React, { Component, PropTypes, StyleSheet, PixelRatio } from 'react-native';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: '#E2E2E2',
  },
  listRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFFFF',
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
    storage: PropTypes.object,
    topicListView: PropTypes.array,
    onRowTouched: PropTypes.func,
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(this.props.topicListView),
    };
  }

  componentWillReceiveProps(nextProps) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      dataSource: ds.cloneWithRows(nextProps.topicListView),
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.topicListView !== nextProps.topicListView;
  }

  onRowTouched(data) {
    this.props.onRowTouched(data);
  }

  renderRow(id) {
    const data = this.props.storage[id];
    const str = `[${data.node.name}] · ${data.author.name} · ${data.time}`;
    return (
      <TouchableHighlight onPress={() => this.onRowTouched(data)}>
        <View style={styles.listRow}>
          <Image style={styles.avatar} source={{ uri: data.author.avatar }} />
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
          pageSize={20}
        />
      </View>
    );
  }
}
