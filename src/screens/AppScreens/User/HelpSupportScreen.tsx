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


class HelpSupportScreen extends Component<Props, {}> {


  static navigationOptions = {
    title: 'Yardim ve Destek',

    headerStyle: {
      backgroundColor: '#e83537',
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

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >

          <ScrollView bounces={false} contentContainerStyle={{}}>
          <TouchableOpacity onPress={()=>this.props.getCart()} style={{flex:1,margin:30,marginTop:70,borderWidth:1,borderColor:'#c2c2c2',borderRadius:5,padding:10,alignItems:'center'}}>
          <Text style={{textAlign:'center',color:'#a14040'}}>Herhangi bi sorunla karsilasirsaniz mesaj birakabilirsiniz</Text>
        </TouchableOpacity>


          <Formik
              initialValues={{ Message: "" }}

              onSubmit={ val => this.navigateToOtherScreen(val.Adress)}
            >
              {props => {
        
                return (

                      <View style={[newStyles.inputContainer,{padding:20,paddingBottom:0}]} >
  <Input
                      multiline numberOfLines={3}
                        inputStyle={{fontFamily:'Roboto-Regular',fontSize:15}}
                        placeholder="Mesaj"
                        style={{fontFamily:'OpenSans-Regular'}}
                        value={props.values.Message}
                        onChangeText={props.handleChange("Message")}
                        onBlur={props.handleBlur("Message")}
                        // error={props.touched.email && props.errors.email}
                        errorMessage= "Lutfen bir mesaj giriniz"
                        errorStyle={{height: (props.touched.Message && props.errors.Message) ? 20 : 0,color:'#a31515'}}             
                      />
                    <Button text="Gonder" />
                  </View>
                      
                );
              }}

            </Formik>
        



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
  profileContainer : {
    flexDirection:'row', 
    marginTop:20,
    marginLeft:10

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

export default connect()(HelpSupportScreen)
