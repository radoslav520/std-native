import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import axios from 'react-native-axios';
import SplashScreen from 'react-native-splash-screen';

import api from './api_config';
import AppContainer from './Router';
import theme from './material/Theme';

export default class App extends Component {
  //Lifecycle methods
  componentWillMount() {
    //user auth
    AsyncStorage.multiGet(['token', 'userId'], (errors, result) => {
      if (result) {
        this.token = result[0][1];
        this.userId = result[1][1];

        if (this.token && this.userId) {
          this.axiosConfig = {
            headers: {
              'X-Auth-Token': this.token,
              'X-User-Id': this.userId
            }
          };
          this.isLoginValid();
        }
      } else {
        console.log(errors);
      }
    });
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  //valid method
  isLoginValid() {
    axios
      .get(`${api}/users/${this.userId}`, this.axiosConfig)
      .then((response) => {
        if (response.data.status === 'success') {
        }
      })
      .catch((err) => {
        //On error remove user from asynstorage and user get logged out
        AsyncStorage.multiRemove(['token', 'userId']);
      });
  }

  render() {
    return (
      <PaperProvider theme={theme}>
        <AppContainer />
      </PaperProvider>
    );
  }
}
