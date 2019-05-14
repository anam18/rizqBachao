import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList, Image, View, Text, TextInput, Button,TouchableOpacity,ImageBackground } from 'react-native';
import firebase from 'firebase'
class Screen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const itemId = navigation.getParam('email', 'testemail@gmail.com');
    this.ref=firebase.firestore().collection('Donors').where("Email", "==" ,itemId);
    this.unsubscribe=null;
    this.state={
      email: itemId,
    };
  }
  static navigationOptions = {
    title: 'RizqBachao',

  };

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('email', '');
    const rName = navigation.getParam('name', '');
    const rAddress = navigation.getParam('address', '');
    return (
      <View style= {styles.container}>

            <View style={styles.logoContainer1}>
              <Image 
              style = {{height: 80, width: 80, justifyContent: 'center'}}
              source = {require('./../assets/rizq.png')} />
            </View>
            <View style={styles.logoContainer}>
              <Text>Welcome to RIZQ</Text>
            </View>
          <View style={styles.container1}>
            <TouchableOpacity style={styles.button}  onPress={() => this.props.navigation.navigate('BoardDetails', { email: itemId, name: rName , address: rAddress})}>
                <Text style={{fontWeight : 'bold', fontSize: 17}}>Waste Log</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}  onPress={() => this.props.navigation.navigate('AddBoard' , { email: itemId, name: rName , address: rAddress})}>
                <Text style={{fontWeight : 'bold', fontSize: 17}}>Add Waste</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}  onPress={() => this.props.navigation.navigate('donorNotifications' , { email: itemId, })}>
                <Text style={{fontWeight : 'bold', fontSize: 17}}>Donor Notifications</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    color: "black",
    fontWeight : 'bold',
    fontSize: 24,
    fontFamily: 'monospace'

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
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "goldenrod",
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default Screen;