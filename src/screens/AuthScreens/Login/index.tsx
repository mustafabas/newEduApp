import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform, TouchableOpacity,Alert, Dimensions, ImageBackground
} from "react-native";
import { WebView } from 'react-native-webview';
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";

import { loginFirstStep,socialLogin, socialTypes} from "../../../redux/actions/LoginActions";
import {Input,Image, Avatar,Icon,Button as NewButton} from 'react-native-elements'
import { Button, FloatingLabelInput } from "../../../components";
import { AppState } from '../../../redux/store'
import { connect } from "react-redux";
import { colors } from "../../../constants";
import styles from "./styles";
import LinearGradient from 'react-native-linear-gradient';
import FlashMessage,{ showMessage, hideMessage, } from "react-native-flash-message";
import { GoogleSignin } from '@react-native-community/google-signin';

import LinkedInModal,{LinkedInToken} from 'react-native-linkedin'

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isFinished : boolean;
  isSucceed : boolean;
  isLoading : boolean;
  loginFirstStep : (email : string , password : string ) => void;
  socialLogin : (socialType :socialTypes, data? : LinkedInToken) => void;
}
interface userData {
  email: string;
  password: string;
  
}



const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('email required')
    .min(4)
    .required(),
  password: Yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .min(6)
    .max(16)
    .required()
});

class Login extends Component<Props, {}> {
  static navigationOptions = {


    header: null
  };


  showSimpleMessage() {

    if (this.props.isFinished && (!this.props.isSucceed)) {

      showMessage({
        message: "Email veya sifre hatali",
        type: "danger",
        icon: 'auto'
      }
      );
    }
  
  }

  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.linkedRef = React.createRef<LinkedInModal>()
    this.renderLinkedin = this.renderLinkedin.bind(this);
  }



linkedRef = React.createRef<LinkedInModal>()

renderLinkedin(){
  
  return (


   <NewButton titleStyle={{color:"black",fontFamily:'OpenSans-Regular',marginLeft:5}}  buttonStyle={{backgroundColor:'white',
              shadowColor: '#6e72ff',
              shadowOffset: {width: 3, height: 3 },
              flex:.5,
              shadowOpacity: .5,paddingHorizontal:20}}
              onPress={()=> this.linkedRef.current.open()}
              icon={
              
      <Image style={{width:32,height:32}} source={require('../../../assets/linkedin.png')} />

  } title="Linkedin" >
                {/*  */}
               </NewButton>

  );
  
}
 
  handleLogin = (values: userData) => {
    console.log("asd "+this.props.isLoading)
    

    const { navigation,isSucceed,isFinished,isLoading,loginFirstStep } = this.props;
      loginFirstStep(values.email, values.password);
    
  };
  render() {
    GoogleSignin.configure({
  iosClientId: '783786716269-c7k7r5hbfsd3t4oqu7df96c2c89ipqb0.apps.googleusercontent.com', // only for iOS
  // webClientId: 'com.googleusercontent.apps.783786716269-c7k7r5hbfsd3t4oqu7df96c2c89ipqb0', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
  accountName: '', // [Android] specifies an account name on the device that should be used
})


    return (
      <ImageBackground source={require('../../../assets/login-back.png')} style={{width: '100%', height: '100%'}}>
        {/* <LinearGradient style={{flex:1}} colors={['#ff4259', '#db5c6b', '#ffb5be']} > */}
       
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
           <TouchableOpacity onPress={()=> this.props.navigation.navigate('mainBottomTab')} style={{flexDirection:'row',marginTop:10,marginLeft:10,justifyContent:'flex-start'}}>
            <Icon name="cancel"  color="white" size={32} />
           </TouchableOpacity>
          <Avatar imageProps={{resizeMode:'contain'}} size='large' rounded containerStyle={{alignSelf:'center',marginBottom:10,marginTop:Dimensions.get('window').height/5-80}} source={require('../../../assets/logo.png')} />

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
                        placeholder="Email"

                        containerStyle={{marginBottom:5}}
                        inputStyle={{fontSize:15,color:'#4f4f4f',fontFamily:'OpenSans-Regular'}}
                        value={props.values.email}
                        onChangeText={props.handleChange("email")}
                        onBlur={props.handleBlur("email")}
                        errorMessage= "Lütfen uygun bir email adresi giriniz"
                        errorStyle={{height: (props.touched.email && props.errors.email) ? 20 : 0,color:'#a31515'}}
                        // error={props.touched.email && props.errors.email}
                        // errorStyle={{borderBottomColor: (props.touched.email && props.errors.email) ? colors.accent : colors.borderColor}}
                      />  
                     
                      <Input
                      inputContainerStyle={{borderWidth:1,borderRadius:5,borderColor:'#a31515',paddingLeft:10}}
                      inputStyle={{fontSize:15,color:'#4f4f4f',fontFamily:'OpenSans-Regular'}}
                        placeholder="Şifre"
                        value={props.values.password}
                        onChangeText={props.handleChange("password")}
                        onBlur={props.handleBlur("password")}
                        secureTextEntry
                        errorMessage= "Lütfen uygun bir şifre giriniz"
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
                      

                        <Button IsDisabled={false} loading={this.props.isLoading} text="Giriş Yap" style={{marginHorizontal:10}} 
                        onPress={()=> props.handleSubmit()}

                         />
                        <Button loading={false} IsDisabled={false} onPress={()=>this.props.socialLogin(socialTypes.FACEBOOK)} text="Facebookla Baglan" style={{ marginHorizontal:10, borderRadius:5,backgroundColor:'#4267B2',shadowColor: '#4267B2',marginTop:0}}  />

     
                        <View style={{flexDirection:'row',marginHorizontal:10,flex:1,marginBottom:10, justifyContent:'center'}}>
              <NewButton titleStyle={{color:"black",fontFamily:'OpenSans-Regular',marginLeft:5}} buttonStyle={{backgroundColor:'white',
              shadowColor: '#6e72ff',
              shadowOffset: {width: 3, height: 3 },
                paddingHorizontal:10,   
              shadowOpacity: .5,flex:.5}}
              
              onPress={()=>this.props.socialLogin(socialTypes.GOOGLE)}
              
              icon={
              
      <Image style={{width:32,height:32}} source={require('../../../assets/iconGoogle2.png')} />

  } title="Google" >
                {/*  */}
               </NewButton>

          

<LinkedInModal

renderButton={this.renderLinkedin}
linkText="Linkedin"
ref={this.linkedRef}
clientID="86z87ykbd1gd7o"
clientSecret="gacKGywa0D8jFjeH"
redirectUri="http://ikonegitim.com"
onSuccess={token => this.props.socialLogin(socialTypes.LINKEDIN,token)} 
permissions={
  ['r_liteprofile', 'r_emailaddress','w_member_social']
}
onError={err => console.log(err)}

/>

                    
              </View>
                      
                      
                    </View>
         
        
                  </View>
                );
              }}
            </Formik>
              
          </ScrollView>
        </KeyboardAvoidingView>
        {this.showSimpleMessage()}
        {/* </LinearGradient> */}
       

      </ImageBackground>
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
    dispatch(loginFirstStep(email,password)),
    socialLogin : (socialType : socialTypes , data? : LinkedInToken) =>
    dispatch(socialLogin(socialType, data))
  };

}


export default connect(mapStateToProps,bindToAction)(Login);

