import React, { Component } from 'react';
import { FlatList, AsyncStorage, ActivityIndicator, View } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import axios from 'react-native-axios';
import { withNamespaces } from 'react-i18next';
import { ListItem } from './common';

class PartnersScreen extends Component {
  state = {
    partners: null,
    snackBarVisible: false,
    snackBarMsg: null
  };

  //Use this method to get partners from database
  fetchPartners() {
    AsyncStorage.multiGet(['token', 'userId'], (errors, result) => {
      if (result) {
        this.axiosConfig = {
          headers: {
            'X-Auth-Token': result[0][1],
            'X-User-Id': result[1][1]
          }
        };
        axios
          .get(`${api}/partners`, this.axiosConfig)
          .then((res) => {
            this.setState({ partners: res.data.reverse() });
          })
          .catch((err) => {
            console.log(err);
          });
      } else console.log(errors);
    });
  }
  //React methods
  componentWillMount() {
    this.fetchPartners();
  }
  componentDidUpdate() {
    if (this.props.navigation.getParam('load', false)) {
      this.fetchPartners();
      this.props.navigation.state.params.load = false;
      this.setState({ snackBarMsg: 'validation.succesfully added' });
      this.setState({ snackBarVisible: true });
    } else if (this.props.navigation.getParam('delete', false)) {
      this.fetchPartners();
      this.props.navigation.state.params.delete = false;
      this.setState({ snackBarMsg: 'validation.succesfully deleted' });
      this.setState({ snackBarVisible: true });
    } else if (this.props.navigation.getParam('sent', false)) {
      this.props.navigation.state.params.sent = false;
      this.setState({ snackBarMsg: 'Email sent' });
      this.setState({ snackBarVisible: true });
    }
  }

  render() {
    const { t } = this.props;

    if (this.state.partners === null) {
      return (
        <View style={styles.centerContentStyle}>
          <ActivityIndicator size={50} color='#333' />
        </View>
      );
    }

    return (
      <View style={styles.containerStyle}>
        <FlatList
          data={this.state.partners}
          keyExtractor={(item, index) => item._id}
          renderItem={({ item }) => <ListItem item={item} />}
          ListFooterComponent={
            <Button
              icon='add'
              mode='contained'
              color='#333'
              style={styles.addPartnerBtnStyle}
              onPress={() => this.props.navigation.navigate('AddPartner')}
            >
              {t('common.labels.add partner')}
            </Button>
          }
        />
        <Snackbar
          visible={this.state.snackBarVisible}
          onDismiss={() => this.setState({ snackBarVisible: false })}
          action={{
            label: 'Undo',
            onPress: () => {
              this.setState({ snackBarVisible: false });
            }
          }}
        >
          {t(this.state.snackBarMsg)}
        </Snackbar>
      </View>
    );
  }
}

const styles = {
  centerContentStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addPartnerBtnStyle: {
    padding: 5,
    alignSelf: 'center',
    marginTop: 15
  },
  containerStyle: {
    paddingBottom: 10,
    flex: 1,
    backgroundColor: '#fff'
  }
};

export default withNamespaces()(PartnersScreen);
