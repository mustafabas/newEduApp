import { HOME_GET_COURSE, HOME_LOADING,COURSE_ITEM_LOADING } from "../actions/types";
import { Action } from "../../models/action";
import { HomeState } from "../../models/state";

const intialState = {

  loading: false,
  itemLoading: false,
  courseBase  : {
    courseId : 0,
    courseName : '',
    courseImagePath : '',
    price : 0,
    priceDisplayName : '',
    courses : [],
    isCheckout:false,
  }
};

export default (state: HomeState = intialState, action: Action) => {
  switch (action.type) {
    case HOME_GET_COURSE:
      return { ...state, courseBase: action.payload };
    case HOME_LOADING:
      

      return {
        ...state,
        loading: action.payload
      };
    case COURSE_ITEM_LOADING : 
      return {
        ...state,
        itemLoading : action.payload
      }
    default:
      return state;
  }
};
