import { CART_GET_COURSE,CART_LOADING } from "../actions/types";
import { Action } from "../../models/action";
import { cartState } from "../../models/state";

const intialState = {
  courses: [],
  loading: false,

};

export default (state: cartState = intialState, action: Action) => {
  switch (action.type) {
    case CART_GET_COURSE:
      return { ...state, courses: action.payload };
    case CART_LOADING : 
      return {
        ...state,
        loading : action.payload
      }
    default:
      return state;
  }
};
