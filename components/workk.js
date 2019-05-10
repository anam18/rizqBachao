import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Setting a timer']);
export default class workk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      todos:[],
      email: this.props.navigation.state.params.donEmail,
      name: this.props.navigation.state.params.donName,
      item: this.props.navigation.state.params.donItem,
      Quantity: this.props.navigation.state.params.donQuantity,
      message: '',
      rider: '',
      status:'',
      val:'',
      date: this.props.navigation.state.params.donDate,
      comp: (new Date().getDate()) + '/' + (new Date().getMonth()+1) +'/' + new Date().getFullYear()


    };
    this.ref=firebase.firestore().collection('Transporters');
    this.ref2=firebase.firestore().collection('Notifications_Donor');
    this.ref3=firebase.firestore().collection('DonationLogs');
    this.unsubscribe=null;

  }
  renderItem = ({item}) => {
      return (
            <View style={styles.view2}>
                <Text style={styles.fortext}>{item.ContactNo}</Text>
                <Text style={styles.fortext}>{item.Key}</Text>
                <Text style={styles.fortext}>{item.Name}</Text>
                <TouchableOpacity 
                style={styles.button} 
                 onPress={()=> {
                    //  Alert.alert(this.state.email)
                     this.state.rider=item.Name
                     this.state.message='Request Accepted. Rider ' + item.Name + ' has been assigned to pick your donation.'
                     this.ref2.add({
                       date: this.state.date,
                        Key: this.state.email,
                        Message: this.state.message
                      }).then(()=>{
                        
                        this.ref3.add({
                          donor: this.state.name,
                          Quantity: this.state.Quantity,
                          item: this.state.item,
                          email: this.state.email,
                          status: this.state.status,
                          value: this.state.val,
                          date: this.state.date
                           

                        })

                        Alert.alert("Transporter Assigned");

                        
                      })
                     
                     this.props.navigation.navigate('requests')}}

                 >
                <Text style={styles.btntext}>Choose</Text>
            
                 </TouchableOpacity>
                
                 </View>
             
          
      )

  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  onCollectionUpdate = (querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((doc) => {
      const { ContactNo, Email, Name} = doc.data();
      
      todos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        ContactNo,
        Email,
        Name,
      });
    });
  
    this.setState({ 
      todos,
      loading: false,
   });
  }
  render() {
    return (
        <View style={styles.view2}> 
        <FlatList
          data={this.state.todos}
          renderItem={this.renderItem}
        />
        {/* {
            // this.state.todos.map((y) => {
            //     return (<Text style={styles.input}>{y.Address}</Text>);
            // })
        } */}
        {/* <Text>{this.state.comp}</Text> */}
        </View>
    );
  }
}


const styles = StyleSheet.create({
  view1: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 3,
  
  },
  view2: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 45,
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 20
  },
  fortext:{
      fontSize: 16,
      alignSelf: 'stretch',
      height: 30,
      justifyContent: 'center',
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding:20,
    backgroundColor: '#59cbbd',
    marginTop:10,
    

  },

  });