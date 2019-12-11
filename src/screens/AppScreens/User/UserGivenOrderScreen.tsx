import React, { Component } from "react";
import {
    View,

    KeyboardAvoidingView,
    ScrollView,
    Platform, TouchableOpacity, Image, StatusBar, StyleSheet, Switch,FlatList
} from "react-native";
import { NavigationScreenProp, NavigationState, SafeAreaView } from "react-navigation";
import { Text, } from 'react-native-elements'
import { Formik } from "formik";
import * as Yup from "yup";


import { Button, FloatingLabelInput } from "../../../components";
import newStyles from "../../AuthScreens/Login/styles";
import { connect } from "react-redux";
import { AppState } from '../../../redux/store'
import { UserState } from '../../../redux/reducers/SignUpReducers'
import DeviceInfo from 'react-native-device-info';
import { Avatar, Input, Icon } from 'react-native-elements';
import Fonts from '../../../Theme/Fonts'
import Colors from '../../../Theme/Colors'
import { getOrderStatus, IorderStatus, OrderStatus, OrderType } from '../../../redux/actions/CheckoutActions'


interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    getOrderStatus : () => void;
    orderList : IorderStatus[];
    loading : boolean;
}




class UserGivenOrderScreen extends Component<Props, {}> {




    static navigationOptions = {
        title: 'Siparislerim',

        headerStyle: {
            backgroundColor: '#d67676',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    renderStatusbarOnlyIOS() {



    }
    renderItem(item : IorderStatus) {
        var color = "red"
        var colorInBasket  = "#f25f5f"
        var colorMoneyApproved = "#659b7c"
        var colorCompleted = "#659b7c"
        var colorWaitingForMoney = "#bbc276"
        var textFirst = ""
        var textSecond = ""
        var moneyIsTaken = false
        if(item.orderStatus === OrderStatus.InBasket) {
            color = colorInBasket
            textSecond = "Ödeme Yapınız"

        }else if(item.orderStatus === OrderStatus.Completed) {
            color = colorCompleted
            textSecond = "Başarılı"
            moneyIsTaken = true
        }   
        else if(item.orderStatus === OrderStatus.MoneyApproved) {
            color = colorMoneyApproved
            textSecond = "Başarılı"
            moneyIsTaken = true
        }
        else if (item.orderStatus === OrderStatus.WaitingForMoney) {
            color = colorWaitingForMoney
            if(item.paymentType === OrderType.Havale) {
                textSecond = "İşlemde"
                moneyIsTaken = true
            }
            else {
                textSecond = "Başarısız"
            }
    
           
        }
        
        if(item.paymentType === OrderType.Havale) {
            textFirst = "havale"
        }
        else {
            textFirst = "kredi"
        }

        return (

        <View style={[newStyles.inputContainer, { paddingVertical: '5%',paddingHorizontal:'3%',marginTop: 0, paddingBottom: 25, justifyContent: 'flex-start', borderWidth: 1, borderColor: '#d3d3d3' }]}>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
                <Text style={{ borderWidth: 1, borderRadius: 5, padding: 7, borderColor: '#c58585', marginRight: 50,textAlign:'center' }}>S.No : {item.basketId}</Text>
        
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={{ marginTop: 30, color: '#767676' }}>
                            Tutar
        </Text>
                        <Text style={{ marginTop: 10 }}>
                            {item.amount}
        </Text>
                    </View>
                    <View style={{ marginTop: 30, marginLeft: '10%' }}>
                        <Text style={{ color: '#767676' }}>
                            Ödeme Tipi
                    </Text>
                        <Text style={{ marginTop: 10 }}>
                            {textFirst}
                    </Text>
        
                    </View>
        
                </View>
                <TouchableOpacity  style={{ borderBottomColor: 'red', borderBottomWidth: moneyIsTaken ? 0 : 1, alignItems: 'center', marginHorizontal: 20 }}>
                    <Text style={{ marginTop: 20 }}>
                       {moneyIsTaken ? "" : "Ödeme Alınamadı"}
                    </Text>
                </TouchableOpacity>
            </View>
            {/* <View style={{ backgroundColor: '#ababab', height: '50%', width: .5, alignSelf: 'flex-end' }}>
        
            </View> */}
            <View style={{marginLeft:-10,marginTop:5}} >
            <View style={{flexDirection:'row'}}><Icon name="calendar" type="material-community" color="#d67676"  />
                <Text style={{ textAlign: 'left', color: '#727272',marginLeft:10,marginTop:3}}>
                     {item.recordDate}
        </Text></View>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#767676', alignItems: 'center', marginHorizontal: 10 }}>
                    <Text style={{ marginTop: 31, color: '#767676' }}>
                        Sipariş Durumu
        </Text >
                </View>
                <View style={{
                    backgroundColor: color, alignItems: 'center', marginTop: 20, borderRadius: 5, shadowColor: color,
                    shadowOffset: { width: 3, height: 3 },
                    shadowOpacity: .5, marginHorizontal: 20
                }}>
                    <Text style={{ paddingVertical: 10, color: 'white', }}>
                        {textSecond}
        </Text>
        
                </View>
            </View>
        </View>
        
        {/*   asdasdas */}
        
        
        
        {/* asdasd */}
        
        
        
        
        
        
        
        
        </View>
        
        )
    }

    renderList(){
        if(this.props.loading == false) {
            return(
                <FlatList
        // contentContainerStyle={{margin:10}}
//  style={{flex:1}}
        style={{marginTop:20}}
        data={this.props.orderList}
        extraData ={this.props.orderList}
        // style={{flexGrow:0}}
        // keyExtractor={item => item.basketId.toString()}
        renderItem={({ item }) => {
            if (item) {
              return this.renderItem( item );
            }
              return this.renderTheme2({ item });
            }}



        

      />
            )
        }else {
            return(
                <View>
                    <Text>asdasdasd</Text>
                </View>
            )
        }
    }

    componentWillMount() {
       this.props.getOrderStatus()
    }
    render() {
        return (
            <SafeAreaView style={[newStyles.container, { }]} >

                {this.renderList()}

        
               
            </SafeAreaView>
        );
    }

}


const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 15

    },
    profileTextStyle: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: "300",
        fontFamily: 'Roboto-Regular',
        color: '#5e5e5e'
    },
    propsSeperator: {
        width: '90%',
        backgroundColor: '#b57b7b',
        height: .5,
        marginTop: 10,
        alignSelf: 'center'

    }
})




const mapStateToProps = (state : AppState) => ({
    // isFinished : state.login.isFinished,
    // isSucceed : state.login.isSucceed,
    // isLoading : state.courseCheckout.,
    orderList : state.courseCheckout.orderList,
    loading : state.courseCheckout.loading
  })
  
  function bindToAction(dispatch : any) {
    return {
        getOrderStatus : () => 
        dispatch(getOrderStatus()),
    };
  
  }
  

export default connect(mapStateToProps,bindToAction)(UserGivenOrderScreen)
