import React, { Component } from 'react';
import {
    Animated,
    Platform,
    StatusBar,
    StyleSheet,

    View, TextInput, TouchableOpacity,
    RefreshControl, ViewProps, Picker, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback
} from 'react-native';

import { connect } from "react-redux";

import {
    SafeAreaView
} from 'react-navigation'
import { Text, Input } from 'react-native-elements'
import { Button, FloatingLabelInput, LessonSection } from "../../../components";
import stylesNew from "../../AuthScreens/Login/styles";
import DeviceInfo from 'react-native-device-info';
import { adress, getAdressList, adressType } from '../../../redux/actions/CheckoutActions'
import { NavigationScreenProp } from 'react-navigation'

import RNPicker from "rn-modal-picker";
import { AppState } from '../../../redux/store';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import { IBasket } from '../../../models/course/coruseItem';


export enum checkoutType {
    INDIVIDUAL = "individual",
    COMPANY = "company"
}

export interface Props {
    navigation: NavigationScreenProp<any, any>;

};


class CheckoutTypeScreen extends Component<Props, {}> {

    static navigationOptions = {
        title: 'Fatura Tipi',

        headerStyle: {
            backgroundColor: '#d67676',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            radioSelected: 0,

        }

    }


    handleLogin = (values,chType: checkoutType) => {
        let basket : IBasket = this.props.navigation.getParam('basket') as IBasket;


        if(chType === checkoutType.INDIVIDUAL)
        {
            basket.identityNo = values.TCKN
            this.props.navigation.navigate('Address',{
                basket: basket
            })
        }
        else if (chType === checkoutType.COMPANY) {
            basket.taxOffice = values.VergiDairesi;
            basket.taxNumber = values.VergiNo;
            basket.companyName = values.CompanyName;

            this.props.navigation.navigate('Address', {
                basket : basket
            })
        }
         
          
    
      };
    radioClick(id) {
        // this.props.RegisterChanged({props:'sex',value:id})
        this.setState({
            radioSelected: id
        })
    }

    _renderTcOrVergi() {
        if (this.state.radioSelected == 1) {
            return (


                <Formik
                    initialValues={{ TCKN: "" }}

                    onSubmit={values => this.handleLogin(values,checkoutType.INDIVIDUAL)}
                >
                    {props => {

                        return (
                            <View>


                                <View style={stylesNew.inputContainer}>
                                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 18, marginLeft: 10, marginBottom: 5 }}>
                                        Bireysel
            </Text>
                                    <Input maxLength={11} value={props.values.TCKN}
                                        onChangeText={props.handleChange("TCKN")}
                                        onBlur={props.handleBlur("TCKN")}
                                        errorMessage="Lutfen TC Kimlik Numaranizi giriniz"
                                        errorStyle={{ height: (props.touched.TCKN && props.errors.TCKN) ? 20 : 0, color: '#a31515' }}

                                        placeholder="TC kimlik Numarasi" />

                                </View>

                                <Button IsDisabled={!(props.values.TCKN.length === 11)} onPress={() => props.handleSubmit()} style={{ marginHorizontal: 10 }} text="Devam et" />

                            </View>
                        )
                    }
                    }

                </Formik>
            )
        }

        else if (this.state.radioSelected == 2) {
            return (


                <Formik
                    initialValues={{ VergiDairesi: "", VergiNo: "", CompanyName: "" }}

                    onSubmit={values => this.handleLogin(values)}
                >
                    {props => {
                        return (
                            <View>

                          
                            <View style={stylesNew.inputContainer}>
                                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 18, marginLeft: 10, marginBottom: 5 }}>
                                    Kurumsal
                                </Text>
                                <Input maxLength={11} value={props.values.VergiDairesi}
                                    onChangeText={props.handleChange("VergiDairesi")}
                                    onBlur={props.handleBlur("VergiDairesi")}
                                    errorMessage="Lutfen Vergi Dairesini yaziniz"
                                    errorStyle={{ height: (props.touched.VergiDairesi && props.errors.VergiDairesi) ? 20 : 0, color: '#a31515' }}

                                    placeholder="Vergi Dairesi" />
                                <Input value={props.values.VergiNo}
                                    onChangeText={props.handleChange("VergiNo")}
                                    onBlur={props.handleBlur("VergiNo")}
                                    errorMessage="Lutfen Vergi No yaziniz"
                                    errorStyle={{ height: (props.touched.VergiNo && props.errors.VergiNo) ? 20 : 0, color: '#a31515' }}

                                    placeholder="Vergi Numarasi" />

                                <Input value={props.values.CompanyName}
                                    onChangeText={props.handleChange("CompanyName")}
                                    onBlur={props.handleBlur("CompanyName")}
                                    errorMessage="Lutfen sirket ismi yaziniz"
                                    errorStyle={{ height: (props.touched.CompanyName && props.errors.CompanyName) ? 20 : 0, color: '#a31515' }}

                                    placeholder="Sirket ismi" />
                            </View>
                            <Button IsDisabled={!(props.values.CompanyName && props.values.VergiDairesi && props.values.VergiNo)} onPress={()=> props.handleSubmit()} style={{marginHorizontal:10}} text="Devam et" />


                            </View>
                        )
                    }
                    }
                </Formik>
            )
        }





    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: '#e3e3e3', flex: 1, padding: 5 }}>
                <KeyboardAvoidingView
                    enabled
                    keyboardVerticalOffset={100}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView style={{ flex: 1 }} bounces={true} >
                        <View style={[stylesNew.inputContainer, { flexDirection: 'row', justifyContent: 'space-evenly', padding: 20, marginTop: 20 }]}>

                            <TouchableOpacity key={1} style={{ flexDirection: 'row' }} onPress={this.radioClick.bind(this, 1)}>
                                <View style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: '#d67676',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                                    {
                                        1 == this.state.radioSelected ?
                                            <View style={{
                                                height: 15,
                                                width: 15,
                                                borderRadius: 7.5,
                                                backgroundColor: '#d67676',
                                            }} />
                                            : null
                                    }

                                </View>
                                <Text style={{ paddingLeft: '1%', marginTop: 0, fontFamily: 'Roboto-Regular', fontSize: 18, color: '#474747' }}>Bireysel</Text>

                            </TouchableOpacity>

                            <TouchableOpacity key={2} style={{ flexDirection: 'row', marginLeft: 50 }} onPress={this.radioClick.bind(this, 2)}>
                                <View style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: '#d67676',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                                    {
                                        2 == this.state.radioSelected ?
                                            <View style={{
                                                height: 15,
                                                width: 15,
                                                borderRadius: 7.5,
                                                backgroundColor: '#d67676',
                                            }} />
                                            : null
                                    }

                                </View>
                                <Text style={{ paddingLeft: '1%', marginLeft: 3, fontFamily: 'Roboto-Regular', color: '#474747', fontSize: 18 }}>Kurumsal</Text>
                            </TouchableOpacity>

                        </View>

                        {this._renderTcOrVergi()}


                    </ScrollView>



                </KeyboardAvoidingView>


            </SafeAreaView>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    searchBarContainerStyle: {
        marginBottom: 10,
        flexDirection: "row",
        height: 40,
        shadowOpacity: 1.0,
        shadowRadius: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        backgroundColor: "rgba(255,255,255,1)",
        shadowColor: "#d3d3d3",
        borderRadius: 10,
        elevation: 3,
        marginLeft: 10,
        marginRight: 10
    },

    selectLabelTextStyle: {
        color: "#000",
        textAlign: "left",
        width: "99%",
        padding: 10,
        flexDirection: "row"
    },
    placeHolderTextStyle: {
        color: "#D3D3D3",
        padding: 10,
        textAlign: "left",
        width: "99%",
        flexDirection: "row"
    },
    dropDownImageStyle: {
        marginLeft: 10,
        width: 10,
        height: 10,
        alignSelf: "center"
    },

    pickerStyle: {
        marginLeft: 18,
        elevation: 3,
        paddingRight: 25,
        marginRight: 10,
        marginBottom: 2,
        shadowOpacity: 1.0,
        shadowOffset: {
            width: 1,
            height: 1
        },
        borderWidth: 0.5,
        shadowRadius: 10,
        borderColor: "#e1e1e1",
        backgroundColor: "rgba(255,255,255,1)",
        shadowColor: "#d3d3d3",
        borderRadius: 5,
        flexDirection: "row"
    }
});






export default connect()(CheckoutTypeScreen);