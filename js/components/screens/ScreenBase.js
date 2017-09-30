/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';

export default class ScreenBase extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        {this.props.children}
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#ddd',
    paddingTop: 20
  }
}