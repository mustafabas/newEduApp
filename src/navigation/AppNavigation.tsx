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
const MainStack = createStackNavigator(
  {
    Login: { screen: Login },
    Home: { screen: HomeScreen },
    CourseDetail : { screen :CourseDetail },
    UserInfo : {screen: UserInfoScreen}
  },
  {
    initialRouteName: "Home",
    // headerMode: "none",

  }
);

const myCourse = createStackNavigator({
  MyCourse : MyCourses
})



const EducationVideoStack = createStackNavigator({
  Home : HomeScreen,
  CourseDetail: { screen :CourseDetail },

  Video: VideoScreen

},{
  // headerMode:'none'
})


const profileStack = createStackNavigator({
  UserInfo : {screen: UserInfoScreen}
},
{
  // headerMode:'none'
})


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
  Cart : CartScreen
})






const mainBottomTab = createBottomTabNavigator({
  Education : EducationVideoStack,
  UserInfo : profileStack,
  cart : cartStack,
  myCourse : myCourse
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
    activeTintColor: '#d67676',
    inactiveTintColor: '#d67676',
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
    LoginPhoneVerify : LoginPhoneVerifyScreen
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);




export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      AuthStack: AuthStack,

      MainStack : MainStack,
      mainBottomTab: mainBottomTab,
      VideoScreen: VideoScreen
      
    },
    {
      initialRouteName: "AuthStack",

    }
  )
);