import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import { Button } from 'react-native-elements';
// import { createStackNavigator } from 'react-navigation';
// import requests from './requests';


export default class App extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          

        <View style={styles.logoContainer}>
          <Text>Welcome to RIZQ</Text>
          
        </View>
        <View style={styles.formContainer}>
          <TouchableOpacity 
          style={styles.button} 
          onPress={()=> this.props.navigation.navigate('requests')}
          >
            <Text style={styles.btntext}>View donation requests</Text>
            
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}
          onPress={()=> this.props.navigation.navigate('status')}
          >
            <Text style={styles.btntext}>Update Status of food</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}
          onPress={()=> this.props.navigation.navigate('value')}
          >
            <Text style={styles.btntext}>Assign value to food</Text>
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
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',

    },


    input: {
        height: 30,
        backgroundColor: 'rgba(255,255,255,0.6)'
    }
  });
  