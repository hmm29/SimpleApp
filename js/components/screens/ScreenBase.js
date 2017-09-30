/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {View} from 'react-native';

export default class ScreenBase extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#ddd'
  }
}