import { CART_GET_COURSE,CART_LOADING } from "../actions/types";
import { Action } from "../../models/action";
import { cartState } from "../../models/state";
import { ICourseAmount, ICourseItem } from "../../models/course/coruseItem";




const intialState = {
  courses : {} as ICourseItem[],
  loading: false,
  courseAmount : {} as ICourseAmount,
  

  
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
    
    default:
      return {
        ...state
      };
  }
};
