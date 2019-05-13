import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Picker } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { YellowBox } from 'react-native';

let comp=(new Date().getDate()) + '/' + (new Date().getMonth()+1) +'/' + new Date().getFullYear()

YellowBox.ignoreWarnings(['Setting a timer']);
export default class status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      todos:[],
      status:"",
      items:[],
      // email: this.props.navigation.state.params.donEmail,
      // name: this.props.navigation.state.params.donName,
      // item: this.props.navigation.state.params.donItem,
      // Quantity: this.props.navigation.state.params.donQuantity,
      message: '',
      rider: '',
      comp: (new Date().getDate()) + '/' + (new Date().getMonth()+1) +'/' + new Date().getFullYear()


    };
    this.ref=firebase.firestore().collection('Transporters');
    this.ref2=firebase.firestore().collection('Notifications_Donor');
    this.ref3=firebase.firestore().collection('DonationLogs')//.where("Date", "==" ,comp);
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
                <View>{this.lapsList()}</View>
                {/* <Text style={styles.fortext}>{item.item}</Text>
                <Text style={styles.fortext}>{item.Quantity}</Text> */}
                   <Picker
                selectedValue={this.state.status}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({status: itemValue})
                }>
                <Picker.Item label="" value="" />
                <Picker.Item label="Recieved" value="Recieved" />
                <Picker.Item label="Processing" value="Processing" />
                <Picker.Item label="Fully Processed" value="Fully Processed" />
                </Picker>
                <TouchableOpacity 
                style={styles.button} 
                 onPress={()=> {
                    Alert.alert(this.state.status)
                    this.ref3.doc(item.key).update({
                      status: this.state.status
                    }).then(()=> {
                      // this.state.rider=""
                      // this.state.message= "The status of your request has been updated to"
                     this.ref2.add({
                        Rider: "",
                        Key: item.email,
                        Message: "The value of your donated items has been update to " + this.state.val
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
              
                <Text style={styles.btntext}>Update Status</Text>
            
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
        Quantity,
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
    backgroundColor: '#59cbbd',
    marginTop:10,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
  },

  });