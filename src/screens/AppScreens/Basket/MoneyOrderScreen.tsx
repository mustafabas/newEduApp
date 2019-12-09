import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,

  View,TextInput,
  RefreshControl, ViewProps, Picker,Keyboard, KeyboardAvoidingView,TouchableWithoutFeedback, ImageBackground, Easing
} from 'react-native';

import { connect } from "react-redux";

import {
  SafeAreaView
} from 'react-navigation'
import { Text ,Input} from 'react-native-elements'
import { Button, FloatingLabelInput, LessonSection } from "../../../components";
import stylesNew from "../../AuthScreens/Login/styles";
import DeviceInfo from 'react-native-device-info';
import { cardSwiped, moneyOrder } from '../../../redux/actions/CheckoutActions'
import { NavigationScreenProp } from 'react-navigation'

import RNPicker from "rn-modal-picker";
import { AppState } from '../../../redux/store';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';

import { WebView } from 'react-native-webview';



export interface Props {
  navigation: NavigationScreenProp<any, any>;


};





class MoneyOrderScreen extends Component<Props, {}> {
    static navigationOptions = {
        title: 'Havale Bilgilendirme',
        headerStyle: {
          backgroundColor: '#d67676',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };

      

componentDidMount(){

}
render(){
    var moneyOrderTmp  = this.props.navigation.getParam('moneyOrder') as moneyOrder;

        
   

    return(
        <View style={{justifyContent:'center'}}>
            <View style={[stylesNew.inputContainer,{marginTop:20,padding:20}]}>
                <Text  style={{fontFamily:'Roboto-Bold',fontSize:20,textAlign:'center'}}>Havale veya Eft yapilacak Banka</Text>
            <Text style={{textAlign:'center',marginTop:10}}>{moneyOrderTmp.bankName}</Text>
            </View>

            <View style={[stylesNew.inputContainer,{marginTop:20,flexDirection:'row',padding:20}]}>
                <Text  style={{fontFamily:'Roboto-Bold',fontSize:20,textAlign:'center'}}>Siparis No: </Text>
            <Text style={{textAlign:'center',fontFamily:'Roboto-Regular',fontSize:20,color:'#800404'}}>{moneyOrderTmp.orderNo}</Text>
            </View>
            <View style={[stylesNew.inputContainer,{marginTop:20,flexDirection:'row',padding:20}]}>
                <Text  style={{fontFamily:'Roboto-Bold',fontSize:20,textAlign:'center'}}>Siparis Tutari: </Text>
            <Text style={{textAlign:'center',fontFamily:'Roboto-Regular',fontSize:20,color:'#800404'}}>{moneyOrderTmp.disyplayPayTotalAmount}</Text>
            </View>

            <View style={[stylesNew.inputContainer,{marginTop:20,padding:20}]}>
                <Text  style={{fontFamily:'Roboto-Bold',fontSize:20,textAlign:'center'}}>Havale veya Eft yaptiktan sonra bildiriminizi tamamlayiniz</Text>

            </View>
            <Button text="Tamamla" style={{marginHorizontal:10}} />
        </View>
    )
  }
}








export default connect()(MoneyOrderScreen);