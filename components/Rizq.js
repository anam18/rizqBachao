import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
// import { Button } from 'react-native-elements';
// import { createStackNavigator } from 'react-navigation';
// import requests from './requests';


export default class App extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          
          <View style={styles.logoContainer1}>
              <Image 
              style = {{height: 80, width: 80, justifyContent: 'center'}}
              source = {require('./../assets/rizq.png')} />
            </View>

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
      paddingLeft: 15,
      paddingRight: 15,
      justifyContent: 'center',
      alignSelf: 'stretch',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      color: "black",
      fontWeight : 'bold',
      fontSize: 24,
      fontFamily: 'monospace'

    },
    logoContainer1: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      flex: 3,
      padding: 10
      },

    btntext: {
      color: "black",
      fontWeight: 'bold',
    },

    button: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding:20,
      backgroundColor: "goldenrod",
      marginTop:20,
      marginLeft: 20,
      marginRight: 20,
      fontSize: 17,
    },


    input: {
        height: 30,
        backgroundColor: 'rgba(255,255,255,0.6)'
    }
  });
  