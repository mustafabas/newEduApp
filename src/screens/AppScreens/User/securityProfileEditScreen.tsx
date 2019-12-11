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
import { IUser, userInfoUpdatePersonal, userUpdatePassword } from "../../../redux/actions/userAction";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  user : IUser;
  userUpdatePassword :  (ownPassword : string, newPassword : string )=> void;
  loading : false;
  isSucceed : false;
  isTried : false;
}

function equalTo(ref: any, msg: any) {
    return Yup.mixed().test({
      name: 'equalTo',
      exclusive: false,
      message: msg || '${path} must be the same as ${reference}',
      params: {
        reference: ref.path,
      },
      test: function(value: any) {
        return value === this.resolve(ref);
      },
    });
  }
  Yup.addMethod(Yup.string, 'equalTo', equalTo);
  

const loginSchema = Yup.object().shape({
    ownPassword: Yup.string()
    .min(4)
    .required(),
    newPassword : Yup.string()
    .required(),
    newPasswordSame : Yup.string().equalTo(Yup.ref('newPassword'), 'Passwords must match').required('Required'),

});

interface personeInfo {
  ownPassword : string;
  newPassword : string;

}

class securityProfileEditScreen extends Component<Props, {}> {


  static navigationOptions = {
    title: 'Güvenlik',

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

  handleLogin = (values : personeInfo) => {
    console.log("niye")

    this.props.userUpdatePassword(values.ownPassword,values.newPassword)
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
            

            <Formik
              initialValues={{ ownPassword: "",newPassword : "",newPasswordSame : "" }}
              validationSchema={loginSchema}
              onSubmit={ val=> this.handleLogin(val)}
            >
              {props => {

                return (

                  
                  <View style={{justifyContent:'center'}}>
                    <View style={[newStyles.inputContainer,{paddingVertical:20,paddingBottom:30,justifyContent:'flex-start'}]}>
            <Text style={[styles.headerTextStyle,{marginBottom:20}]}>Şifre Değiştirme</Text>
              
              <Input leftIconContainerStyle={styles.leftIconContainerStyle} 
              leftIcon={
                <Icon name="lock-open" color="#d67676"/>}
                inputStyle={{fontFamily:'OpenSans-Regular',fontSize:15}}
                placeholder="Mevcut Sifreniz"
                style={{fontFamily:'OpenSans-Regular'}}
                value={props.values.ownPassword}
                onChangeText={props.handleChange("ownPassword")}
                onBlur={props.handleBlur("ownPassword")}
                // error={props.touched.email && props.errors.email}
                errorMessage= "Uygun bir sifre giriniz"
                errorStyle={{height: (props.touched.ownPassword && props.errors.ownPassword) ? 20 : 0,color:'#a31515'}}
                />
              <Input  leftIconContainerStyle={styles.leftIconContainerStyle} 
              leftIcon={
                <Icon name="lock"  color="#d67676"/>}
                 inputStyle={{fontFamily:'OpenSans-Regular',fontSize:15}}
                 placeholder="Yeni Şifreniz"
                 style={{fontFamily:'OpenSans-Regular'}}
                 value={props.values.newPassword}
                 onChangeText={props.handleChange("newPassword")}
                 onBlur={props.handleBlur("newPassword")}
                 // error={props.touched.email && props.errors.email}
                 errorMessage= "Uygun sifre Giriniz"
                 errorStyle={{height: (props.touched.newPassword && props.errors.newPassword) ? 20 : 0,color:'#a31515'}}
                  />
                  <Input  leftIconContainerStyle={styles.leftIconContainerStyle} 
              leftIcon={
                <Icon name="lock"  color="#d67676"/>}
                 inputStyle={{fontFamily:'OpenSans-Regular',fontSize:15}}
                 placeholder="Yeni Şifreniz Tekrar"
                 style={{fontFamily:'OpenSans-Regular'}}
                 value={props.values.newPasswordSame}
                 onChangeText={props.handleChange("newPasswordSame")}
                 onBlur={props.handleBlur("newPasswordSame")}
                 // error={props.touched.email && props.errors.email}
                 errorMessage= "Uygun sifre Giriniz"
                 errorStyle={{height: (props.touched.newPasswordSame && props.errors.newPasswordSame) ? 20 : 0,color:'#a31515'}}
                  />

                   <Button loading={this.props.loading}  style={{marginHorizontal:50,marginTop:40}} text="Guncelle" onPress={()=> props.handleSubmit()} />
            </View>
                    {/* <View style={styles.headStyle}>
                      <Icon name="emotsmile" size={100} />
                      <Text style={styles.headText}>
                        Build Something Amazing
                      </Text>
                    </View> */}
                 
                     
                      
                       
                        
                       
                      
                      


                    
                  </View>
                );
              }}
            </Formik>


            {/* <View style={[newStyles.inputContainer,{padding:20,paddingBottom:30,justifyContent:'flex-start'}]}>
           
            <Text style={styles.headerTextStyle}>Numara ve Sifre</Text>
              <Input  leftIconContainerStyle={styles.leftIconContainerStyle}  leftIcon={
                <Icon name="phone"  color="#d67676"/>
              } value={this.props.user.phoneNumber} inputStyle={styles.inputTextStyle} containerStyle={styles.inputContainerStyle}/>
              <Input secureTextEntry  leftIconContainerStyle={styles.leftIconContainerStyle} leftIcon={
                <Icon name="lock"  color="#d67676"/>
              } value="05333728696" inputStyle={styles.inputTextStyle} containerStyle={styles.inputContainerStyle} />

            </View> */}
             
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



const mapStateToProps = (state: AppState) => ({
  user : state.user.userInfo,
  loading : state.user.loading,
  isSucceed : state.user.isSucceed,
  isTried : state.user.isTried,
})

function bindToAction(dispatch: any) {
  return {
    userUpdatePassword :  (ownPassword : string, newPassword : string ) => 
    dispatch(userUpdatePassword(ownPassword,newPassword)),

  };
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

export default connect(mapStateToProps,bindToAction)(securityProfileEditScreen)
