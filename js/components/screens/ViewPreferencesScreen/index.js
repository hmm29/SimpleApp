/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Dimensions} from 'react-native';

import ScreenBase from '../ScreenBase';
import UITitle from '../../partials/UITitle';
import UIButton from "../../partials/UIButton";
import UIButtonsWrapper from '../../partials/UIButtonsWrapper';
import {logOut} from '../../../auth';
import PreferenceDisplay from '../../partials/PreferenceDisplay';

const {width, height} = Dimensions.get('window');

export default class ViewPreferencesScreen extends Component {
  
  
  render() {
    const {navigate} = this.props.navigation;
    
    return (
      <ScreenBase>
        <PreferenceDisplay sectionTitle="Settings" preferences={{
          pickupDistanceTimeInMinutes: 5,
          lowestPassengerRatingAllowed: 5,
          alwaysActiveApp: 'Lyft',
          secondaryAppOnlineCondition: 'Always',
          carpoolServicesAvailable: 'No'}} />
        <UIButtonsWrapper>
          <UIButton onPress={() => navigate('SetPreferences')} title="Change Preferences" style={styles.button}/>
          <UIButton onPress={() => {navigate('Home')}} title="LogOut" style={styles.button}/>
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