/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Text} from 'react-native';
import ScreenBase from '../ScreenBase';

export default class AuthScreen extends Component {
  static navigationOptions = {
    title: 'Simple React Native App'
  }
  
  render() {
    return (
      <ScreenBase>
        <Text style={styles.text}>Hello World</Text>
      </ScreenBase>
    )
  }
}

const styles = {
  text: {
    fontSize: 20,
  }
}