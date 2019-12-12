import React, { Component } from 'react';
import { UnderConstruction } from './common/reuseable';
import { HeaderLabel } from './common/reuseable';

export default class AddDiseaseScreen extends Component {
  static navigationOptions = {
    headerTitle: <HeaderLabel text='common.labels.add disease' />
  };
  render() {
    return <UnderConstruction />;
  }
}
