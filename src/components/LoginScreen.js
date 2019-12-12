import React, { Component } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNamespaces } from 'react-i18next';
import { MenuLabel } from './common/reuseable';

import { Hero, LoginForm } from './common';

class LoginScreen extends Component {
  static navigationOptions = {
    drawerLabel: <MenuLabel text='common.labels.logout' />,
    drawerIcon: ({ tintColor }) => <Icon name='sign-out' size={22} backgroundColor='#3b5998' />
  };

  componentWillMount() {
    let token;
    let userId;

    AsyncStorage.multiGet(['token', 'userId'], (errors, result) => {
      if (result) {
        token = result[0][1];
        userId = result[1][1];

        if (token && userId) {
          this.props.navigation.navigate('Home');
        }
      }
    });
  }

  render() {
    const { t } = this.props;
    return (
      <View stickyHeaderIndices={[]} style={{ flex: 1 }}>
        <View style={{ width: '100%', flex: 1 }}>
          <Hero anonym={t('common.reusable.anonymously')} title={t('login.title')} />
        </View>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <LoginForm />
          <Button
            style={{ alignSelf: 'center', marginVertical: 5 }}
            color='#F22613'
            mode='text'
            onPress={() => this.props.navigation.navigate('Registration')}
          >
            {t('common.labels.register')}
          </Button>
        </ScrollView>
      </View>
    );
  }
}

export default withNamespaces()(LoginScreen);
