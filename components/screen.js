import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList, View, Text, TextInput, Button,TouchableOpacity,ImageBackground } from 'react-native';
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

          <TouchableOpacity style={styles.button}  onPress={() => this.props.navigation.navigate('BoardDetails', { email: itemId, name: rName , address: rAddress})}>
              <Text>Waste Log</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}  onPress={() => this.props.navigation.navigate('AddBoard' , { email: itemId, name: rName , address: rAddress})}>
              <Text>Add Waste</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}  onPress={() => this.props.navigation.navigate('donorNotifications' , { email: itemId, })}>
              <Text>Donor Notifications</Text>
          </TouchableOpacity>

      </View>
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
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
  
  },
});

export default Screen;