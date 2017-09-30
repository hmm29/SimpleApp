/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Text} from 'react-native';

export default class ViewPreferencesScreen extends Component {
  render() {
    return (
      <Text style={styles.text}>ViewPreferences</Text>
    )
  }
}

const styles = {
  text: {
    fontSize: 20,
  }
}