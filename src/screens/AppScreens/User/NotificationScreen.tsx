import React, { Component } from "react";
import {
  View,
  
  KeyboardAvoidingView,
  ScrollView,
  Platform, TouchableOpacity, Image, StatusBar,StyleSheet,Switch
} from "react-native";
import { NavigationScreenProp, NavigationState, SafeAreaView } from "react-navigation";
import {Text,} from 'react-native-elements'
import { Formik } from "formik";
import * as Yup from "yup";

import { controlUsername } from "../../../redux/actions/signupActions";
import { Button, FloatingLabelInput } from "../../../components";
import newStyles from "../../AuthScreens/Login/styles";
import { connect } from "react-redux";
import { AppState } from '../../../redux/store'
import { UserState } from '../../../redux/reducers/SignUpReducers'
import DeviceInfo from 'react-native-device-info';
import { Avatar, Input,Icon } from 'react-native-elements';
import Fonts from '../../../Theme/Fonts'
import Colors from '../../../Theme/Colors'
import { logoutUserService } from '../../../redux/actions/LoginActions'

interface Props {
  navigation: NavigationScreenProp<NavigationState>;

}



class NotificationScreen extends Component<Props, {}> {


    state = {switchValue:false}
    toggleSwitch = (value) => {
        //onValueChange of the switch this function will be called
        this.setState({switchValue: value})
        //state changes according to switch
        //which will result in re-render the text
     }

  static navigationOptions = {
    title: 'Bildirimler',

    headerStyle: {
      backgroundColor: '#d67676',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  renderStatusbarOnlyIOS(){
 
    
  
  }

  

  componentWillMount() {
    // DeviceInfo.hasNotch().then(hasNotch => {
    // })
  }
  render() {
    return (
      <SafeAreaView style={[newStyles.container,{justifyContent:'flex-start'}]} >
          <View style={[newStyles.inputContainer,{justifyContent:'space-between',padding:20,flexDirection:'row',marginTop:20}]}>
          <Text style={styles.inputTextStyle}>
              Bildirimleri Ac kapa
          </Text>
          <Switch
          style={{marginTop:0}}
          onValueChange = {this.toggleSwitch}
          value = {this.state.switchValue}/>
          </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  headerTextStyle : {
    fontFamily: 'Roboto-Regular', fontSize: Fonts.size.regular, fontWeight: '700', color: Colors.text, marginTop: 0    ,marginBottom:0   ,textAlign:'center'
  },
  leftIconContainerStyle : {
      marginLeft: 0,marginRight:5 
  },
  inputContainerStyle  :{
    marginLeft: -10, marginTop: 20
  },
  inputTextStyle : {
    marginLeft: 5,  fontFamily: 'Roboto-Regular',fontSize:18,marginTop:5
  }
})

export default connect()(NotificationScreen)
