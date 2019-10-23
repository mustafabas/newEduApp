import { LOGIN_STARTED,LOGIN_FAILED,LOGIN_SUCCEED,RESET_PROPS } from "../actions/types";

import { Action } from "../../models/action";
import { UserState } from "../../models/state";

const intialState = {
    isLoading : false,
    isFinished : false,
    isSucceed : false
};

export default (state: UserState = intialState, action: Action) => {
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        isLoading: action.payload,
      };
    case LOGIN_SUCCEED:
        return {
          ...state,
          isFinished:true,
          isSucceed:true,
          isLoading:false
        };
    case LOGIN_FAILED:
        return {
            ...state,
            isFinished: true,
            isSucceed:false,
              isLoading:false
            };
    case RESET_PROPS :
        return {
          ...state,
          isFinished:false,
          isSucceed:false,
          isLoading:false
        };
    default:
      return state;

  }
};
