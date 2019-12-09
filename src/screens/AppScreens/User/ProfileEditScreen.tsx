import React, { Component } from "react";
import {
  View,
  
  KeyboardAvoidingView,
  ScrollView,
  Platform, TouchableOpacity, Image, StatusBar,StyleSheet
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

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required()

});


class ProfileEditScreen extends Component<Props, {}> {


  static navigationOptions = {
    title: 'Profil Duzenle',

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
        {this.renderStatusbarOnlyIOS()}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >

          <ScrollView bounces={false} contentContainerStyle={{}}>
           



            <View style={{ marginTop:20 }}>
            <View style={[newStyles.inputContainer,{padding:20,paddingBottom:30,justifyContent:'flex-start'}]}>
            <Text style={styles.headerTextStyle}>Kisisel Bilgiler</Text>
              
              <Input leftIconContainerStyle={styles.leftIconContainerStyle} 
              leftIcon={
                <Icon name="person" color="#d67676"/>} value="bilal oguz marifet" inputStyle={styles.inputTextStyle} containerStyle={styles.inputContainerStyle} />
              <Input  leftIconContainerStyle={styles.leftIconContainerStyle} 
              leftIcon={
                <Icon name="mail"  color="#d67676"/>}
                 value="bilalmarifet@gmail.com" inputStyle={styles.inputTextStyle} containerStyle={styles.inputContainerStyle} />
            </View>
            <View style={[newStyles.inputContainer,{padding:20,paddingBottom:30,justifyContent:'flex-start'}]}>
           
            <Text style={styles.headerTextStyle}>Numara ve Sifre</Text>
              <Input  leftIconContainerStyle={styles.leftIconContainerStyle}  leftIcon={
                <Icon name="phone"  color="#d67676"/>
              } value="05333728696" inputStyle={styles.inputTextStyle} containerStyle={styles.inputContainerStyle}/>
              <Input secureTextEntry  leftIconContainerStyle={styles.leftIconContainerStyle} leftIcon={
                <Icon name="lock"  color="#d67676"/>
              } value="05333728696" inputStyle={styles.inputTextStyle} containerStyle={styles.inputContainerStyle} />

            </View>
             
              {/* <Button  style={{ width: 100 }} onPress={() => logoutUserService()} text="Cikis Yap">

              </Button> */}



            </View>


            {/* <Button text="asdasd" onPress={()=> this.props.navigation.navigate('App')} />  */}

            {/* <Icon size={50} name="info"  style={{width:50,height:50,borderRadius:25, color:'white',backgroundColor:'purple' ,textAlign:'center',overflow:"hidden"}}/>   
            */}
          </ScrollView>
        </KeyboardAvoidingView>
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
    marginLeft: 5,  fontFamily: 'Roboto-Regular'
  }
})

export default connect(null, { logoutUserService })(ProfileEditScreen)
