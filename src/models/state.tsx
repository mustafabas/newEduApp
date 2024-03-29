import { ICourseItem,ICourseBase, ICourseVideoSection, ICourseAmount } from "./course/coruseItem";

export interface UserState {
  isLoading: boolean;
  isFinished: boolean;
  isSucceed: boolean;

}
export interface HomeState {

  loading: boolean;
  courseBase: ICourseBase;
  CourseVideoSection : ICourseVideoSection;
  addedToChart : boolean;
  removedFromChart : boolean;
  loadingButtonItem : boolean,
  selectedButtonId : string,
}



export interface cartState {
  courses: ICourseItem[];
  loading: boolean;
  courseAmount : ICourseAmount;
  loadingCard: boolan;
  CardErrorMessage:string;

}
