import React, { Component, Dispatch } from "react";
import {
  View,
  // Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform, TouchableOpacity
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { controlemail } from "../../../redux/actions/signupActions";
import {  Button, FloatingLabelInput } from "../../../components";
import {Input,Text} from 'react-native-elements'
import styles from "../../AuthScreens/Login/styles";
import { connect } from "react-redux";
import { AppState } from '../../../redux/store'
import FlashMessage,{ showMessage, hideMessage, } from "react-native-flash-message";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isLoadingCheck : boolean;
  isFinishedCheck: boolean;
  isSucceedCheck : boolean;
  controlemail : (email : string,username: string) => void;
}


interface userMail {
  email:string;
  nameSurname : string;


}


const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(4)
    .email()
    .required(),
    nameSurname : Yup.string()
    .min(4)
    .required(),

});

class SignUpFirstScreen extends Component<Props, {}> {

  static navigationOptions = {
    title: 'Kullanıcı Bilgileri',

    headerStyle: {
      backgroundColor: '#e83537',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  showSimpleMessage() {

    if (this.props.isFinishedCheck && (!this.props.isSucceedCheck)) {
      console.log("helaaal")
      showMessage({
        message: "Bu email sistemde Kayitlidir",
        type: "danger",
        icon: 'auto'
      }
      );
    }
  }


  handleLogin = (values : userMail) => {
    const { navigation ,controlemail} = this.props;

    console.log('before action ' + this.props.isLoadingCheck)
    controlemail(values.email,values.nameSurname);
    console.log('after action ' + values.email)
  };



  render() {
    

    return (
      <View style={[styles.container, {justifyContent:'flex-start',paddingTop:50 }] }>
        <KeyboardAvoidingView

          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView  bounces={false}>
            <Formik
              initialValues={{ email: "",nameSurname : "" }}
              validationSchema={loginSchema}
              onSubmit={ val=> this.handleLogin(val)}
            >
              {props => {
        console.log(props);
                return (
                  <View style={{alignContent:'space-between'}}>
                    {/* <View style={styles.headStyle}>
                      <Icon name="emotsmile" size={100} />
                      <Text style={styles.headText}>
                        Build Something Amazing
                      </Text>
                    </View> */}
                    <Text h3  style={{fontFamily:'OpenSans-Regular', alignSelf: 'center', marginTop: 30}}> Kullanıcı Bilgileri</Text>
                    <Text style={{ fontFamily:'OpenSans-Regular',alignSelf: 'center', marginTop: 5}}> Hesabınızı oluşturmak için kullanıcı bilgilerini yazınız</Text>
                    <View style={[styles.inputContainer,{padding:10,marginTop:20}]}>
                    <Input
                        inputStyle={{fontFamily:'OpenSans-Regular',fontSize:15}}
                        placeholder="Adınız Soyadınız"
                        style={{fontFamily:'OpenSans-Regular'}}
                        value={props.values.nameSurname}
                        onChangeText={props.handleChange("nameSurname")}
                        onBlur={props.handleBlur("nameSurname")}
                        // error={props.touched.email && props.errors.email}
                        errorMessage= "Lütfen isminizi giriniz"
                        errorStyle={{height: (props.touched.nameSurname && props.errors.nameSurname) ? 20 : 0,color:'#a31515'}}
                        
                        
                      />
                      <Input
                        inputStyle={{fontFamily:'OpenSans-Regular',fontSize:15}}
                        placeholder="Email Adresiniz"
                        style={{fontFamily:'OpenSans-Regular'}}
                        value={props.values.email}
                        onChangeText={props.handleChange("email")}
                        onBlur={props.handleBlur("email")}
                        // error={props.touched.email && props.errors.email}
                        errorMessage= "Lütfen uygun bir email giriniz"
                        errorStyle={{height: (props.touched.email && props.errors.email) ? 20 : 0,color:'#a31515'}}
                        
                        
                      />
                     

                     
                      
                        <Button loading={this.props.isLoadingCheck}  text="Devam Et" onPress={()=> props.handleSubmit()} />
                        
                       
                      
                      
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
  isSucceedCheck : state.signup.isSucceedCheck

})

function bindToAction(dispatch : any) {
  return {
    controlemail : (email : string,username: string) =>
    dispatch(controlemail(email,username)) 
  };
}

export default connect(mapStateToProps,bindToAction)(SignUpFirstScreen);



