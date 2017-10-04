/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Main from './js/Main';
import store from './js/redux';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}