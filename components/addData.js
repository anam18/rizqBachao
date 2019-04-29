import React, { Component } from 'react';
import { Button, View, Text, Alert, StyleSheet,KeyboardAvoidingView } from 'react-native';
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

  submitWaste= (email) => {
    const {name, quantity, type, status} = this.state
    var time = String(new Date().getDate())+'/'+String(new Date().getMonth())+'/'+String(new Date().getFullYear());

    this.ref.add({
      Email: email,
      // Name: rName,
      // Address: Addr,
      
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
        {text: 'OK', onPress: () => {
          this.setState({
            name: '',
            quantity: '',
            type: '',  
          })
          this.props.navigation.navigate('BoardDetails', {email: email})
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
    // const rName = navigation.getParam('rName', '');
    // const Addr = navigation.getParam('address', '');
    return (
      <KeyboardAvoidingView style={{flex:1}}behavior="padding" enabled>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <TextInput
          style= {styles.text}
          value= {this.state.name}
          onChangeText={(name)=> this.setState({name})}
        />
        <TextInput
          style= {styles.text}
          value= {this.state.quantity}
          onChangeText={(quantity)=> {
            // const chk = parseInt(quantity)
            if(isNaN(quantity)){
              Alert.alert(
                'Error',
                'Please enter a number for quantity',
                [
                  {text: 'OK',onPress:()=>{
                    quantity=''      
                    this.setState({quantity})}},
                ],
                {cancelable: false},
              );     
              // styles.text.   
            }else{
              this.setState({quantity})
            }
          }}
        />
        <TextInput
          style= {styles.text}
          value= {this.state.type}
          onChangeText={(type)=> this.setState({type})}
        />
        <Button
          title="Submit"
          disabled={!this.state.name.length || !this.state.quantity.length || !this.state.type.length}
          onPress={() => this.submitWaste(email)}
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
      </KeyboardAvoidingView>
    );
  }
}

export default AddScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { flex:1, flexDirection:'row', margin: 6, },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});