/**
 * Created by harrisonmiller on 10/3/17.
 */
import React, {Component} from 'react';
import {AlertIOS, AsyncStorage, StatusBar, View} from 'react-native';
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
      isLoggedIn: false
    }
  }
  
  componentWillMount() {
    auth0
      .webAuth
      .authorize({scope: 'openid email', audience: 'https://hmax.auth0.com/userinfo'})
      .then(credentials => {
        
        const {accessToken, tokenType, expiresIn} = credentials;
        
        AsyncStorage.multiSet([["@SimpleAppStore:accessToken", accessToken],
          ["@SimpleAppStore:tokenType", tokenType], ["@SimpleAppStore:expiresIn", JSON.stringify(expiresIn)]]);

        this.setState({isLoggedIn: true});
      })
      .catch(error => alert(error));
  }
  
  render() {
    return (
        <View style={styles.appContainer}>
          <StatusBar barStyle="dark-content" backgroundColor="#aaa"/>
          {this.state.isLoggedIn ? <DrawerNavigation screenProps={{}} /> : <StackNavigation/>}
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
    isLoggedIn: state.auth.isLoggedIn
  };
}

export default connect(mapStateToProps)(Main);