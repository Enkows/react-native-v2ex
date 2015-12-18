import React, { Component, PropTypes } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import CodePush from 'react-native-code-push';

import * as actionCreator from '../actions/index.js';
import Navigator from '../components/index.js';


const stateToProps = state => state;
const dispatchToProps = dispatch => bindActionCreators(actionCreator, dispatch);

class v2exApp extends Component {
  static propTypes = {
    reduxState: PropTypes.object,
  }

  componentDidMount() {
    CodePush.sync();
  }

  render() {
    return (
      <Navigator {...this.props} />
    );
  }
}


export default connect(stateToProps, dispatchToProps)(v2exApp);
