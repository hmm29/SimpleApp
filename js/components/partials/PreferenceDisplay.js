/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Dimensions, View, ScrollView, Text} from 'react-native';

import UITitle from './UITitle';
import PropTypes from 'prop-types';

const {height} = Dimensions.get('window');

export default class PreferenceDisplay extends Component {
  static propTypes = {
    preferences: PropTypes.object.isRequired,
    sectionTitle: PropTypes.string
  }
  
  render() {
    const {preferences, sectionTitle} = this.props;
    
    return (
      <View style={styles.container}>
        <UITitle style={styles.sectionTitle}>{sectionTitle}</UITitle>
        <ScrollView style={styles.sectionContent}>
        {Object.keys(preferences).map((fieldName, i) =>
          <View key={i} style={styles.preferenceDisplay}>
            <UITitle style={styles.fieldName}>
              {fieldName}:
            </UITitle>
            <Text style={styles.fieldValue}>
              {preferences[fieldName]}
            </Text>
          </View>)}
        </ScrollView>
      </View>)
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 200
  },
  fieldName: {
    fontSize: height/35
  },
  fieldValue: {
    fontSize: height/40
  },
  preferenceDisplay: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: height/40
  },
  sectionContent: {
  },
  sectionTitle: {
    marginTop: height/20,
    marginBottom: height/15
  }
}