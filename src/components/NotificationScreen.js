import React, { Component } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Button, Divider, Surface, Text, Title, TextInput, HelperText } from 'react-native-paper';
import { withNavigationFocus } from 'react-navigation';
import { withNamespaces } from 'react-i18next';
import axios from 'react-native-axios';
import { HeaderLabel } from './common/reuseable';

class NotificationScreen extends Component {
  static navigationOptions = {
    headerTitle: <HeaderLabel text='common.reusable.inform partner' />
  };

  state = {
    partner: null,
    partnerEmail: '',
    message: '',
    errorEmail: false
  };

  componentWillMount() {
    this.setState({ partner: this.props.navigation.getParam('partner', null) });
  }
  componentDidMount() {
    this.setState({
      message: this.props.t('notification.message', { name: this.state.partner.name })
    });
  }

  //email validation
  validationEmail(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email !== '') {
      if (!reg.test(email)) {
        this.setState({
          errorEmail: true
        });
        this.setState({ partnerEmail: email });
      } else {
        this.setState({ errorEmail: false });
        this.setState({ partnerEmail: email });
      }
    } else {
      this.setState({ partnerEmail: email });
      this.setState({ errorEmail: false });
    }
  }

  yesNoButton(email, message) {
    const { t } = this.props;
    Alert.alert(t('common.reusable.you sure'), t('notification.alert messsage'), [
      { text: t('common.reusable.yes'), onPress: () => this.onEmailSend(email, message) },
      { text: t('common.reusable.no'), onPress: () => console.log('NO Pressed'), style: 'cancel' }
    ]);
  }

  //on click events
  onEmailSend(partnerEmail, message) {
    const emailTo = partnerEmail;
    const emailFrom = 'coderconsalting@gmail.com';
    const Subject = 'STD Alert';
    const Text = message;

    if (partnerEmail !== '') {
      if (this.state.errorEmail === false) {
        axios
          .post(`${api}/email?to=${emailTo}&from=${emailFrom}&subject=${Subject}&text=${Text}`)
          .then((response) => {
            this.props.navigation.navigate('Partner', {
              sent: true
            });
          })
          .catch(function(error) {
            console.log(error);
            Alert.alert('Oops', 'There is a problem with sending email, please try again later');
          });
      } else {
        this.setState({
          errorEmail: true
        });
      }
    } else {
      this.setState({
        errorEmail: true
      });
    }
  }

  render() {
    const { t } = this.props;
    const { partner, message, partnerEmail } = this.state;
    const { formStyle, messageTextStyle, informBtnStyle, subTitleTextStyle, titleStyle } = styles;

    return (
      <ScrollView>
        <Surface style={formStyle}>
          <Title style={titleStyle}>{t('notification.title', { name: partner.name })}</Title>

          <Text style={subTitleTextStyle}>{t('notification.service price')}</Text>

          <Button
            style={informBtnStyle}
            mode='contained'
            dark={true}
            onPress={() => this.yesNoButton(partnerEmail, message)}
          >
            {t('notification.inform anonymously')}
          </Button>

          <View style={{ padding: 5 }}>
            <Text style={messageTextStyle}>{this.state.message}</Text>
          </View>

          <Divider style={{ marginTop: 10, marginBottom: 10, borderBottomWidth: 0.5 }} />

          <TextInput
            label='Email'
            error={this.state.errorEmail}
            mode='outlined'
            style={{ backgroundColor: '#fff' }}
            value={this.state.partnerEmail}
            onChangeText={(email) => this.validationEmail(email)}
          />
          <HelperText type='info' visible={true}>
            {t('notification.partner email')}
          </HelperText>
        </Surface>
      </ScrollView>
    );
  }
}

export default withNavigationFocus(withNamespaces()(NotificationScreen));

const styles = {
  formStyle: {
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  footerContainerStyle: {
    backgroundColor: 'red',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageTextStyle: {
    color: '#555',
    fontStyle: 'italic',
    fontSize: 16,
    letterSpacing: 0.5
  },
  titleStyle: {
    textAlign: 'center',
    fontWeight: '100'
  },
  subTitleTextStyle: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    color: 'grey'
  },
  informBtnStyle: {
    backgroundColor: '#9b59b6',
    marginTop: 10,
    marginBottom: 10
  },
  isInformBtnStyle: {
    backgroundColor: '#2ecc71',
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5
  }
};
