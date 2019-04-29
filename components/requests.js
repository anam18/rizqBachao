import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
// import { List, ListItem  } from 'react-native-elements';
// import { } from 'react-navigation';
import * as firebase from 'firebase';
import 'firebase/firestore';
//import { finished } from 'stream';



export default class App extends React.Component {

    constructor(props){
      super(props);
      
      this.state={
        data: [],
        name: ''
        
        
    
      }
      
    }

    componentWillMount(){
      // // firebaseApp.database().ref('/Center/' + Address).on('value', (snapshot) => {
      // //   const userObj = snapshot.val();
      // //   this.name = userObj.Address;

      // //   //this.avatar = userObj.avatar;
      // // });
      // var that=this
      // let q=firebase.database().ref('Center');
      
      
      
      // var finished=[];
      // console.log(finished)

      // q.once('value', snapshot=>{
       
      //   snapshot.forEach(function(data){
      //     Alert.alert("hello");
         
      //     let result=data.val();
          
      //     //result["key"]=data.key;
      //     finished.push(result);


      //   })
      // }).then(function(result){
        
      //   that.setState({
      //     data: finished
          
          
      //   })
        
      // },
      // function(reject){
      //   Alert.alert(reject.message);

      // }
      // )
      finished=[]
      const db = firebase.firestore();
     // db.settings({timestampsInSnapshots: true});
      db.collection('DonationReqs').get().then((snapshot)=>{
        snapshot.docs.forEach(doc=>{
        finished.push(doc.data().Address)
        Alert.alert(doc.data().Address)
        })
      }, (err)=> Alert.alert(err.message)
      )

      

      this.setState({
        data: finished
      })
    }

    renderElement(){
      if (this.state.data.length==0) {
        return <Text>No new requests</Text>
      }

      else{
        this.state.data.forEach(function(data){
          return <Text>{data}</Text>
        })
      }
   }

    render() {
      return (

        <View style={styles.container}>
          { this.renderElement() }
          {/* <Text>{this.state.name}</Text> */}
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
      color: '#000000',
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
  