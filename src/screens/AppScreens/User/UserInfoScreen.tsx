import React, { Component } from "react";
import {
  View,
  
  KeyboardAvoidingView,
  ScrollView,
  Platform, TouchableOpacity, Image, StatusBar,StyleSheet, AsyncStorage, ActivityIndicator
} from "react-native";
import { NavigationScreenProp, NavigationState, SafeAreaView } from "react-navigation";
import {Text,} from 'react-native-elements'
import { Formik } from "formik";
import * as Yup from "yup";


import {getUserInformation, IUser, EditProfile } from '../../../redux/actions/userAction'
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
  getUserInformation : (type : EditProfile) => void;
  logoutUserService : () => void;
  user : IUser;

}
interface UserInfoState{
  userIsLogin?:boolean;
  refreshing:boolean;
}

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required()

});


class UserInfoScreen extends Component<Props, UserInfoState> {


  static navigationOptions = {
    title: 'Profilim',

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


  constructor(props : any) {
    super(props);

    this.state = {
      refreshing: false,
      userIsLogin:undefined
    };

  }

  

  componentDidMount(){
    try {
      AsyncStorage.getItem('userId',(err,item) => {
        if (item) {
          this.setState({userIsLogin : true})
        }
        else {
            this.setState({userIsLogin:false})
        }
      });
      } catch (err) {
      
    }
  }
renderMainComponents(){
  if(this.state.userIsLogin) {
    return(
<View>
<View style={{ paddingTop: 20, alignItems: 'center' }}>
              {/*<Avatar
                onPress={() => this.props.navigation.navigate('App')}
                rounded
                size="large"
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
                showEditButton
              />
              */}

            </View>
            <View style={[newStyles.inputContainer,{ paddingTop:10, marginTop:10,paddingBottom:30,justifyContent:'flex-start' }]}>

              {/* <Input value="bilal oguz marifet" inputStyle={{ color: Colors.text, fontFamily: 'Roboto-Regular' }} containerStyle={{ marginLeft: -10, marginTop: 20 }} />
              <Input value="bilalmarifet@gmail.com" inputStyle={{ color: Colors.text, fontFamily: 'Roboto-Regular' }} containerStyle={{ marginLeft: -10, marginTop: 20 }} />
              <Text style={{ fontFamily: 'Roboto-Regular', fontSize: Fonts.size.regular, fontWeight: '700', color: Colors.text, marginTop: 50 }}>Private Information</Text>
              <Input leftIconContainerStyle={{ marginLeft: 0 }} leftIcon={
                <Icon name="phone" />
              } value="05333728696" inputStyle={{ marginLeft: 5, color: Colors.text, fontFamily: 'Roboto-Regular' }} containerStyle={{ marginLeft: -10, marginTop: 20 }} />
              <Input leftIconContainerStyle={{ marginLeft: 0 }} leftIcon={
                <Icon name="lock" />
              } value="05333728696" inputStyle={{ marginLeft: 5, color: Colors.text, fontFamily: 'Roboto-Regular' }} containerStyle={{ marginLeft: -10, marginTop: 20 }} />


              <Button  style={{ width: 100 }} onPress={() => logoutUserService()} text="Cikis Yap">

              </Button> */}


              <Text style={{textAlign:'center', fontSize:16}} h4>Bilal Oguz Marifet</Text>
              <View style={{marginTop:20}}>
              <TouchableOpacity onPress={()=> this.props.getUserInformation(EditProfile.generalInfo)} style={styles.profileContainer}>
                <Icon name="account" type="material-community" color="#d67676" size={25} />
                <Text style={styles.profileTextStyle}>Profili Duzenle</Text>
               
              </TouchableOpacity>
              <View style={styles.propsSeperator}></View>
              <TouchableOpacity onPress={()=> this.props.getUserInformation(EditProfile.securityInfo)} style={styles.profileContainer}>
                <Icon name="lock-reset" type="material-community" color="#d67676" size={25} />
                <Text style={styles.profileTextStyle}>Güvenlik</Text>
                
              </TouchableOpacity>
              <View style={styles.propsSeperator}></View>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Notification')} style={styles.profileContainer}>
                <Icon name="bell" type="material-community" color="#d67676" size={25} />
                <Text style={styles.profileTextStyle}>Bildirim Ayarlari</Text>
                
              </TouchableOpacity>
              <View style={styles.propsSeperator}></View>

              <TouchableOpacity onPress={()=> this.props.navigation.navigate('HelpSupport')} style={styles.profileContainer}>
                <Icon name="face-agent" type="material-community" color="#d67676" size={25} />
                <Text style={styles.profileTextStyle}>Yardim ve Destek</Text>
              </TouchableOpacity>
              <View style={styles.propsSeperator}></View>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('UserGivenOrder')} style={styles.profileContainer}>
                <Icon name="basket" type="material-community" color="#d67676" size={25} />
                <Text style={styles.profileTextStyle}>Siparislerim</Text>
                
              </TouchableOpacity>
              <View style={styles.propsSeperator}></View>
              <TouchableOpacity onPress={() => logoutUserService()} style={styles.profileContainer}>
                <Icon name="logout" type="material-community" color="#d67676" size={25} />
                <Text style={styles.profileTextStyle}>Cikis Yap</Text>
                
              </TouchableOpacity>
              <View style={styles.propsSeperator}></View>
             
              </View>
              

            </View>


            {/* <Button text="asdasd" onPress={()=> this.props.navigation.navigate('App')} />  */}

            {/* <Icon size={50} name="info"  style={{width:50,height:50,borderRadius:25, color:'white',backgroundColor:'purple' ,textAlign:'center',overflow:"hidden"}}/>   
            */}
</View>
    )
  }else if(this.state.userIsLogin==false) {
    return(
      <View style={[newStyles.inputContainer,{ paddingTop:25,marginTop:60,paddingBottom:30,justifyContent:'flex-start' }]}>

              {/* <Input value="bilal oguz marifet" inputStyle={{ color: Colors.text, fontFamily: 'Roboto-Regular' }} containerStyle={{ marginLeft: -10, marginTop: 20 }} />
              <Input value="bilalmarifet@gmail.com" inputStyle={{ color: Colors.text, fontFamily: 'Roboto-Regular' }} containerStyle={{ marginLeft: -10, marginTop: 20 }} />
              <Text style={{ fontFamily: 'Roboto-Regular', fontSize: Fonts.size.regular, fontWeight: '700', color: Colors.text, marginTop: 50 }}>Private Information</Text>
              <Input leftIconContainerStyle={{ marginLeft: 0 }} leftIcon={
                <Icon name="phone" />
              } value="05333728696" inputStyle={{ marginLeft: 5, color: Colors.text, fontFamily: 'Roboto-Regular' }} containerStyle={{ marginLeft: -10, marginTop: 20 }} />
              <Input leftIconContainerStyle={{ marginLeft: 0 }} leftIcon={
                <Icon name="lock" />
              } value="05333728696" inputStyle={{ marginLeft: 5, color: Colors.text, fontFamily: 'Roboto-Regular' }} containerStyle={{ marginLeft: -10, marginTop: 20 }} />


              <Button  style={{ width: 100 }} onPress={() => logoutUserService()} text="Cikis Yap">

              </Button> */}


              {/* <Text style={{textAlign:'center'}} h4>Bilal Oguz Marifet</Text> */}
              <View style={{marginBottom:20}}>
              <TouchableOpacity  style={styles.profileContainer}>
                <Icon name="help-rhombus" type="material-community" color="#d67676" size={25} />
                <Text style={styles.profileTextStyle}>Sikca Sorulan Sorular</Text>
               
              </TouchableOpacity>
              
              <View style={styles.propsSeperator}></View>

              <TouchableOpacity onPress={()=> this.props.navigation.navigate('HelpSupport')} style={styles.profileContainer}>
                <Icon name="face-agent" type="material-community" color="#d67676" size={25} />
                <Text style={styles.profileTextStyle}>Yardim ve Destek</Text>
              </TouchableOpacity>
              
              <View style={styles.propsSeperator}></View>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('AuthLoading')}  style={styles.profileContainer}>
                <Icon name="logout" type="material-community" color="#d67676" size={25} />
                <Text style={styles.profileTextStyle}>Giris Yap</Text>
                
              </TouchableOpacity>
              <View style={styles.propsSeperator}></View>
             
              </View>
              

            </View>
    )
  }
  else{
    return (<ActivityIndicator></ActivityIndicator>)
  }
}
  
  componentWillMount() {
    // DeviceInfo.hasNotch().then(hasNotch => {
    // })
  }
  render() {
    return (
      <SafeAreaView style={[newStyles.container,{justifyContent:'flex-start'}]} >



          <ScrollView bounces={true} >
          {this.renderMainComponents()}
          </ScrollView>

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



const mapStateToProps = (state: AppState) => ({
  user : state.user.userInfo,
 
  
})

function bindToAction(dispatch: any) {
  return {
    getUserInformation :  (type : EditProfile) =>
    dispatch(getUserInformation(type)),
    logoutUserService : () => 
    dispatch(logoutUserService())
  };
}



export default connect(mapStateToProps,bindToAction )(UserInfoScreen)
