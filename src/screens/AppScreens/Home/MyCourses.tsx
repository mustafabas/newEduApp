import React, { Component } from "react";
import {
  View,

  KeyboardAvoidingView,
  ScrollView,
  Platform, TouchableOpacity, Image, StatusBar,AsyncStorage
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

import stylesNew from '../../AuthScreens/Login/styles'

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



  constructor(props : any) {
    super(props);

    this.state = {
      

      userIsLogin : false
    };

  }

  

// componentWillMount(){
//   try {
//     AsyncStorage.getItem('userId',(err,item) => {
//       if (item) {
//         this.setState({userIsLogin : true})
//       }
//       else {

//       }
//     });
//     } catch (err) {
    
//   }
// }

  componentDidMount(){
    try {
      AsyncStorage.getItem('userId',(err,item) => {
        if (item) {
          this.setState({userIsLogin : true})
        }
        else {
          console.log("offff")

        }
      });
      } catch (err) {
      
    }
  }


  _renderScrollContent(){

   if(this.state.userIsLogin) {
     console.log("helall")
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
   }else {
     console.log("neden")
     console.log(this.state.userIsLogin)
     return(
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('AuthLoading')} style={{flex:1,margin:30,paddingVertical:20,borderWidth:1,borderColor:'#c2c2c2',borderRadius:5,padding:10,alignItems:'center'}}>
          <Text style={{textAlign:'center',color:'#a14040',fontFamily:'Roboto-Regular',fontSize:16}}>kurs eklemek icin giris yapin</Text>
        </TouchableOpacity>
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
