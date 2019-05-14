import React, { Component } from 'react';
import { Button, View, Text, Image, Alert, TouchableOpacity, StyleSheet,KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'firebase'
class AddScreen extends Component {
  constructor(){
    super();
    this.ref = firebase.firestore().collection('Wastelog')
    this.state = {
      name: '',
      quantity: '',
      type: '',
      status: 'undonated',
    };
  }
  submitWaste= (email , restaurantName , restaurantAddress) => {
    const {name, quantity, type, status} = this.state
    var time = String(new Date().getDate())+'/'+String(new Date().getMonth())+'/'+String(new Date().getFullYear());
    this.ref.add({
      D_Email: email,      
      Item: name,
      Quantity: quantity,
      Type : type,
      Status : status,
      Date: time,
      Address: restaurantAddress,
      Donor: restaurantName,
    });
    Alert.alert(
      'Waste Log',
      'Record Added Successfully',
      [
        {text: 'OK', onPress: () => {
          this.setState({
            name: '',
            quantity: '',
            type: '',  
          })
          this.props.navigation.navigate('BoardDetails', {email: email , name: restaurantName , address: restaurantAddress })
        }},
      ],
      {cancelable: false},
    );
  }

  static navigationOptions = {
    title: 'Add Waste',
  };
  render() {
    const { navigation } = this.props;
    const email = navigation.getParam('email', '');
    const name = navigation.getParam('name', '');
    const address = navigation.getParam('address', '');
    return (
      <KeyboardAvoidingView style = {styles.container} behavior = "padding" >
          <View style = {styles.container}>
            <View style={styles.logoContainer1}>
              <Image 
              style = {{height: 80, width: 80, justifyContent: 'center'}}
              source = {require('./../assets/rizq.png')} />
            </View>

            <View style={styles.container1}>
              <TextInput
                    placeholder = "Item Name"
                    style = {styles.input}
                    value = {this.state.name}
                    onChangeText = {(name)=> this.setState({name})}
              />

              <TextInput
                    placeholder = "Quantity"
                    style = {styles.input}
                    value = {this.state.quantity}
                    onChangeText = {(quantity)=> {
                      if(isNaN(quantity))
                      {
                        Alert.alert(
                          'Error',
                          'Please enter a number for quantity',
                          [
                            {text: 'OK',onPress:() => {
                              quantity = ''      
                              this.setState({quantity})}},
                          ],
                          {cancelable: false},
                        );       
                      }
                      else
                      {
                        this.setState({quantity})
                      }
                    }}
              />

              <TextInput
                    placeholder = "Category"
                    style = {styles.input}
                    value = {this.state.type}
                    onChangeText ={(type)=> this.setState({type})}
              />

              <TouchableOpacity style={styles.button} disabled={!this.state.name.length || !this.state.quantity.length || !this.state.type.length} onPress={() => this.submitWaste(email , name , address)}>
                          <Text>Submit</Text>
              </TouchableOpacity>
              {/* <Button
                style = {styles.button}
                title="Submit"
                disabled = {!this.state.name.length || !this.state.quantity.length || !this.state.type.length}
                onPress = {() => this.submitWaste(email , name , address)}
              /> */}
             </View>

          </View>
      </KeyboardAvoidingView>
    );
  }
}

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  logoContainer1: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    flex: 3,
    padding: 10
  },
  input: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom:30,
    borderBottomColor: "goldenrod",
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "goldenrod",
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,

  },
  button2: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,

  },
});