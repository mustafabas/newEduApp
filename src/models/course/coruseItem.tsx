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
    isOrdered : boolean;
    price : number;

}

export interface ICourseAmount{
    displayTotalAmount : string;
    discountRate : string;
    displayDiscountAmount :string;
    displayPayTotalAmount : string;
    
}

export interface ICourseBase {
    courseId : number;
    courseName : string;
    courseImagePath : string;
    price : number ;
    priceDisplayName : string;
    courses :ICourseItem[];
    isCheckout : boolean;
    isOrdered : boolean;
}

export interface ICourseVideoSection {
    topicName : string;
    content : string;
    price : number;
    displayPriceName : string;
    buyedPersonsCount : number;
    videoItemModels :IVideoModel[]
}

export interface IBasket {
  userId: number;
  cityId: number;
  localityId: number;
  districtId: number;
  neighboorId: number;
  adressInfo: string;
  companyName: string;
  taxOffice: string;
  taxNumber: string;
  ipAdress: string;
  identityNo: string;
  courseIds: string;
  courseType: courseType;
  orderType: number;
}

export interface IVideoModel {
    videoId : string;
    videoName : string;
    videoUrl : string;
    isFree : boolean;

}