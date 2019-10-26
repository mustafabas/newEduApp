import React, { Component } from "react";
import {
  View,

  KeyboardAvoidingView,
  ScrollView,
  Platform, TouchableOpacity
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";

import Icon from "react-native-vector-icons/SimpleLineIcons";
import { createUser,sendPhone,compareCodes,countDownForCircle,beforeResendCode } from "../../../redux/actions/signupActions";
import {Input,Text} from 'react-native-elements'
import {  Button, FloatingLabelInput } from "../../../components";
import styles from "../../AuthScreens/Login/styles";
import { AppState } from "../../../redux/store";
import { connect } from "react-redux";
import ProgressCircle from 'react-native-progress-circle'
import { showMessage, } from "react-native-flash-message";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isLoadingCheck : boolean;
  isFinishedCheck: boolean;
  isSucceedCheck : boolean;
  isLoadingCheckSecond : boolean;
  isFinishedCheckSecond : boolean;
  isSucceedCheckSecond : boolean
  createUser : (phoneNumber : string) => void;
  sendPhone : (phoneNumber : string) => void;
  compareCodes : (phoneCode : string, phoneNumber : string) => void;
  error : string;  
  countDownForCircle : (isFinished : boolean) =>void;
  countDown : number;
  beforeResendCode : () => void;

}
interface userData {
  phone : string;
  phoneCode  :String;

}

const loginSchema = Yup.object().shape({
  phone: Yup.string()
    .min(10)
    .max(13)
    .required()
});


class SignUpSecondPhoneVerificationScreen extends Component<Props, {}> {
  showSimpleMessage() {
    
    if ((this.props.isFinishedCheck && (!this.props.isSucceedCheck)) || (this.props.isFinishedCheckSecond && (!this.props.isSucceedCheckSecond))) {

      showMessage({
        message: this.props.error,
        type: "danger",
        icon: 'auto'
      }
      );
    }
  }

  handleLogin = (values: userData) => {
    const { navigation, } = this.props;
    console.log("number" + values.phone)
    this.props.sendPhone(values.phone)
    this.setTimer()
  };


  setTimer() {
      this.interval = setInterval(() => this.tick(), 1000);
  }
 
  componentWillUnmount() {
    clearInterval(this.interval)
  }
    

  constructor(props){
    super(props);
 
  }
  tick() {
      if(this.props.countDown> 0) {
        this.props.countDownForCircle(false)
      }
      else {
        clearInterval(this.interval)
        this.props.beforeResendCode()
      }
    }


      confirmAgain(){
        this.props.countDownForCircle(false)

    }
  progressCircleRender(){
    return(
        <ProgressCircle
        percent={100*this.props.countDown/40}
        radius={50}
        borderWidth={8}
        color="#db5c6b"
        shadowColor="#f28390"
        bgColor="white"
    >

    
        <Text style={{ fontSize: 25 }}>{this.props.countDown}</Text>
    </ProgressCircle>

    );
}



  render() {
    
    return (
      <View style={[styles.container, {justifyContent:'flex-start' ,marginTop:50}] }>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView  bounces={false}>
            <Formik
              initialValues={{ phone: "", phoneCode : ""}}
              validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)}

            >
              {props => {
                console.log(props, "fdsfsdfdsf");
                return (
                  <View style={{alignContent:'space-between'}}>
                    {/* <View style={styles.headStyle}>
                      <Icon name="emotsmile" size={100} />
                      <Text style={styles.headText}>
                        Build Something Amazing
                      </Text>
                    </View> */}
                    <Text h3 style={{alignSelf: 'center', marginTop: 30,fontFamily:'OpenSans-Regular'}}>Telefon Onayi</Text>
                    <Text style={{ alignSelf: 'center', marginTop: 5,fontFamily:'OpenSans-Regular'}}>Lutfen telefon numaranizi giriniz</Text>
                    <View style={{alignSelf:"center",margin:20}}>
                    {this.progressCircleRender()}
                    </View>
                    <View style={[styles.inputContainer,{padding:10,marginTop:20}]}>
                        
                      <View style={{flexDirection:'row'}}>
                      <Input
                      containerStyle={{flex:.15}}
                        keyboardType="phone-pad"
                        maxLength={3}
                        placeholder="+90"
                        defaultValue="+90"
                        onChangeText={props.handleChange("password")}
                        onBlur={props.handleBlur("password")}
                        inputStyle={{fontFamily:'OpenSans-Regular'}}

                      />
                      <Input
                       containerStyle={{flex:.85}}
                        keyboardType="phone-pad"
                        maxLength={13}
                        placeholder="506 680 4389"
                        value={props.values.phone}
                        onChangeText={props.handleChange("phone")}
                        onBlur={props.handleBlur("phone")}
                        inputStyle={{fontFamily:'OpenSans-Regular'}}
                        errorMessage= "Lutfen uygun bir telefon numarasi giriniz"
                        errorStyle={{height: (props.touched.phone && props.errors.phone) ? 20 : 0,color:'#a31515'}}
                        
                      />
                      </View>
                     
                      <View style={{flexDirection:'row'}}>
                          <Input keyboardType="numeric" onChangeText={props.handleChange("phoneCode")}
                        onBlur={props.handleBlur("phoneCode")}
                         value={props.values.phoneCode} inputStyle={{fontFamily:'OpenSans-Regular'}} maxLength={6} containerStyle={{flex:0.6,marginTop:15}} placeholder="Pin Girisi" />
                      <Button IsDisabled={(this.props.isFinishedCheck && this.props.isSucceedCheck) || (this.props.countDown>0 && this.props.countDown<40)} text="Gonder" style={{flex:0.4}} loading={this.props.isLoadingCheck} onPress={()=>props.handleSubmit()} />
                        
                      </View>
                        
                      <Button IsDisabled={!(this.props.isFinishedCheck) && !(props.values.phoneCode.length===6)} text="Onayla" loading={this.props.isLoadingCheckSecond} style={{opacity:199}}  onPress={() =>this.props.compareCodes(props.values.phoneCode,props.values.phone)} />
                    
                      
                      
                    </View>
                   
                    <View style={{alignItems:'center',marginTop:20}}>

                    </View>
                    
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
        {this.showSimpleMessage()}
      </View>
    );
  }
}


const mapStateToProps = (state : AppState) => ({
  isFinishedCheck : state.signup.isFinishedCheck,
  isLoadingCheck : state.signup.laodingCheck,
  isSucceedCheck : state.signup.isSucceedCheck,
  isFinishedCheckSecond : state.signup.isFinishedCheckSecond,
  isSucceedCheckSecond : state.signup.isSucceedCheckSecond,
  isLoadingCheckSecond : state.signup.isLoadingCheckSecond,
  error : state.signup.error,
  countDown : state.signup.countDown,
})

function bindToAction(dispatch : any) {
  return {
    createUser : (phoneNumber : string) =>
    dispatch(createUser(phoneNumber)),
    sendPhone : (phoneNumber : string) =>
    dispatch(sendPhone(phoneNumber)),
    compareCodes : (phoneCode : string, phoneNumber : string) => 
    dispatch(compareCodes(phoneCode,phoneNumber)),
    countDownForCircle : (isFinished : boolean) => 
    dispatch(countDownForCircle(isFinished)),
    beforeResendCode : () => 
    dispatch(beforeResendCode())
  };
}

export default connect(mapStateToProps,bindToAction)(SignUpSecondPhoneVerificationScreen);
