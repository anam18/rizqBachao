import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert , ImageBackground } from 'react-native';
import * as firebase from 'firebase';
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('Donors')
    this.unsubscribe = null,
    this.state = {
      email: '',
      password:'',
      id: '',
      restaurantAddress: '',
      restaurantName: '',
      data:[],
    };
  }
  getNameAddress = (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => { 
      var email = doc.data().Email     
      var address = doc.data().Address
      var name = doc.data().RestaurantName
      data.push({
        key: email,
        address,
        name
      });
      this.setState({
         data,
      });
    });
  }

  updateNameAddress = (email) => {
      this.state.data.forEach((doc) => {
        if(doc.key == email)
        {
          this.setState({
                  restaurantName : doc.name,
                  restaurantAddress : doc.address
          });
        }
      }); 
  }

  componentDidMount(){
    this.unsubscribe = this.ref.onSnapshot(this.getNameAddress)
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  onPressDonor = (next_screen) => {
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
      .then(()=>{
        Alert.alert('Login successful');
        this.updateNameAddress(this.state.email)      
        this.props.navigation.navigate(next_screen , { email: this.state.email , name: this.state.restaurantName , address: this.state.restaurantAddress });
      }, (error)=> {
        Alert.alert(error.message);
      });
  }
  onPressCenter = (next_screen) => {
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
      .then(()=>{
        Alert.alert('Login successful');     
        this.props.navigation.navigate(next_screen);
      }, (error)=> {
        Alert.alert(error.message);
      });
  }
  onPressTransporter = (next_screen) => {
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
      .then(()=>{
        Alert.alert('Login successful');     
        this.props.navigation.navigate(next_screen , this.state.email);
      }, (error)=> {
        Alert.alert(error.message);
      });
  }


  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('next', 'Donor');
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style = {styles.container}>

        <     View style={styles.logoContainer1}>
                <Image 
                style = {{height: 80, width: 80, justifyContent: 'center'}}
                source = {require('./../assets/rizq.png')} />
              </View>

              <View style={styles.container1}>
                <TextInput
                placeholder="Email"
                style={styles.input}
                value={this.state.email}
                onChangeText={(text)=>{this.setState({email:text})}}
                />

                <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(text)=>{this.setState({password:text})}}
                />

                <TouchableOpacity style={styles.button}
                  onPress = { () => {
                    if(itemId=='Donor')
                    {
                      this.onPressDonor(itemId)
                    }
                    else if(itemId=='Center')
                    {
                      this.onPressCenter(itemId)
                    }
                    else if(itemId=='Transporter')
                    {
                      this.onPressTransporter(itemId)
                    }                
                  }}
                >
                    <Text style = {{fontWeight : 'bold'}}>Sign In</Text>
                      {/* Need to hyperlink this button to registration form */}
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.button2}
                  onPress = { () => {
                    if(itemId=='Donor')
                    {
                      this.props.navigation.navigate('signDonor',{next: itemId})
                    }
                    else if(itemId=='Center')
                    {
                      this.props.navigation.navigate('signCenter',{next: itemId})
                    }
                    else if(itemId=='Transporter')
                    {
                      this.props.navigation.navigate('signTrans',{next: itemId}) 
                    }                
                  }}
                  >
                      <Text style={styles.underline}>Don't have an account? Sign Up here.</Text>                 
                </TouchableOpacity>
              </View>

          </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 17,
    paddingRight: 17,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  logoContainer1: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    flex: 3,
    padding: 10
  },
  input: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom:30,
    borderBottomColor: "goldenrod",
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "goldenrod",
    marginTop: 30,

  },
  button2: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,

  },
  underline: {
    textDecorationLine: 'underline'
  },
});
