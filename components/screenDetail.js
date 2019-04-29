import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, FlatList, View, Text, TextInput, Button } from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import firebase from 'firebase';

class DetailScreen extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('Wastelog');
    this.unsubscribe = null;
    this.state = {
      loading: true,
      tableHead: ['Item Name','Quantity','Type','Status','Date Added'],
      tableData: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const tableData = [];
    querySnapshot.forEach((doc) => {
      
      var name = doc.data().itemName
      var type = doc.data().type
      var quantity = doc.data().quantity
      var status = doc.data().status
      var date = doc.data().dateAdded
      // var parsed = date.
      var test=[name, type, quantity, status, date];
      tableData.push(test)
    });
    // this.state.tableData.push(test)
    this.setState({
      loading: false,
      tableHead: ['Item Name','Quantity','Type','Status','Date Added'],
      tableData
   });
  }

  // upd= () => {
  //   this.ref.add({
  //     name: 'newNameBiggeer',
  //     quantity: 23,
  //     type: 'veg',
  //     status: 'expired',
  //     extra: 'fails?'
  //   });
  // }
  static navigationOptions = {
    title: 'Waste Details',
  };
  render() {
    if(this.state.loading){
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large"/>
        </View>
        // null
      );
    }
    return (
      <View style={{ flex: 1}}>
        {/* <Text>{this.state.tableData }</Text> */}
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
        <Rows data={this.state.tableData} textStyle={styles.text}/>
        </Table>
        {/* <FlatList
          data={this.state.posts}
          renderItem={({item})  => <Text> {item.com.name} </Text>} 
        /> */}
        {/* <TextInput  
          placeholder={'Add Name'}
          // value={!this.state.name}
          onChangeText={(text) =>  this.updateTextInput(text)}
          /> */}
        <Button
          title={'Add Waste'}
          // disabled={!this.state.name.length}
          onPress={() =>  this.props.navigation.navigate('AddBoard')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  head: {height: 40, backgroundColor: 'skyblue'},
  text: {margin: 6},
});

export default DetailScreen;