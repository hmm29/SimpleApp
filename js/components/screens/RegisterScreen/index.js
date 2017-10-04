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
import UIButton from "../../partials/UIButton";

const {height} = Dimensions.get('window');
const Form = t.form.Form;

const Register = t.struct({
  email: t.String,
  password: t.String,
});


export default class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'Register'
  }
  
  _onPress() {
    let value = this.refs.form.getValue();
    if (value) {
      console.log(value);
    }
  }
  
  render() {
    const {navigate} = this.props.navigation;
    
    return (
      <ScreenBase>
        <Form
          ref="form"
          type={Register}/>
        <UIButton title="Register" style={styles.button} onPress={this._onPress}/>
      </ScreenBase>
    )
  }
}

const styles = {
  button: {
    height: height/10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    margin: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
}