/**
 * Created by harrisonmiller on 10/3/17.
 */
import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import {connect} from 'react-redux';

import AuthScreen from './screens/AuthScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SetPreferencesScreen from './screens/SetPreferencesScreen';
import ViewPreferencesScreen from './screens/ViewPreferencesScreen';

const DrawerNavigation = DrawerNavigator({
  SetPreferences: {screen: SetPreferencesScreen},
  ViewPreferences: {screen: ViewPreferencesScreen}
});

const StackNavigation = StackNavigator({
  Home: {screen: AuthScreen},
  Login: {screen: LoginScreen},
  Register: {screen: RegisterScreen},
})

class Application extends Component {
  render() {
    return (
        <View style={styles.appContainer}>
          <StatusBar barStyle="dark-content" backgroundColor="#aaa"/>
          {this.props.isLoggedIn ? <DrawerNavigation screenProps={{}} /> : <StackNavigation/>}
        </View>
    )
  }
}

const styles = {
  appContainer: {
    flex: 1
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
}

export default connect(mapStateToProps)(Application);