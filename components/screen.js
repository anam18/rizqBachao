import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList, View, Text, TextInput, Button } from 'react-native';
import {Permissions , Notifications }  from 'expo';
// import { List, ListItem, Button, Icon } from 'react-native-elements';

export default class Screen extends React.Component {
  static navigationOptions = {
    title: 'RizqBachao',
  };

  componentDidMount() {
    this.registerForPushNotifications();
  }

  registerForPushNotifications = async () => {
    // check for existing permissions
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let final_status = status;

    // if no existing permissions, ask for permissions

    if(status !== 'granted') {
      const {status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      final_status = status;
    }

    // if no permissions, exit the function

    if(final_status != 'granted') { return; }

    // get token for user device

    let token = await Notifications.getExpoPushTokenAsync();

    console.log("Token : " , token);


  }

  render() {
    
    return (
      <View style= {styles.container}>
        <Button 
          title="Wastelog"
          onPress={() => this.props.navigation.navigate('BoardDetails')}
        />
        <Button
          title="Add Waste"
          onPress={() => this.props.navigation.navigate('AddBoard')}
        />
        <Button
          title="Donate Waste"
          onPress={() => this.props.navigation.navigate('EditBoard')}
        />
      </View>
    );
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
