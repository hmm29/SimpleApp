/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {AsyncStorage, Dimensions, TouchableOpacity, Text} from 'react-native';
import ScreenBase from '../ScreenBase';
import UIButtonsWrapper from "../../partials/UIButtonsWrapper";
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({ domain: 'hmax.auth0.com', clientId: '7cjbXwTO7Lx-ixyt10t4GczxF19eAONO' });
const {height} = Dimensions.get('window');

export default class AuthScreen extends Component {
  static navigationOptions = {
    title: 'Simple App'
  }
  
  componentDidMount() {
    auth0
      .webAuth
      .authorize({scope: 'openid email', audience: 'https://hmax.auth0.com/userinfo'})
      .then(credentials => {
        console.log(credentials);
        // Successfully authenticated
        // Store the accessToken
        const {access_token, id_token, expires_in} = credentials
        AsyncStorage.multiSet([['@SimpleAppStore:access_token', access_token],
          ['@SimpleAppStore:id_token', id_token], ['@SimpleAppStore:expires_in', expires_in]]);
      })
      .catch(error => console.log(error));
  };
  
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