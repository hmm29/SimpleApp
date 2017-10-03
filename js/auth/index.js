import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';

class Authentication extends Component {
  
  userSignup() {
    if (!this.state.username || !this.state.password) return;
    // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
    fetch('http://192.168.XXX.XXX:3001/users', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.saveItem('id_token', responseData.id_token),
          Alert.alert( 'Signup Success!', 'Click the button to get a Chuck Norris quote!'),
          Actions.HomePage();
      })
      .done();
  }
  
  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

}

export default Authentication;