import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Screen from './components/screen';
import DetailScreen from './components/screenDetail';
import AddScreen from './components/addData';
// import EditScreen from './components/editData';
import LogIn from './components/LoginScreen';
import SignupCenter from './components/SignupCenter';
import SignupDonor from './components/SignupDonor'
import SignupTransporter from './components/SignupTransporter';
import Rizq from './components/Rizq';
import stats from './components/stats';
import status from './components/status';
import value from './components/value';
import firebase from './firebase';
import Home from './components/HomePage'
import donNot from './components/DonorNotifications'
import requests from './components/requests'
const RootStack = createStackNavigator(
  {
    Log: LogIn,
    SignCenter: SignupCenter,
    SignDonor: SignupDonor,
    signTrans: SignupTransporter,
    rizqCent: Rizq,
    Board: Screen,
    BoardDetails: DetailScreen,
    AddBoard: AddScreen,
    HomePg: Home,
    donorNot: donNot, 
    status: status,
    value: value,
    stats: stats,
    requests: requests,
  },
  {
    initialRouteName: 'HomePg',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'powderblue',
      },
      headerTintColor: 'skyblue',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppContainer= createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});