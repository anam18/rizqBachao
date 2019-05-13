import React, {Component} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert , ImageBackground } from 'react-native';
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
          <View>
            
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
                   <Text>Sign In</Text>
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
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 45,
    paddingRight: 45,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  input: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom:30,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',

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
