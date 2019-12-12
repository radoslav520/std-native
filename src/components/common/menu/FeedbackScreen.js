import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MenuLabel } from '../reuseable';

class FeedbackScreen extends Component {
  static navigationOptions = {
    drawerLabel: <MenuLabel text='common.labels.feedback' />,
    drawerIcon: ({ tintColor }) => <Icon name='comment' size={22} backgroundColor='#3b5998' />
  };
}

export default FeedbackScreen;
