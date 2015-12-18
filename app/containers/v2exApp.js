import React, { Component, PropTypes, StyleSheet, PixelRatio, Navigator, TouchableOpacity, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux/native';

import * as actionCreator from '../actions/index';
import TopicList from '../components/topic/list';
import TopicDetail from '../components/topic/detail';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#B2B2B2',
  },
  navBarText: {
    fontSize: 18,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#222222',
    fontWeight: '500',
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: '#5890ff',
  },
  scene: {
    flex: 1,
    marginTop: 64,
    backgroundColor: '#FFFFFF',
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
  edgeHitWidth: SCREEN_WIDTH,
});

const CustomSceneConfig = Object.assign({}, FloatFromRight, {
  springTension: 200,
  springFriction: 15,
  gestures: {
    pop: CustomLeftToRightGesture,
  },
});

class v2exApp extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.onTopicListRowTouched = this.onTopicListRowTouched.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      actionCreator.fetchTopicList()
    );
  }

  onTopicListRowTouched(data) {
    this.props.dispatch(actionCreator.fetchTopicDetail(data));

    this.refs.nav.push({
      component: TopicDetail,
      title: titles.TopicDetail,
    });
  }

  renderNavigationBar() {
    const LeftButton = (route, navigator, index) => {
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
    };

    // const RightButton = () => {};
    const RightButton = (route, navigator) => {
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
    };

    const Title = (route) => {
      return (
        <Text style={[styles.navBarText, styles.navBarTitleText]}>
          {route.title}
        </Text>
      );
    };

    return (
      <Navigator.NavigationBar
        routeMapper={{ LeftButton, RightButton, Title }}
        style={styles.navBar}
      />
    );
  }

  renderScene(route/* , navigator*/) {
    const RouteHandler = route.component;
    const passProps = {
      ...this.props,
      ...route.passProps,
    };
    return (
      <ScrollView style={styles.container}>
        <RouteHandler {...passProps} />
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
            onRowTouched: this.onTopicListRowTouched,
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
