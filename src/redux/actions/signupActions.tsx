import { AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";
import { Dispatch } from "react";
import { CONTROL_EMAIL_STARTED, CONTROL_EMAIL_FAILED, CONTROL_EMAIL_SUCCEED, SAVE_PASSWORD_STARTED, SAVE_PASSWORD_FAILED, SAVE_PASSWORD_SUCCEED ,CREATE_USER_STARTED} from './types'

import axios from "axios";
import { EDU_API_CONTROL_EMAIL,EDU_API_CREATE_USER } from '../../constants'
import { navigate } from "../services/Navigator";

import { reset } from '../actions/LoginActions'
import { Action } from "../../models/action";



export function createUser(phoneNumber : string ) {
  return(dispatch : Dispatch<Action>) => {
    dispatch(loading(true));

    AsyncStorage.multiGet(["userMail","userPassword"])
    .then((response) => {
      var email = response[0][1];
      var password = response[1][1];

      if(email && password) {

        axios.post(EDU_API_CREATE_USER, {
          email : email,
          password : password,
          phoneNumber : phoneNumber
        })
        .then((response) =>{
          console.log(response)
          if(response.data.isSuccees) {

            console.log("yeah"+response.data);
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
      else {
        console.log("api hatasi")
      }
      

    }).catch(err => {
      console.log(err)
    })
  };
}


export function controlemail(email: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch(controlemailStarted());
    axios.post(EDU_API_CONTROL_EMAIL, {
      email: email,
    })
      .then((response) => {
        if (response.data.isSuccess) {

          console.log("sssss")
          AsyncStorage.setItem("userMail", email)
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
              dispatch(reset());
            });
        }
        else {

          dispatch(emailIsExist());
          dispatch(reset());
        }
      })
      .catch((err) => {
        console.log(err + "error axios")


        dispatch(anyError());
        dispatch(reset());
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
        dispatch(reset());
        navigate('SignUpPhoneVerify')

      })
      .catch(error => {

        console.log(error + 'error kaydetme asn storage')
        // dispatch(loading(false));
        dispatch(savePasswordFailed());
        dispatch(reset());
      });
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



export const loading = (loader : boolean) => ({
  type : CREATE_USER_STARTED,
  payload : loader
})
