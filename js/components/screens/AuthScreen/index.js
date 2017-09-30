/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import ScreenBase from '../ScreenBase';
import UITitle from '../../partials/UITitle';
import UIButtonsWrapper from '../../partials/UIButtonsWrapper';
import UIButton from '../../partials/UIButton';

export default class AuthScreen extends Component {
  static navigationOptions = {
  }
  
  render() {
    const {navigate} = this.props.navigation;
    
    return (
      <ScreenBase>
        <UITitle style={styles.appName}>Simple App</UITitle>
        <UIButtonsWrapper style={styles.authButtons}>
          <UIButton onPress={() => navigate('Login')} title="Log In"/>
          <UIButton onPress={() => navigate('Register')} title="Register"/>
        </UIButtonsWrapper>
      </ScreenBase>
    )
  }
}

const styles = {
  appName: {
    fontSize: 50,
  }
}