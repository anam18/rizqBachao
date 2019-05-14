import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, CheckBox, Button, TouchableOpacity, Alert } from 'react-native';
// import {Table, Row, Cell, TableWrapper} from 'react-native-table-component';
import { Card } from 'react-native-elements'
import firebase from 'firebase'

class DetailScreen extends Component {
  constructor() {
    super();
    var user = firebase.auth().currentUser;
    console.log(user.email);
    this.inRef=firebase.firestore().collection('Wastelog');
    this.ref=this.inRef.where("D_Email", "==" ,user.email);
    this.unsubscribe = null;
    this.state = {
      loading: true,
      tableHead: ['Item Name','Quantity(KGs)','Type','Status','Date-Added', 'Select'],
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
      tableHead: ['Item Name','Quantity(KGs)','Type','Status','Date Added', 'Select'],
      tableData,
      checked: chk,
    });
  }
  confirmDelete = (data)=>{
    data.forEach(rec => {
      const id = rec[5]
      this.inRef.doc(id).delete();
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
    this.inRef.doc(id).update({Status: 'pending'})
  }

  sendReq = (email , resname , resaddress) => {
    const data = this.state.selectedData;
    donRef=firebase.firestore().collection('DonationReqs');
    // var time = String(new Date().getDate())+'/'+String(new Date().getMonth())+'/'+String(new Date().getFullYear());
    
    data.forEach( (req) => {
      donRef.add({
          Item: String(req[0]),
          Quantity: String(req[1]),
          Status: String(req[3]),
          Date: String(req[4]),
          Donor: resname,
          Address: resaddress,
          D_Email:email,
      });
      this.updateStatus(req[5]);
    });

    Alert.alert(
      'Donation Request',
      'Donation Request Sent! Please wait while we process it',
      [
        {text: 'OK'},
      ],
      {cancelable: false},
    );
    const arr=[]
    this.setState({ selectedData: arr,})
  }

  static navigationOptions = {
    title: 'Waste Details',
  };
  render() {
    const { navigation } = this.props;
    const email = navigation.getParam('email', '');
    const resname = navigation.getParam('name', '');
    const resaddress = navigation.getParam('address', '');
    if(this.state.loading){
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large"/>
        </View>
        // null
      );
    }
    const state = this.state
    const horizArrange = (data,index) => (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{flex: 2,fontWeight:'bold', color: '#12273b'}}>{this.state.tableHead[index]}:</Text>
        <Text style={{textAlign: 'center'}}>{data}</Text>
      </View>
    );
    const element = (data, index) => (
      <TouchableOpacity onPress={() => {
        var dat = this.state.selectedData
        var finalDat = []
        if(!this.state.checked[index])
        {
          finalDat=dat;
          finalDat.push(data);
        }
        else
        {
          dat.forEach(row => {
            if (row!=data) {finalDat.push(row);}
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
          {this.state.checked[index] == false? <Text style={styles.btnText}> Select </Text>: <Text style={styles.btnText}> Deselect </Text> }
        </View>
      </TouchableOpacity>
    );

    return (
      // <View style={styles.container}>
      //   <Table borderStyle={{borderColor: 'transparent'}}>
      //     <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
      //     {
      //       state.tableData.map((rowData, index) => (
      //         <TableWrapper key={index} style={styles.row}>
      //         {
      //             rowData.map((cellData, cellIndex) => (
      //               <Cell key={cellIndex} data={cellIndex === 5 ? element(rowData, index) : cellData} textStyle={styles.text}/>
      //             ))
      //           }
      //         </TableWrapper>
      //       ))
      //     }
      //   {/* // <Rows data={this.state.tableData} textStyle={styles.text}/> */}
      //   </Table>
      //   <TouchableOpacity style={styles.button}  onPress={() =>  this.props.navigation.navigate('AddBoard',{
      //               email: email,
      //               name: resname,
      //               address: resaddress,
      //       }
      //       )}>
      //       <Text>Add Waste</Text>
      //   </TouchableOpacity>
        
      //   <TouchableOpacity style={styles.button} disabled={!this.state.selectedData.length}  onPress={() =>  this.sendReq(email , resname , resaddress)}>
      //       <Text>Donate</Text>
      //   </TouchableOpacity>

      //   <TouchableOpacity style={styles.button} disabled={!this.state.selectedData.lenlgth}  onPress={() =>  this.delRec()}>
      //       <Text>Delete</Text>
      //   </TouchableOpacity>

      // </View>
      <ScrollView>
        <View style={styles.container}>
          { state.tableData.map((rowData,index)=>(
              <Card containerStyle={styles.head}>
                {
                  rowData.map((cellData, cellIndex) =>{ 
                    return( 
                      <View>
                      {
                          cellIndex === 5 ? element(rowData, index) : horizArrange(cellData,cellIndex)
                      }
                      </View>
                    )  
                  })
                }  
            </Card>    
            ))
          }
        </View>
       <TouchableOpacity style={styles.button}  onPress={() =>  this.props.navigation.navigate('AddBoard',{
                    email: email,
                    name: resname,
                    address: resaddress,
            }
            )}>
            <Text style={{fontWeight : 'bold', fontSize: 17}}>Add Waste</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} disabled={!this.state.selectedData.length}  onPress={() =>  this.sendReq(email , resname , resaddress)}>
            <Text style={{fontWeight : 'bold', fontSize: 17}}>Donate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} disabled={!this.state.selectedData.length}  onPress={() =>  this.delRec()}>
            <Text style={{fontWeight : 'bold', fontSize: 17}}>Delete</Text>
        </TouchableOpacity>
      </ScrollView>  
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 1, paddingTop: 30, backgroundColor: '#fff' },
  head: { flex: 2, backgroundColor: '#e6e6e6', borderRadius: 2, padding: 10, bottom: 20},
  btn: { flex: 1, backgroundColor: "goldenrod",  borderRadius: 2, padding: 5},
  btnText: { textAlign: 'center', color: '#fff' },
  left: {backgroundColor: '#00cccc'},
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "goldenrod",
    bottom: 20,
    marginHorizontal: 30,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  child: {
    width: 300
  },
  titleView: {
    padding: 10,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 16,
    color: 'black'
  },
});

export default DetailScreen;