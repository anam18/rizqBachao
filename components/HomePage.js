import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

export default class App extends React.Component {
    render() {
      return (
        
            <View style={styles.container}>
              <ImageBackground source = {require('./../assets/rizqbachao_button.png')} style={{width: '100%', height: '100%'}}>

                    <View style={styles.logoContainer}>
                      <Text style = {styles.headertext1}>Welcome to RIZQ</Text>
                      <Text style = {styles.headertext2}>What are you?</Text>                      
                    </View>

                    <View style={styles.formContainer}>
                        <TouchableOpacity 
                         style={styles.button} 
                         onPress={()=> this.props.navigation.navigate('Log', {next: 'Donor'})}>

                          <Text style={styles.btntext}>Donor</Text>
                          
                        </TouchableOpacity>
            
                        <TouchableOpacity style={styles.button}
                        onPress={()=> this.props.navigation.navigate('Log', {next: 'Center'})}>
                            <Text style={styles.btntext}>Rizq Center</Text>
                        </TouchableOpacity>
            
                        <TouchableOpacity style={styles.button}
                        onPress={()=> this.props.navigation.navigate('Log',{next: 'Transporter'})} >
                            <Text style={styles.btntext}>Rider</Text>
                        </TouchableOpacity>   

                    </View>

              </ImageBackground>
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
      marginTop: 70,      
    },
    headertext1:{
      color: '#ffffff',
      fontWeight : 'bold',
      fontSize: 24,
      fontFamily: 'monospace'
    },
    headertext2:{
      color: '#ffffff',
      fontWeight : 'bold',
      fontSize: 20,
      fontFamily: 'Roboto',
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
  