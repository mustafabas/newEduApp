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

import { WebView } from 'react-native-webview';



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
        var url = "https://www.ikonegitim.com/KrediKarti.aspx?code=317771&kullanici=10092"
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
      }
render(){
   var checkoutFormContent = this.props.navigation.getParam('checkoutFormContent')

   const html = `
      <html>
      <head></head>
      <body>
      <h1>My First JavaScript</h1>
      <button type="button"
onclick="document.getElementById('demo').innerHTML = Date()">
Click me to display Date and Time.</button>
<script>
document.getElementById("demo").innerHTML = "Hello JavaScript!";
</script> 
          </body>
      </html>
    `;



    // const spin = this.spinValue.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ['0deg', '360deg']
    //   })
    return(
<View>

</View>

    )
  }
}








export default connect()(checkoutWebScreen);