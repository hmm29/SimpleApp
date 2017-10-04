/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Dimensions} from 'react-native';

import ScreenBase from '../../components/ScreenBase';
import UIButton from "../../components/UIButton";
import UIButtonsWrapper from '../../components/UIButtonsWrapper';
import PreferenceDisplay from '../../components/PreferenceDisplay';

const {width, height} = Dimensions.get('window');

export default class ViewPreferences extends Component {
  
  render() {
    const {logout} = this.props.screenProps,
          {navigate} = this.props.navigation;
    
    return (
      <ScreenBase navigate={navigate}>
        <PreferenceDisplay title="Preferences" preferences={{
          pickupDistanceTimeInMinutes: 5,
          lowestPassengerRatingAllowed: 5,
          alwaysActiveApp: 'Lyft',
          secondaryAppOnlineCondition: 'Always',
          carpoolServicesAvailable: 'No'}} />
        <UIButtonsWrapper>
          <UIButton onPress={() => navigate('SetPreferences')} title="Change Preferences" style={styles.button}/>
          <UIButton onPress={() => logout()} title="Log Out" style={styles.button}/>
        </UIButtonsWrapper>
      </ScreenBase>
    )
  }
}

const styles = {
  button: {
    width: width/2.5,
    marginVertical: height/40
  },
  text: {
    fontSize: 20,
  }
}