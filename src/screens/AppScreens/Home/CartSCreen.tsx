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
import { ICourseBase } from "../../../models/course/coruseItem";
import {courseType } from '../../../redux/actions/course/homeAction'
import { removeItemFromCart} from '../../../redux/actions/course/cartAction'
import HTML from 'react-native-render-html';
interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  getCart : () => void;
  courseBase : ICourseBase;
  loading :boolean;
  removeItemFromCart : (courseType: courseType ,id : string, courseBase : ICourseBase[]) => void;
}


class CartScreen extends Component<Props> {

    constructor(props : any) {
        super(props);
    
        this.state = {
          
          refreshing: false,

        };
    
    
    
      }
  

  componentDidMount() {
    this.props.getCart();
  }
  componentWillMount() {
   
    console.log(this.props.courses)
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


  renderComponent() {
    if(this.props.courses.length>0) {
      return(
        <FlatList
        // contentContainerStyle={{margin:10}}

        data={this.props.courses}
        // style={{flexGrow:0}}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
        <View style={[styles.inputContainer,{padding:10,flexDirection:'row'}]}>
        <View style={{flex:0.9}}>
        <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'Roboto-Regular'}}>{item.id} </Text>
        <HTML html={item.content} style={{ fontFamily: 'Roboto-Regular', marginTop: 10, fontSize: 16 }}></HTML>

        <Text style={{fontSize:15,fontFamily:'Roboto-Regular',fontWeight:'bold',marginTop:10}}>Fiyat: 50 TL</Text>
        </View>
        <TouchableOpacity onPress={()=> this.props.removeItemFromCart(item.id.toString(), this.props.courses)} style={{flex:0.1}}>
        <Icon name="close" size={30} type="material-community" color="#d67676"/>
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


      <SafeAreaView style={[styles.container,{justifyContent:'space-between',marginTop:20}]}>
        <NavigationEvents
          onWillFocus={()=> this.props.getCart()}
        />

        <ScrollView
        
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

          {this.renderComponent()}

       
       
        </ScrollView>
        
       <View style={{width:'100%',padding:10,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#ffe3e3'}}>
           <Text style={{fontFamily:'Roboto-Regular',fontSize:20,fontWeight:'bold',marginTop:5}}>TOPLAM : {this.props.courses.reduce((prev,next) => prev + parseInt(next.displayPrice),0)}</Text>
           
           <Button disabled={this.props.courses.length<1} buttonStyle={{ backgroundColor: '#db5c6b' }} title="Alisverisi Tamamla"  containerStyle={{  }} titleStyle={{ fontFamily: 'Roboto-Regular', fontSize: 15, marginLeft: 7 }} icon={<Icon name="basket" color="white" />} />
                    
       </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state : AppState) => ({
  courses : state.cart.courses,
  loading : state.cart.loading
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
