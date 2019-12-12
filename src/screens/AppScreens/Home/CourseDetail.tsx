import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,FlatList,ViewProps,Dimensions, TouchableHighlight,ScrollView,Button
} from 'react-native';

import {
  SafeAreaView
} from 'react-navigation'
import { Input, FloatingLabelInput,LessonSection } from "../../../components";
import stylesNew from "../../AuthScreens/Login/styles";
import DeviceInfo from 'react-native-device-info';
import {NavigationScreenProps,NavigationScreenProp,NavigationScreenComponent,NavigationStackScreenOptions} from 'react-navigation'
import { Header } from 'react-native-elements';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { ICourseItem, ICourseVideoSection } from '../../../models/course/coruseItem';
import { AppState } from '../../../redux/store';
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';
interface NavStateParams {
  someValue: string;
}

export interface Props {
  CourseVideoSection : ICourseVideoSection;
  navigation :  NavigationScreenProp<any,any>;
};


const MyStatusBar = ({ ...props}) => (
  <View style={[styles.statusBar, { backgroundColor:'green' }]}>
    <StatusBar translucent backgroundColor={'green'} {...props} />
  </View>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT ;

var HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT ;
var hasNotchTmp = false

// DeviceInfo.hasNotch().then(hasNotch => {

//   if (hasNotch) {
//     hasNotchTmp = hasNotch

//     HEADER_SCROLL_DISTANCE -=30
//   }
  
  
  
  
  
//     })

class CourseDetail extends Component<Props> {





  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('headerTitle'),
    headerStyle: {
      backgroundColor: '#d67676',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
})





  _renderVideoButton(isShow : boolean,videoLink : string){
    var isCheckout  = this.props.navigation.getParam('isCheckouted')
    console.log(isShow)
    if(isShow || isCheckout) {
      return (
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Video',{videoLink : videoLink})} style={{flex:.05}}>
        <Icon name="arrow-right" type="material-community" size={25}  color={"#d67676"} />
        
        </TouchableOpacity>
      )
    }
    else {
      return (
        <View style={{flex:.05}}>

        </View>
      )
    }
  }
  _renderScrollViewContent() {

  }

  

  componentDidMount(){


  }

 componentWillMount() {

 


 
  
  
  }

  renderHeaderLeft(){
    return (
      <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
        <Icon name="arrow-left" type="material-community" color={"white"} />
      </TouchableOpacity>
    )
  }
  renderCustomHeaderText(){
   
    return (
<Text style={{color:'#fff'}}>{this.props.CourseVideoSection.topicName}</Text>

    );
  }
  renderCustomLeftButton(){
    return (
<Icon
  name='ios-arrow-back'
  type='ionicon'
  color='#fff'
  onPress={() => this.props.navigation.goBack()} />
    );

  }

  _increaseCount = (pos : number) => {
    this.setState({position : pos })

  };


  render() {

    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.


    return (
      <SafeAreaView  style={
        [stylesNew.container,{paddingTop:30}]}>

        {/* <View style={{backgroundColor: '#772ea2'}}>
        {/* <MyStatusBar backgroundColor="black" barStyle="light-content" /> */}

  <StatusBar barStyle="light-content" backgroundColor="#d67676" />


        <ScrollView
          style={styles.fill}

          
          >
          
        

          <View style={{  justifyContent: "center",
    padding: 20,
    margin:10,
    
    shadowColor: '#969696',backgroundColor: 'white',
    marginTop: 0,
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,
    borderRadius: 5,
    elevation:3}}>
      
              <Text style={{fontSize:20}}>{this.props.CourseVideoSection.topicName}</Text>
             
    <HTML html={this.props.CourseVideoSection.content.replace("Açıklama:","")} style={{ fontFamily: 'Roboto-Regular', marginTop: 10, textAlign: 'center', paddingBottom: 10, fontSize: 16 }}></HTML>
         <View style={{flexDirection:'row'}}>
         <Icon name="account-tie" type="material-community" size={25} color="#d67676" ></Icon>
         <Text  style={{fontFamily:'Roboto-Bold',fontSize:18,marginTop:2.5,marginLeft:10,color:'#d67676'}}>{this.props.CourseVideoSection.buyedPersonsCount}</Text>
          </View> 
          </View>

          <Text style={[stylesNew.headText,{marginLeft:30}]}>Dersler</Text>
          {/* <LessonSection onPress={()=>this.props.navigation.navigate('Video')} ></LessonSection> */}
          <FlatList
        // contentContainerStyle={{margin:10}}
        data={this.props.CourseVideoSection.videoItemModels}
        style={{margin:10,borderRadius:10}}
        ItemSeparatorComponent={(item) => <View style={{height:.5,backgroundColor:'#e3e3e3'}}></View>}
          // style={{flexGrow:0}}
        // keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
        <View style={{padding:10,marginBottom:0,flexDirection:'row',backgroundColor:'white',flex:1}}>
        <Text style={{fontFamily:'Roboto-Bold',fontSize:18,flex:0.1}}>{this.props.CourseVideoSection.videoItemModels.indexOf(item)+1}</Text>
        
        <Text style={{fontFamily:'Roboto-Regular',fontSize:18,flex:0.85,paddingRight:0}}>{item.videoName}</Text>
          {this._renderVideoButton(item.isFree,item.videoUrl)}
        </View>
       

        }

      />

        
       
       
          {/* <Text style={styles.title}>Title</Text> */}
</ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#d67676',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    borderWidth:0,

  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: undefined,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28: 0,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -15,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 25  ,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {

    backgroundColor : 'red'
  },
});






const mapStateToProps = (state: AppState) => ({
  CourseVideoSection : state.home.CourseVideoSection
  
})

function bindToAction(dispatch: any) {
  return {
  };
}


export default connect(mapStateToProps)(CourseDetail);
