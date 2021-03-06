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
import UIButton from '../../partials/UIButton';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');
const Form = t.form.Form;

const loginForm = t.struct({
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

export default class Login extends Component {
  static navigationOptions = {
    title: 'Log In'
  }
  
  
  static PropTypes = {
    screenProps: PropTypes.object
  }
  
  _onPress() {
    let value = this.refs.form.getValue();
    if (value) {
      this.props.screenProps.login(value.email, value.password);
    }
  }
  
  render() {
    return (
      <ScreenBase>
        <Form
          ref="form"
          type={loginForm}
          options={options}/>
        <UIButton title="Log In" style={styles.button} onPress={this._onPress.bind(this)}/>
      </ScreenBase>
    )
  }
}

const styles = {
  buttonText: {
    fontSize: height/40,
    textAlign: 'center'
  },
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