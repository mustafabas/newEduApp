import { CART_GET_COURSE,CART_LOADING, CreditCard_LOADING, CreditCard_Message } from "../actions/types";
import { Action } from "../../models/action";
import { cartState } from "../../models/state";
import { ICourseAmount, ICourseItem } from "../../models/course/coruseItem";




const intialState = {
  courses : {} as ICourseItem[],
  loading: false,
  courseAmount : {} as ICourseAmount,
  loadingCard: false,
  CardErrorMessage:""
};

export default (state: cartState = intialState, action: Action) => {
  switch (action.type) {
    case CART_GET_COURSE:
      return { ...state, courses: action.payload[0],
      courseAmount: action.payload[1] 
    };
    case CART_LOADING : 
      return {
        ...state,
        loading : action.payload
      }
    case CreditCard_LOADING:
    return{
      ...state,
      loadingCard:action.payload
    }
   
    default:
      return {
        ...state
      };
  }
};
