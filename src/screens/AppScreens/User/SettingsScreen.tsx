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



class SettingsScreen extends Component<Props, {}> {


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
          <View style={[newStyles.inputContainer,{ paddingTop:15,marginTop:40,paddingBottom:25,justifyContent:'flex-start' }]}>

              
              
              <TouchableOpacity style={styles.profileContainer}>
                <Icon name="logout" type="material-community" color="#d67676" size={25} />
                <Text style={styles.profileTextStyle}>Cikis Yap</Text>
              </TouchableOpacity>
              {/* <View style={styles.propsSeperator}></View> */}
              </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
    profileContainer : {
        flexDirection:'row', 
        marginTop:20,
        marginLeft:15
    
      },
      profileTextStyle : {
        fontSize:20,
        marginLeft:10,
        fontWeight:"300",
        fontFamily:'Roboto-Regular',
        color:'#5e5e5e'
      },
      propsSeperator : {
        width:'90%',
        backgroundColor:'#b57b7b',
        height:.5,
        marginTop:10,
        alignSelf:'center'
    
      }
})

export default connect()(SettingsScreen)
