/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {
  AsyncStorage,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AlertIOS} from 'react-native';

import ScreenBase from '../ScreenBase';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import UIButton from "../UIButton";

const {width, height} = Dimensions.get('window');
const Form = t.form.Form;

const registerForm = t.struct({
  email: t.String,
  password: t.String,
});

const options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
};

export default class Register extends Component {
  static navigationOptions = {
    title: 'Register'
  };
  
  static PropTypes = {
    screenProps: PropTypes.object
  }
  
  _onPress() {
    let value = this.refs.form.getValue();
    if (value) {
      this.props.screenProps.createUser(value.email, value.password);
    }
  }
  
  render() {
    const {navigate} = this.props.navigation;
    
    return (
      <ScreenBase>
        <Form
          ref="form"
          type={registerForm}
          options={options}/>
        <UIButton title="Register" style={styles.button} onPress={this._onPress.bind(this)}/>
      </ScreenBase>
    )
  }
}

const styles = {
  button: {
    width: width-20,
    height: height/8,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    margin: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
}