/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Text} from 'react-native';
import ScreenBase from '../ScreenBase';
import UITitle from '../../partials/UITitle';

export default class AuthScreen extends Component {
  static navigationOptions = {
    title: 'Simple React Native App'
  }
  
  render() {
    return (
      <ScreenBase>
        <UITitle>Hello World</UITitle>
      </ScreenBase>
    )
  }
}

const styles = {
  text: {
    fontSize: 20,
  }
}