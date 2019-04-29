import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, CheckBox, Button, TouchableOpacity, Alert } from 'react-native';
import {Table, Row, Cell, TableWrapper} from 'react-native-table-component';
import firebase from 'firebase'

class DetailScreen extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('Wastelog');
    this.unsubscribe = null;
    this.state = {
      loading: true,
      tableHead: ['Item Name','Quantity','Type','Status','Date Added', 'Donate?'],
      tableData: [],
      donateData: [],
      checked: [],
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
    const chk = [];
    querySnapshot.forEach((doc) => {
      
      var name = doc.data().itemName
      var type = doc.data().type
      var quantity = doc.data().quantity
      var status = doc.data().status
      var date = doc.data().dateAdded
      // var parsed = date.
      var test=[name, quantity, type, status, date,''];
      tableData.push(test);
      chk.push(false);
    });
    // this.state.tableData.push(test)
    this.setState({
      loading: false,
      tableHead: ['Item Name','Quantity','Type','Status','Date Added', 'Donate?'],
      tableData,
      checked: chk
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

  sendReq = () => {
    const data = this.state.donateData;
    donRef=firebase.firestore().collection('DonationReqs');
    // var time = String(new Date().getDate())+'/'+String(new Date().getMonth())+'/'+String(new Date().getFullYear());
    data.forEach((req)=>{
      // const {name, quantity, type, status, date} = req;
      donRef.add({
        itemName: String(req[0]),
        quantity: parseInt(req[1]),
        type: String(req[2]),
        status: String(req[3]),
        dateAdded: String(req[4]),
      });
    }
    );
    
    Alert.alert(
      'Donation Request',
      'Donation Request Sent! Please wait while we process it',
      [
        {text: 'OK'},
      ],
      {cancelable: false},
    );
  }

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
    const state = this.state
    const element = (data, index) => (
      <TouchableOpacity onPress={() => {
        var dat = this.state.donateData
        var finalDat = []
        if(!this.state.checked[index]){
          finalDat=dat;
          finalDat.push(data);
        }else{
          dat.forEach(row =>{
            if(row!=data){
              finalDat.push(row);
            }
          })
        }
        const chk=this.state.checked
        chk[index] = !chk[index]
        // this.state.donateData.push(dat)
        this.setState({
          donateData: finalDat,
          checked: chk,
        })
        // valid
        // var str="";
        // dat.forEach(row=>{
        //   row.forEach(e=>{
        //     str+=String(e)+' '
        //   })
        //   str+='\n'
        // })
        // Alert.alert(str)
        
      }}>
        <View style={styles.btn}>
          {this.state.checked[index] == false? <Text style={styles.btnText}> Add </Text>: <Text style={styles.btnText}> Remove </Text> }
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
              {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 5 ? element(rowData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        {/* // <Rows data={this.state.tableData} textStyle={styles.text}/> */}
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
        <Button
          title={'Donate'}
          // disabled={!this.state.donateData.length}
          onPress={() =>  this.sendReq()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 1, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});

export default DetailScreen;