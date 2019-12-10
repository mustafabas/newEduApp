import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Linking,
  View,TextInput,
  RefreshControl, ViewProps, Picker,Keyboard, KeyboardAvoidingView,TouchableWithoutFeedback, ImageBackground, Easing
} from 'react-native';

import { connect } from "react-redux";
// var SafariView = require('react-native-safari-view');
import {
  SafeAreaView
} from 'react-navigation'
import { Text ,Input} from 'react-native-elements'
import { Button, FloatingLabelInput, LessonSection } from "../../../components";
import stylesNew from "../../AuthScreens/Login/styles";
import DeviceInfo from 'react-native-device-info';
import { cardSwiped } from '../../../redux/actions/CheckoutActions'
import { NavigationScreenProp } from 'react-navigation'

import RNPicker from "rn-modal-picker";
import { AppState } from '../../../redux/store';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import { ICrediCartInfoRequestModel } from '../../../models/course/coruseItem';



export interface Props {
  navigation: NavigationScreenProp<any, any>;
};

class checkoutWebScreen extends Component<Props, {}> {
    static navigationOptions = {
        title: 'Odeme Ekrani',
    
        headerStyle: {
          backgroundColor: '#d67676',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };

      
     
      componentDidMount() { 
       var creditCardInfo = this.props.navigation.getParam("creditCardInfo") as ICrediCartInfoRequestModel;
 

        var url = "http://api.ikonakademi.com/Payment?BasketId="+creditCardInfo.basketId+"&CardNameSurname="+creditCardInfo.nameSurname+"&CreditCardNumber="+creditCardInfo.creditCardNumber+"&Month="+creditCardInfo.month+"&Year="+creditCardInfo.year+"&Cvv2="+creditCardInfo.cvv2;
      Linking.openURL(url).catch((err) => console.error('An error occurred', err));
      console.log()
    }
render(){
   var checkoutFormContent = this.props.navigation.getParam('checkoutFormContent')
   var creditCardInfo = this.props.navigation.getParam("creditCardInfo") as ICrediCartInfoRequestModel;
    // const spin = this.spinValue.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ['0deg', '360deg']
    //   })
    return(
<View >
<WebView source={{ uri: "http://api.ikonakademi.com/Payment?BasketId="+creditCardInfo.basketId+"&CardNameSurname="+creditCardInfo.nameSurname+"&CreditCardNumber="+creditCardInfo.creditCardNumber+"&Month="+creditCardInfo.month+"&Year="+creditCardInfo.year+"&Cvv2="+creditCardInfo.cvv2 }} />  
</View>

    )
  }
}








export default connect()(checkoutWebScreen);