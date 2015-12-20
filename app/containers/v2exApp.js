import React, { PixelRatio, Navigator, TouchableOpacity, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux/native';

import * as actionCreator from '../actions/index';
import TopicList from '../components/topic/list';
import TopicDetail from '../components/topic/detail';


const styles = React.StyleSheet.create({
  navBar: {
    backgroundColor: '#F6F6F6',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#B2B2B2',
  },
  navBarText: {
    fontSize: 18,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#222222',
    fontWeight: '700',
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    fontSize: 16,
    color: '#5890ff',
  },
  scene: {
    marginTop: 63,
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
});

const titles = {
  'TopicList': 'V2EX',
  'TopicDetail': '话题详情',
};

const SCREEN_WIDTH = React.Dimensions.get('window').width;
const FloatFromRight = Navigator.SceneConfigs.FloatFromRight;

const CustomLeftToRightGesture = Object.assign({}, FloatFromRight.gestures.pop, {
  snapVelocity: 8,
  edgeHitWidth: SCREEN_WIDTH / 2,
});

const CustomSceneConfig = Object.assign({}, FloatFromRight, {
  springTension: 200,
  springFriction: 20,
  gestures: {
    pop: CustomLeftToRightGesture,
  },
});

class v2exApp extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    storage: React.PropTypes.object,
  }

  componentDidMount() {
    this.fetchTopicList();
  }

  fetchTopicList() {
    this.props.dispatch(
      actionCreator.fetchTopicList()
    );
  }

  fetchTopicDetail(data) {
    const now = new Date();
    const topicLoaded = this.props.storage[data.id].loaded;
    if (!topicLoaded || (now - topicLoaded > 60 * 5 * 1000)) this.props.dispatch(actionCreator.fetchTopicDetail(data));
    this.props.dispatch(actionCreator.fetchTopicComments(data));
    this.refs.nav.push({
      component: TopicDetail,
      title: titles.TopicDetail,
    });
  }

  renderRightButton(route, navigator) {
    const newRoute = {
      ...route,
      key: Math.ceil(Math.random() * 1000),
    };
    return (
      <TouchableOpacity
        onPress={() => navigator.push(newRoute)}
        style={styles.navBarRightButton}
      >
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Right
        </Text>
      </TouchableOpacity>
    );
  }

  renderLeftButton(route, navigator, index) {
    if (index === 0) return null;
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}
      >
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {'返回'}
        </Text>
      </TouchableOpacity>
    );
  }

  renderNavigationBar() {
    const Title = (route) => {
      return (
        <Text style={[styles.navBarText, styles.navBarTitleText]}>
          {route.title}
        </Text>
      );
    };

    return (
      <Navigator.NavigationBar
        style={styles.navBar}
        routeMapper={{
          Title,
          LeftButton: this.renderLeftButton,
          RightButton: this.renderRightButton,
        }}
      />
    );
  }

  renderScene(route, navigator) {
    const RouteHandler = route.component;
    const passProps = {
      ...this.props,
      ...route.passProps,
    };
    return (
      <ScrollView
        onRefreshStart={endRefreshing => {
          setTimeout(endRefreshing, 500);
        }}
      >
        <RouteHandler navigator={navigator} {...passProps} />
      </ScrollView>
    );
  }

  render() {
    return (
      <Navigator
        ref="nav"
        initialRoute={{
          component: TopicList,
          title: titles.TopicList,
          passProps: {
            onRowTouched: this.fetchTopicDetail.bind(this),
          },
        }}
        renderScene={this.renderScene.bind(this)}
        sceneStyle={styles.scene}
        configureScene={() => CustomSceneConfig}
        navigationBar={this.renderNavigationBar()}
      />
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(v2exApp);
