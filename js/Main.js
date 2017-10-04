/**
 * Created by harrisonmiller on 10/3/17.
 */
import React, {Component} from 'react';
import {ActivityIndicator, AlertIOS, AsyncStorage, StatusBar, Text, View} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import Auth0 from 'react-native-auth0';

import Auth from './redux/components/Auth/index';
import Login from './redux/components/Login/index';
import Register from './redux/components/Register/index';
import SetPreferences from './redux/containers/SetPreferences/index';
import ViewPreferences from './redux/containers/ViewPreferences/index';

const auth0 = new Auth0({ domain: 'hmax.auth0.com', clientId: '7cjbXwTO7Lx-ixyt10t4GczxF19eAONO' });

const DrawerNavigation = DrawerNavigator({
  SetPreferences: {screen: SetPreferences},
  ViewPreferences: {screen: ViewPreferences}
});

const StackNavigation = StackNavigator({
  Home: {screen: Auth},
  Login: {screen: Login},
  Register: {screen: Register},
})

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoggedIn: false
    }
  }
  
  componentWillMount() {
    // check login status in local async storage
    AsyncStorage.getItem("isLoggedIn")
      .then((result) => {
        if(result !== null) this.setState({isLoggedIn: true})
        this.setState({isLoading: false});
      })
      .catch((error) => console.log(error.message));
  }

  
  _createUser(email, password) {
    auth0
      .auth
        .createUser({email, password, connection: 'Username-Password-Authentication'})
        .then((data) => {
        console.log(JSON.stringify(data));
        AlertIOS.alert('Registration Success', `Welcome ${data.email}!`);
        AsyncStorage.setItem("isLoggedIn", "true")
          .then((result) => console.log(result))
          .catch((error) => console.log(error.message));
        this.setState({isLoggedIn: true});
        })
        .catch((error) => alert(JSON.stringify(error)));
  }
  
  _login(email, password) {
    auth0
      .auth
      .passwordRealm({username: email, password, realm: "Username-Password-Authentication"})
      .then((data) => {
        console.log(JSON.stringify(data));
        AlertIOS.alert('Login Success', `You're logged in!`);
        AsyncStorage.setItem("isLoggedIn", "true")
          .then((result) => console.log(result))
          .catch((error) => console.log(error.message));
        this.setState({isLoggedIn: true});
      })
      .catch((error) => alert(JSON.stringify(error)));
  }
  
  _logout(params) {
    let logoutUrl =
      auth0
      .auth
      .logoutUrl(params)
    
    fetch(logoutUrl).then((response) => {
      console.log(JSON.stringify(response));
      AlertIOS.alert('Logout Success', `You've logged out.`);
      AsyncStorage.removeItem("isLoggedIn")
        .then((result) => console.log(result))
        .catch((error) => console.log(error.message));
      this.setState({isLoggedIn: false});
    }).catch((error) => console.log(error.message))
  }
  
  render() {
    const loadingView = (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>);
    
    return (
        <View style={styles.appContainer}>
          <StatusBar barStyle="dark-content" backgroundColor="#aaa"/>
          {this.state.isLoading ? loadingView :
            (this.state.isLoggedIn ?
              <DrawerNavigation screenProps={{logout: () => this._logout.call(this, {clientId: '7cjbXwTO7Lx-ixyt10t4GczxF19eAONO'})}} />
            : <StackNavigation screenProps={{createUser: this._createUser.bind(this), login: this._login.bind(this)}} />)}
        </View>
    )
  }
}

const styles = {
  appContainer: {
    flex: 1
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
}

export default connect(mapStateToProps)(Main);