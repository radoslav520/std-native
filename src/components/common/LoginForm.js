import React, { Component } from 'react';
import { AsyncStorage, Picker } from 'react-native';
import { Surface, TextInput, Button } from 'react-native-paper';
import axios from 'react-native-axios';
import { withNavigation } from 'react-navigation';
import { withNamespaces } from 'react-i18next';
import lang from '../../translation/i18n';
import api from './../../api_config';

class LoginForm extends Component {
  state = {
    user: '',
    password: '',
    wrongInputs: false
  };

  //click events
  onLoginClick() {
    if (this.state.user !== '' && this.state.password !== '') {
      this.onLoginRequest();
    } else {
      this.setState({
        wrongInputs: true,
        password: ''
      });
    }
  }
  onLoginRequest() {
    axios
      .post(`${api}/login`, {
        user: this.state.user.trim(),
        password: this.state.password
      })
      .then((response) => {
        var token = response.data.data.authToken;
        var userId = response.data.data.userId;

        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('userId', userId);

        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        this.setState({
          wrongInputs: true,
          password: ''
        });
      });
  }

  focusNextField(key) {
    this.inputs[key].focus();
  }
  setLenguage(value) {
    this.storeLang(value);
    lang.changeLanguage(value);
  }
  storeLang = async (lng) => {
    const STORAGE_KEY = '@APP:languageCode';
    try {
      await AsyncStorage.setItem(STORAGE_KEY, lng);
    } catch (error) {
      console.log(error);
    }
  };

  componentWillMount() {
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  render() {
    const { formStyle, inputStyle, btnStyle, pickerContainerStyle } = styles;
    const { t } = this.props;
    return (
      <Surface style={formStyle}>
        <TextInput
          error={this.state.wrongInputs}
          maxLength={50}
          style={inputStyle}
          label={t('common.labels.username')}
          onChangeText={(user) => this.setState({ user })}
          value={this.state.user}
          blurOnSubmit={false}
          ref={(input) => {
            this.inputs['username'] = input;
          }}
          onSubmitEditing={() => {
            // specify the key of the ref, as done in the previous section.
            this.focusNextField('password');
          }}
          returnKeyType={'next'}
          autoCapitalize='none'
        />
        <TextInput
          error={this.state.wrongInputs}
          maxLength={50}
          style={inputStyle}
          label={t('common.labels.password')}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          ref={(input) => {
            this.inputs['password'] = input;
          }}
          returnKeyType={'done'}
          autoCapitalize='none'
        />

        <Surface style={pickerContainerStyle}>
          <Picker
            selectedValue={lang.language}
            style={{ height: 50, width: 100 }}
            onValueChange={(value, itemIndex) => this.setLenguage(value)}
          >
            <Picker.Item label='ENG' value='en' />
            <Picker.Item label='DE' value='de' />
          </Picker>
        </Surface>

        <Button
          mode='contained'
          color='#333'
          style={btnStyle}
          onPress={this.onLoginClick.bind(this)}
        >
          {t('common.labels.login')}
        </Button>
      </Surface>
    );
  }
}

export default withNavigation(withNamespaces()(LoginForm));

const styles = {
  formStyle: {
    margin: 20,
    marginBottom: 5,
    marginTop: 0,
    borderColor: '#ddd',
    borderWidth: 1,
    elevation: 10,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    paddingTop: 20
  },
  pickerContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%'
  },
  inputStyle: {
    backgroundColor: '#fff',
    width: '100%',
    marginBottom: 10
  },
  btnStyle: {
    padding: 5,
    width: '90%',
    marginTop: 15
  }
};
