/**
 * Created by harrisonmiller on 10/3/17.
 */
import React, {Component} from 'react';
import {AlertIOS, StatusBar, View} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import defaultPreferences from '../../../data/defaultPreferences.json';
import {connect} from 'react-redux';
import {login, logout} from '../../actions/auth';
import {setPreference} from '../../actions/preferences';
import {token} from '../../../data/token.json'
import Auth0 from 'react-native-auth0';

import Auth from '../../components/views/Auth/index';
import Login from '../../components/views/Login/index';
import Register from '../../components/views/Register/index';
import SetPreferences from '../SetPreferences/index';
import ViewPreferences from '../ViewPreferences/index';

const auth0 = new Auth0({domain: 'hmax.auth0.com', clientId: '7cjbXwTO7Lx-ixyt10t4GczxF19eAONO'});
const CLIENT_ID_PARAM = {clientId: '7cjbXwTO7Lx-ixyt10t4GczxF19eAONO'};

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
        metadata: defaultPreferences
      })
      .then((userInfo) => {
        this._handleUserDataResponse(
          userInfo,
          'Registration Success',
          `Welcome, ${userInfo.email}!`);
      })
      .catch((error) => console.log(error.message));
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
    AlertIOS.alert(alertMessageTitle, alertMessageBody);
    
    let currentUserId = userInfo.sub || 'auth0|' + userInfo.Id;
    this.props.onLogin(currentUserId, userInfo.email);
    this._updateStateWithDatabasePreferences(currentUserId);
  }
  
  _login(email, password) {
    auth0
      .auth
      .passwordRealm({username: email, password, realm: "Username-Password-Authentication"})
      .then((data) => this._getUserInfo(data.accessToken))
      .catch((error) => AlertIOS.alert('Oops!', error.message));
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
  
  _updateStateWithDatabasePreferences(currentUserId) {
    auth0.users(token)
      .getUser({id: currentUserId})
      .then((data) => {
        let preferences = data.userMetadata || defaultPreferences;
        Object.keys(preferences).map((pref) => {
          this.props.onSetPreference({[pref]: preferences[pref]});
        })
      })
      .catch((error) => console.log(error.message));
  }
  
  _updateUserPreferencesInDatabase(currentUserId, preferences) {
    auth0
      .users(token)
      .patchUser({
        id: currentUserId,
        metadata: preferences
      })
      .then((result) => console.log(JSON.stringify(result)))
      .catch((error) => AlertIOS.alert('Something happened!', error.message));
  }
  
  render() {
    return (
      <View style={styles.appContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#aaa"/>
        {this.props.currentUserId ?
          <DrawerNavigation
            screenProps={{
              currentUserEmail: this.props.currentUserEmail,
              logout: () => this._logout.call(this, CLIENT_ID_PARAM)
            }}/>
          : <StackNavigation
            screenProps={{createUser: this._createUser.bind(this), login: this._login.bind(this)}}/>}
      </View>
    )
  }
}

const styles = {
  appContainer: {
    flex: 1
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.auth.currentUserId,
    currentUserEmail: state.auth.currentUserEmail,
    preferences: state.preferences
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (currentUserId, currentUserEmail) => dispatch(login(currentUserId, currentUserEmail)),
    onLogout: () => dispatch(logout()),
    onSetPreference: (preference) => dispatch(setPreference(preference))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);