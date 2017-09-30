/**
 * Created by harrisonmiller on 9/29/17.
 */
import React from 'react';
import {DrawerNavigator} from 'react-navigation';

import AuthScreen from './js/components/screens/AuthScreen';
import LoginScreen from './js/components/screens/LoginScreen';
import RegisterScreen from './js/components/screens/RegisterScreen';
import SetPreferencesScreen from './js/components/screens/SetPreferencesScreen';
import ViewPreferencesScreen from './js/components/screens/ViewPreferencesScreen';

const App = DrawerNavigator({
    Home: {screen: SetPreferencesScreen},
    Login: {screen: LoginScreen},
    Register: {screen: RegisterScreen},
    SetPreferences: {screen: SetPreferencesScreen},
    ViewPreferences: {screen: ViewPreferencesScreen}
});

export default App;
