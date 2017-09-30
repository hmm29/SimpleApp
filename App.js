import React from 'react';
import {StackNavigator} from 'react-navigation';

import AuthScreen from './js/components/screens/AuthScreen';
import LoginScreen from './js/components/screens/LoginScreen';
import RegisterScreen from './js/components/screens/RegisterScreen';
import SetPreferencesScreen from './js/components/screens/SetPreferencesScreen';
import ViewPreferencesScreen from './js/components/screens/ViewPreferencesScreen';

const App = StackNavigator({
    Home: {screen: AuthScreen},
    Login: {screen: LoginScreen},
    Register: {screen: RegisterScreen},
    SetPreferences: {screen: SetPreferencesScreen},
    ViewPreferences: {screen: ViewPreferencesScreen}
  });

export default App;
