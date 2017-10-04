/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {connect} from 'react-redux';

import ScreenBase from '../../components/views/ScreenBase';
import UIButton from "../../components/partials/UIButton";
import UIButtonsWrapper from '../../components/partials/UIButtonsWrapper';
import PreferenceDisplay from '../../components/partials/PreferenceDisplay';

const {width, height} = Dimensions.get('window');

class ViewPreferences extends Component {
  
  render() {
    const {
        preferences,
        navigation,
        screenProps
      } = this.props,
      {currentUserEmail, logout} = screenProps,
      {navigate} = navigation;
    
    return (
      <ScreenBase navigate={navigate}>
        <PreferenceDisplay title={`Preferences for ${currentUserEmail}`} preferences={preferences}/>
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
    width: width / 2.5,
    marginVertical: height / 40
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

export default connect(mapStateToProps)(ViewPreferences);