import React, { Component } from 'react';
import { View, AsyncStorage, ScrollView } from 'react-native';
import axios from 'react-native-axios';
import { withNamespaces } from 'react-i18next';
import Moment from 'moment';
import api from '../api_config';
import DatePicker from 'react-native-datepicker';
import { HeaderLabel } from './common/reuseable';

import {
  TextInput,
  Divider,
  HelperText,
  Checkbox,
  Button,
  Text,
  IconButton,
  Colors,
  Subheading
} from 'react-native-paper';

//regular expressions
let alph = /^[a-zA-Z\s]*$/;
let numbs = /^[0-9]+$/;

class AddPartnerScreen extends Component {
  static navigationOptions = {
    headerTitle: <HeaderLabel text='common.labels.add partner' />
  };

  constructor(props) {
    super(props);

    let dayWrapper = Moment(new Date());
    let dayString = dayWrapper.format('DD.MM.YYYY');

    this.state = {
      userid: '',
      name: '',
      from: '',
      to: '',
      city: '',
      date: dayString,
      checked: false,

      errorName: false,
      errorAgeFrom: false,
      errorAgeTo: false,
      errorCity: false
    };
  }

  componentWillMount() {
    //Get user data from asynstorage
    AsyncStorage.multiGet(['token', 'userId'], (errors, result) => {
      if (result) {
        this.setState({ userid: result[1][1] });
        this.axiosConfig = {
          headers: {
            'X-Auth-Token': result[0][1],
            'X-User-Id': result[1][1]
          }
        };
      }
    });

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  //Input validation
  validationCity(city) {
    if (!alph.test(city)) {
      this.setState({
        errorCity: true
      });
      this.setState({ city: city });
    } else {
      this.setState({ errorCity: false });
      this.setState({ city: city });
    }
  }
  validationAgeTo(ageTo) {
    if (!numbs.test(ageTo) || (ageTo < 18 || ageTo > 69)) {
      this.setState({ errorAgeTo: true });
      this.setState({ to: ageTo });
    } else if (!numbs.test(ageTo) || ageTo < this.state.from) {
      this.setState({
        errorAgeTo: true
      });
      this.setState({ to: ageTo });
    } else {
      this.setState({ errorAgeTo: false });
      this.setState({ to: ageTo });
    }
  }
  validationAgeFrom(ageFrom) {
    if (!numbs.test(ageFrom) || (ageFrom < 18 || ageFrom > 69)) {
      this.setState({ errorAgeFrom: true });
      this.setState({ from: ageFrom });
    } else {
      this.setState({ errorAgeFrom: false });
      this.setState({ from: ageFrom });
    }
  }
  validationName(name) {
    if (!alph.test(name)) {
      this.setState({
        errorName: true
      });
      this.setState({ name: name });
    } else {
      this.setState({ errorName: false });
      this.setState({ name: name });
    }
  }

  //Click events
  onDeleteClick() {
    this.setState({ name: '' });
    this.setState({ from: '' });
    this.setState({ to: '' });
    this.setState({ city: '' });
    this.setState({ errorName: '' });
    this.setState({ errorAgeFrom: '' });
    this.setState({ errorAgeTo: '' });
    this.setState({ errorCity: '' });
  }
  onSaveClick() {
    if (
      this.state.name !== '' &&
      this.state.city !== '' &&
      this.state.from !== '' &&
      this.state.to !== ''
    ) {
      if (
        !(
          this.state.errorName &&
          this.state.errorAgeFrom &&
          this.state.errorCity &&
          this.state.errorAgeTo
        )
      ) {
        let signupData = {
          name: this.state.name.trim(),
          from: this.state.from,
          to: this.state.to,
          city: this.state.city.trim(),
          date: this.state.date,
          checked: this.state.checked,
          userid: this.state.userid
        };
        this.createPartner(signupData);
      }
    } else {
      this.setState({ errorName: this.state.name === '' ? true : this.state.errorName });
      this.setState({ errorCity: this.state.city === '' ? true : this.state.errorCity });
      this.setState({ errorAgeFrom: this.state.from === '' ? true : this.state.errorAgeFrom });
      this.setState({ errorAgeTo: this.state.to === '' ? true : this.state.errorAgeTo });
    }
  }

  //Send data to database
  createPartner(signupData) {
    const { name, from, to, city, date, checked, userid } = signupData;
    axios
      .post(
        `${api}/partners`,
        {
          name: name,
          userId: userid,
          ageFrom: from,
          ageTo: to,
          city: city,
          date: date,
          revealName: checked,
          std: null
        },
        this.axiosConfig
      )
      .then((response) => {
        this.props.navigation.navigate('Partner', {
          load: true
        });
      })
      .catch(function(error) {
        console.log(`${error}`);
      });
  }
  focusNextField(id) {
    this.inputs[id].focus();
  }

  render() {
    const { t } = this.props;
    const {
      formStyle,
      textInputStyle,
      rowStyle,
      minTextInputStyle,
      btnContainer,
      btnStyle,
      deviderStyle
    } = styles;

    return (
      <ScrollView>
        <View style={formStyle}>
          <TextInput
            maxLength={20}
            style={textInputStyle}
            mode='outlined'
            label={t('common.labels.name')}
            error={this.state.errorName}
            onChangeText={(name) => this.validationName(name)}
            value={this.state.name}
            returnKeyType={'next'}
            ref={(input) => {
              this.inputs['name'] = input;
            }}
            onSubmitEditing={() => {
              this.focusNextField('ageFrom');
            }}
          />
          <HelperText visible={true}>{t('addPartner.short nickname')}</HelperText>

          <Subheading>{t('addPartner.age of partner')}</Subheading>

          <View style={rowStyle}>
            <TextInput
              maxLength={2}
              style={minTextInputStyle}
              error={this.state.errorAgeFrom}
              mode='outlined'
              label={t('common.labels.from')}
              onChangeText={(from) => this.validationAgeFrom(from)}
              value={this.state.from}
              returnKeyType={'next'}
              ref={(input) => {
                this.inputs['ageFrom'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('ageTo');
              }}
              keyboardType='numeric'
            />

            <Text style={{ marginLeft: 10, marginRight: 10 }}>-</Text>

            <TextInput
              maxLength={2}
              style={minTextInputStyle}
              error={this.state.errorAgeTo}
              mode='outlined'
              label={t('common.labels.to')}
              onChangeText={(to) => this.validationAgeTo(to)}
              value={this.state.to}
              returnKeyType={'next'}
              ref={(input) => {
                this.inputs['ageTo'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('city');
              }}
              keyboardType='numeric'
            />
          </View>
          <HelperText visible={true}>{t('addPartner.estimate years')}</HelperText>

          <TextInput
            maxLength={20}
            style={textInputStyle}
            error={this.state.errorCity}
            mode='outlined'
            label={t('common.labels.city')}
            onChangeText={(city) => this.validationCity(city)}
            value={this.state.city}
            ref={(input) => {
              this.inputs['city'] = input;
            }}
          />

          <Subheading>{t('addPartner.interaction date')}</Subheading>

          <DatePicker
            date={this.state.date}
            onDateChange={(date) => {
              this.setState({ date: date });
            }}
            format='DD.MM.YYYY'
          />

          {/*<View style={rowStyle}>*/}
          {/*<Checkbox*/}
          {/*status={this.state.checked ? 'checked' : 'unchecked'}*/}
          {/*onPress={() => {*/}
          {/*this.setState({ checked: !this.state.checked });*/}
          {/*}}*/}
          {/*/>*/}
          {/*<Text>{t('addPartner.reveal name')}</Text>*/}
          {/*</View>*/}
          {/*<HelperText>{t('addPartner.unknow')}</HelperText>*/}

          <Divider style={deviderStyle} />

          <View style={btnContainer}>
            <Button
              style={btnStyle}
              color='#333'
              icon='save'
              mode='contained'
              onPress={this.onSaveClick.bind(this)}
            >
              {t('common.labels.save')}
            </Button>
            <IconButton
              style={{ width: 50 }}
              icon='delete'
              color={Colors.red500}
              size={40}
              onPress={this.onDeleteClick.bind(this)}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  formStyle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    overflow: 'hidden',
    justifyContent: 'center',
    padding: 15
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    width: '100%'
  },
  deviderStyle: {
    alignSelf: 'center',
    borderBottomColor: '#B8B8B8',
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 20,
    marginBottom: 10
  },
  textInputStyle: {
    width: '100%',
    backgroundColor: '#fff'
  },
  minTextInputStyle: { minWidth: 70, backgroundColor: '#fff' },
  btnStyle: { width: '40%', padding: 5 }
};

export default withNamespaces()(AddPartnerScreen);
