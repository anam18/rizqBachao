import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
// import { List, ListItem  } from 'react-native-elements';
// import { } from 'react-navigation';



export default class App extends React.Component {

    constructor(props){
      super(props);
      
      this.state={
        data: []
        
    
      }
    }
    render() {
      return (
      
        <View style={styles.container}>
         <Text>No statistics to show</Text>
         
        </View> 
    
        
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
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
      backgroundColor: "goldenrod",
      marginTop:10,
      

    },


    input: {
        height: 30,
        backgroundColor: 'rgba(255,255,255,0.6)'
    }
  });
  