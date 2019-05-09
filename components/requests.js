import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { YellowBox } from 'react-native';
//import { getMaxListeners } from 'cluster';

let comp=(new Date().getDate()) + '/' + (new Date().getMonth()+1) +'/' + new Date().getFullYear()
//let a='rubabahmed46@gmail.com'

YellowBox.ignoreWarnings(['Setting a timer']);
export default class SignupDonor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      message:'',
      email:'',
      todos:[],
    //   comp: (new Date().getDate()) + '/' + (new Date().getMonth()+1) +'/' + new Date().getFullYear()


    };
    this.ref=firebase.firestore().collection('DonationReqs');//.where("Date", "==" ,comp);
    this.ref2=firebase.firestore().collection('Notifications_Donor');
    this.unsubscribe=null;

  }
  renderItem = ({item}) => {
      if (this.state.todos.length==0)
      {
        return (
          <View> No new requests </View>
        )
      }
      else{
        return (
          <View style={styles.view2}>
              <Text style={styles.fortext}>Address: {item.Address}</Text>
              <Text style={styles.fortext}>Donor: {item.Donor}</Text>
              <Text style={styles.fortext}>Items: {item.Item}</Text>
              <Text style={styles.fortext}>Quantity: {item.Quantity}</Text>
              <View style={styles.container}>
              <TouchableOpacity style={styles.button} 
              onPress={()=> this.props.navigation.navigate('workk',{
                donEmail: item.D_Email,
                donName: item.Donor,
                donItem: item.Item,
                donQuantity: item.Quantity
             })}
              >
              <Text>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2}
              onPress={()=>{
                this.state.message='request rejected'
                this.state.email=item.D_Email
                this.ref2.add({
                  
                  Key: item.D_Email,
                  Message: this.state.message
                }).then(()=>{
                  Alert.alert('Request Rejected');
                  
                }, (err)=>{
                  Alert.alert(error.message)
                })
                this.props.navigation.navigate('requests')
              }}
              >
              <Text style={styles.btext}>Reject</Text>
              </TouchableOpacity>
              </View>
            <View
                style={{
                    marginTop: 10,
                    borderBottomColor: '#59cbbd',
                    borderBottomWidth: 1,
                }}
            />
              
          </View>
           
        
    )

      }
      

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
      const { Address, D_Email, Date, Donor, Item, Quantity, Status } = doc.data();
      
      todos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        Address,
        D_Email,
        Date,
        Donor,
        Item,
        Quantity,
        Status,
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
    padding: 20,
    backgroundColor: '#59cbbd',
    width: '40%',
    height: 10,
    marginTop: 10,
    justifyContent: 'center'
  
  },
  button2: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F08080',
    width: '40%',
    height: 20,
    marginTop: 10,
    justifyContent: 'center'
  
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  
  },
  btext: {
    textAlign: 'center', 
  
  },
  });