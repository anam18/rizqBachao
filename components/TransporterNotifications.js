import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { YellowBox } from 'react-native';

let email = '20100018@lums.edu.pk'
YellowBox.ignoreWarnings(['Setting a timer']);
export default class TransporterNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      notification:[],


    };
    this.ref=firebase.firestore().collection('Notifications_Transporter').where("Key", "==" ,email);;
    this.unsubscribe=null;

  }
  renderItem = ({item}) => {
      return (
            
            <View style={styles.view2}>
            <Text style={styles.fortext}>-> {item.date}</Text>
            <Text style={styles.fortext}>{item.Message}</Text>
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
    const notification = [];
    querySnapshot.forEach((doc) => {
      const {Key,Message,date} = doc.data();
      
      notification.push({
        key: doc.id,
        doc, // DocumentSnapshot
        Key,
        Message,
        date,
      });
    });
  
    this.setState({ 
      notification,
      loading: false,
   });
  }
  render() {
    return (
        <View style={styles.view1}> 
        <FlatList
          data={this.state.notification}
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
    marginTop: 30,
  
  },
  view2: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 45,
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 20,
  },
  fortext:{
      fontSize: 16,
      alignSelf: 'stretch',
      height: 30,
      justifyContent: 'center',
  },
  bord:{
    flex: 1,
    backgroundColor: '#99ffcc',
    alignSelf: 'stretch',
    justifyContent: 'center',


},

  });