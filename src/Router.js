import React from 'react';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from 'i18next';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Menu, AboutScreen, EncyclopediaScreen, FeedbackScreen } from './components/common/menu';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';
import {
  LoginScreen,
  RegistrationScreen,
  PartnersScreen,
  ChatScreen,
  HistoryScreen,
  AddPartnerScreen,
  NotificationScreen,
  AddDiseaseScreen
} from './components';

/*##################
PARTNERS STACK NAVIGATION
####################*/

const PartnerStack = createStackNavigator(
  {
    Partner: {
      screen: PartnersScreen
    },
    AddPartner: {
      screen: AddPartnerScreen
    },
    Notify: {
      screen: NotificationScreen
    },
    AddDisease: { screen: AddDiseaseScreen }
  },
  {
    navigationOptions: ({ navigation }) => {
      return {
        title: i18n.t('common.labels.partners'),
        tabBarColor: '#034F84',
        tabBarIcon: ({ tintColor }) => <Icon name='users' size={22} color={tintColor} />
      };
    },
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerTitle: i18n.t('common.labels.partners'),
        headerRight: (
          <Appbar.Action
            color='#fff'
            size={30}
            icon='menu'
            onPress={() => navigation.openDrawer()}
          />
        ),
        initialRouteName: 'Partner',
        headerStyle: {
          backgroundColor: '#034F84'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '100',
          color: '#fff',
          textShadowColor: 'rgba(0, 0, 0, 0.75)',
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 10
        }
      };
    },
    headerLayoutPreset: 'center'
  }
);

/*##################
HISTORY STACK NAVIGATION
####################*/

const HistoryStack = createStackNavigator(
  {
    History: { screen: HistoryScreen }
  },
  {
    navigationOptions: ({ navigation }) => {
      return {
        title: i18n.t('common.labels.medical history'),
        tabBarColor: '#9B2335',
        tabBarIcon: ({ tintColor }) => <Icon name='medkit' size={22} color={tintColor} />
      };
    },
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerTitle: i18n.t('common.labels.medical history'),
        headerRight: (
          <Appbar.Action
            color='#fff'
            size={30}
            icon='menu'
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerStyle: {
          backgroundColor: '#9B2335'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '100',
          color: '#fff',
          textShadowColor: 'rgba(0, 0, 0, 0.75)',
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 10
        }
      };
    },
    headerLayoutPreset: 'center'
  }
);

/*##################
CHAT STACK NAVIGATION
####################*/

const ChatStack = createStackNavigator(
  {
    Chat: { screen: ChatScreen }
  },
  {
    navigationOptions: ({ navigation }) => {
      return {
        title: i18n.t('common.labels.chat'),
        tabBarColor: '#333',
        tabBarIcon: ({ tintColor }) => <Icon name='comments' size={22} color={tintColor} />
      };
    },

    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerTitle: i18n.t('common.labels.chat'),
        headerRight: (
          <Appbar.Action
            color='#fff'
            size={30}
            icon='menu'
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#333'
        },
        headerTitleStyle: {
          fontWeight: '100',
          color: '#fff',
          textShadowColor: 'rgba(0, 0, 0, 0.75)',
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 10
        }
      };
    },
    headerLayoutPreset: 'center'
  }
);

/*##################
BOTTOM TAB NAVIGATION
####################*/

const MaterialBottomTabs = createMaterialBottomTabNavigator(
  {
    Partners: { screen: PartnerStack },
    History: { screen: HistoryStack },
    Chat: { screen: ChatStack }
  },
  {
    shifting: true,
    activeColor: '#fff',
    inactiveColor: '#ddd',
    initialRouteName: 'Partners',
    showIcon: true
  }
);

/*##################
DRAWER NAVIGATION
####################*/

const AppDrawerNavigation = createDrawerNavigator(
  {
    Dashboard: MaterialBottomTabs,
    Feedback: { screen: FeedbackScreen },
    Encyclopedia: { screen: EncyclopediaScreen },
    About: { screen: AboutScreen },
    Logout: { screen: LoginScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        drawerLabel: i18n.t('common.labels.dashboard'),
        drawerIcon: ({ tintColor }) => <Icon name='columns' size={22} backgroundColor='#3b5998' />
      };
    },
    contentComponent: Menu,
    drawerWidth: 250,
    drawerPosition: 'right',
    initialRouteName: 'Dashboard'
  }
);

/*##################
SWITCH NAVIGATION
####################*/

const AppSwitchNavigation = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: AppDrawerNavigation },
  Registration: { screen: RegistrationScreen },
  Partner: { screen: PartnersScreen }
});

const AppContainer = createAppContainer(AppSwitchNavigation);

export default AppContainer;
