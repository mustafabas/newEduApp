import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform, TouchableOpacity
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";

import { loginFirstStep} from "../../../redux/actions/LoginActions";
import {Input,Image, Avatar,Icon,Button as NewButton} from 'react-native-elements'
import { Button, FloatingLabelInput } from "../../../components";
import { AppState } from '../../../redux/store'
import { connect } from "react-redux";
import { colors } from "../../../constants";
import styles from "./styles";
import LinearGradient from 'react-native-linear-gradient';
import FlashMessage,{ showMessage, hideMessage, } from "react-native-flash-message";


interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isFinished : boolean;
  isSucceed : boolean;
  isLoading : boolean;
  loginFirstStep : (email : string , password : string ) => void;

}
interface userData {
  email: string;
  password: string;
  
}



const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required(),
  password: Yup.string()
    .matches(/^[a-zA-Z]+(\s?[a-zA-z]+)*$/)
    .min(6)
    .max(16)
    .required()
});

class Login extends Component<Props, {}> {

  showSimpleMessage() {

    if (this.props.isFinished && (!this.props.isSucceed)) {

      showMessage({
        message: "Kullanici Adi veya yanlis",
        type: "danger",
      }
      
      );

    }
  
  }


  

 
  handleLogin = (values: userData) => {
    console.log("asd "+this.props.isLoading)
    

    const { navigation,isSucceed,isFinished,isLoading,loginFirstStep } = this.props;
      loginFirstStep(values.email, values.password);
      
      console.log("sdsds")
     
      

  };

 

  render() {
    if(this.props.isLoading){
      console.log("yükleniyor");
    }
    if(this.props.isSucceed){
      this.props.navigation.navigate("LoginPhoneVerify");
    }
    return (
      <View style={styles.container}>
        {/* <LinearGradient style={{flex:1}} colors={['#ff4259', '#db5c6b', '#ffb5be']} > */}
       
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
          <Avatar imageProps={{resizeMode:'contain'}} size='large' rounded containerStyle={{alignSelf:'center',marginTop:40,marginBottom:10}} source={require('../../../assets/logo.png')} />

            <Formik
              initialValues={{ email: "", password: "" }}
              // validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)}
            >
              {props => {
                console.log(props, "fdsfsdfdsf");
                return (
                  <View>
                    {/* <View style={styles.headStyle}>
                      <Icon name="emotsmile" size={100} />
                      <Text style={styles.headText}>
                        Build Something Amazing
                      </Text>
                    </View> */}
                    
 
                    <View style={[styles.inputContainer,{paddingTop:20}]}>
                      <Input
                        
                        inputContainerStyle={{borderWidth:1,borderRadius:5,borderColor:'#a31515',paddingLeft:10}}
                        placeholder="email"

                        containerStyle={{marginBottom:5}}
                        inputStyle={{fontSize:15,color:'#4f4f4f',fontFamily:'OpenSans-Regular'}}
                        value={props.values.email}
                        onChangeText={props.handleChange("email")}
                        onBlur={props.handleBlur("email")}
                        errorMessage= "Lutfen uygun bir kullanici adi girin"
                        errorStyle={{height: (props.touched.email && props.errors.email) ? 20 : 0,color:'#a31515'}}
                        // error={props.touched.email && props.errors.email}
                        // errorStyle={{borderBottomColor: (props.touched.email && props.errors.email) ? colors.accent : colors.borderColor}}
                      />  
                     
                      <Input
                      inputContainerStyle={{borderWidth:1,borderRadius:5,borderColor:'#a31515',paddingLeft:10}}
                      inputStyle={{fontSize:15,color:'#4f4f4f',fontFamily:'OpenSans-Regular'}}
                        placeholder="Password"
                        value={props.values.password}
                        onChangeText={props.handleChange("password")}
                        onBlur={props.handleBlur("password")}
                        secureTextEntry
                        errorMessage= "Lutfen uygun bir kullanici adi girin"
                        errorStyle={{height: (props.touched.password && props.errors.password) ? 20 : 0,color:'#a31515'}}
                          />
                          <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:15}}>
                          <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignUpFirst')} style={{ marginTop: 10 }}>
                        <Text style={{color:'#a31515',fontFamily:'OpenSans-Regular'}}>
                          Uye Ol
                          </Text>
                          </TouchableOpacity >
                          <TouchableOpacity style={{ marginTop: 10 }}>
                        <Text style={styles.forgotPassword}>
                          Şifremi Unuttum
                          </Text>
                          </TouchableOpacity >
                          </View>
                      

                        <Button IsDisabled={false} loading={this.props.isLoading} text="Giriş Yap" style={{marginHorizontal:10}} onPress={props.handleSubmit} />
                        <Button loading={false} IsDisabled={false} text="Facebookla Baglan" style={{ marginHorizontal:10, borderRadius:5,backgroundColor:'#4267B2',shadowColor: '#4267B2',marginTop:0}}  />
             
                        <View style={{flexDirection:'row',marginHorizontal:10,justifyContent:'space-evenly',flex:1,marginBottom:10}}>
              <NewButton titleStyle={{color:"black",fontFamily:'OpenSans-Regular',marginLeft:5}} containerStyle={{flex:0.5,marginRight:20}} buttonStyle={{backgroundColor:'white',
              shadowColor: '#6e72ff',
              shadowOffset: {width: 3, height: 3 },
              shadowOpacity: .5,}}
              icon={

      <Image style={{width:32,height:32}} source={require('../../../assets/iconGoogle2.png')} />

  } title="Google" >
                {/*  */}
               </NewButton>

            <NewButton titleStyle={{color:'black',fontFamily:'OpenSans-Regular',marginLeft:5}} title="Linkedin" buttonStyle={{backgroundColor:'white'}} containerStyle={{flex:.5,borderRadius:5,shadowColor: '#6e72ff',
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,}}   icon={

      <Image style={{width:32,height:32}} source={require('../../../assets/linkedin.png')} />

  } />
                    
              </View>
                      
                      
                    </View>
                    {/* <View style={{alignItems:'center',marginTop:20}}>
                       <TouchableOpacity onPress={()=>this.props.navigation.navigate("SignUpStack")} style={{ marginTop: 10 }}>
                        <Text style={{color:'blue'}} >
                          Sign Up
                          </Text>
                          </TouchableOpacity >
                    </View> */}
         
        
                  </View>
                );
              }}
            </Formik>
              
          </ScrollView>
        </KeyboardAvoidingView>
        {this.showSimpleMessage()}
        {/* </LinearGradient> */}
       

      </View>
    );
  }
}



const mapStateToProps = (state : AppState) => ({
  isFinished : state.login.isFinished,
  isSucceed : state.login.isSucceed,
  isLoading : state.login.isLoading,
})

function bindToAction(dispatch : any) {
  return {
    loginFirstStep : (email:string , password : string) =>
    dispatch(loginFirstStep(email,password))
 
  };

}


export default connect(mapStateToProps,bindToAction)(Login);

