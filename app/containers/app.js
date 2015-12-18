import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux/native';
import thunk from 'redux-thunk';
import CodePush from 'react-native-code-push';

import * as reducers from '../reducers';
import V2exApp from './v2exApp';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  componentDidMount() {
    CodePush.sync();
  }

  render() {
    return (
      <Provider store={store}>
        {() => <V2exApp />}
      </Provider>
    );
  }
}
