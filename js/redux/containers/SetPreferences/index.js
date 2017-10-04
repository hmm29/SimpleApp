/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {setPreference} from '../../actions/preferences';

import ScreenBase from '../../components/views/ScreenBase';
import PreferenceSelect from '../../components/partials/PreferenceSelect';
import UIButton from '../../components/partials/UIButton';
import Swiper from 'react-native-swiper';

const SWIPER_REF = 'SetPreferencesSwiper',
  {height} = Dimensions.get('window');

class SetPreferences extends Component {
  render() {
    const {preferences, setPreference, navigation} = this.props,
      {navigate} = navigation;
    
    return (
      <ScreenBase navigate={navigate}>
        <Swiper ref={SWIPER_REF}
                snapToAlignment='center'
                bounces={true}
                showsPagination={true}
                loop={false}>
          <ScreenBase>
            <PreferenceSelect
              item="pickupDistanceTimeInMinutes"
              prompt="How far will you drive for a pick-up?"
              options={['5 min', '10 min', '20 min', 'Any']}
              active={preferences.pickupDistanceTimeInMinutes}
              setPreference={setPreference}/>
            <PreferenceSelect
              item="lowestPassengerRatingAllowed"
              prompt="What's the lowest passenger rating you'll accept?"
              options={['4.5', '4.0', '3.5', 'Any']}
              active={preferences.lowestPassengerRatingAllowed}
              setPreference={setPreference}/>
          </ScreenBase>
          <ScreenBase>
            <PreferenceSelect
              item="alwaysActiveApp"
              prompt="What app should always be active?"
              options={['Uber', 'Lyft']}
              active={preferences.alwaysActiveApp}
              setPreference={setPreference}/>
            <PreferenceSelect
              item="secondaryAppOnlineCondition"
              prompt="And when should the other come on-line?"
              options={['Always', 'If no rider for 5 min', 'If no rider for 10 min', 'If no rider for 15 min']}
              active={preferences.secondaryAppOnlineCondition}
              setPreference={setPreference}/>
          </ScreenBase>
          <ScreenBase>
            <PreferenceSelect
              item="carpoolServicesAvailable"
              prompt="Do you want rides from carpool services?"
              options={['Yes', 'No']}
              active={preferences.carpoolServicesAvailable}
              setPreference={setPreference}/>
            <UIButton onPress={() => navigate('ViewPreferences')} title="Done" style={styles.doneButton}/>
          </ScreenBase>
        </Swiper>
      </ScreenBase>
    )
  }
}

const styles = {
  doneButton: {
    alignSelf: 'center',
    marginVertical: height / 8
  },
  text: {
    fontSize: 20,
  }
}

const mapStateToProps = (state) => {
  return {
    preferences: state.preferences
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPreference: (preference) => {
      dispatch(setPreference(preference));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetPreferences);