import {CONTROL_EMAIL_STARTED,CREATE_USER_STARTED,CONTROL_EMAIL_FAILED,CONTROL_EMAIL_SUCCEED,SAVE_PASSWORD_FAILED,SAVE_PASSWORD_STARTED,SAVE_PASSWORD_SUCCEED} from '../actions/types'
import { RESET_PROPS } from '../actions/types';
import { Action } from '../../models/action';

export interface UserState {
  laodingCheck : boolean;
  isSucceedCheck: boolean;
  isFinishedCheck : boolean;

}

const intialState = {
  laodingCheck : false,
  isFinishedCheck : false,
  isSucceedCheck : false,
};




export default (state: UserState = intialState, action: Action) => {
  switch (action.type) {
    case CONTROL_EMAIL_STARTED || SAVE_PASSWORD_STARTED:
      return {
        ...state,
        laodingCheck: true,
        isFinishedCheck:false,
        isSucceedCheck : false
      };
    case CONTROL_EMAIL_FAILED || SAVE_PASSWORD_FAILED:
        return {
          ...state,
          laodingCheck : false,
          isFinishedCheck : true,
          isSucceedCheck: false,
        };
    case CONTROL_EMAIL_SUCCEED || SAVE_PASSWORD_SUCCEED :
        return {
          ...state,
          laodingCheck: false, 
          isFinishedCheck : true,
          isSucceedCheck : true,
        }
    case RESET_PROPS : 
        return {
          laodingCheck: false, 
          isFinishedCheck : false,
          isSucceedCheck : false,
        }
    case SAVE_PASSWORD_SUCCEED :
      return {
        ...state,
          laodingCheck: false, 
          isFinishedCheck : true,
          isSucceedCheck : true,
      }
      case CREATE_USER_STARTED : 
      return {
        ...state, 
        laodingCheck: true,
        isFinishedCheck:false,
        isSucceedCheck : false
      }
    default:
      return state;

  }
};
