/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Text} from 'react-native';
import ScreenBase from '../ScreenBase';
import PreferenceSelect from '../../partials/PreferenceSelect';
import Swiper from 'react-native-swiper';

export default class SetPreferencesScreen extends Component {
  render() {
    return (
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
    )
  }
}

const styles = {
  text: {
    fontSize: 20,
  }
}