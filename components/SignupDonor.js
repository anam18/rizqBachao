import React, {Component} from 'react';
import { StyleSheet, Text, Image, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
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
      restaurant: "",
      address: "",
      contactno: "",
      err: "",

    };
    this.ref=firebase.firestore().collection('Donors');

  }
  onPress = () => {
    this.setState({err:''})
    if (this.state.restaurant == "")
    {
      this.setState({err:'Please enter the name of your restaurant'})
    }
    else if (this.state.address == "")
    {
      this.setState({err:'Please enter the address of your restuarant'})
    }
    else if (this.state.contactno.length != 11)
    {
      this.setState({err:'Please enter your contact number in the format xxxxxxxx'})
    }
    else if (this.state.email == "")
    {
      this.setState({err:'Please enter your email address'})
    }
    else if (this.state.password.length < 6)
    {
      this.setState({err:'Please enter atleast 6 character long password'})
    } else{
      this.setState({err:''})
      firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(()=>{
          this.ref.add({
            RestaurantName: this.state.restaurant,
            Address: this.state.address,
            ContactNo: this.state.contactno,
            Email: this.state.email,
          }).then(()=>{
              Alert.alert('Data added');
              this.props.navigation.navigate('Log' , {next:'Donor'})    
          });            
        }, (error)=> {
          Alert.alert(error.message);
        });
    }
    Keyboard.dismiss()
  }
  onPressSignIn = () => {
    this.props.navigation.navigate('Log' , {next : 'Donor'})
  }

  render() {
     return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style = {styles.container}>

            <Text style={styles.errtext}>{this.state.err}</Text>

            <View style={styles.logoContainer1}>
                <Image 
                style = {{height: 100, width: 100, justifyContent: 'center'}}
                source = {require('./../assets/rizq.png')} />
            </View>

            <View style={styles.container1}>
            <TextInput
            placeholder="Restaurant Name"
            style={styles.input}
            value={this.state.restaurant}
            onChangeText={(text)=>{this.setState({restaurant:text})}}
            />
            <TextInput
            placeholder="Address"
            style={styles.input}
            value={this.state.address}
            onChangeText={(text)=>{this.setState({address:text})}}
            />
            <TextInput
            placeholder="Contact Number"
            style={styles.input}
            value={this.state.contactno}
            onChangeText={(text)=>{this.setState({contactno:text})}}
            />
            <TextInput
            placeholder="Email"
            style={styles.input}
            value={this.state.email}
            onChangeText={(text)=>{this.setState({email:text})}}
            />
            <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
            value={this.state.password}
            onChangeText={(text)=>{this.setState({password:text})}}
            />
            <TouchableOpacity style={styles.button}
            onPress={this.onPress}>
            <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress = {this.onPressSignIn}>
                <Text style={styles.underline}>Already have an account? Sign In here.</Text>
            </TouchableOpacity>
            </View>
          </View>
      </KeyboardAvoidingView>
    );
  }
}

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
    height: 30,
    marginBottom:20,
    borderBottomColor: "goldenrod",
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "goldenrod",
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
