import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Screen from './components/screen';
import DetailScreen from './components/screenDetail';
import AddScreen from './components/addData';
import EditScreen from './components/editData';
import firebase from './firebase';
const RootStack = createStackNavigator(
  {
    Board: Screen,
    BoardDetails: DetailScreen,
    AddBoard: AddScreen,
    EditBoard: EditScreen,
  },
  {
    initialRouteName: 'Board',
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

// export default class App extends React.Component {
//   render() {
//     return <RootStack />;
//   }
// }

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