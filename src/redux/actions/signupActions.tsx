import { AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";
import { Dispatch } from "react";
import { CONTROL_EMAIL_STARTED,RESET_PROPS, CONTROL_EMAIL_FAILED, CONTROL_EMAIL_SUCCEED,PHONE_CODE_COMPARE_STARTED,PHONE_CODE_COMPARE_FAILED,PHONE_CODE_COMPARE_SUCCEED, SAVE_PASSWORD_STARTED, SAVE_PASSWORD_FAILED,ERROR_CODE, SAVE_PASSWORD_SUCCEED ,CREATE_USER_STARTED,PHONE_CODE_RECEIVED_FAILED,PHONE_CODE_RECEIVED_SUCCEED, COUNT_DOWN} from './types'

import axios from "axios";
import { EDU_API_CONTROL_EMAIL,EDU_API_CREATE_USER,EDU_API_CREATE_USER_PHONE_VERIFY } from '../../constants'
import { navigate } from "../services/Navigator";


import { Action } from "../../models/action";

enum errorTypes  {
  Email = "Bu Email Kullanimda",
  PhoneCodeDoesntSend = "Telefon Kodu Gonderilemedi",
  PhoneCodeCompareError = "Hatali Telefon Kodu",
  PhoneCodeIsNotValid = "Hatali Telefon Numarasi",
  InternetError = "Lutfen Internete Bagli Oldugunuzdan Emin Olun",
  anyError = "Bi hatayla karsilasildi"
}



export function sendPhone(phoneNumber : string) {
  return(dispatch : Dispatch<Action>) => {
    dispatch(loading(true,true));
    axios.post(EDU_API_CREATE_USER_PHONE_VERIFY, {
      phone : phoneNumber,
      userId: 0
    })
    .then((response) => {
      console.log("res" + response.data)
      if(response.data.isSuccess) {
        console.log("ph" + response)
        console.log(response.data.result)
        AsyncStorage.setItem("PhoneCode", response.data.result)
        dispatch(phonoCodeIsReceieved(true));
        
      }
      else {
        console.log('datafailed')
        dispatch(phonoCodeIsReceieved(false));
        dispatch(error(errorTypes.PhoneCodeIsNotValid))
        dispatch(reset(false));
      }
    }).catch(err => {
      console.log('axios failed')
      dispatch(phonoCodeIsReceieved(false));
      dispatch(error(errorTypes.InternetError))
      dispatch(reset(false));
    })


  }
}

export function beforeResendCode() {
  return (dispatch: Dispatch<Action>) => {
    dispatch(phonoCodeError())
    dispatch(error(errorTypes.PhoneCodeIsNotValid))
    dispatch(reset(true))
  }
}



export function compareCodes(phoneCode : string,phoneNumber : string) {
  console.log('helalll')
  return(dispatch : Dispatch<Action> ) => {
    dispatch(loading(true,false));
    AsyncStorage.getItem("PhoneCode").then((res)=> {
      console.log(res)
      if(res === phoneCode) {
        console.log('helalll2 ')
      AsyncStorage.multiGet(["userMail","userPassword","userNameSurname"])
    .then((response2) => {
      var email = response2[0][1];
      var password = response2[1][1];
      var nameSurname = response2[2][1];
      if(email && password && nameSurname) {

        axios.post(EDU_API_CREATE_USER, {
          email : email,
          password : password,
          phoneNumber : phoneNumber,
          nameSurname : nameSurname
        })
        .then((response) =>{
          console.log(email + password + phoneNumber)
          console.log(response.data)
          if(response.data.isSuccess) {
            console.log("yeah"+response.data);
            AsyncStorage.multiSet([['userToken',response.data.result.token],['userId',response.data.result.userId.toString()]])
            navigate('mainBottomTab')
          }
          else {
            console.log("data is not succeed")
            dispatch(phoneCodeIsCompared(false))
            dispatch(error(errorTypes.anyError))
            dispatch(reset(false))
          }
        })
        .catch(err => {
          console.log(err)
          dispatch(phoneCodeIsCompared(false))
          dispatch(error(errorTypes.InternetError))
          dispatch(reset(false))
        })
      }
      else {
        console.log("api hatasi")
        dispatch(phoneCodeIsCompared(false))
        dispatch(error(errorTypes.anyError))
        dispatch(reset(false))
      }
      

    }).catch(err => {
      console.log(err)
      dispatch(phoneCodeIsCompared(false))
      dispatch(error(errorTypes.anyError))
      dispatch(reset(false))
    })
      }
      else {
        dispatch(phoneCodeIsCompared(false))
        dispatch(error(errorTypes.PhoneCodeCompareError))
        dispatch(reset(false))
      }
    }).catch(err => {
      
      dispatch(phoneCodeIsCompared(false))
      dispatch(error(errorTypes.anyError))
      dispatch(reset(false))
    })
  }
}

export function controlemail(email: string,username: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch(controlemailStarted());
    axios.post(EDU_API_CONTROL_EMAIL, {
      email: email,
    })
      .then((response) => {
        if (response.data.isSuccess) {

          console.log("sssss")

          AsyncStorage.multiSet([["userMail", email],["userNameSurname" ,username]])
            .then(() => {
              // dispatch(loading(false)); 


              dispatch(controlemailSucceed());
              console.log("succeed");
              dispatch(reset());
              navigate("SignUpSecond")

            })
            .catch(error => {

              console.log(error + 'error kaydetme asn storage')
              // dispatch(loading(false));
              dispatch(emailIsExist());
              dispatch(reset(false));
            });
        }
        else {

          dispatch(emailIsExist());
          dispatch(reset(false));
        }
      })
      .catch((err) => {
        console.log(err + "error axios")


        dispatch(anyError());
        dispatch(reset(false));
      });
  };
}



  

export function savePassword(password : string ) {

  return (dispatch: Dispatch<Action>) => {

    dispatch(savePasswordStarted());


    AsyncStorage.setItem("userPassword", password)
      .then(() => {


        dispatch(savePasswordSucceed());
        console.log("succeed");
        dispatch(reset(false));
        navigate('SignUpPhoneVerify')

      })
      .catch(error => {

        console.log(error + 'error kaydetme asn storage')
        // dispatch(loading(false));
        dispatch(savePasswordFailed());
        dispatch(reset(false));
      });
  }

}

export function countDownForCircle(isFinished : boolean) {
  return(dispatch : Dispatch<Action>) => {
    if(!isFinished) {
      dispatch(countDown());
    }
  }
}




const savePasswordStarted = () => ({
  type: SAVE_PASSWORD_STARTED,
  payload: null
})

const savePasswordSucceed = () => ({
  type: SAVE_PASSWORD_SUCCEED,
  payload: null
})

const savePasswordFailed = () => ({
  type: SAVE_PASSWORD_FAILED,
  payload: null
})



export const controlemailStarted = () => ({
  type: CONTROL_EMAIL_STARTED,
  payload: null
})

const controlemailSucceed = () => ({
  type: CONTROL_EMAIL_SUCCEED,
  payload: null
})


export const emailIsExist = () => ({
  type: CONTROL_EMAIL_FAILED,
  payload: null
})

export const anyError = () => ({
  type: CONTROL_EMAIL_FAILED,
  payload: null
})



export const loading = (loader : boolean, isFirstOrNot : boolean) => ({
  type : isFirstOrNot ?  CREATE_USER_STARTED : PHONE_CODE_COMPARE_STARTED,
  payload : loader
})

export const phonoCodeIsReceieved = (bool : boolean) => ({
  type : PHONE_CODE_RECEIVED_SUCCEED,
  payload: bool
})

export const phoneCodeIsCompared = (bool : boolean) => ({
  type : bool ? PHONE_CODE_COMPARE_SUCCEED : PHONE_CODE_COMPARE_FAILED,
  payload: null
})


export const error = (err : string) => ({
  type : ERROR_CODE,
  payload : err
})


export const countDown = () => ({
  type : COUNT_DOWN,
  payload : null
})

export const phonoCodeError = () => ({
  type : PHONE_CODE_RECEIVED_FAILED,
  payload : null
})


export const reset = (isResetCircle : boolean) => ({
  type : RESET_PROPS,
  payload: isResetCircle
})