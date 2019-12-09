import { HOME_GET_COURSE, HOME_LOADING,COURSE_ITEM_LOADING, COURSE_VIDEO_DETAIL_INFO, COURSE_IS_ADDED, RESET_MESSAGE } from "../actions/types";
import { Action } from "../../models/action";
import { HomeState } from "../../models/state";
import { ICourseVideoSection, ICourseBase } from "../../models/course/coruseItem";

const intialState = {

  loading: false,
  itemLoading: false,
  courseBase : {} as ICourseBase,
  CourseVideoSection : {} as ICourseVideoSection,
  addedToChart : false,
  removedFromChart : false,
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
      };
    case COURSE_VIDEO_DETAIL_INFO : 
      return {
        ...state,
        CourseVideoSection : action.payload
      };

    case COURSE_IS_ADDED:
      return{
        ...state,
        addedToChart : action.payload,
        removedFromChart : !action.payload
      };

      case RESET_MESSAGE :
        return {
          ...state,
          addedToChart : false,
          removedFromChart : false
        };
    default:
      return {...state};
  }
};
