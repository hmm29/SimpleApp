/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Dimensions} from 'react-native';

import ScreenBase from '../ScreenBase';
import UITitle from '../../partials/UITitle';
import UIButton from '../../partials/UIButton';
import UIButtonsWrapper from '../../partials/UIButtonsWrapper';

const {width, height} = Dimensions.get('window');

export default class RegisterScreen extends Component {
  render() {
    const {navigate} = this.props.navigation;
    
    return (
      <ScreenBase>
        <UITitle>
          Register
        </UITitle>
        <UIButtonsWrapper style={styles.buttonWrapper}>
          <UIButton onPress={() => navigate('SetPreferences')} title="Set Preferences" style={styles.button} />
          <UIButton onPress={() => navigate('ViewPreferences')} title="View Preferences" style={styles.button} />
        </UIButtonsWrapper>
      </ScreenBase>
    )
  }
}

const styles = {
  button: {
    width: width/1.5,
    marginVertical: height/50
  },
  buttonWrapper: {
    flexDirection: 'column'
  }
}