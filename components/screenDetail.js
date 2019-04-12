import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, FlatList, View, Text, TextInput, Button } from 'react-native';
import firebase from 'firebase';

class DetailScreen extends Component {
  constructor(){
    super();
    this.ref=firebase.firestore().collection('wastelog');
    this.unsubscribe = null;
    this.state = {
      deets: [],
      loading: true,
    };

  }
  componentDidMount(){
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot)=>{
    // change
    const deets = [];
    querySnapshot.forEach((doc)=>{
      const{name, quantity, time_added} = doc.data;
      deets.push({
        Tit: doc.id,
        doc, //doc Snapshot
        name,
        quantity,
        time_added,
      });
    });
    this.setState({
      deets,
      loading: false,
    });
  }

  static navigationOptions = {
    title: 'Waste Details',
  };
  render() {
    if(this.state.loading){
      return null;
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>screen Details</Text>
        <FlatList
          data={this.state.deets}
          renderItem={({item})=> <Todo {...item}/>}
        />
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('BoardDetails')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Board')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default DetailScreen;