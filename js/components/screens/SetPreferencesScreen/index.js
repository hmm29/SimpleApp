/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import ScreenBase from '../ScreenBase';
import PreferenceSelect from '../../partials/PreferenceSelect';
import UIButton from '../../partials/UIButton';
import Swiper from 'react-native-swiper';

const SWIPER_REF = 'SetPreferencesSwiper',
      {height, width} = Dimensions.get('window'); /* gets screen dimensions */

export default class SetPreferencesScreen extends Component {
  
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Swiper ref={SWIPER_REF}
              snapToAlignment='center'
              bounces={true}
              showsPagination={true}
              loop={false}>
          <ScreenBase>
            <PreferenceSelect
              title="How far will you drive for a pick-up?"
              buttons={['5 min', '10 min', '20 min', 'Any']}
              setPreference={() => alert('hey babe')}/>
            <PreferenceSelect
              title="What's the lowest passenger rating you'll accept?"
              buttons={['4.5', '4.0', '3.5', 'Any']}
              setPreference={() => alert('set this')}/>
          </ScreenBase>
          <ScreenBase>
            <PreferenceSelect
              title="What app should always be active?"
              buttons={['Uber', 'Lyft']}
              setPreference={() => alert('hey babe')}/>
            <PreferenceSelect
              title="And when should the other come on-line?"
              buttons={['Always', 'If no rider for 5 min', 'If no rider for 10 min', 'If no rider for 15 min']}
              setPreference={() => alert('set this')}/>
          </ScreenBase>
          <ScreenBase>
            <PreferenceSelect
              title="Do you want rides from carpool services?"
              buttons={['Yes', 'No']}
              setPreference={() => alert('hey babe')}/>
           <UIButton onPress={() => navigate('ViewPreferences')} title="Done" style={styles.doneButton} />
          </ScreenBase>
      </Swiper>
    )
  }
}

const styles = {
  doneButton: {
    alignSelf: 'center',
    marginVertical: height/8
  },
  text: {
    fontSize: 20,
  }
}