import { AsyncStorage } from "react-native";
import axios from 'axios'
import {EDU_API_LOGIN,EDU_API_LOGIN_FIRST_STEP } from '../../constants'
import { Dispatch } from "react";
import {LOGIN_FAILED,LOGIN_STARTED,LOGIN_SUCCEED ,RESET_PROPS} from './types'
import { navigate } from '../services/Navigator';
import { Action } from "../../models/action";


export function loginFirstStep(email : string, password : string ) {
  return (dispatch : Dispatch<Action>) => {
    dispatch(loading(true));

    axios.post(EDU_API_LOGIN_FIRST_STEP, {
      username : email,
      password : password
    })
    .then((response) => {
      if(response.data.isSuccess) {
        AsyncStorage.setItem("userID", response.data.result.userId)
        .then(() => {
          dispatch(loginIsSucceed(true));
          dispatch(reset());

        })
        .catch(error => {
          dispatch(loginIsSucceed(false));
          dispatch(reset())
        })
      }
      else {
        dispatch(loginIsSucceed(false));
    dispatch(reset());
      }
    })
    .catch((err) => {
      console.log(err + "error axios") 
      // dispatch(loading(false));
      
      dispatch(loginIsSucceed(false));
      dispatch(reset());
    });
    
  }
}




export function loginUserService(activationCode: string) {

  return (dispatch : Dispatch<Action>) =>  {




    dispatch(loading(true));

    var userID = ""
    
    AsyncStorage.getItem("userID")
    .then((id ) => {

      axios.post(EDU_API_LOGIN, {
        activationCode: activationCode,
        userId: parseInt(id ? id : '0')
      })
      .then((response) =>{
      if(response.data.isSuccess){
        
        AsyncStorage.setItem("userToken", response.data.result.token)
        .then(() => {       

          
        
          dispatch(loginIsSucceed(true)); 
          console.log("succeed");
          dispatch(reset());
          navigate('mainBottomTab')
          
        })
        .catch(error => { 
          
          console.log(error + 'errorr kaydetme asn storage')   
          // dispatch(loading(false));
          dispatch(loginIsSucceed(false));
          dispatch(reset());
        });
      }
      else {
    
        dispatch(loginIsSucceed(false));
        dispatch(reset());
      }
      })
      .catch((err) => {
        console.log(err + "error axios") 
        // dispatch(loading(false));
        
        dispatch(loginIsSucceed(false));
        dispatch(reset());
      });
    })
    .catch(error => {
      console.log('cannot get id from asnystorage')
      dispatch(loginIsSucceed(false));
      dispatch(reset())
    })
  


  }

}

export function logoutUserService() {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem("userToken")
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}


export const loading = (loader : boolean) => ({
  type : LOGIN_STARTED,
  payload : loader
})


export const loginIsSucceed = (loginIsSucced : boolean) => ({
  type : loginIsSucced ? LOGIN_SUCCEED : LOGIN_FAILED,
  payload : null
})


export const reset = () => ({
  type : RESET_PROPS,
  payload:null
})
