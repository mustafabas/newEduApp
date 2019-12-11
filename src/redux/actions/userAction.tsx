import { AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";
import { Dispatch } from "react";
import { CONTROL_EMAIL_STARTED,RESET_PROPS, CONTROL_EMAIL_FAILED, CONTROL_EMAIL_SUCCEED,PHONE_CODE_COMPARE_STARTED,PHONE_CODE_COMPARE_FAILED,PHONE_CODE_COMPARE_SUCCEED, SAVE_PASSWORD_STARTED, SAVE_PASSWORD_FAILED,ERROR_CODE, SAVE_PASSWORD_SUCCEED ,CREATE_USER_STARTED,PHONE_CODE_RECEIVED_FAILED,PHONE_CODE_RECEIVED_SUCCEED, COUNT_DOWN, GET_USER_INFO, USER_UPDATE_FAIL} from './types'

import axios from "axios";
import { EDU_API_CONTROL_EMAIL,EDU_API_GET_USER_INFO,EDU_API_CREATE_USER,EDU_API_CREATE_USER_PHONE_VERIFY, EDU_API_UPDATE_USER_INFO } from '../../constants'
import { navigate } from "../services/Navigator";


import { Action } from "../../models/action";
import Axios from "axios";
import { loading } from "./course/homeAction";
import { reset } from "./LoginActions";


export interface IUser {
    userId: number;
    nameSurname: string;
    surname:  string;
    about : string;

    email: string;
    gender: null
    phoneNumber: string;
    photo: string;
    userName: string;

  }

  export enum EditProfile {
      generalInfo = 1,
      securityInfo = 2
  }



export function userUpdatePassword (ownPassword : string, newPassword : string ,newPasswordSame : string) {
    return async(dispatch : Dispatch<Action>) => {
        dispatch(loading(true))
console.log('Asdasds')
        AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
        

            let token = res[0][1];
            let userId = res[1][1];
        
        
         


            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            console.log(token)
            console.log(userId)


        
        axios.post(EDU_API_UPDATE_USER_INFO ,{
            ownPassword: ownPassword,
            newPassword: newPassword,
          },{ headers: headers }).then((res) => {

            if(res.data.isSuccess){
                console.log("oldumuu")
                dispatch(reset())
                navigate('UserInfo')
            }else {
                console.log(res.data.message)

            }
        }).catch(err=> {
            console.log(err)
            dispatch(userUpdateFail())
            dispatch(reset())
        })


    }
    )
  


}}
export function userInfoUpdatePersonal(email : string,nameSurname : string ) {
    return async(dispatch : Dispatch<Action>) => {
        dispatch(loading(true))
console.log('Asdasds')
        AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
        

            let token = res[0][1];
            let userId = res[1][1];
        
        
         


            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            console.log(token)
            console.log(userId)


        
        axios.post(EDU_API_UPDATE_USER_INFO ,{
            userId: userId,
            nameSurname: nameSurname,
            surname: '',
            about: '',
            email: email
          },{ headers: headers }).then((res) => {

            if(res.data.isSuccess){
                console.log("oldumuu")
                dispatch(reset())
                navigate('UserInfo')
            }else {
                console.log(res.data.message)

            }
        }).catch(err=> {
            console.log(err)
            dispatch(userUpdateFail())
            dispatch(reset())
        })


    }
    )
  


}}


export function getUserInformation(type : EditProfile){
    return async(dispatch : Dispatch<Action>) => {
        AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {

            let token = res[0][1];
            let userId = res[1][1];
        
        
         


            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            console.log(token)
            console.log(userId)

            axios.get(EDU_API_GET_USER_INFO + `?userId=${userId}`,{ headers: headers }).then((res) => {
                console.log(res)




                var userInfo = {} as IUser
                if(res.data.isSuccess) {


                    let data  = res.data.result 

                    console.log(data)
                    userInfo.about = data.about
                    userInfo.email = data.email
                    userInfo.gender = data.gender
                    userInfo.nameSurname = data.nameSurname
                    userInfo.phoneNumber = data.phoneNumber
                    userInfo.photo = data.photo
                    userInfo.surname = data.surname
                    userInfo.userId = data.userId
                    userInfo.userName = data.userName
                    
                    dispatch(getUserInfo(userInfo))
                    
                    if(type === EditProfile.generalInfo) {
                        navigate('ProfileEdit',null)
                    }
                else {
                    navigate('securityProfileEdit')
                }
       

                }


            }).catch(err => {
               
                console.log(err)})
        })
      
      }


   
    

}


export const userUpdateFail =() => ({
    type: USER_UPDATE_FAIL,
    payload : null
})
export const getUserInfo = (response : IUser) => ({
    type: GET_USER_INFO,
    payload: response
})



