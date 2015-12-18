import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux/native';
import thunkMiddleware from 'redux-thunk';

import promiseMiddleware from '../lib/promise';
import * as reducers from '../reducers';
import V2exApp from './v2exApp';


const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, promiseMiddleware)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <V2exApp />}
      </Provider>
    );
  }
}
