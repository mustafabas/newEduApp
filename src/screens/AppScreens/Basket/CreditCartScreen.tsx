import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,

  View,TextInput,
  RefreshControl, ViewProps, Picker,Keyboard, KeyboardAvoidingView,TouchableWithoutFeedback, ImageBackground, Easing
} from 'react-native';

import { connect } from "react-redux";

import {
  SafeAreaView
} from 'react-navigation'
import { Text ,Input} from 'react-native-elements'
import { Button, FloatingLabelInput, LessonSection } from "../../../components";
import stylesNew from "../../AuthScreens/Login/styles";
import DeviceInfo from 'react-native-device-info';
import { cardSwiped,payWithCreditCard } from '../../../redux/actions/CheckoutActions'
import { NavigationScreenProp } from 'react-navigation'

import RNPicker from "rn-modal-picker";
import { AppState } from '../../../redux/store';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import FlashMessage,{ showMessage, hideMessage, } from "react-native-flash-message";
import { WebView } from 'react-native-webview';
import { ICrediCartInfoRequestModel } from '../../../models/course/coruseItem';



export interface Props {
  navigation: NavigationScreenProp<any, any>;
  cardSwiped : (swiped : boolean) => void;
  isCardSwiped : boolean;
  loadingCard:boolean;

  errorMessage : string;
  loading : boolean;
  isTried :boolean;
  isSucceed : boolean;
  payWithCreditCard: (creditCardInfo: ICrediCartInfoRequestModel) => void
};

interface creditCardData{
  name:string;
cardNumber:string;
expireDate:string;
cvv:string;
}



class CreditCartScreen extends Component<Props, {}> {
    static navigationOptions = {
        title: 'Ödeme Sayfası',
    
        headerStyle: {
          backgroundColor: '#d67676',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };

      
  showSimpleMessage() {

    if (this.props.isTried && !(this.props.isSucceed)) {

      showMessage({
        message: this.props.errorMessage,
        type: "danger",
        icon: 'auto'
      }
      );
    }
  
  }
      constructor(props) {
        super(props);
        this.state = { spinAnim: new Animated.Value(0),
            spinAnim2: new Animated.Value(0)
        }
      }

// First set up animation 


// Second interpolate beginning and end values (in this case 0 and 1)



     
      handleLogin = (values: creditCardData) => {
       
     
    const {  payWithCreditCard } = this.props;
    var creditCardInfo:ICrediCartInfoRequestModel={
      basketId:this.props.navigation.getParam("basketId"),
creditCardNumber:values.cardNumber,
cvv2:values.cvv,
nameSurname:values.name,
month:values.expireDate.substr(0,2),
year:values.expireDate.substr(2,2)
    };
    payWithCreditCard(creditCardInfo);
      };


      dondur(){ 
          
    
        console.log(this.props.isCardSwiped)

            Animated.timing(
                this.state.spinAnim,
              {
                toValue: this.props.isCardSwiped ? 0 : 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
    
              }
            ).start(()=> {
                this.props.cardSwiped(true)
            })

    
        }
      dondur2(){ 
          
        console.log(this.props.isCardSwiped)
            
        Animated.timing(
            this.state.spinAnim2,
          {
            toValue: this.props.isCardSwiped ?  1 : 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,

          }
        ).start(()=> {
            this.props.cardSwiped(false)
        });

       }
      





      _renderCard(imageOpacity: number ,spin:any,props:any,spin2 : any,imageOpacity2:any){
          console.log("asd")
          console.log(imageOpacity)
            
          console.log(imageOpacity===1 ? ()=>console.log(this.state.spinAnim.__getValue()) : console.log(this.state.spinAnim.__getValue()) )
          
          if(!this.props.isCardSwiped){
          return(
                <Animated.View opacity={imageOpacity}  style={{transform: [{rotateY: spin}] }}>
                <LinearGradient start={{x: 0.0, y: 0}} end={{x: 1.0, y: 1.0}}  colors={['#752828', '#b05d5d', '#ab8a8a']} style={{height:175,marginHorizontal:10,borderRadius:7,justifyContent:"flex-end"}}>
                            <View
                            style={{flexDirection:'row'}}>
                                <Text style={{margin:20,color:'white'}}>
                                {props.values.cardNumber ? props.values.cardNumber.substr(0,4)+"****".substr(props.values.cardNumber.length,4) : "****"}
                            </Text>
                            <Text style={{margin:20,color:'white'}}>
                                {props.values.cardNumber.length>4 ? props.values.cardNumber.substr(4,4)+"****".substr(props.values.cardNumber.length-4,4) : "****"}
                            </Text>
                            
                            <Text style={{margin:20,color:'white'}}>
                                {props.values.cardNumber.length>8 ? props.values.cardNumber.substr(8,4)+"****".substr(props.values.cardNumber.length-8,4) : "****"}
                            </Text>
                            <Text style={{margin:20,color:'white'}}>
                                {props.values.cardNumber.length>12 ? props.values.cardNumber.substr(12,4)+"****".substr(props.values.cardNumber.length-12,4) : "****"}
                            </Text>
                            </View>
                
                            <Text style={{margin:20,color:'white'}}>
                                {props.values.name ? props.values.name : "Ikon Akademi"}
                            </Text>
                            </LinearGradient>
                            </Animated.View>
              )
          }
          else {
              return(
                <Animated.View  opacity={imageOpacity2}  style={{transform: [{rotateY: spin2}] }} >
                <LinearGradient start={{x: 0.0, y: 0}} end={{x: 1.0, y: 1.0}}  colors={['#752828', '#b05d5d', '#ab8a8a']} style={{height:175,marginHorizontal:10,borderRadius:7,justifyContent:"flex-end"}}>
                            
                            
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <View>
                                <Text style={{margin:20,marginBottom:10,color:'white'}}>
                                Expr Date  
                            </Text>
                            <View style={{flexDirection:'row'}}>
                            <Text style={{marginLeft:20,marginBottom:20,color:'white'}}>
                                {props.values.expireDate ? props.values.expireDate.substr(0,2) +  "XX".substr(props.values.expireDate.length,2) : "XX"}
                            </Text>
                            <Text style={{marginLeft:2,marginBottom:20,color:'white'}}>
                             / 
                             </Text>
                            <Text style={{marginLeft:2,marginBottom:20,color:'white'}}>
                            {props.values.expireDate.substr(2,2) ? props.values.expireDate.substr(2,2) +  "XX".substr(props.values.expireDate.length-2,2) : "XX"}
                            </Text>

                            </View>
                                </View>

                                <View style={{margin:20,marginRight:40}}>
                                    <Text style={{color:'white'}}>
                                        CVV
                                    </Text>
                                    <Text style={{color:'white',marginTop:10}}>
                                        {props.values.cvv ? props.values.cvv+"***".substr(props.values.cvv.length,3) : "***"}
                                    </Text>
                                </View>
                            </View>
                            </LinearGradient>
                            </Animated.View>
              )
          }
      }
      
render(){
   

    const imageOpacity = this.state.spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

    const spin = this.state.spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
      });

      const imageOpacity2 = this.state.spinAnim2.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

    const spin2 = this.state.spinAnim2.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
      });


    // const spin = this.spinValue.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ['0deg', '360deg']
    //   })
    return(





        <SafeAreaView style={{padding:10}}>
<KeyboardAvoidingView

                    behavior={Platform.OS === "ios" ? "padding" : "height"}

                >
                  <ScrollView bounces={false}>

<Formik
              style={{flex:1}}
              initialValues={{ name: "",cardNumber: "",cvv:"",expireDate:""}}
              // validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)}
            >
              {props => {
                console.log(props, "fdsfsdfdsf");
                return (
             
             <View>
                 {this._renderCard(imageOpacity,spin,props,spin2,imageOpacity2)}
            <Input
                        
                        // inputContainerStyle={{borderWidth:1,borderRadius:5,borderColor:'#a31515',paddingLeft:10}}
                        placeholder="name"
                        maxLength={50}
                        containerStyle={{marginBottom:5}}
                        inputStyle={{fontSize:15,color:'#4f4f4f',fontFamily:'OpenSans-Regular'}}
                        value={props.values.name}
                        onChangeText={props.handleChange("name")}
                        onBlur={()=> {
                            props.handleBlur("name")
                            
                        }}
                        onFocus={()=>this.dondur2()}
                        errorMessage= "Lutfen uygun bir kullanici adi girin"
                        errorStyle={{height: (props.touched.name && props.errors.name) ? 20 : 0,color:'#a31515'}}
                        // error={props.touched.email && props.errors.email}
                        // errorStyle={{borderBottomColor: (props.touched.email && props.errors.email) ? colors.accent : colors.borderColor}}
                      />  
<Input

                        // inputContainerStyle={{borderWidth:1,borderRadius:5,borderColor:'#a31515',paddingLeft:10}}
                        placeholder="cardNumber"
                        maxLength={16}
                        keyboardType="number-pad"
                        containerStyle={{marginBottom:5}}
                        inputStyle={{fontSize:15,color:'#4f4f4f',fontFamily:'OpenSans-Regular'}}
                        value={props.values.cardNumber}
                        onChangeText={props.handleChange("cardNumber")}
                        onBlur={props.handleBlur("cardNumber")}
                        errorMessage= "Lutfen uygun bir kullanici adi girin"
                        onFocus={()=>this.dondur2()}
                        errorStyle={{height: (props.touched.cardNumber && props.errors.cardNumber) ? 20 : 0,color:'#a31515'}}
                        // error={props.touched.email && props.errors.email}
                        // errorStyle={{borderBottomColor: (props.touched.email && props.errors.email) ? colors.accent : colors.borderColor}}
                      />  
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Input

// inputContainerStyle={{borderWidth:1,borderRadius:5,borderColor:'#a31515',paddingLeft:10}}
placeholder="cvv"
maxLength={3}
keyboardType="number-pad"
containerStyle={{marginBottom:5,flex:.4}}
inputStyle={{fontSize:15,color:'#4f4f4f',fontFamily:'OpenSans-Regular'}}
value={props.values.cvv}
onChangeText={props.handleChange("cvv")}
onBlur={()=> {
    props.handleBlur("cvv")
    }
}
onFocus={()=>this.dondur()}
errorMessage= "Lutfen uygun bir kullanici adi girin"

errorStyle={{height: (props.touched.cvv && props.errors.cvv) ? 20 : 0,color:'#a31515'}}
// error={props.touched.email && props.errors.email}
// errorStyle={{borderBottomColor: (props.touched.email && props.errors.email) ? colors.accent : colors.borderColor}}
/>  
<Input

// inputContainerStyle={{borderWidth:1,borderRadius:5,borderColor:'#a31515',paddingLeft:10}}
placeholder="Expire Date"
maxLength={4}
keyboardType="number-pad"
containerStyle={{marginBottom:5,flex:.4}}
inputStyle={{fontSize:15,color:'#4f4f4f',fontFamily:'OpenSans-Regular'}}
value={props.values.expireDate}
onChangeText={props.handleChange("expireDate")}
onBlur={()=> {
    props.handleBlur("expireDate")
    }
}
onFocus={()=>this.dondur()}
errorMessage= "Lutfen uygun bir kullanici adi girin"

errorStyle={{height: (props.touched.expireDate && props.errors.expireDate) ? 20 : 0,color:'#a31515'}}
// error={props.touched.email && props.errors.email}
// errorStyle={{borderBottomColor: (props.touched.email && props.errors.email) ? colors.accent : colors.borderColor}}
/>  
</View>

  <Button
     onPress={()=> props.handleSubmit()}
     loading={this.props.loadingCard}
   text="Odeme Yap" IsDisabled={!(props.values.cardNumber.length==16 && props.values.cvv.length==3 && props.values.expireDate.length==4 && props.values.name.length>5)} />

                    </View>
                );
              }}
            </Formik>
            </ScrollView>
            </KeyboardAvoidingView>
            {this.showSimpleMessage()}
      </SafeAreaView>
    )
  }
}






const mapStateToProps = (state: AppState) => ({
  isCardSwiped : state.courseCheckout.isCardSwiped,
  // loadingCard : state.cart.loadingCard,
  errorMessage : state.courseCheckout.CardErrorMessage,
  loading : state.courseCheckout.loading,
  isTried : state.courseCheckout.isTried,
    isSucceed : state.courseCheckout.isSucceed,
})

function bindToAction(dispatch: any) {
  return {
    
      cardSwiped : (swiped : boolean ) =>
      dispatch(cardSwiped(swiped)),
      payWithCreditCard : (creditCardInfo:ICrediCartInfoRequestModel) =>
      dispatch(payWithCreditCard(creditCardInfo)),
  };
}



export default connect(mapStateToProps,bindToAction)(CreditCartScreen);