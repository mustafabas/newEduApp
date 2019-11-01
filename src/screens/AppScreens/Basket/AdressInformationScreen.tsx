import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,

  View,TextInput,
  RefreshControl, ViewProps, Picker,Keyboard, KeyboardAvoidingView,TouchableWithoutFeedback
} from 'react-native';

import { connect } from "react-redux";

import {
  SafeAreaView
} from 'react-navigation'
import { Text ,Input} from 'react-native-elements'
import { Button, FloatingLabelInput, LessonSection } from "../../../components";
import stylesNew from "../../AuthScreens/Login/styles";
import DeviceInfo from 'react-native-device-info';
import { adress, getAdressList, adressType } from '../../../redux/actions/CheckoutActions'
import { NavigationScreenProp } from 'react-navigation'

import RNPicker from "rn-modal-picker";
import { AppState } from '../../../redux/store';
import { ScrollView } from 'react-native-gesture-handler';



export interface Props {
  navigation: NavigationScreenProp<any, any>;
  adressCity: adress[];
  loading: boolean;
  getAdressList: (adress: adressType , id : number) => void;
  adressLocality : adress[];
  adressDistrict : adress[];
  adressNeighboor : adress[];


};


class AdressInformationScreen extends Component<Props, {}> {

_renderDistrict() {
  if(this.props.adressDistrict.length>0){
    return (
      <View style={[stylesNew.inputContainer, { padding: 10 }]}>
        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, marginLeft: 5, marginBottom: 5 }}>
          Mahalle
       </Text>
        <RNPicker
          dataSource={this.props.adressDistrict}
          dummyDataSource={this.props.adressDistrict}
          defaultValue={false}
          pickerTitle={"Ilce Seciniz"}
          showSearchBar={true}
          disablePicker={false}
          changeAnimation={"none"}
          searchBarPlaceHolder={"Ara....."}
          showPickerTitle={true}
          searchBarContainerStyle={Styles.searchBarContainerStyle}
          pickerStyle={Styles.pickerStyle}
          selectedLabel={this.state.selectedTextDistrict}
          placeHolderLabel={this.state.placeHolderTextDistrict}
          selectLabelTextStyle={Styles.selectLabelTextStyle}
          placeHolderTextStyle={Styles.placeHolderTextStyle}
          dropDownImageStyle={Styles.dropDownImageStyle}

          //   dropDownImage={require("./res/ic_drop_down.png")}
          selectedValue={(item2) => this._selectedValue(item2,adressType.DISTRICT)}
        />


      </View>
    )
  }
  
}

_renderCity() {
  if(this.props.adressCity.length>0) {
    return (
      <View style={[stylesNew.inputContainer, { padding: 10 }]}>
          <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, marginLeft: 5, marginBottom: 5 }}>
            Sehir Secimi
               </Text>
          <RNPicker
            dataSource={this.props.adressCity}
            dummyDataSource={this.props.adressCity}
            defaultValue={false}
            pickerTitle={"Sehir Seciniz"}
            showSearchBar={true}
            disablePicker={false}
            changeAnimation={"none"}
            searchBarPlaceHolder={"Ara....."}
            showPickerTitle={true}
            searchBarContainerStyle={Styles.searchBarContainerStyle}
            pickerStyle={Styles.pickerStyle}
            selectedLabel={this.state.selectedText}
            placeHolderLabel={this.state.placeHolderText}
            selectLabelTextStyle={Styles.selectLabelTextStyle}
            placeHolderTextStyle={Styles.placeHolderTextStyle}
            dropDownImageStyle={Styles.dropDownImageStyle}

            //   dropDownImage={require("./res/ic_drop_down.png")}
            selectedValue={(item) => this._selectedValue(item,adressType.CITY)}
          />


        </View>
    )
  }
}
  _renderLocality() {
    if(this.props.adressLocality.length>0){
      return (
        <View style={[stylesNew.inputContainer, { padding: 10 }]}>
          <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, marginLeft: 5, marginBottom: 5 }}>
            Ilce Secimi
         </Text>
          <RNPicker
            dataSource={this.props.adressLocality}
            dummyDataSource={this.props.adressLocality}
            defaultValue={false}
            pickerTitle={"Ilce Seciniz"}
            showSearchBar={true}
            disablePicker={false}
            changeAnimation={"none"}
            searchBarPlaceHolder={"Ara....."}
            showPickerTitle={true}
            searchBarContainerStyle={Styles.searchBarContainerStyle}
            pickerStyle={Styles.pickerStyle}
            selectedLabel={this.state.selectedTextLocality}
            placeHolderLabel={this.state.placeHolderTextLocality}
            selectLabelTextStyle={Styles.selectLabelTextStyle}
            placeHolderTextStyle={Styles.placeHolderTextStyle}
            dropDownImageStyle={Styles.dropDownImageStyle}
  
            //   dropDownImage={require("./res/ic_drop_down.png")}
            selectedValue={(item3) => this._selectedValue(item3,adressType.LOCALITY)}
          />
  
  
        </View>
      )
    }
    
  }
  _renderNeighboor() {
    if(this.props.adressNeighboor.length>0){
      return (
        <View style={[stylesNew.inputContainer, { padding: 10 }]}>
          <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, marginLeft: 5, marginBottom: 5 }}>
            Neigboor Secimi
         </Text>
          <RNPicker
            dataSource={this.props.adressNeighboor}
            dummyDataSource={this.props.adressNeighboor}
            defaultValue={false}
            pickerTitle={"Ilce Seciniz"}
            showSearchBar={true}
            disablePicker={false}
            changeAnimation={"none"}
            searchBarPlaceHolder={"Ara....."}
            showPickerTitle={true}
            searchBarContainerStyle={Styles.searchBarContainerStyle}
            pickerStyle={Styles.pickerStyle}
            selectedLabel={this.state.selectedTextNeigboor}
            placeHolderLabel={this.state.placeHolderTextNeighboor}
            selectLabelTextStyle={Styles.selectLabelTextStyle}
            placeHolderTextStyle={Styles.placeHolderTextStyle}
            dropDownImageStyle={Styles.dropDownImageStyle}
  
            //   dropDownImage={require("./res/ic_drop_down.png")}
            selectedValue={(item3) => this._selectedValue(item3,adressType.NEIGHBOORS)}
          />
  
  
        </View>
      )
    }
    
  }

  _renderAdressInfo(){
    if(true) {
      return(
<View style={[stylesNew.inputContainer, { padding: 10 ,paddingBottom:20}]}>

<Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, marginLeft: 5, marginBottom: 5 }}>
            Adres Bilgisi
         </Text>
        <Input  
        multiline numberOfLines={123}
        scrollEnabled={false}
        inputContainerStyle={{borderBottomColor:'#e3e3e3'}}
        inputStyle={{fontFamily:'Roboto-Regular'}}
         />

      </View>
      )
      
    }
  }

  UNSAFE_componentWillMount() {
    this.props.getAdressList(adressType.CITY,0)
  }

  static navigationOptions = {
    title: 'Adres Sayfasi',

    headerStyle: {
      backgroundColor: '#d67676',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };


  constructor(props) {
    super(props);
    this.state = {
      placeHolderText: "Sehir Seciniz",
      selectedText: "",
      selectedTextLocality: "",
      placeHolderTextLocality : "Ilce Seciniz",
      selectedTextDistrict : "",

      placeHolderTextDistrict : "Mahalle Seciniz",

      selectedTextNeigboor : "",
      placeHolderTextNeighboor : "Neigboor seciniz"


    };
  }

  _selectedValue(item, selectedType : adressType) {
   

    if(selectedType === adressType.CITY){  
      var tmp = this.props.adressCity[item]

      this.setState({ selectedText: tmp.name });
      this.props.getAdressList(adressType.LOCALITY, tmp.id);
    }
    else if (selectedType === adressType.LOCALITY){
      console.log("Asd")
      console.log(item)
      var tmp2 = this.props.adressLocality[item]
      console.log(tmp2)
      this.setState({selectedTextLocality : tmp2.name})
      this.props.getAdressList(adressType.DISTRICT , tmp2.id)
    }
    else if (selectedType ===adressType.DISTRICT) {
      var tmp = this.props.adressDistrict[item]
      this.setState({selectedTextDistrict : tmp.name})
      this.props.getAdressList(adressType.NEIGHBOORS,tmp.id)
      
    }
    else if (selectedType ===adressType.NEIGHBOORS) {
      var tmp = this.props.adressNeighboor[item]
      
      this.setState({selectedTextNeigboor : tmp.name})
      // this.props.getAdressList(adressType.NEIGHBOORS,tmp.id)
      
    }


  }


  render() {
    return (
      <SafeAreaView style={{ backgroundColor: '#e3e3e3', flex: 1 ,padding:5,paddingVertical:30}}>
        <KeyboardAvoidingView 
        enabled
        keyboardVerticalOffset={100}
         behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1}}
         >

      
          <ScrollView style={{flex:1}} bounces={true} >
          
          
{this._renderCity()}
{this._renderLocality()}
{this._renderDistrict()}
{this._renderNeighboor()}
{this._renderAdressInfo()}

<Button text="asdasd" onPress={()=>this.props.navigation.navigate('CreditCart')} />
          

{/* <View style={{ flex : 1 }} /> */}
          </ScrollView>



        </KeyboardAvoidingView> 
        

      </SafeAreaView>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10
  },

  selectLabelTextStyle: {
    color: "#000",
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  },
  placeHolderTextStyle: {
    color: "#D3D3D3",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row"
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: "center"
  },

  pickerStyle: {
    marginLeft: 18,
    elevation: 3,
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 2,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1
    },
    borderWidth: 0.5,
    shadowRadius: 10,
    borderColor: "#e1e1e1",
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 5,
    flexDirection: "row"
  }
});




const mapStateToProps = (state: AppState) => ({
  loading: state.courseCheckout.loading,
  adressCity: state.courseCheckout.adressCity,
  adressLocality : state.courseCheckout.adressLocality,
  adressDistrict : state.courseCheckout.adressDistrict,
adressNeighboor : state.courseCheckout.adressNeighboor,
})

function bindToAction(dispatch: any) {
  return {
    getAdressList: (adress: adressType , id : number) =>
      dispatch(getAdressList(adress,id))
  };
}



export default connect(mapStateToProps, bindToAction)(AdressInformationScreen);