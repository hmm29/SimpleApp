/**
 * Created by harrisonmiller on 10/3/17.
 */
import React, {Component} from 'react';
import {Alert, StatusBar, View} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import defaultPreferences from '../../../data/defaultPreferences.json';
import {connect} from 'react-redux';
import {login, logout} from '../../actions/auth';
import {setPreference, clearPreferences} from '../../actions/preferences';
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
  async _createUser(email, password) {
    
    try {
      let userInfo = await auth0.auth.createUser({
        email,
        password,
        connection: 'Username-Password-Authentication',
        metadata: defaultPreferences
      });
      this._handleUserDataResponse(userInfo, 'Registration Success', `Welcome, ${userInfo.email}!`);
    } catch(e) {
      Alert.alert('Oops!', 'There was a problem with creating your new user account!\n\n' + e.message);
    }
  }
  
  async _getUserInfo(accessToken) {
    try {
      let userInfo = await auth0.auth.userInfo({token: accessToken});
      this._handleUserDataResponse(userInfo, 'Login Success', `You're successfully logged in, ${userInfo.email}`);
    } catch(e) {
      Alert.alert('Oops!', 'There was a problem with fetching user info!\n\n' + e.message);
    }
  }
  
  _handleUserDataResponse(userInfo, alertMessageTitle, alertMessageBody) {
    Alert.alert(alertMessageTitle, alertMessageBody);
    
    const currentUserId = userInfo.sub || 'auth0|' + userInfo.Id;
    this._updateStateWithDatabasePreferences(currentUserId);
    this.props.onLogin(currentUserId, userInfo.email);
  }
  
  async _login(email, password) {
    try {
      let data = await auth0.auth.passwordRealm({username: email, password, realm: 'Username-Password-Authentication'});
      this._getUserInfo(data.accessToken);
    } catch(e) {
      Alert.alert('Oops!', 'There was a problem with login!\n\n' + e.message);
    }
  }
  
  async _logout(params) {
    try {
      const logoutUrl = auth0.auth.logoutUrl(params),
        {currentUserId, preferences} = this.props;
      
      let response = await fetch(logoutUrl);
      this._updateUserPreferencesInDatabase(currentUserId, preferences);
      this.props.onLogout();
      
      if(response) Alert.alert('Logout Success', `You've logged out.`);
    } catch(e) {
      Alert.alert('Oops!', 'There was a problem with logout!\n\n' + e.message);
    }
  }
  
  async _updateStateWithDatabasePreferences(currentUserId) {
    try {
      let data = await auth0.users(token).getUser({id: currentUserId});
      let preferences = data.userMetadata || defaultPreferences;
      Object.keys(preferences).map((pref) => {
        this.props.onSetPreference({[pref]: preferences[pref]});
      });
    } catch(e) {
      Alert.alert('Oops!', 'There was a problem getting your preferences from the Auth0 database!\n\n' + e.message);
    }
  }
  
  async _updateUserPreferencesInDatabase(currentUserId, preferences) {
    try {
      await auth0.users(token).patchUser({id: currentUserId, metadata: preferences});
      this.props.onClearPreferences();
    } catch(e) {
      Alert.alert('Oops!', 'There was a problem updating your preferences in the Auth0 database!\n\n' + e.message);
    }
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
    onSetPreference: (preference) => dispatch(setPreference(preference)),
    onClearPreferences: () => dispatch(clearPreferences())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);