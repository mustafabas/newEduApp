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
import { loginUserService } from "../../../redux/actions/LoginActions";
import {Input,Text} from 'react-native-elements'
import {  Button, FloatingLabelInput } from "../../../components";
import styles from "../../AuthScreens/Login/styles";
import { AppState } from "../../../redux/store";
import { connect } from "react-redux";
import ProgressCircle from 'react-native-progress-circle'
interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isLoadingCheck : boolean;
  isFinishedCheck: boolean;
  isSucceedCheck : boolean;
  loginUserService : (activationCode : string ) => void;

 
}
interface userData {
  activationCode : string;

}

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/^[a-zA-Z]+(\s?[a-zA-z]+)*$/)
    .min(6)
    .max(16)
    .required()
});


class LoginPhoneVerifyScreen extends Component<Props, {}> {
  handleLogin = (values: userData) => {
    const { navigation, } = this.props;
    this.props.loginUserService(values.activationCode);

  };

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
    

  constructor(props){
    super(props);
    this.state = {
      countDown:50
    }
 
  }
  tick() {
      if(this.state.countDown!=0){
        this.setState(prevState => ({
            countDown: prevState.countDown -1
        }));
      }}


      confirmAgain(){
        this.setState({countDown:60})

    }
  progressCircleRender(){
    return(
        <ProgressCircle
        percent={100*this.state.countDown/60}
        radius={50}
        borderWidth={8}
        color="#db5c6b"
        shadowColor="#f28390"
        bgColor="white"
    >

    
        <Text style={{ fontSize: 25 ,}}>{this.state.countDown}</Text>
    </ProgressCircle>

    );
}



  render() {
    if(this.props.isSucceedCheck){
      this.props.navigation.navigate("mainBottomTab");
    }
    return (
      <View style={[styles.container, {justifyContent:'flex-start' ,marginTop:50}] }>
        <KeyboardAvoidingView

          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView  bounces={false}>
            <Formik
              initialValues={{ activationCode: ""}}
              // validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)
              
              }

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
                          <Input keyboardType="numeric" 
                          onChangeText={props.handleChange("activationCode")}
                        onBlur={props.handleBlur("activationCode")}
                         value={props.values.activationCode} inputStyle={{fontFamily:'OpenSans-Regular'}} maxLength={6} containerStyle={{flex:0.6,marginTop:15}} placeholder="Pin Girisi" />
                      <Button IsDisabled={false} text="Gonder" style={{flex:0.4}} loading={this.props.isLoadingCheck} onPress={props.handleSubmit} />
                        
                      </View>
                        
                      <Button IsDisabled={this.props.isFinishedCheck} text="Onayla" loading={this.props.isLoadingCheck} style={{opacity:199}}  />
                    
                      
                      
                    </View>
                   
                    <View style={{alignItems:'center',marginTop:20}}>

                    </View>
                    
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}


const mapStateToProps = (state : AppState) => ({
  isFinishedCheck : state.signup.isFinishedCheck,
  isLoadingCheck : state.signup.laodingCheck,
  isSucceedCheck : state.signup.isSucceedCheck

})

function bindToAction(dispatch : any) {
  return {
    loginUserService : (actiovationCode : string) =>
    dispatch(loginUserService(actiovationCode))
    
  };
}

export default connect(mapStateToProps,bindToAction)(LoginPhoneVerifyScreen);
