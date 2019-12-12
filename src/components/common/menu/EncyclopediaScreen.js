import React, { Component } from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MenuLabel } from '../reuseable';

class EncyclopediaScreen extends Component {
  static navigationOptions = {
    drawerLabel: <MenuLabel text='common.labels.encyclopedia' />,
    drawerIcon: ({ tintColor }) => <Icon name='book' size={22} backgroundColor='#3b5998' />
  };
}

export default EncyclopediaScreen;
