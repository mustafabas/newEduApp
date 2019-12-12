import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, StatusBar, TouchableOpacity,RefreshControl} from "react-native";
import { NavigationScreenProp, NavigationState,SafeAreaView ,NavigationEvents} from "react-navigation";
import { connect } from "react-redux";
import {Text, Button} from 'react-native-elements'
import { Header } from "../../../components";

import { AvatarItem } from "../../../components";
import styles from "../../AuthScreens/Login/styles";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { ScrollView } from "react-native-gesture-handler";
import { AppState } from "../../../redux/store";
import { getCart } from '../../../redux/actions/course/cartAction'
import { ICourseBase, ICourseItem, ICourseAmount, IBasket } from "../../../models/course/coruseItem";
import {courseType } from '../../../redux/actions/course/homeAction'
import { removeItemFromCart} from '../../../redux/actions/course/cartAction'
import HTML from 'react-native-render-html';
import FlashMessage,{ showMessage, hideMessage, } from "react-native-flash-message";
import AsyncStorage from "@react-native-community/async-storage";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  getCart : () => void;
  courseBase : ICourseBase;
  loading :boolean;
  removeItemFromCart : (courseType: courseType ,id : string, courseBase : ICourseBase[]) => void;
  courses : ICourseItem[];
  courseAmount : ICourseAmount;
}


class CartScreen extends Component<Props> {

  

  


    constructor(props : any) {
        super(props);
    
        this.state = {
          
          refreshing: false,

        };

      }
  
      renderDiscountContainer(){
        if(this.props.courses.length<3) {
          if(this.props.courses.length == 1 && this.props.courses[0].courseType === courseType.COURSE_ALL){

          }
          else {
            return(
              <View style={[styles.inputContainer,{padding:10,flexDirection:'row',backgroundColor:'#c3d9c6'}]}>
  
          <Text style={{fontSize:15,fontWeight:'300',fontFamily:'Roboto-Regular'}}>3 veya daha fazla urun eklerseniz sepette %10 indirim kazanirsiniz </Text>
          
      </View>
            )
          }
          
        }
      }
      getCourses(){
        let courses ="";
        var basket = {}  as IBasket;
        this.props.courses.forEach((element) => {
          basket.courseType = element.courseType
          courses = courses + element.id.toString() + ","
        });
        
        

        basket.courseIds = courses.substring(0,courses.length-1)
        return basket;
      }

      _renderTotalAmount(){
if(this.props.courses.length>0){
return (       <View style={{width:'100%',padding:10,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#ffe3e3'}}>
{this._renderDiscountText()}
<Button onPress={()=> this.userIsLogin()} disabled={this.props.courses.length<1} buttonStyle={{ backgroundColor: '#db5c6b' }} title="Alisverisi Tamamla"  containerStyle={{  }} titleStyle={{ fontFamily: 'Roboto-Regular', fontSize: 15, marginLeft: 7 }} icon={<Icon name="basket" color="white" />} />
         
</View>);
}
      }
  _renderDiscountText(){
    if(this.props.courseAmount.displayDiscountAmount) {
         return(
<View style={{flexDirection:'row'}}>


      <Text style={{fontFamily:'Roboto-Regular',fontSize:20,fontWeight:'bold',marginTop:5,marginRight:10}}>TOPLAM :</Text> 
      <View style={{}}>
        <View style={{flexDirection:'row'}}>
        <Text style={{textDecorationLine:'line-through',fontFamily:'Roboto-Regular'}} >
      {this.props.courseAmount.displayTotalAmount}
      </Text>
      <Text style={{fontFamily:'Roboto-Regular',marginLeft:5}} >
      {`%${this.props.courseAmount.discountRate}`}
      </Text>
        </View>
     
      <Text style={{fontFamily:'Roboto-Regular',fontSize:18,fontWeight:'bold',}}>
      {this.props.courseAmount.displayPayTotalAmount}
      </Text>
      </View> 
      </View>
         )
    }
    else {
      return (
        <Text style={{fontFamily:'Roboto-Regular',fontSize:20,fontWeight:'bold',marginTop:5}}>TOPLAM : {this.props.courseAmount.displayPayTotalAmount} </Text>
           
      )
    }
  }

  
  componentWillMount() {
    this.props.getCart();
    console.log(this.props.courses)



    AsyncStorage.getItem("userId")
  
  }
  static navigationOptions = {
    title: 'Sepet',

    headerStyle: {
      backgroundColor: '#d67676',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  userIsLogin() {
    try {
      AsyncStorage.getItem('userId',(err,item) => {
        if (item) {
          console.log(item)
          this.props.navigation.navigate('CheckoutType',{basket : this.getCourses()})
        }
        else {
          this.props.navigation.navigate('AuthLoading')
        }
      });
      } catch (err) {
      
    }
  }


  renderComponent() {
    if(this.props.courses.length>0) {
      console.log(this.props.courses)
      return(
        <FlatList
        // contentContainerStyle={{margin:10}}

        data={this.props.courses}
        // style={{flexGrow:0}}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
        <View style={[styles.inputContainer,{padding:10,flexDirection:'row'}]}>
        <View style={{flex:0.9}}>
        <Text style={{fontSize:18,fontWeight:'bold',fontFamily:'Roboto-Regular'}}>{item.name} </Text>
        
        {item.content ? <HTML html={item.content.replace("Açıklama:","")} style={{ fontFamily: 'Roboto-Regular', marginTop: 10, fontSize: 15 }}></HTML> : <Text>{item.name}</Text>}

        <Text style={{fontSize:15,fontFamily:'Roboto-Regular',fontWeight:'bold',marginTop:10}}>Fiyat: {item.displayPrice}</Text>
        </View>
        <TouchableOpacity onPress={()=> this.props.removeItemFromCart(item.id.toString(), this.props.courses)} style={{flex:0.1}}>
        <Icon name="close" size={28} type="material-community" color="#d67676"/>
        </TouchableOpacity>
        
    </View>


        }

      />

      );
    }
    else {
      return (
        <TouchableOpacity onPress={()=>this.props.getCart()} style={{flex:1,margin:30,marginTop:70,borderWidth:1,borderColor:'#c2c2c2',borderRadius:5,padding:10,alignItems:'center'}}>
          <Text style={{textAlign:'center',color:'#a14040'}}>lutfen sayfayi yenileyin veya istediginiz egitimleri sayfaya ekleyin</Text>
        </TouchableOpacity>
      )
    }
  }


  render() {


    return (


      <SafeAreaView style={[styles.container]}>
        <NavigationEvents
          onWillFocus={ ()=> this.props.getCart()
            
          }
        />

        <ScrollView
        style={{paddingTop:20}}
        refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.props.getCart();
                setTimeout(() => this.setState({ refreshing: false }), 1000);
              }}


            />
          }
        >
    {this.renderDiscountContainer()}
          {this.renderComponent()}
      
       
       
        </ScrollView>
        {this._renderTotalAmount()}


      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state : AppState) => ({
  courses : state.cart.courses,
  loading : state.cart.loading,
  courseAmount : state.cart.courseAmount
})

function bindToAction(dispatch : any) {
    return {
        getCart : () => 
        dispatch(getCart()),
        removeItemFromCart : (courseType: courseType,id : string, courseBase : ICourseBase[]) => 
        dispatch(removeItemFromCart(courseType,id,courseBase)) 
    }
}



export default connect(mapStateToProps,bindToAction
)(CartScreen);