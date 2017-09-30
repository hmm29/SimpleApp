/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import {DrawerNavigator} from 'react-navigation';

import AuthScreen from './js/components/screens/AuthScreen';
import LoginScreen from './js/components/screens/LoginScreen';
import RegisterScreen from './js/components/screens/RegisterScreen';
import SetPreferencesScreen from './js/components/screens/SetPreferencesScreen';
import ViewPreferencesScreen from './js/components/screens/ViewPreferencesScreen';

const DrawerNavigation = DrawerNavigator({
    Home: {screen: AuthScreen},
    Login: {screen: LoginScreen},
    Register: {screen: RegisterScreen},
    SetPreferences: {screen: SetPreferencesScreen},
    ViewPreferences: {screen: ViewPreferencesScreen}
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.appContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="blue"/>
        <DrawerNavigation/>
      </View>
    )
  }
}

const styles = {
  appContainer: {
    flex: 1
  }
}