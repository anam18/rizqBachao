import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, CheckBox, Button, TouchableOpacity, Alert } from 'react-native';
import {Table, Row, Cell, TableWrapper} from 'react-native-table-component';
import firebase from 'firebase'

class DetailScreen extends Component {
  constructor() {
    super();
    this.ref=firebase.firestore().collection('Wastelog')
    this.unsubscribe = null;
    this.state = {
      loading: true,
      tableHead: ['Item Name','Quantity','Type','Status','Date Added', 'Select'],
      tableData: [],
      selectedData: [],
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
      
      var name = doc.data().Item
      var type = doc.data().Type
      var quantity = doc.data().Quantity
      var status = doc.data().Status
      var date = doc.data().Date
      var id = doc.id
      var test=[name, quantity, type, status, date,id];
      tableData.push(test);
      chk.push(false);
    });
    this.setState({
      loading: false,
      tableHead: ['Item Name','Quantity','Type','Status','Date Added', 'Select'],
      tableData,
      checked: chk,
   });
  }
  confirmDelete = (data)=>{
    data.forEach(rec => {
      const id = rec[5]
      this.ref.doc(id).delete();
    })
    Alert.alert(
      'Delete Log',
      'Items Deleted successfully',
      [{text: 'Continue'}]
    )
  }

  delRec = () => {
    const data = this.state.selectedData
    Alert.alert(
      'Delete Log',
      'Are you sure you want to remove the selected items?',
      [
        {text: 'Yes', onPress: ()=>{
          const empt=[]
          this.setState({selectedData: empt})
          this.confirmDelete(data)}},
        {text: 'No'}
      ],
      {cancelable: false},
    );
    
    
  }

  updateStatus = (id)=>{
    this.ref.doc(id).update({status: 'pending'})
  }

  sendReq = (email , resname , resaddress) => {
    const data = this.state.selectedData;
    donRef=firebase.firestore().collection('DonationReqs');
    // var time = String(new Date().getDate())+'/'+String(new Date().getMonth())+'/'+String(new Date().getFullYear());
    
    data.forEach((req)=>{
      // const {name, quantity, type, status, date} = req;
      donRef.add({
        Item: String(req[0]),
        Quantity: parseInt(req[1]),
        //Type: String(req[2]),
        Status: String(req[3]),
        Date: String(req[4]),
        Donor: resname,
        Address: resaddress,
        D_Email:email,
        // docID: req[5],
      });
      this.updateStatus(req[5]);
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
    const arr=[]
    this.setState({
      selectedData: arr,
    })

  }

  static navigationOptions = {
    title: 'Waste Details',
  };
  render() {
    const { navigation } = this.props;
    const email = navigation.getParam('email', '');
    const name = navigation.getParam('name', '');
    const address = navigation.getParam('address', '');
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
        var dat = this.state.selectedData
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
          selectedData: finalDat,
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
        <Button
          title={'Add Waste'}
          // disabled={!this.state.name.length}
          onPress={() =>  this.props.navigation.navigate('AddBoard',{
            email: email,
            name: name,
            addr: addr,
          })}
        />
        <Button
          title={'Donate'}
          disabled={!this.state.selectedData.length}
          onPress={() =>  this.sendReq(email , name , address)}
        />
        <Button
          title={'Delete'}
          disabled={!this.state.selectedData.length}
          onPress={() =>  this.delRec()}
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