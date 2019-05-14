import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"

export default class App extends React.Component {
    render() {
      return (

        <View style={styles.container}>
                <View style={styles.logoContainer1}>
                  <Image 
                  style = {{height: 130, width: 130, justifyContent: 'center'}}
                  source = {require('./../assets/rizq.png')} />
                </View>

                <View style={styles.logoContainer}>
                  <Text style = {styles.headertext1}>Are you a?</Text>                      
                </View>

                <View style={styles.formContainer}>
                
                  <View>
                    <TouchableOpacity style={styles.button}
                      onPress={()=> this.props.navigation.navigate('Log', {next: 'Donor'})}>
                        <MaterialCommunityIcons name = "food" size={36} color = 'black' /> 
                        <Text style={styles.btntext}>Donor</Text>                         
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity style={styles.button}
                    onPress={()=> this.props.navigation.navigate('Log', {next: 'Center'})}>
                        <MaterialCommunityIcons name = "office-building" size={36} color = 'black' />
                        <Text style={styles.btntext}>Rizq Center</Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity  style={styles.button}
                    onPress={()=> this.props.navigation.navigate('Log',{next: 'Transporter'})} >
                        <Ionicons name = "md-car" size={36} color = 'black' />
                        <Text style={styles.btntext}>Rider</Text>
                    </TouchableOpacity>   
                  </View>
                </View>

        </View>
        
              
      );
    }
  }

  const styles = StyleSheet.create({
    logoContainer1: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,      
    },
    headertext1:{
      color: "black",
      fontWeight : 'bold',
      fontSize: 24,
      fontFamily: 'monospace'
    },
    headertext2:{
      color: '#ffffff',
      fontWeight : 'bold',
      fontSize: 20,
      fontFamily: 'monospace',
    },
    formContainer: {
      flex: 2, 
      padding: 20
      },

    btntext: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 17,
    },

    button: {
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
      padding:10,
      backgroundColor: "goldenrod",
      marginTop:10,
      marginLeft: 30,
      marginRight: 30,

    },


    input: {
        height: 30,
        backgroundColor: 'rgba(255,255,255,0.6)'
    }
  });
  
