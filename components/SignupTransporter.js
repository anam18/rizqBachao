import React, {Component} from 'react';
import { StyleSheet, Text, Image, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Picker, Keyboard } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Setting a timer']);
export default class SignupTransporter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password:"",
      vehicle: "",
      contactno: "",
      name: "",
      err: "",

    };
    this.ref=firebase.firestore().collection('Transporters');

  }
  onPress = () => {
    this.setState({err:''})
    if (this.state.vehicle == "")
    {
      this.setState({err:'Please select a vehicle from the drop down menu'})
    }
    else if (this.state.contactno.length != 11)
    {
      this.setState({err:'Please enter your contact number in the format xxxxxxxxxxx'})
    }
    else if (this.state.name == "")
    {
      this.setState({err:'Please enter your name'})
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
            Vehicle: this.state.vehicle,
            ContactNo: this.state.contactno,
            Name: this.state.name,
            Email: this.state.email,
          }).then(()=>{
            Alert.alert('Data added');
            this.props.navigation.navigate('Log' , {next : 'Transporter'})
          }

          );
            
        }, (error)=> {
          Alert.alert(error.message);
        });

    }
    Keyboard.dismiss()
    
  }

  onPressSignIn = () => {
    this.props.navigation.navigate('Log' , {next : 'Transporter'})
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style = {styles.container}>
            {/* <TextInput
            placeholder="Type of Vehicle"
            style={styles.input}
            value={this.state.vehicle}
            onChangeText={(text)=>{this.setState({vehicle:text})}}
            /> */}
            <Text style={styles.errtext}>{this.state.err}</Text>
            
            <View style={styles.logoContainer1}>
                <Image 
                style = {{height: 100, width: 100, justifyContent: 'center'}}
                source = {require('./../assets/rizq.png')} />
            </View>

            <View style={styles.container1}>
            <Picker
                selectedValue={this.state.vehicle}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({vehicle: itemValue})
                }>
                <Picker.Item label="" value="" />
                <Picker.Item label="Mini Van" value="Mini Van" />
                <Picker.Item label="Rickshaw" value="Rickshaw" />
                </Picker>
                <View
                style={{
                    marginBottom:20,
                    borderBottomColor: "goldenrod",
                    borderBottomWidth: 1,
                }}
                />
            <TextInput
            placeholder="Contact Number"
            style={styles.input}
            value={this.state.contactno}
            onChangeText={(text)=>{this.setState({contactno:text})}}
            />
            <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={this.state.name}
            onChangeText={(text)=>{this.setState({name:text})}}
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
    flex: 3.5,
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
pick: {
    width:'109%',
    // justifyContent: 'center',
    alignSelf: 'stretch',
},
underline: {
  textDecorationLine: 'underline'
},
errtext:{
  color: 'red'
}
});
