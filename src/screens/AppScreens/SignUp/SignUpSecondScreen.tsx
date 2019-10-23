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
import {Text} from 'react-native-elements'
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { savePassword } from "../../../redux/actions/signupActions";
import { Input, Button, FloatingLabelInput } from "../../../components";
import styles from "../../AuthScreens/Login/styles";
import { AppState } from "../../../redux/store";
import { connect } from "react-redux";
interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isLoadingCheck : boolean;
  isFinishedCheck: boolean;
  isSucceedCheck : boolean;
  savePassword : (password : string ) => void;

}
interface userData {
  password: string;

}

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/^[a-zA-Z]+(\s?[a-zA-z]+)*$/)
    .min(6)
    .max(16)
    .required()
});

class SignUpSecondScreen extends Component<Props, {}> {
  handleLogin = (values: userData) => {
    const { navigation,savePassword } = this.props;
    savePassword(values.password)

  };

  render() {
    if(this.props.isSucceedCheck){
      this.props.navigation.navigate("SignUpSecond");
    }
    return (
      <View style={[styles.container, {justifyContent:'flex-start' ,marginTop:50}] }>
        <KeyboardAvoidingView

          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView  bounces={false}>
            <Formik
              initialValues={{ password: ""}}
              validationSchema={loginSchema}
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
                    <Text h3 style={{alignSelf: 'center', marginTop: 30,fontFamily:'OpenSans-Regular'}}> Bir parola Olustur</Text>
                    <Text style={{ alignSelf: 'center', marginTop: 5,fontFamily:'OpenSans-Regular'}}> Yeni hesabina bir sifre belirle.</Text>
                    <View style={[styles.inputContainer,{padding:10,marginTop:20}]}>
                        
                      <Input
                        placeholder="password"
                        value={props.values.password}
                        onChangeText={props.handleChange("password")}
                        onBlur={props.handleBlur("password")}
                        error={props.touched.password && props.errors.password}
                      />
                     
                      
                        <Button text="Finish" loading={this.props.isLoadingCheck}   onPress={props.handleSubmit} />
                        
                       
                      
                      
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
    savePassword : (password : string) =>
    dispatch(savePassword(password))
    
  };
}

export default connect(mapStateToProps,bindToAction)(SignUpSecondScreen);
