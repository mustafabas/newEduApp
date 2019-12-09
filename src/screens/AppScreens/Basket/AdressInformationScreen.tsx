import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,

  View,TextInput,
  RefreshControl, ViewProps, Picker,Keyboard, KeyboardAvoidingView,TouchableWithoutFeedback, TouchableOpacity, Alert, TouchableHighlight
} from 'react-native';

import { connect } from "react-redux";

import {
  SafeAreaView
} from 'react-navigation'
import { Text ,Input, Overlay} from 'react-native-elements'
import { Button, FloatingLabelInput, LessonSection } from "../../../components";
import stylesNew from "../../AuthScreens/Login/styles";
import DeviceInfo from 'react-native-device-info';
import { adress, getAdressList, adressType ,getBasketId} from '../../../redux/actions/CheckoutActions'
import { NavigationScreenProp } from 'react-navigation'

import Modal, { ModalContent,SlideAnimation } from 'react-native-modals';

import RNPicker from "rn-modal-picker";
import { AppState } from '../../../redux/store';
import { ScrollView } from 'react-native-gesture-handler';
import { IBasket } from '../../../models/course/coruseItem';
import { Formik } from 'formik';

import { WebView } from 'react-native-webview';


export interface Props {
  navigation: NavigationScreenProp<any, any>;
  adressCity: adress[];
  loading: boolean;
  getAdressList: (adress: adressType , id : number) => void;
  getBasketId: (basket : IBasket) => void;

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
    if(this.props.adressDistrict.length>0 && this.props.adressLocality.length>0) {
      return(
        <View>

        
<View style={{ padding: 0 ,paddingBottom:20}}>

<Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, marginLeft: 10, marginBottom: 5 }}>
            Adres Bilgisi
         </Text>
        

<Formik
              initialValues={{ Adress: "" }}

              onSubmit={ val => this.navigateToOtherScreen(val.Adress)}
            >
              {props => {
        
                return (

                      <View >


                      <View style={stylesNew.inputContainer}>
                      <Input
                      multiline numberOfLines={3}
                        inputStyle={{fontFamily:'Roboto-Regular',fontSize:15}}
                        placeholder="Adress"
                        style={{fontFamily:'OpenSans-Regular'}}
                        value={props.values.Adress}
                        onChangeText={props.handleChange("Adress")}
                        onBlur={props.handleBlur("Adress")}
                        // error={props.touched.email && props.errors.email}
                        errorMessage= "Lutfen uygun bir kullanici adi girin"
                        errorStyle={{height: (props.touched.Adress && props.errors.Adress) ? 20 : 0,color:'#a31515'}}             
                      />

                      </View>
                      


                      
                      <View style={[stylesNew.inputContainer, { flexDirection: 'row', justifyContent: 'space-evenly', padding: 10,marginTop:10}]}>

<TouchableOpacity key={1} style={{ flexDirection: 'row' }} onPress={this.radioClick.bind(this, 1)}>
    <View style={{
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d67676',
        alignItems: 'center',
        justifyContent: 'center',
    }}>

        {
            1 == this.state.radioSelected ?
                <View style={{
                    height: 15,
                    width: 15,
                    borderRadius: 7.5,
                    backgroundColor: '#d67676',
                }} />
                : null
        }

    </View>
    <Text style={{ paddingLeft: '1%', marginTop: 0, fontFamily: 'Roboto-Regular', fontSize: 18, color: '#474747' }}>Kredi Karti</Text>

</TouchableOpacity>

<TouchableOpacity key={2} style={{ flexDirection: 'row', marginLeft: 50 }} onPress={this.radioClick.bind(this, 2)}>
    <View style={{
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d67676',
        alignItems: 'center',
        justifyContent: 'center',
    }}>

        {
            2 == this.state.radioSelected ?
                <View style={{
                    height: 15,
                    width: 15,
                    borderRadius: 7.5,
                    backgroundColor: '#d67676',
                }} />
                : null
        }

    </View>
    <Text style={{ paddingLeft: '1%', marginLeft: 3, fontFamily: 'Roboto-Regular', color: '#474747', fontSize: 18 }}>Havale</Text>
</TouchableOpacity>

</View>
<Button style={{marginBottom:30}} IsDisabled={!(this.props.adressDistrict.length>0 )} text="Devam Et" onPress={()=>props.handleSubmit()} />


                  </View>
                      
                );
              }}

            </Formik>
        



</View>

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
      cityId : 0,
      selectedTextLocality: "",
      placeHolderTextLocality : "Ilce Seciniz",
      localityId : 0,
      selectedTextDistrict : "",

      placeHolderTextDistrict : "Mahalle Seciniz",
      districtId : 0,
      visible : false,
      selectedTextNeigboor : "",
      placeHolderTextNeighboor : "Neigboor seciniz",
      neighboorId : 0,
      radioSelected: 0,

    };
  }

  radioClick(id) {
    // this.props.RegisterChanged({props:'sex',value:id})
    this.setState({
        radioSelected: id
    })
}


  _selectedValue(item, selectedType : adressType) {
   

    if(selectedType === adressType.CITY){  
      var tmp = this.props.adressCity[item]
      
      this.setState({ selectedText: tmp.name,
      cityId : item });
      this.props.getAdressList(adressType.LOCALITY, tmp.id);
    }
    else if (selectedType === adressType.LOCALITY){
      console.log("Asd")
      console.log(item)
      var tmp2 = this.props.adressLocality[item]
      console.log(tmp2)
      this.setState({selectedTextLocality : tmp2.name,
      localityId: item})
      this.props.getAdressList(adressType.DISTRICT , tmp2.id)
    }
    else if (selectedType ===adressType.DISTRICT) {
      var tmp = this.props.adressDistrict[item]
      this.setState({selectedTextDistrict : tmp.name,
      districtId : item})
      this.props.getAdressList(adressType.NEIGHBOORS,tmp.id)
      
    }
    else if (selectedType ===adressType.NEIGHBOORS) {
      var tmp = this.props.adressNeighboor[item]
      
      this.setState({selectedTextNeigboor : tmp.name,
        neighboorId : item})
      // this.props.getAdressList(adressType.NEIGHBOORS,tmp.id)
      
    }


  }

  navigateToOtherScreen(val : string){
    let basket : IBasket = this.props.navigation.getParam('basket') as IBasket;
    basket.cityId = this.state.cityId;  
    basket.localityId = this.state.localityId;
    basket.districtId = this.state.districtId;
    basket.neighboorId = this.state.neighboorId;
    basket.orderType = this.state.radioSelected;
    basket.adressInfo = val

    this.props.getBasketId(basket)
    console.log(basket)
    
  }

  render() {

    var html = `
      <html>
      <head></head>
      <body>
        <script>
          setTimeout(function () {
            window.ReactNativeWebView.postMessage("Hello!")
          }, 2000)
        </script>
      </body>
      </html>
    `;

    return (
      <SafeAreaView style={{ backgroundColor: '#e3e3e3', flex: 1 ,padding:5}}>
        <KeyboardAvoidingView 
        enabled
        keyboardVerticalOffset={100}
         behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1}}
         >

      
          <ScrollView style={{flex:1,paddingVertical:30}} bounces={true} >
          
          
{this._renderCity()}
{this._renderLocality()}
{this._renderDistrict()}
{this._renderNeighboor()}
{this._renderAdressInfo()}
<Button text="asd" onPress={()=> this.setState({ visible: true })} ></Button>
<Modal
    visible={this.state.visible}
    swipeDirection={['down']} // can be string or an array
    swipeThreshold={200} // default 100
    onSwipeOut={(event) => {
      this.setState({ visible: false });
    }}
    modalAnimation={new SlideAnimation({
      initialValue: 0, // optional
      slideFrom: 'bottom', // optional
      useNativeDriver: true, // optional
    })}
    
    width ={1.0}
    height= {.9}
    modalStyle={{marginTop:'23%'}}

  >
    <ModalContent style={{flex:1}}>

   <View  style={{flex:1}}>
   <WebView
    scalesPageToFit = {false}
        originWhitelist={['*']}
        source={{uri : `https://www.ikonegitim.com/KrediKarti.aspx?code=317771&kullanici=10092`}}
        style={{flex:1}}
      />
   </View>


   
    </ModalContent>
  </Modal>


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
      dispatch(getAdressList(adress,id)),
      getBasketId : (basket : IBasket) => 
      dispatch(getBasketId(basket))
  };
}



export default connect(mapStateToProps, bindToAction)(AdressInformationScreen);