/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Dimensions, TouchableOpacity, Text} from 'react-native';
import ScreenBase from '../ScreenBase';
import UIButtonsWrapper from "../../partials/UIButtonsWrapper";

const {height} = Dimensions.get('window');

export default class AuthScreen extends Component {
  static navigationOptions = {
    title: 'Simple App'
  }
  render() {
    const {navigate} = this.props.navigation;
    
    return (
      <ScreenBase>
        <UIButtonsWrapper style={styles.buttonsWrapper}>
        <TouchableOpacity style={styles.button} onPress={() => navigate('Login')}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigate('Register')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        </UIButtonsWrapper>
      </ScreenBase>
    )
  }
}

const styles = {
  buttonsWrapper: {
    flexDirection: 'column'
  },
  buttonText: {
    fontSize: height/40,
    textAlign: 'center'
  },
  button: {
    height: height/8,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    margin: height/20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
}