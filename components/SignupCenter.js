import React, {Component} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Setting a timer']);
export default class SignupDonor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password:"",
      address: "",
      err: "",

    };
    this.ref=firebase.firestore().collection('Center');

  }
  onPress = (nxt) => {
    if (this.state.address == "")
    {
      this.setState({err:'Please enter the address of your restuarant'})
    }
    else if (this.state.email == "")
    {
      this.setState({err:'Please enter your email address'})
    }
    else if (this.state.password.length < 6)
    {
      this.setState({err:'Please enter atleast 6 character long password'})
    } else {
      this.setState({err:''})
      firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(()=>{
          this.ref.add({
            Address: this.state.address,
            Email: this.state.email,
          }).then(()=>{
            Alert.alert('Data added');
            this.props.navigation.navigate('Log',nxt);
          }
          );
            
        }, (error)=> {
          Alert.alert(error.message);
        });
    }
    Keyboard.dismiss()
  }
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('next', 'Board');
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View>
          <Text style={styles.errtext}>{this.state.err}</Text>
            <TextInput
            placeholder="Address"
            style={styles.input}
            value={this.state.address}
            onChangeText={(text)=>{this.setState({address:text})}}
            />
            <TextInput
            placeholder="Email"
            style={styles.input}
            value={this.state.email}
            onChangeText={(text)=>{this.setState({email:text})}}
            />
            <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(text)=>{this.setState({password:text})}}
            />
            <TouchableOpacity style={styles.button}
            onPress={()=>{this.onPress(itemId)}}>
            <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button2}
            onPress={()=>{
              this.props.navigation.navigate('Log', {next: itemId})
            }}>
                <Text style={styles.underline}>Already have an account? Sign In here.</Text>
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 45,
    paddingRight: 45,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  input: {
    alignSelf: 'stretch',
    height: 30,
    marginBottom:20,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
},
button: {
  alignSelf: 'stretch',
  alignItems: 'center',
  padding: 20,
  backgroundColor: '#59cbbd',
  marginTop: 30,

},
button2: {
  alignSelf: 'stretch',
  alignItems: 'center',
  padding: 20,

},
underline: {
  textDecorationLine: 'underline'
},
errtext:{
  color: 'red'
}
});
