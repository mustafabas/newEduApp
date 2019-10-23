import React, { Component } from "react";
import {
  View,

  KeyboardAvoidingView,
  ScrollView,
  Platform, TouchableOpacity, Image, StatusBar
} from "react-native";
import { NavigationScreenProp, NavigationState, SafeAreaView } from "react-navigation";


import Icon from "react-native-vector-icons/SimpleLineIcons";

import { Button, FloatingLabelInput } from "../../../components";
import styles from "../../AuthScreens/Login/styles";
import { connect } from "react-redux";
import { AppState } from '../../../redux/store'
import { UserState } from '../../../redux/reducers/SignUpReducers'
import DeviceInfo from 'react-native-device-info';
import { Avatar, Input,Text } from 'react-native-elements';
import Fonts from '../../../Theme/Fonts'
import Colors from '../../../Theme/Colors'


interface Props {
  navigation: NavigationScreenProp<NavigationState>;

}




class MyCourses extends Component<Props, {}> {


  static navigationOptions = {
    title: 'Kurslarim',

    headerStyle: {
      backgroundColor: '#d67676',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };


  render() {
    return (
      <SafeAreaView style={[styles.container,{justifyContent:'flex-start'}]} >
          <ScrollView style={{paddingTop:20}}>
          <TouchableOpacity style={[styles.inputContainer,{padding:20}]}>
              <Text style={{fontSize:18,fontFamily:'Roboto-Regular',fontWeight:'bold'}}>Simple harmonic motion </Text>
              <Text style={{fontSize:14,fontFamily:'Roboto-Regular',fontWeight:'300',marginTop:5}}>forces newton Law education to get communicate with  </Text>
              <Text style={{fontSize:14,fontFamily:'Roboto-Regular',fontWeight:'100',marginTop:5}}>Physics  </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.inputContainer,{padding:20}]}>
              <Text style={{fontSize:18,fontFamily:'Roboto-Regular',fontWeight:'bold'}}>Simple harmonic motion </Text>
              <Text style={{fontSize:14,fontFamily:'Roboto-Regular',fontWeight:'300',marginTop:5}}>forces newton Law education to get communicate with  </Text>
              <Text style={{fontSize:14,fontFamily:'Roboto-Regular',fontWeight:'100',marginTop:5}}>Physics  </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.inputContainer,{padding:20}]}>
              <Text style={{fontSize:18,fontFamily:'Roboto-Regular',fontWeight:'bold'}}>Simple harmonic motion </Text>
              <Text style={{fontSize:14,fontFamily:'Roboto-Regular',fontWeight:'300',marginTop:5}}>forces newton Law education to get communicate with  </Text>
              <Text style={{fontSize:14,fontFamily:'Roboto-Regular',fontWeight:'100',marginTop:5}}>Physics  </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.inputContainer,{padding:20}]}>
              <Text style={{fontSize:18,fontFamily:'Roboto-Regular',fontWeight:'bold'}}>Simple harmonic motion </Text>
              <Text style={{fontSize:14,fontFamily:'Roboto-Regular',fontWeight:'300',marginTop:5}}>forces newton Law education to get communicate with  </Text>
              <Text style={{fontSize:14,fontFamily:'Roboto-Regular',fontWeight:'100',marginTop:5}}>Physics  </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.inputContainer,{padding:20}]}>
              <Text style={{fontSize:18,fontFamily:'Roboto-Regular',fontWeight:'bold'}}>Simple harmonic motion </Text>
              <Text style={{fontSize:14,fontFamily:'Roboto-Regular',fontWeight:'300',marginTop:5}}>forces newton Law education to get communicate with  </Text>
              <Text style={{fontSize:14,fontFamily:'Roboto-Regular',fontWeight:'100',marginTop:5}}>Physics  </Text>
          </TouchableOpacity>


          </ScrollView>
      </SafeAreaView>
    );
  }
}


export default connect()(MyCourses)
