import { AsyncStorage } from "react-native";
import axios from 'axios'
import {EDU_API_LOGIN,EDU_API_LOGIN_FIRST_STEP,EDU_API_SOCIAL_LOGIN } from '../../constants'
import { Dispatch } from "react";
import {LOGIN_FAILED,LOGIN_STARTED,LOGIN_SUCCEED ,RESET_PROPS} from './types'
import { LoginManager ,GraphRequest,GraphRequestManager,AccessToken} from 'react-native-fbsdk';
import { navigate } from '../services/Navigator';
import { Action } from "../../models/action";

import { GoogleSignin,statusCodes, GoogleSigninButton } from '@react-native-community/google-signin';
import {LinkedInToken} from 'react-native-linkedin'
export enum socialTypes {
  FACEBOOK = 1,
  LINKEDIN = 2,
  GOOGLE = 3
}


interface socialUser {
  email : string ;
  name?: string;
  surname?: string ;
  photoPath: string;
  type: number;
}


export function socialLogin(socialType : socialTypes,data?: LinkedInToken) {
  return async (dispatch : Dispatch<Action>) => {

    let user= {} as socialUser;
      if(socialTypes.FACEBOOK === socialType) {
          LoginManager.logInWithPermissions(['public_profile', 'email']).then(  
            function (result) {
              if (result.isCancelled) {

              } else {       
                console.log('Login success with permissions: ' + result.grantedPermissions.toString())
                AccessToken
              .getCurrentAccessToken()
              .then((data) => {
                console.log("hey" + data)
                let accessToken = data.accessToken;
      
                const responseInfoCallback = (error, result) => {

                  if (error) {
                    console.log(error);
                    // alert('Error fetching data: ' + error.toString());
                  } else {
                    console.log(result);
                    console.log(result.email)
                    user.email  = result.email;
                    user.name= result.first_name;
                    user.surname=result.last_name;
                    user.type = socialType;
                    user.photoPath = result.picture.data.url;
                  }
                }
           
               
                const infoRequest = new GraphRequest('/me',
                {
                  accessToken: accessToken,
                  parameters: {
                    fields: {
                      string: 'email,first_name,middle_name,last_name,picture.type(large)',
                    }
                  }
                }
                , responseInfoCallback);
      
                // Start the graph request.
                new GraphRequestManager()
                  .addRequest(infoRequest)
                  .start();
                 
              }).catch(err => {
                console.log(err)
              })
              
          }
        },
            function (error) {  
              console.log('Login fail with error: ' + error)
            }
      
          )
            
        

      }
      else if (socialType === socialTypes.GOOGLE) {


          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            user.email = userInfo.user.email;
            user.name = userInfo.user.givenName;
            user.photoPath = userInfo.user.photo;
            user.surname =userInfo.user.familyName;
            user.type = socialType;

          } catch (error) {
           if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                // Alert.alert('cancelled');
              } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                // Alert.alert('in progress');
              } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // Alert.alert('play services not available or outdated');
              } else {
                // Alert.alert('Something went wrong', error.toString());
                console.log(error)
              }
          }

      }

      
      else if (socialType=== socialTypes.LINKEDIN) {


  const { access_token, authentication_code } = data
  if (!authentication_code) {


    const response = await fetch('https://api.linkedin.com/v2/me', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    })
    const payload = await response.json()
    console.log(payload)
    const responseEmail = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    })
    const payloadEmail = await responseEmail.json()

    const responsePhoto = await fetch('https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    })
    const payloadPhoto = await responsePhoto.json()
    user.photoPath = payloadPhoto.profilePicture['displayImage~'].elements[3].identifiers[0].identifier
    user.email = payloadEmail.elements[0]['handle~'].emailAddress
    user.name = payload.localizedFirstName;
    user.surname = payload.localizedLastName;
    user.photoPath
    user.type = socialTypes.LINKEDIN
    console.log(payloadEmail)
    console.log("asd"+user)
  } else {
    // alert(`authentication_code = ${authentication_code}`)
  }
  }
  if(user) {
    axios.post(EDU_API_SOCIAL_LOGIN, {
      email: user.email,
      name: user.name,
      surname: user.surname,
      photoPath: user.photoPath,
      type: user.type
    }).then((res)=> {
      if(res.data.isSuccess) {
        dispatch(reset())
        AsyncStorage.multiSet([['userToken',res.data.result.token],['userId',res.data.result.userId.toString()]])
        navigate('mainBottomTab')
      }

    })
    

  }
  }
}




export function loginFirstStep(email : string, password : string ) {
  return (dispatch : Dispatch<Action>) => {
    dispatch(loading(true));

    axios.post(EDU_API_LOGIN_FIRST_STEP, {
      username : email,
      password : password
    })
    .then((response) => {
      if(response.data.isSuccess) {
        AsyncStorage.setItem("userID", response.data.result.userId.toString())
        .then(() => {
          dispatch(loginIsSucceed(true));
          dispatch(reset());
          navigate('LoginPhoneVerify')

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
