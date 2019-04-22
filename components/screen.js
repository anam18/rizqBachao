import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList, View, Text, TextInput, Button } from 'react-native';
// import { List, ListItem, Button, Icon } from 'react-native-elements';

class Screen extends Component {
  static navigationOptions = {
    title: 'RizqBachao',
  };
  render() {
    
    return (
      <View style= {styles.container}>
        <Button 
          title="Wastelog"
          onPress={() => this.props.navigation.navigate('BoardDetails')}
        />
        <Button
          title="Add Waste"
          onPress={() => this.props.navigation.navigate('AddBoard')}
        />
        <Button
          title="Donate Waste"
          onPress={() => this.props.navigation.navigate('EditBoard')}
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