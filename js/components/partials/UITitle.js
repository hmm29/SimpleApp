/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Dimensions, Text} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class UITitle extends Component {
  render() {
    return (
      <Text style={styles.text}>
        {this.props.children}
      </Text>
    )
  }
}

const styles = {
  text: {
    fontSize: height/25,
    textAlign: 'center',
    marginHorizontal: width/40
  }
}