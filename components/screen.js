import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList, View, Text, TextInput, Button,TouchableOpacity } from 'react-native';
// import { List, ListItem, Button, Icon } from 'react-native-elements';
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
      // name: this.ref.data().RestaurantName,
      // addr: this.ref.data().Address,
    };
  }
  static navigationOptions = {
    title: 'RizqBachao',

  };

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('email', 'testemail@gmail.com');

    return (
      <View style= {styles.container}>
        <TouchableOpacity style={styles.button}  onPress={() => this.props.navigation.navigate('BoardDetails',{ email: itemId, })}>
            <Text>Waste Log</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={() => this.props.navigation.navigate('AddBoard',{ email: itemId, })}>
            <Text>Add Waste</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={() => this.props.navigation.navigate('donorNot',{ email: itemId, })}>
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
    alignItems: 'center',
    justifyContent: 'center',
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