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

const {height} = Dimensions.get('window');
const Form = t.form.Form;

const LogIn = t.struct({
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
          type={LogIn}
        />
        <TouchableOpacity style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
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
    height: height/10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    margin: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
}