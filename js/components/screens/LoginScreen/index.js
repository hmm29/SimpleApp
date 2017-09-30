/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Text} from 'react-native';

export default class LoginScreen extends Component {
  render() {
    return (
      <Text style={styles.text}>Login Screen</Text>
    )
  }
}

const styles = {
  text: {
    fontSize: 20,
  }
}