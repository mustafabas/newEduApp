import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform, TouchableOpacity, Image, StatusBar
} from "react-native";
import { NavigationScreenProp, NavigationState, SafeAreaView } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { controlUsername } from "../../../redux/actions/signupActions";
import { Button, FloatingLabelInput } from "../../../components";
import styles from "../../AuthScreens/Login/styles";
import { connect } from "react-redux";
import { AppState } from '../../../redux/store'
import { UserState } from '../../../redux/reducers/SignUpReducers'
import DeviceInfo from 'react-native-device-info';
import { Avatar, Input } from 'react-native-elements';
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


class UserInfoScreen extends Component<Props, {}> {


  static navigationOptions = {
    title: 'Ayarlar',

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
      <SafeAreaView style={[styles.container]} >
        {this.renderStatusbarOnlyIOS()}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >

          <ScrollView bounces={false} contentContainerStyle={{}}>
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <Avatar
                onPress={() => this.props.navigation.navigate('App')}
                rounded
                size="large"
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
                showEditButton
              />


            </View>
            <View style={{ marginLeft: 20, marginTop: 30 }}>

              <Input value="bilal oguz marifet" inputStyle={{ color: Colors.text, fontFamily: 'Roboto-Regular' }} containerStyle={{ marginLeft: -10, marginTop: 20 }} />
              <Input value="bilalmarifet@gmail.com" inputStyle={{ color: Colors.text, fontFamily: 'Roboto-Regular' }} containerStyle={{ marginLeft: -10, marginTop: 20 }} />
              <Text style={{ fontFamily: 'Roboto-Regular', fontSize: Fonts.size.regular, fontWeight: '700', color: Colors.text, marginTop: 50 }}>Private Information</Text>
              <Input leftIconContainerStyle={{ marginLeft: 0 }} leftIcon={
                <Icon name="phone" />
              } value="05333728696" inputStyle={{ marginLeft: 5, color: Colors.text, fontFamily: 'Roboto-Regular' }} containerStyle={{ marginLeft: -10, marginTop: 20 }} />
              <Input leftIconContainerStyle={{ marginLeft: 0 }} leftIcon={
                <Icon name="lock" />
              } value="05333728696" inputStyle={{ marginLeft: 5, color: Colors.text, fontFamily: 'Roboto-Regular' }} containerStyle={{ marginLeft: -10, marginTop: 20 }} />


              <Button  style={{ width: 100 }} onPress={() => logoutUserService()} text="Cikis Yap">

              </Button>
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


export default connect(null, { logoutUserService })(UserInfoScreen)
