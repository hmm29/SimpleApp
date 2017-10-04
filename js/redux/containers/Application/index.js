/**
 * Created by harrisonmiller on 10/3/17.
 */
import React, {Component} from 'react';
import {ActivityIndicator, AlertIOS, AsyncStorage, StatusBar, Text, View} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import defaultPreferences from '../../../data/defaultPreferences.json';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';
import Auth0 from 'react-native-auth0';

import Auth from '../../components/views/Auth/index';
import Login from '../../components/views/Login/index';
import Register from '../../components/views/Register/index';
import SetPreferences from '../SetPreferences/index';
import ViewPreferences from '../ViewPreferences/index';

const auth0 = new Auth0({domain: 'hmax.auth0.com', clientId: '7cjbXwTO7Lx-ixyt10t4GczxF19eAONO'});
const LOGOUT_URL_PARAM = {clientId: '7cjbXwTO7Lx-ixyt10t4GczxF19eAONO'};

const DrawerNavigation = DrawerNavigator({
  SetPreferences: {screen: SetPreferences},
  ViewPreferences: {screen: ViewPreferences}
});

const StackNavigation = StackNavigator({
  Home: {screen: Auth},
  Login: {screen: Login},
  Register: {screen: Register},
})

class Application extends Component {
  _createUser(email, password) {
    auth0
      .auth
      .createUser({
        email,
        password,
        connection: 'Username-Password-Authentication',
        metadata: "" + defaultPreferences + ""
      })
      .then((userInfo) => {
        this._handleUserDataResponse(
          userInfo,
          'Registration Success',
          `Welcome, ${userInfo.email}!`);
      })
      .catch((error) => alert(JSON.stringify(error)));
  }
  
  _getUserInfo(accessToken) {
    auth0
      .auth
      .userInfo({token: accessToken})
      .then((userInfo) => {
        this._handleUserDataResponse(
          userInfo,
          "Login Success",
          `You're successfully logged in, ${userInfo.email}`)
      })
  }
  
  
  _handleUserDataResponse(userInfo, alertMessageTitle, alertMessageBody) {
    this.props.onLogin(userInfo.id, userInfo.email);
    this.props.setPreferences(JSON.parse(userInfo.metadata.preferences));
    AlertIOS.alert(alertMessageTitle, alertMessageBody);
  }
  
  _login(email, password) {
    auth0
      .auth
      .passwordRealm({username: email, password, realm: "Username-Password-Authentication"})
      .then((data) => this._getUserInfo(data.accessToken))
      .catch((error) => alert(JSON.stringify(error)));
  }
  
  _logout(params) {
    const logoutUrl = auth0.auth.logoutUrl(params),
      {currentUserId, preferences} = this.props;
    
    fetch(logoutUrl)
      .then((response) => console.log(JSON.stringify(response)))
      .then(() => this._updateUserPreferencesInDatabase(currentUserId, preferences))
      .then(() => this.props.onLogout())
      .then(() => AlertIOS.alert('Logout Success', `You've logged out.`))
      .catch((error) => console.log(error.message))
  }
  
  _updateUserPreferencesInDatabase(currentUserId, preferences) {
    auth0
      .users
      .patchUser({
        id: currentUserId,
        metadata: JSON.stringify(preferences)
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error.message));
  }
  
  render() {
    const loadingView = (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" style={styles.activityIndicator}/>
        <Text>Loading...</Text>
      </View>
    );
    
    return (
      <View style={styles.appContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#aaa"/>
        {this.props.currentUserId ?
            <DrawerNavigation
              screenProps={{
                currentUserEmail: this.props.currentUserEmail,
                logout: () => this._logout.call(this, LOGOUT_URL_PARAM)
              }}/>
            : <StackNavigation
              screenProps={{createUser: this._createUser.bind(this), login: this._login.bind(this)}}/>}
      </View>
    )
  }
}

const styles = {
  activityIndicator: {
    marginVertical: 10
  },
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
    currentUserId: state.auth.currentUserId,
    preferences: state.preferences
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (currentUserId, currentUserEmail) => dispatch(login(currentUserId, currentUserEmail)),
    onLogout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);