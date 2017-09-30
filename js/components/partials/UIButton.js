/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Dimensions, TouchableOpacity, View, Text} from 'react-native';

const {height} = Dimensions.get('window');

export default class UIButton extends Component {
  render() {
    const {onPress, title} = this.props;
    
    return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = {
  button: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5
  },
  buttonContent: {
    width: height/10,
    height: height/10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: height/45
  }
}