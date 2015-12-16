import React, { Component, PropTypes } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';

import * as actionCreator from '../actions/index.js';
import Navigator from '../components/index.js';


const stateToProps = state => state;
const dispatchToProps = dispatch => bindActionCreators(actionCreator, dispatch);

@connect(stateToProps, dispatchToProps)
class v2exApp extends Component {
  static propTypes = {
    reduxState: PropTypes.object,
  }

  render() {
    return (
      <Navigator {...this.props} />
    );
  }
}


export default v2exApp;
