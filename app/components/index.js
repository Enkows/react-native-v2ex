import React, { Component, StyleSheet, NavigatorIOS } from 'react-native';

import TopicList from './topic/list.js';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

const titles = {
  'TopicList': 'V2EX',
  'TopicDetail': '话题详情',
};

export default class TopicNavigator extends Component {
  constructor(props) {
    super(props);
    this.route = {
      backButtonTitle: '返回',
      component: TopicList,
      title: titles.TopicList,
      passProps: this.props,
    };
  }

  componentWillReceiveProps(nextProps) {
    const currentComponent = this.refs.nav.navigator.navigationContext._currentRoute.component;
    if (nextProps.currentView === currentComponent.displayName) {
      this.refs.nav.replace({
        ...this.route,
        backButtonTitle: '返回',
        title: titles[currentComponent.displayName],
        component: currentComponent,
        passProps: nextProps,
      });
    }
  }

  render() {
    return (
      <NavigatorIOS
        ref="nav"
        style={styles.container}
        initialRoute={this.route}
      />
    );
  }
}
