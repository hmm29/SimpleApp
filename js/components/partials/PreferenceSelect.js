/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import UIButton from './UIButton';
import UITitle from './UITitle';

export default class PreferenceSelect extends Component {
  render() {
    const {title, buttons, setPreference} = this.props;
    
    return (
      <View style={styles.container}>
        <UITitle>
          {title}
        </UITitle>
        <UIButtonsWrapper>
          {buttons.map((button, i) => <UIButton onPress={() => setPreference}>{button}</UIButton>)}
        </UIButtonsWrapper>
      </View>)
  }
}