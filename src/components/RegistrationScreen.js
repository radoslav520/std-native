import React, { Component } from 'react';
import { TextInput, Button, HelperText } from 'react-native-paper';
import axios from 'react-native-axios';
import { withNavigation } from 'react-navigation';
import { withNamespaces } from 'react-i18next';
import {
  Alert,
  AsyncStorage,
  ScrollView,
  View,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import api from '../api_config';
import logo from '../assets/logo.png';
import registerStyles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './styles/RegistrationStyles';

let numbs = /^[0-9]+$/;
let alphNumb = /^[a-zA-Z0-9]+$/;

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',

      errorEmail: false,
      errorPassword: false,
      errorUsername: false,
      errorConfirmPassword: false
    };

    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

  componentWillMount() {
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};

    if (Platform.OS == 'ios') {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    } else {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT
    }).start();
  };

  keyboardDidShow = (event) => {
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT_SMALL
    }).start();
  };

  keyboardDidHide = (event) => {
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT
    }).start();
  };

  //Input validation
  validationEmail(email) {
    const { t } = this.props;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!reg.test(email)) {
      this.setState({
        errorEmail: true
      });
      this.setState({ email: email });
    } else {
      this.setState({ errorEmail: false });
      this.setState({ email: email });
    }
  }
  validationUsername(username) {
    const { t } = this.props;

    if (numbs.test(username.charAt(0)) || !alphNumb.test(username)) {
      this.setState({
        errorUsername: true
      });
      this.setState({ username: username });
    } else {
      this.setState({ errorUsername: false });
      this.setState({ username: username });
    }
  }
  validationPassword(password) {
    const { t } = this.props;
    if (password.length < 6) {
      this.setState({
        errorPassword: true
      });
      this.setState({ password: password });
    } else {
      this.setState({ errorPassword: false });
      this.setState({ password: password });
    }
  }
  validationConfirmPass(confirmPassword) {
    const { t } = this.props;
    if (confirmPassword !== this.state.password) {
      this.setState({ errorConfirmPassword: true });
      this.setState({ confirmPassword: confirmPassword });
    } else {
      this.setState({ errorConfirmPassword: false });
      this.setState({ confirmPassword: confirmPassword });
    }
  }

  //Click events
  onRegistration() {
    const { t } = this.props;

    if (
      this.state.username !== '' &&
      this.state.password !== '' &&
      this.state.confirmPassword !== '' &&
      this.state.email !== ''
    ) {
      if (
        !(
          this.state.errorEmail ||
          this.state.errorUsername ||
          this.state.errorPassword ||
          this.state.errorConfirmPassword
        )
      ) {
        let signupData = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          repeat_password: this.state.confirmPassword
        };
        this.onCreateUser(signupData);
      }
    } else {
      this.setState({
        errorEmail: this.state.email === '' ? true : this.state.errorEmail,
        errorUsername: this.state.username === '' ? true : this.state.errorUsername,
        errorPassword: this.state.password === '' ? true : this.state.errorPassword,
        errorConfirmPassword:
          this.state.confirmPassword === '' ? true : this.state.errorConfirmPassword
      });
    }
  }
  onCreateUser(signupData) {
    const { t } = this.props;
    const { username, email, password } = signupData;
    axios
      .post(`${api}/users`, {
        username: username,
        password: password,
        email: email
      })
      .then((response) => {
        this.onLoginRequest(signupData);
      })
      .catch((error) => {
        Alert.alert('Oops', t('validation.alredy exist'));
        this.setState({
          username: '',
          email: ''
        });
      });
  }
  onLoginRequest(signupData) {
    const { username, password } = signupData;

    axios
      .post(`${api}/login`, {
        username: username,
        password: password
      })
      .then((response) => {
        var token = response.data.data.authToken;
        var userId = response.data.data.userId;

        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('userId', userId);

        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          username: '',
          email: ''
        });
      });
  }
  focusNextField(id) {
    this.inputs[id].focus();
  }

  render() {
    const { t } = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
        <Animated.Image source={logo} style={[registerStyles.logo, { height: this.imageHeight }]} />
        <View style={registerStyles.form}>
          <KeyboardAvoidingView behavior='padding'>
            <TextInput
              maxLength={50}
              error={this.state.errorEmail}
              style={registerStyles.input}
              label='Email'
              onChangeText={(email) => this.validationEmail(email)}
              value={this.state.email}
              ref={(input) => {
                this.inputs['email'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('username');
              }}
              returnKeyType={'next'}
              autoCapitalize='none'
            />
            {this.state.errorEmail ? (
              <HelperText type='info'>{t('validation.invalid email')}</HelperText>
            ) : null}

            <TextInput
              maxLength={20}
              error={this.state.errorUsername}
              style={registerStyles.input}
              label={t('common.labels.username')}
              onChangeText={(username) => this.validationUsername(username)}
              value={this.state.username}
              ref={(input) => {
                this.inputs['username'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('password');
              }}
              returnKeyType={'next'}
              autoCapitalize='none'
            />
            {this.state.errorUsername ? (
              <HelperText type='info'>{t('validation.invalid username')}</HelperText>
            ) : null}

            <TextInput
              maxLength={50}
              error={this.state.errorPassword}
              style={registerStyles.input}
              label={t('common.labels.password')}
              secureTextEntry={true}
              onChangeText={(password) => this.validationPassword(password)}
              value={this.state.password}
              ref={(input) => {
                this.inputs['password'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('confirmPassword');
              }}
              returnKeyType={'next'}
              autoCapitalize='none'
            />
            {this.state.errorPassword ? (
              <HelperText type='info'>{t('validation.invalid password')}</HelperText>
            ) : null}

            <TextInput
              maxLength={50}
              error={this.state.errorConfirmPassword}
              style={registerStyles.input}
              label={t('common.labels.confirm password')}
              secureTextEntry={true}
              onChangeText={(confirmPassword) => this.validationConfirmPass(confirmPassword)}
              value={this.state.confirmPassword}
              ref={(input) => {
                this.inputs['confirmPassword'] = input;
              }}
              returnKeyType={'done'}
              autoCapitalize='none'
            />
            {this.state.errorConfirmPassword ? (
              <HelperText type='info'>{t('validation.repeat password')}</HelperText>
            ) : null}

            <Button
              mode='contained'
              color='#333'
              style={registerStyles.btnStyle}
              onPress={this.onRegistration.bind(this)}
            >
              {t('common.labels.register')}
            </Button>

            <Button
              style={{ marginBottom: 5 }}
              color='#F22613'
              mode='text'
              onPress={() => this.props.navigation.navigate('Login')}
            >
              {t('login.alredy have account')}
            </Button>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}

export default withNavigation(withNamespaces()(RegistrationScreen));
