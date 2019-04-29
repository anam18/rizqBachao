import React, {Component} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:'',
      id: '',
    };

  }
  onPress = (nxt) => {
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
      .then(()=>{
        Alert.alert('Login successful');
        this.props.navigation.navigate(nxt,{email: this.state.email});
      }, (error)=> {
        Alert.alert(error.message);
      });
  }
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('next', 'Board');
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View>
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
            onPress={()=>this.onPress(itemId,this.state.email,this.state.password)}>
                <Text>Sign In</Text>
            {/* Need to hyperlink this button to registration form */}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button2}
              onPress={()=>{
                if(itemId=='Board'){
                  this.props.navigation.navigate('SignDonor',{next: itemId})
                }else if(itemId=='rizqCent'){
                  this.props.navigation.navigate('SignCenter',{next: itemId})
                }                
              }}
              >
                <Text>Don't have an account? Sign Up here.</Text>
                
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
    height: 40,
    marginBottom:30,
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
});
