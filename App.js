/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';

import AuthScreen from './js/components/screens/AuthScreen';
import LoginScreen from './js/components/screens/LoginScreen';
import RegisterScreen from './js/components/screens/RegisterScreen';
import SetPreferencesScreen from './js/components/screens/SetPreferencesScreen';
import ViewPreferencesScreen from './js/components/screens/ViewPreferencesScreen';

const DrawerNavigation = DrawerNavigator({
    SetPreferences: {screen: SetPreferencesScreen},
    ViewPreferences: {screen: ViewPreferencesScreen}
});

const StackNavigation = StackNavigator({
  Home: {screen: AuthScreen},
  Login: {screen: LoginScreen},
  Register: {screen: RegisterScreen},
})

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.setState({userLoggedIn: true});
  }
  
  _logOut() {
    this.setState({userLoggedIn: false});
  }
  
  render() {
    return (
      <View style={styles.appContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#aaa"/>
        {this.state.userLoggedIn ? <DrawerNavigation screenProps={{logOut: this._logOut.bind(this)}} /> : <StackNavigation/>}
      </View>
    )
  }
}

const styles = {
  appContainer: {
    flex: 1
  }
}