import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { reateStackNavigator } from 'react-navigation';
import requests from './requests';
import SignupDonor from './SignupCenter';
import SignupCenter from './SignupCenter';
import SignupTransporter from './SignupTransporter';
import LoginScreen from './LoginScreen';


export default class App extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          

        <View style={styles.logoContainer}>
          <Text>Welcome to RIZQ</Text>
          <Text>What are you?</Text>
          
        </View>
        <View style={styles.formContainer}>
          <TouchableOpacity 
          style={styles.button} 
          onPress={()=> this.props.navigation.navigate('Log', {next: 'Donor'})}
          >
            <Text style={styles.btntext}>Donor</Text>
            
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}
          onPress={()=> this.props.navigation.navigate('Log', {next: 'Center'})}
          >
            <Text style={styles.btntext}>Rizq Center</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}
          onPress={()=> this.props.navigation.navigate('Log',{next: 'Transporter'})}
          >
            <Text style={styles.btntext}>Rider</Text>
          </TouchableOpacity>


          
          
        </View>
        </View>

    
        
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',

    },
    formContainer: {
       padding: 20
  
      },

    btntext: {
      color: '#fff',
      fontWeight: 'bold',
    },

    button: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding:20,
      backgroundColor: '#59cbbd',
      marginTop:10,
      

    },


    input: {
        height: 30,
        backgroundColor: 'rgba(255,255,255,0.6)'
    }
  });
  