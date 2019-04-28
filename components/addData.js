import React, { Component } from 'react';
import { Button, View, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'firebase'
class AddScreen extends Component {
  constructor(){
    super();
    this.ref = firebase.firestore().collection('Wastelog')
    this.state = {
      name: 'init',
      quantity: '0',
      type: 'veg',
      status: 'undonated',
    };
  }
  // Alert.alert(
  //   'Alert Title',
  //   'My Alert Msg',
  //   [
  //     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //     {text: 'OK', onPress: () => console.log('OK Pressed')},
  //   ],
  //   {cancelable: false},
  // );

  submitWaste= () => {
    const {name, quantity, type, status} = this.state
    var time = String(new Date().getDate())+'/'+String(new Date().getMonth())+'/'+String(new Date().getFullYear());

    this.ref.add({
      itemName: name,
      quantity: parseInt(quantity),
      type,
      status,
      dateAdded: time,
    });
    Alert.alert(
      'Waste Log',
      'Record Added Successfully',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        {text: 'OK', onPress: () => this.props.navigation.navigate('BoardDetails')},
      ],
      {cancelable: false},
    );
  }

  static navigationOptions = {
    title: 'Add Waste',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style= {{bordercolor: 'black', borderWidth: 1}}
          // value= {this.state.name}
          onChangeText={(name)=> this.setState({name})}
        />
        <TextInput
          style= {{bordercolor: 'black', borderWidth: 1}}
          // value= {this.state.quantity}
          onChangeText={(quantity)=> this.setState({quantity})}
        />
        <TextInput
          style= {{bordercolor: 'black', borderWidth: 1}}
          // value= {this.state.type}
          onChangeText={(type)=> this.setState({type})}
        />
        <Button
          title="Submit"
          onPress={() => this.submitWaste()}
        />
        {/* <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Board')}
        /> */}
        {/* <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        /> */}
      </View>
    );
  }
}

export default AddScreen;