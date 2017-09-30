/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class UIButtonsWrapper extends Component {
  render() {
    
    return (
      <View style={styles.buttonsWrapper}>
        {this.props.children}
      </View>
    )
  }
}

const styles = {
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: height/20
  }
}