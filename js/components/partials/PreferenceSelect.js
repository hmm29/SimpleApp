/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';

import UIButton from './UIButton';
import UIButtonsWrapper from './UIButtonsWrapper';
import UITitle from './UITitle';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');

export default class PreferenceSelect extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    buttons: PropTypes.array.isRequired,
    setPreference: PropTypes.func.isRequired
  }
  
  render() {
    const {title, buttons, setPreference} = this.props;
    
    return (
      <View style={styles.container}>
        <UITitle>
          {title}
        </UITitle>
        <UIButtonsWrapper>
          {buttons && buttons.map((button, i) => <UIButton key={i} onPress={setPreference.bind(this)} title={button} />)}
        </UIButtonsWrapper>
      </View>)
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }
}