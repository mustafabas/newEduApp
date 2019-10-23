import { courseType } from "../../redux/actions/course/homeAction";

export interface IHomeModel{
    imagepath : string;
    courses :ICourseItem[];
}
export interface ICourseItem{
    id: number;
    name: string;
    displayPrice :string;
    content:string;
    IsCheckout : boolean;
    courseType : courseType;
    isAddedFromBase : boolean;
}

export interface ICourseBase {
    courseId : number;
    courseName : string;
    courseImagePath : string;
    price : number ;
    priceDisplayName : string;
    courses :ICourseItem[];
    isCheckout : boolean;


}