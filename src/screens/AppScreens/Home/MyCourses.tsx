import React, { Component } from "react";
import {
  View,

  KeyboardAvoidingView,
  ScrollView,
  Platform, TouchableOpacity, Image, StatusBar
} from "react-native";
import { NavigationScreenProp, NavigationState, SafeAreaView, FlatList } from "react-navigation";


import Icon from "react-native-vector-icons/SimpleLineIcons";

import { Button, FloatingLabelInput } from "../../../components";
import styles from "../../AuthScreens/Login/styles";
import { connect } from "react-redux";
import { AppState } from '../../../redux/store'
import { UserState } from '../../../redux/reducers/SignUpReducers'
import DeviceInfo from 'react-native-device-info';
import { Avatar, Input,Text } from 'react-native-elements';
import Fonts from '../../../Theme/Fonts'
import Colors from '../../../Theme/Colors'
import { CourseHomeListData, getCourseDetail } from "../../../redux/actions/course/homeAction";
import { ICourseBase } from "../../../models/course/coruseItem";
import HTML from 'react-native-render-html';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;

  CourseHomeListData : () => void;
  // getCoursesOrdered : () => void;
  courseBase : ICourseBase;
  getCourseDetail : (id : string ,isCheckouted : boolean) => void;
}




class MyCourses extends Component<Props, {}> {


  static navigationOptions = {
    title: 'Kurslarim',

    headerStyle: {
      backgroundColor: '#d67676',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };


  componentDidMount(){
    this.props.getCoursesOrdered()
  }


  _renderScrollContent(){
    if(this.props.courseBase.courses.some(item => item.isOrdered === true)){
return(
  <FlatList
  data={this.props.courseBase.courses }
  keyExtractor ={item => item.id.toString()}
  renderItem ={({item}) => {
  if(item.isOrdered) {
    return (
      <View>
      <TouchableOpacity onPress = {()=> this.props.getCourseDetail(item.id.toString(),true)} style={[styles.inputContainer,{padding:20}]}>
        <Text style={{fontSize:18,fontFamily:'Roboto-Regular',fontWeight:'bold'}}>{item.name}</Text>
        <HTML html={item.content.replace("Açıklama:","")} style={{ fontFamily: 'Roboto-Regular', marginTop: 10, textAlign: 'center', paddingBottom: 10, fontSize: 16 }}></HTML>
    </TouchableOpacity>
    </View>
    )
  }      
  }
    
  }>
  
  </FlatList>
)
     

    } 
  }

  render() {
    return (
      <SafeAreaView style={[styles.container,{justifyContent:'flex-start'}]} >
       
          <ScrollView style={{paddingTop:20}}>
          {this._renderScrollContent()}


          </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  loading: state.home.loading,
  courseBase: state.home.courseBase

})

function bindToAction(dispatch: any) {
  return {
    CourseHomeListData: () =>
      dispatch(CourseHomeListData()),
      getCourseDetail : (id : string,isCheckouted: boolean) => 
      dispatch(getCourseDetail(id,isCheckouted)),
      // getCoursesOrdered : () => 
      // dispatch(getCoursesOrdered())
  };
}




export default connect(mapStateToProps,bindToAction)(MyCourses)
