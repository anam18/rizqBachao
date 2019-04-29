import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList, View, Text, TextInput, Button } from 'react-native';
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
  // componentDidMount() {
  //   this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  // }

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  // onCollectionUpdate = (querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
      
  //     var Raddr = doc.data().Address
  //     var resNam = doc.data().RestaurantName

  //   });
  //   // this.state.tableData.push(test)
  //   this.setState({
  //     name: resNam,
  //     addr: Raddr, 
  //  });
  // }
  static navigationOptions = {
    title: 'RizqBachao',

  };

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('email', 'testemail@gmail.com');

    return (
      <View style= {styles.container}>
        <Button 
          title="Wastelog"
          onPress={() => this.props.navigation.navigate('BoardDetails',{
            email: itemId,
            // address: this.state.addr,
            // rName: this.state.name
          })}
        />
        <Button
          title="Add Waste"
          onPress={() => this.props.navigation.navigate('AddBoard',{
            email: itemId,
            // address: this.state.addr,
            // rName: this.state.name
          })}
        />
        <Button
          title="Donor Notifications"
          onPress={() => this.props.navigation.navigate('donorNot',{
            email: itemId
          })}
        />
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
});

export default Screen;