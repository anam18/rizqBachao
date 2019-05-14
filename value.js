import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Picker, TextInput } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { YellowBox } from 'react-native';

let comp=(new Date().getDate()) + '/' + (new Date().getMonth()+1) +'/' + new Date().getFullYear()
let cri='Fully Processed'

YellowBox.ignoreWarnings(['Setting a timer']);
export default class status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      todos:[],
      status:"",
      val:0,
      items:[],      // email: this.props.navigation.state.params.donEmail,
      // name: this.props.navigation.state.params.donName,
      // item: this.props.navigation.state.params.donItem,
      // Quantity: this.props.navigation.state.params.donQuantity,
      message: '',
      rider: '',
      comp: (new Date().getDate()) + '/' + (new Date().getMonth()+1) +'/' + new Date().getFullYear()


    };
    this.ref=firebase.firestore().collection('Transporters');
    this.ref2=firebase.firestore().collection('Notifications_Donor');
    this.ref3=firebase.firestore().collection('DonationLogs').where("date","==",comp).where("status", "==" ,cri);
    this.ref4=firebase.firestore().collection('DonationLogs')
    this.unsubscribe=null;

  }
  lapsList() {

    return this.state.items.map((data) => {
      return (
        <View><Text>{data}</Text></View>
      )
    })

}
  renderItem = ({item}) => {
      return (
            <View style={styles.view2}>
                <Text style={styles.fortext}>{item.donor}</Text>
                {/* <Text style={styles.fortext}>{item.item}</Text>
                <Text style={styles.fortext}>{item.Quantity}</Text> */}
                <View>{this.lapsList()}</View>
            <TextInput
              placeholder="Value"
              style={styles.input}
              value={this.state.val}
              onChangeText={(text) => { this.setState({ val: text }) }}
            />
                <TouchableOpacity 
                style={styles.button} 
                 onPress={()=> {
                    
                    this.ref4.doc(item.key).update({
                      value: this.state.val
                    }).then(()=> {
                      // this.state.rider=""
                      // this.state.message= "The status of your request has been updated to"
                     this.ref2.add({
                        Rider: "",
                        Key: item.email,
                        Message: "The value of your donated items has been updated to " + this.state.val
                      }).then(()=>{
                        Alert.alert('Notification sent');
                        
                           

                        })
                    })
                      
                    //  this.state.rider=item.Name
                    //  this.state.message='Request accepted'
                    //  this.ref2.add({
                    //     Rider: item.Name,
                    //     Key: this.state.email,
                    //     Message: this.state.message
                    //   }).then(()=>{
                    //     Alert.alert('Transporter assigned');
                    //     this.ref3.add({
                    //       donor: this.state.name,
                    //       Quantity: this.state.Quantity,
                    //       item: this.state.item
                           

                    //     })

                        
                    //   })
                     
                     this.props.navigation.navigate('requests')}}

                 >
              
                <Text style={styles.btntext}>Update Value</Text>
            
                 </TouchableOpacity>
                 
                 
               
                 
                 
                                
                 </View>
             
          
      )

  }
  componentDidMount() {
    this.unsubscribe = this.ref3.onSnapshot(this.onCollectionUpdate) 
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  onCollectionUpdate = (querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((doc) => {
      const { email, donor, item, Quantity, date} = doc.data();
      
      todos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        email,
        donor,
        date,
        item,
        Quantity
      });
      let quan=Quantity.split(',')
      let arr=item.split(',')
      for (i=0; i<arr.length; i++){
        arr[i]=arr[i]+", "+quan[i]+' kg';
      }
      this.state.items=arr
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
    backgroundColor: "goldenrod",
    marginTop:10,
    

  },
  input: {
    alignSelf: 'stretch',
    height: 30,
    marginBottom:20,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
},

  });