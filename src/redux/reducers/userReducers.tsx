import {CONTROL_EMAIL_STARTED,CREATE_USER_STARTED,COUNT_DOWN,PHONE_CODE_COMPARE_STARTED,PHONE_CODE_COMPARE_FAILED,PHONE_CODE_COMPARE_SUCCEED,PHONE_CODE_RECEIVED_SUCCEED,PHONE_CODE_RECEIVED_FAILED,CONTROL_EMAIL_FAILED,CONTROL_EMAIL_SUCCEED,SAVE_PASSWORD_FAILED,SAVE_PASSWORD_STARTED,SAVE_PASSWORD_SUCCEED,ERROR_CODE, GET_USER_INFO, HOME_LOADING, USER_UPDATE_FAIL} from '../actions/types'
import { RESET_PROPS } from '../actions/types';
import { Action } from '../../models/action';
import {IUser} from '../actions/userAction'

export interface UserState {
    userInfo : IUser;
    loading : boolean;
    isSucceed : boolean;
    isTried : boolean;

}

const intialState = {
    userInfo : {} as IUser,
    loading : false,
    isSucceed : false,
    isTried : false
    
};





export default (state: UserState = intialState, action: Action) => {
  switch (action.type) {
   case  GET_USER_INFO :
       return {
           ...state,
           userInfo : action.payload
           
       }
    case HOME_LOADING : 
    return {
      ...state,
      loading : action.payload
    }
    case USER_UPDATE_FAIL : 
    return {
      ...state,
      loading : false,
      isSucceed : false,
      isTried : true
    }
    case RESET_PROPS : 
    return {
      ...state,
      loading : false,
      isSucceed : false,
      isTried : false
    }
    default:
      return {
        ...state
      };
  }
};
