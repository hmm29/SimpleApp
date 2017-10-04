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
import UIButton from '../UIButton';
import t from 'tcomb-form-native';

const {height} = Dimensions.get('window');
const Form = t.form.Form;

const loginForm = t.struct({
  email: t.String,
  password: t.String,
});


export default class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      route: 'Login',
      username: '',
      password: ''
    };
  }
  
  static navigationOptions = {
    title: 'Log In'
  }
  
  userLogin (e) {
    this.props.onLogin(this.state.username, this.state.password);
    e.preventDefault();
  }
  
  toggleRoute (e) {
    let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
    this.setState({ route: alt });
    e.preventDefault();
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
          type={loginForm}/>
        <UIButton title="Log In" style={styles.button} onPress={this._onPress}/>
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