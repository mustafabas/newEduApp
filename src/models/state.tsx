import { ICourseItem,ICourseBase } from "./course/coruseItem";

export interface UserState {
  isLoading: boolean;
  isFinished: boolean;
  isSucceed: boolean;

}
export interface HomeState {

  loading: boolean;
  courseBase: ICourseBase;
}


export interface cartState {
  courses: ICourseItem[];
  loading: boolean;
}
