import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MenuLabel } from '../reuseable';

class AboutScreen extends Component {
  static navigationOptions = {
    drawerLabel: <MenuLabel text='common.labels.about' />,
    drawerIcon: ({ tintColor }) => <Icon name='info-circle' size={22} backgroundColor='#3b5998' />
  };
}

export default AboutScreen;
