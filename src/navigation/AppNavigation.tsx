import React from "react";
import {

  createAppContainer,
  createSwitchNavigator,

} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

import Home from "../screens/AppScreens/Home";
import Blank from "../screens/AppScreens/Blank";
import SideBar from "../screens/AppScreens/SideBar";
import Login from "../screens/AuthScreens/Login";
import AuthLoading from "../screens/AuthLoading";
import SignUpFirstScreen from '../screens/AppScreens/SignUp/SignUpFirstScreen'
import SignUpSecondScreen from '../screens/AppScreens/SignUp/SignUpSecondScreen'
import CourseDetail from '../screens/AppScreens/Home/CourseDetail'
import UserInfoScreen from "../screens/AppScreens/User/UserInfoScreen";
import HomeScreen from '../screens/AppScreens/Home/HomeScreen'
import VideoScreen from '../screens/AppScreens/Home/VideoScreen'
import {Icon } from 'react-native-elements'
import SignUpSecondPhoneVerificationScreen from '../screens/AppScreens/SignUp/SignUpPhoneVerificationScreen'
import CartScreen from '../screens/AppScreens/Home/CartSCreen';
import MyCourses from '../screens/AppScreens/Home/MyCourses';
import LoginPhoneVerifyScreen from '../screens/AuthScreens/Login/LoginPhoneVerifyScreen'
import AdressInformationScreen from '../screens/AppScreens/Basket/AdressInformationScreen'
import CreditCartScreen from '../screens/AppScreens/Basket/CreditCartScreen'
import CheckoutTypeScreen from '../screens/AppScreens/Basket/CheckoutTypeScreen'
import checkoutWebScreen from '../screens/AppScreens/Basket/checkoutWebScreen'
import MoneyOrderScreen from '../screens/AppScreens/Basket/MoneyOrderScreen';
import ProfileEditScreen from '../screens/AppScreens/User/ProfileEditScreen'
import NotificationScreen from "../screens/AppScreens/User/NotificationScreen";
import SettingsScreen from '../screens/AppScreens/User/SettingsScreen';
import HelpSupportScreen from '../screens/AppScreens/User/HelpSupportScreen'
import UserGivenOrderScreen from '../screens/AppScreens/User/UserGivenOrderScreen'
import securityProfileEditScreen from '../screens/AppScreens/User/securityProfileEditScreen'
import UsersAgreementScreen from '../screens/AuthScreens/Login/UsersAgreementScreen'
import UsersPrivacyScreen from '../screens/AuthScreens/Login/UsersPrivacyScreen'

const myCourse = createStackNavigator({
  MyCourse : MyCourses,
  CourseDetail: { screen :CourseDetail },

},{
  navigationOptions : {
    tabBarLabel : 'Kurslarim'
  }
})


const EducationVideoStack = createStackNavigator({
  Home : HomeScreen,
  CourseDetail: { screen :CourseDetail },
  Video: VideoScreen
},{
  navigationOptions : {
    tabBarLabel : 'Anasayfa'
  }
})


const profileStack = createStackNavigator({
  UserInfo : {screen: UserInfoScreen},
  ProfileEdit: ProfileEditScreen,
  Notification: NotificationScreen,
  Settings : SettingsScreen,
  HelpSupport :HelpSupportScreen,
  UserGivenOrder: UserGivenOrderScreen,
  CreditCart :CreditCartScreen,
  securityProfileEdit : {screen : securityProfileEditScreen}
},
{
  navigationOptions : {
    tabBarLabel : 'Profilim'
  }
})

const MainStack = createStackNavigator(
  {
    Login: { screen: Login },
    Home: { screen: HomeScreen },
    CourseDetail : { screen :CourseDetail },
    UserInfo : {screen: profileStack},
   
  },
  {
    initialRouteName: "Home",
    // headerMode: "none",

  }
);


EducationVideoStack.navigationOptions = ( navigation:any ) => {

  let tabBarVisible = true;

  /*let routeName = navigation.state.routes[navigation.state.index].routeName

  if ( routeName == 'Video' ) {
      tabBarVisible = false
  }
*/
  return {
      tabBarVisible,
  }
}


const cartStack =  createStackNavigator({
  Cart : CartScreen,
  Address :AdressInformationScreen,
  CreditCart :CreditCartScreen,
  CheckoutType :CheckoutTypeScreen,
  checkoutWeb : checkoutWebScreen,
  MoneyOrder : MoneyOrderScreen
},{
  navigationOptions : {
    tabBarLabel : 'Sepet'
  }
})






const mainBottomTab = createBottomTabNavigator({
  Education : EducationVideoStack,
  myCourse : myCourse,
  
  cart : cartStack,
  UserInfo : profileStack,
},
{

  defaultNavigationOptions: ({ navigation }) => ({

    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName="";
      if (routeName === 'Education') {
        iconName = `home${focused ? '' : '-outline'}`;
        // Sometimes we want to add badges to some icons.
        // You can check the implementation below.
      } else if (routeName === 'UserInfo') {
        iconName = `settings${focused ? '' : '-outline'}`;
      }
      else if (routeName === 'cart') {
        iconName = `cart${focused ? '' : '-outline'}`;

      }
      else if ( routeName === 'myCourse') {
        iconName = `heart${focused ? '' : '-outline'}`;
      }

      // You can return any component that you like here!
      return <Icon name={iconName} type="material-community" size={25} color={tintColor} />;
    },

    
  }),
  tabBarOptions: {
    activeTintColor: '#e83537',
    inactiveTintColor: '#e83537',
  },
}
);



EducationVideoStack.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if ( routeName == 'Video' ) {
      tabBarVisible = false
  }

  return {
      tabBarVisible,
  }
}





const AuthStack = createStackNavigator(
  {
    
    Login: { screen: Login },
    SignUpFirst : SignUpFirstScreen,
    SignUpSecond : SignUpSecondScreen,
    SignUpPhoneVerify : SignUpSecondPhoneVerificationScreen,
    LoginPhoneVerify : LoginPhoneVerifyScreen,
    userAgreement : UsersAgreementScreen,
    UsersPrivacy : UsersPrivacyScreen
  },
  {
    initialRouteName: "Login",
    // headerMode: "none"
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#e83537',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);




export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      AuthStack: AuthStack,

      MainStack : MainStack,
      mainBottomTab: mainBottomTab,
      VideoScreen: VideoScreen,
      CreditCart:CreditCartScreen
      
    },
    {
      initialRouteName: "mainBottomTab",

    }
  )
);
