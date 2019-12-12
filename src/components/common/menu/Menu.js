import React from 'react';
import { ScrollView, View, Linking } from 'react-native';
import { SafeAreaView, DrawerItems } from 'react-navigation';
import axios from 'react-native-axios';
import { AsyncStorage } from 'react-native';
import qs from 'qs';

import { LogoBlack } from '../reuseable';
import api from '../../../api_config';

let url = 'mailto:';

async function onLogoutClick(props) {
  let token = await AsyncStorage.getItem('token');
  let userId = await AsyncStorage.getItem('userId');

  let headers = {
    'X-Auth-Token': token,
    'X-User-Id': userId
  };

  axios
    .post(`${api}/logout`, null, { headers: headers })
    .then((response) => {
      AsyncStorage.multiRemove(['token', 'userId'], () => {
        console.log(props);
        props.navigation.navigate('Login');
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

async function onPressfeedback() {
  url += encodeURIComponent('coderconsalting@gmail.com');

  const query = qs.stringify({ url });

  if (query.length) {
    url += `?${query}`;
  }

  const supported = await Linking.canOpenURL(url);
  console.log(url);

  if (!supported) {
    return Promise.reject(new Error('Provided URL can not be handled'));
  }

  return Linking.openURL(url);
}

const Menu = (props) => {
  return (
    <SafeAreaView>
      <View
        style={{
          height: 150,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <LogoBlack />
      </View>
      <ScrollView>
        <DrawerItems
          {...props}
          onItemPress={(route, focused) => {
            if (route.route.routeName === 'Logout') {
              onLogoutClick(props);
            } else if (route.route.routeName === 'Encyclopedia') {
              Linking.openURL('https://en.wikipedia.org/wiki/Sexually_transmitted_infection');
            } else if (route.route.routeName === 'Close') {
              props.navigation.closeDrawer();
            } else if (route.route.routeName === 'About') {
              Linking.openURL('http://coderconsulting.de/');
            } else if (route.route.routeName === 'Feedback') {
              onPressfeedback();
            } else {
              props.navigation.navigate(route.route.routeName);
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;
