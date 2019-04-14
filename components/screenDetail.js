import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, FlatList, View, Text, TextInput, Button } from 'react-native';
import Todo from './Todo';
import firebase from 'firebase'


const Disp = ({dat}) => {
  return(
    <View>
      <Text>{dat.com}</Text>
    </View>
    
  );
};
class DetailScreen extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('wastelog');
    this.unsubscribe = null;
    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      const com = doc.data();
      posts.push({
        key: doc.id, // Document ID
        doc, // DocumentSnapshot
        com,
      });
    });
    this.setState({
      posts,
      loading: false,
   });
  }

  upd= () => {
    this.ref.doc('email/').set({
      name: 'newName',
    });
  }
  static navigationOptions = {
    title: 'Waste Details',
  };name
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>screen Details</Text>
        
        <Text>check</Text>  
        {/* <Text>{this.state.posts.com}</Text>   */}
        {/* <Text>{this.state.posts.title}</Text>   */}
        <FlatList
          data={this.state.posts}
          renderItem={({item})  => <Disp dat={item}/>} 
        />
        {/* <TextInput  
          placeholder={'Add Name'}
          // value={!this.state.name}
          onChangeText={(text) =>  this.updateTextInput(text)}
          /> */}
        {/* <TextInput  
          placeholder={'Add quantity'}
          value2={!this.state.textInput}
          onChangeText={(text) =>  this.updateTextInput(text)}
        /> */}
        <Button
          title={'Add TODO'}
          // disabled={!this.state.name.length}
          onPress={() =>  this.upd()}
        />
        {/* <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('BoardDetails')}
        />*/}
      </View>
    );
  }
}

export default DetailScreen;