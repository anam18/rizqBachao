import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, FlatList, View, Text, TextInput, Button } from 'react-native';
// import { List, ListItem, Button, Icon } from 'react-native-elements';

class Screen extends Component {
  static navigationOptions = {
    title: 'WasteLog',
  };
  render() {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Board List</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('BoardDetails')}
        />
        <Button
          title="Go to Add"
          onPress={() => this.props.navigation.navigate('AddBoard')}
        />
        <Button
          title="Go to Edit"
          onPress={() => this.props.navigation.navigate('EditBoard')}
        />
      </View>
    );
  }
}

export default Screen;