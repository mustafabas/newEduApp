import React, { Component } from "react";
import {
    View,

    KeyboardAvoidingView,
    ScrollView,
    Platform, TouchableOpacity, Image, StatusBar, StyleSheet, Switch
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
import { logoutUserService } from '../../../redux/actions/LoginActions'

interface Props {
    navigation: NavigationScreenProp<NavigationState>;

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



    componentWillMount() {
        // DeviceInfo.hasNotch().then(hasNotch => {
        // })
    }
    render() {
        return (
            <SafeAreaView style={[newStyles.container, { justifyContent: 'flex-start' }]} >
                <View style={[newStyles.inputContainer, { paddingVertical: '5%',paddingHorizontal:'3%',marginTop: 20, paddingBottom: 25, justifyContent: 'flex-start', borderWidth: 1, borderColor: '#d3d3d3' }]}>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ borderWidth: 1, borderRadius: 5, padding: 7, borderColor: '#c58585', marginRight: 50,textAlign:'center' }}>S.No : 121923</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Text style={{ marginTop: 30, color: '#767676' }}>
                                        Tutar
            </Text>
                                    <Text style={{ marginTop: 10 }}>
                                        120.20 TL
            </Text>
                                </View>
                                <View style={{ marginTop: 30, marginLeft: '10%' }}>
                                    <Text style={{ color: '#767676' }}>
                                        Odeme Tipi
                                </Text>
                                    <Text style={{ marginTop: 10 }}>
                                        Kredi Karti
                                </Text>

                                </View>

                            </View>
                            <View style={{ borderBottomColor: 'red', borderBottomWidth: 1, alignItems: 'center', marginHorizontal: 20 }}>
                                <Text style={{ marginTop: 20 }}>
                                    Odeme Alinamadi
                                </Text>
                            </View>
                        </View>
                        {/* <View style={{ backgroundColor: '#ababab', height: '50%', width: .5, alignSelf: 'flex-end' }}>

                        </View> */}
                        <View style={{marginLeft:-10,marginTop:5}} >
                        <View style={{flexDirection:'row'}}><Icon name="calendar" type="material-community" color="#d67676"  />
                            <Text style={{ textAlign: 'left', color: '#727272',marginLeft:10,marginTop:3}}>
                                 19/05/2019
             </Text></View>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#767676', alignItems: 'center', marginHorizontal: 10 }}>
                                <Text style={{ marginTop: 31, color: '#767676' }}>
                                    Siparis Durumu
               </Text >
                            </View>
                            <View style={{
                                backgroundColor: '#659b7c', alignItems: 'center', marginTop: 20, borderRadius: 5, shadowColor: "#659b7c",
                                shadowOffset: { width: 3, height: 3 },
                                shadowOpacity: .5, marginHorizontal: 20
                            }}>
                                <Text style={{ paddingVertical: 10, color: 'white', }}>
                                    Basarili
               </Text>

                            </View>
                        </View>
                    </View>

{/*   asdasdas */}



                    {/* asdasd */}
                   

 
                
                



                </View>
                <View style={[newStyles.inputContainer, { padding: '5%', marginTop: 20, paddingBottom: 25, justifyContent: 'flex-start', borderWidth: 1, borderColor: '#d3d3d3' }]}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ borderWidth: 1, borderRadius: 5, padding: 7, borderColor: '#c58585', marginRight: 50,textAlign:'center' }}>S.No : 121923</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Text style={{ marginTop: 30, color: '#767676' }}>
                                        Tutar
            </Text>
                                    <Text style={{ marginTop: 10 }}>
                                        120.20 TL
            </Text>
                                </View>
                                <View style={{ marginTop: 30, marginLeft: '10%' }}>
                                    <Text style={{ color: '#767676' }}>
                                        Odeme Tipi
                                </Text>
                                    <Text style={{ marginTop: 10 }}>
                                        Kredi Karti
                                </Text>

                                </View>

                            </View>
                            <View style={{ borderBottomColor: 'red', borderBottomWidth: 1, alignItems: 'center', marginHorizontal: 20 }}>
                                <Text style={{ marginTop: 10 }}>
                                    Odeme Alinamadi
                                </Text>
                            </View>
                        </View>
                        {/* <View style={{ backgroundColor: '#ababab', height: '50%', width: .5, alignSelf: 'flex-end' }}>

                        </View> */}
                        <View style={{marginLeft:-10}} >
                            <Text style={{ textAlign: 'left', color: '#727272'}}>
                                Tarih : 19/05/2019
             </Text>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#767676', alignItems: 'center', marginHorizontal: 10 }}>
                                <Text style={{ marginTop: 45, color: '#767676' }}>
                                    Siparis Durumu
               </Text >
                            </View>
                            <View style={{
                                backgroundColor: '#f25f5f', alignItems: 'center', marginTop: 10, borderRadius: 5, shadowColor: "#f25f5f",
                                shadowOffset: { width: 3, height: 3 },
                                shadowOpacity: .5, marginHorizontal: 20
                            }}>
                                <Text style={{ paddingVertical: 10, color: 'white', }}>
                                    Basarili
               </Text>

                            </View>
                        </View>
                    </View>
                </View>
                <View style={[newStyles.inputContainer, { padding: '5%', marginTop: 20, paddingBottom: 25, justifyContent: 'flex-start', borderWidth: 1, borderColor: '#d3d3d3' }]}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ borderWidth: 1, borderRadius: 5, padding: 7, borderColor: '#c58585', marginRight: 50,textAlign:'center' }}>S.No : 121923</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Text style={{ marginTop: 30, color: '#767676' }}>
                                        Tutar
            </Text>
                                    <Text style={{ marginTop: 10 }}>
                                        120.20 TL
            </Text>
                                </View>
                                <View style={{ marginTop: 30, marginLeft: '10%' }}>
                                    <Text style={{ color: '#767676' }}>
                                        Odeme Tipi
                                </Text>
                                    <Text style={{ marginTop: 10 }}>
                                        Kredi Karti
                                </Text>

                                </View>

                            </View>
                            <View style={{ borderBottomColor: 'red', borderBottomWidth: 1, alignItems: 'center', marginHorizontal: 20 }}>
                                <Text style={{ marginTop: 10 }}>
                                    Odeme Alinamadi
                                </Text>
                            </View>
                        </View>
                        {/* <View style={{ backgroundColor: '#ababab', height: '50%', width: .5, alignSelf: 'flex-end' }}>

                        </View> */}
                        <View style={{marginLeft:-10}} >
                            <Text style={{ textAlign: 'left', color: '#727272'}}>
                                Tarih : 19/05/2019
             </Text>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#767676', alignItems: 'center', marginHorizontal: 10 }}>
                                <Text style={{ marginTop: 45, color: '#767676' }}>
                                    Siparis Durumu
               </Text >
                            </View>
                            <View style={{
                                backgroundColor: '#bbc276', alignItems: 'center', marginTop: 10, borderRadius: 5, shadowColor: "#bbc276",
                                shadowOffset: { width: 3, height: 3 },
                                shadowOpacity: .5, marginHorizontal: 20
                            }}>
                                <Text style={{ paddingVertical: 10, color: 'white', }}>
                                    Basarili
               </Text>

                            </View>
                        </View>
                    </View>
                </View>
               
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

export default connect()(UserGivenOrderScreen)
