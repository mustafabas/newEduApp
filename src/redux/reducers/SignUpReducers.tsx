import {CONTROL_EMAIL_STARTED,CREATE_USER_STARTED,COUNT_DOWN,PHONE_CODE_COMPARE_STARTED,PHONE_CODE_COMPARE_FAILED,PHONE_CODE_COMPARE_SUCCEED,PHONE_CODE_RECEIVED_SUCCEED,PHONE_CODE_RECEIVED_FAILED,CONTROL_EMAIL_FAILED,CONTROL_EMAIL_SUCCEED,SAVE_PASSWORD_FAILED,SAVE_PASSWORD_STARTED,SAVE_PASSWORD_SUCCEED,ERROR_CODE} from '../actions/types'
import { RESET_PROPS } from '../actions/types';
import { Action } from '../../models/action';

export interface UserState {
  laodingCheck : boolean;
  isSucceedCheck: boolean;
  isFinishedCheck : boolean;
  isFinishedCheckSecond : boolean;
  isSucceedCheckSecond : boolean;
  isLoadingCheckSecond : boolean;
  error : string;
  countDown : number;
}

const intialState = {
  laodingCheck : false,
  isFinishedCheck : false,
  isFinishedCheckSecond : false,
  isSucceedCheckSecond : false,
  isSucceedCheck : false,
  isLoadingCheckSecond : false,
  error : "",
  countDown : 40
};




export default (state: UserState = intialState, action: Action) => {
  switch (action.type) {
    case CONTROL_EMAIL_STARTED :
      return {
        ...state,
        laodingCheck: true,
        isFinishedCheck:false,
        isSucceedCheck : false
      };
      case SAVE_PASSWORD_STARTED:
      return {
        ...state,
        laodingCheck: true,
        isFinishedCheck:false,
        isSucceedCheck : false
      };
    case CONTROL_EMAIL_FAILED :
        return {
          ...state,
          laodingCheck : false,
          isFinishedCheck : true,
          isSucceedCheck: false,
        };
        case SAVE_PASSWORD_FAILED:
          return {
            ...state,
            laodingCheck : false,
            isFinishedCheck : true,
            isSucceedCheck: false,
          };
    case CONTROL_EMAIL_SUCCEED :
        return {
          ...state,
          laodingCheck: false, 
          isFinishedCheck : true,
          isSucceedCheck : true,
        };
        case SAVE_PASSWORD_SUCCEED :
          return {
            ...state,
            laodingCheck: false, 
            isFinishedCheck : true,
            isSucceedCheck : true,
          };

    case RESET_PROPS : 
        return {
          ...state,
          laodingCheck: false, 
          isFinishedCheck : false,
          isSucceedCheck : false,
          isFinishedCheckSecond : false,
          isSucceedCheckSecond : false,
          isLoadingCheckSecond : false,
          countDown : action.payload ? 40 : state.countDown
          
        };
    case SAVE_PASSWORD_SUCCEED :
      return {
        ...state,
          laodingCheck: false, 
          isFinishedCheck : true,
          isSucceedCheck : true,
      };
      case CREATE_USER_STARTED : 
      return {
        ...state, 
        laodingCheck: action.payload,
        isFinishedCheck:false,
        isSucceedCheck : false
      };
      case PHONE_CODE_RECEIVED_SUCCEED : 
      return {
        ...state,
        laodingCheck : false,
        isFinishedCheck : true,
        isSucceedCheck : true
      };
      case PHONE_CODE_RECEIVED_FAILED : 
      return {
        ...state,
        laodingCheck : false,
        isFinishedCheck : true,
        isSucceedCheck : false
      };
      case PHONE_CODE_COMPARE_STARTED :
        return {
          ...state,
          isFinishedCheckSecond : false,
          isSucceedCheckSecond : false,
          isLoadingCheckSecond : true
        }
        case PHONE_CODE_COMPARE_FAILED :
          return {
            ...state, 
          isFinishedCheckSecond : true,
          isSucceedCheckSecond : false,
          isLoadingCheckSecond : false
          }

      case ERROR_CODE : 
      return {
        ...state,
        error : action.payload
      }
      case COUNT_DOWN :
        return {
          ...state,
          countDown : state.countDown>0 ? state.countDown - 1 : 0 
        }
    default:
      return {
        ...state
      };

  }
};
