import React, { Component } from 'react';
import { Colors, IconButton, Text } from 'react-native-paper';
import { withNavigationFocus } from 'react-navigation';
import { SwipeRow, View, Icon, Button } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { Alert, AsyncStorage } from 'react-native';
import axios from 'react-native-axios';

class ListItem extends Component {
  deletePartner(id) {
    AsyncStorage.multiGet(['token', 'userId'], (errors, result) => {
      if (result) {
        this.axiosConfig = {
          headers: {
            'X-Auth-Token': result[0][1],
            'X-User-Id': result[1][1]
          }
        };
        axios
          .delete(`${api}/partners/${id}`, this.axiosConfig)
          .then((res) => {
            this.props.navigation.navigate('Partner', {
              delete: true
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else console.log(errors);
    });
  }
  deleteAlert(id) {
    Alert.alert(
      this.props.t('common.reusable.you sure'),
      this.props.t('common.reusable.deleteMsg'),

      [
        {
          text: this.props.t('common.reusable.yes'),
          onPress: () => this.deletePartner(id),
          style: ''
        },
        {
          text: this.props.t('common.reusable.no'),
          onPress: () => console.log('NO Pressed'),
          style: 'cancel'
        }
      ]
    );
  }

  render() {
    const { item } = this.props;
    return (
      <SwipeRow
        leftOpenValue={75}
        rightOpenValue={-75}
        left={
          <Button success onPress={() => this.props.navigation.navigate('AddDisease')}>
            <Icon active name='add' />
          </Button>
        }
        body={
          <View style={bodyStyle}>
            <View>
              <Text style={{ color: 'grey' }}>{item.date}</Text>
              <Text>{`${item.name} (${item.city},  ${item.ageFrom} - ${item.ageTo} )`}</Text>
            </View>
            <IconButton
              icon='chat'
              color={Colors.red500}
              size={30}
              onPress={() =>
                this.props.navigation.navigate('Notify', {
                  partner: item
                })
              }
            />
          </View>
        }
        right={
          <Button danger onPress={() => this.deleteAlert(item._id)}>
            <Icon active name='trash' />
          </Button>
        }
      />
    );
  }
}

const bodyStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100%',
  paddingLeft: 10
};

export default withNavigationFocus(withNamespaces()(ListItem));
