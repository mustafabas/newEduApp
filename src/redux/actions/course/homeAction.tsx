
import { AsyncStorage } from "react-native";
import axios from 'axios'
import { EDU_API_LOGIN, EDU_API_COURSES,EDU_API_GET_COURSE_INFO, EDU_API_GET_ORDERED_COURSES } from '../../../constants'
import { Dispatch } from "react";
import { HOME_LOADING, HOME_GET_COURSE,COURSE_ITEM_LOADING,COURSE_VIDEO_DETAIL_INFO, COURSE_IS_ADDED, RESET_MESSAGE } from './../types'
import { Action } from "redux";
import { ICourseItem,ICourseBase, ICourseVideoSection, IVideoModel } from "../../../models/course/coruseItem";
import { ICourseItemRequest } from "../../../models/course/courseItemRequest";
import { navigate } from "../../services/Navigator";



export interface localType  {
    id: string;
    courseType : courseType
}

export enum courseType  {
    COURSE_ALL= 1,
    COURSE_ONE= 2,
}

export function addToCartOrRemove(courseTypeTmp:courseType,id : string , courseBase : ICourseBase) {
     
 return async (dispatch : Dispatch<Action>) => {

        
          let products  =  await AsyncStorage.getItem('products')
          let isAdded = false
          let newProduct : localType[] =[];
          if (products){
              newProduct = await JSON.parse(products);
          }
          if (newProduct.some((course : localType) => course.id===id)){
            console.log(courseTypeTmp)
            if (newProduct.some((course : localType) => course.courseType == courseType.COURSE_ALL)){
                await AsyncStorage.removeItem('products')
                console.log('ggg')
                courseBase.isCheckout = isAdded
                newProduct = []
               }
           newProduct =  newProduct.filter((course: localType) => course.id!== id)
           isAdded = false
           
        
        }
         else {
            isAdded = true
             if(courseTypeTmp === courseType.COURSE_ALL) {
                 console.log('gireeessk')
                 courseBase.isCheckout = isAdded
                 newProduct =[]
                //  await AsyncStorage.removeItem('products')
             }
              var test: localType = {id : id , courseType : courseTypeTmp};

              newProduct.push(test)
             
          }  
          courseBase.courses.forEach(val => {
             if(val.id.toString() === id || courseTypeTmp === courseType.COURSE_ALL ) {
                val.IsCheckout  = isAdded
                
             }
             
             if(val.courseType === courseType.COURSE_ONE && courseTypeTmp === courseType.COURSE_ALL) {
                 val.isAddedFromBase = isAdded;
             }
             
            
          })

          newProduct.forEach((element:any) => {
              console.log(element)
          });
          await AsyncStorage.setItem('products', JSON.stringify(newProduct) )
 .then( ()=>{
 console.log('It was saved successfully')
 } )
 .catch( ()=>{
 console.log('There was an error saving the product')
 } )
 dispatch(loading(true));
 dispatch(homeDatas(courseBase));
 dispatch(showMessage(isAdded))
 dispatch(resetMessage())
 dispatch(loading(false));
//  AsyncStorage.removeItem('products')
 }

      
}





// export function getCoursesOrdered() {
//    return  (dispatch : Dispatch<Action>) => {
//     let coursesList : ICourseItem[];
//         AsyncStorage.multiGet(['userId','userToken']).then((res)=> {
//             let userId = res[0][1];
//             let token = res[1][1];

//             const headers = {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//               }
//               console.log(userId)
//               console.log(token)
//             if(userId) {
//                 axios.get(EDU_API_GET_ORDERED_COURSES+`?userId=${userId}`,{ headers: headers })
//                 .then((res) => {
//                     if(res.data.isSuccess) {
//                         console.log(res.data.result)
//                     }
//                 }).catch(err => {
//                     console.log(err)
//                 })
//             }
//         });

   

//    }
// }



export function getCourseDetail(id : string,isCheckouted : boolean) {

    return (dispatch : Dispatch<Action>) => {
        
        axios.get(EDU_API_GET_COURSE_INFO+'?topicId='+id).then((res) => {
            if(res.data.isSuccess) {
                var courseVideoSection = {} as ICourseVideoSection;
                var data = res.data.result
                courseVideoSection.topicName = data.topicName;
                courseVideoSection.content= data.content;
                courseVideoSection.price = data.price;
                courseVideoSection.displayPriceName = data.displayPriceName;
                courseVideoSection.buyedPersonsCount = data.buyedPersonsCount;
                var videoItems = [];
                
                     data.videoItemModels.forEach(element => {

                        videoItems.push(
                        ({
                        videoId : element.videoId,
                        videoName : element.videoName,
                        videoUrl : element.videoUrl,
                        isFree : element.isFree,   
                        }
                    ));
                    courseVideoSection.videoItemModels = videoItems;


                });

                dispatch(sendCourseDetailInfo(courseVideoSection))
                navigate('CourseDetail',{headerTitle : courseVideoSection.topicName,
                isCheckouted : isCheckouted})
            }
        })  
      }
}


export function CourseHomeListData(){
   

    return async (dispatch: Dispatch<Action>) => {


             dispatch(loading(true));

            let products  =  await AsyncStorage.getItem('products')
            let courseBase = {} as ICourseBase;
            let userID  =  await AsyncStorage.getItem('userId')
            console.log(userID)
            console.log("products" + products)
            let newProduct : localType[] =[];
            if (products){
                newProduct = await JSON.parse(products);

                console.log(newProduct)
            }
              axios.get(EDU_API_COURSES+`?id=1&userId=${userID ? userID : 0}`
                )
  .then(async (response) =>{
      if(response.data.isSuccess){
        
        let data = response.data.result!;
        console.log("data")
        console.log(data)
        let courseItems : ICourseItem[] =[];


        courseBase.courseId = data.courseId
        courseBase.courseImagePath = data.courseImagePath
        courseBase.courseName = data.courseName
        courseBase.priceDisplayName = data.priceDisplayName
        courseBase.price = data.price
        courseBase.isCheckout = newProduct.some((course:localType) => course.id === data.courseId.toString())
        courseBase.isOrdered = data.isOrdered
       await response.data.result!.courseTopicItems.forEach( async (element:ICourseItemRequest) => {
           console.log(newProduct)
            courseItems!.push(
                ({
                    id:element.courseTopicId,
                    name:element.topicName,
                    content:element.content,
                    displayPrice:element.priceDisplayName,
                    IsCheckout : newProduct.some((course:localType) => course.id === element.courseTopicId.toString()) || courseBase.isCheckout,
                    courseType : courseType.COURSE_ONE,
                    isAddedFromBase : courseBase.isCheckout,
                    isOrdered : element.isOrdered
                    
                }
            ));
        });

        courseBase.courses = courseItems;
        // courseBase.courses = courseItems;
        console.log(courseBase);
        dispatch(loading(false));
        dispatch(homeDatas(courseBase));

      }  
  }).catch((err) => {
    loading(false);
  });
    };
};


function containsItem(list : [string], id : string) {
    list.forEach(element => {
        if(element === id) {
            console.log(id)
            return true;
        }

    });
    return false;
} 


export const loading = (loading :boolean) => ({
    type: HOME_LOADING,
    payload: loading
})

export const homeDatas = (response:ICourseBase) => ({
    type: HOME_GET_COURSE,
    payload: response
})

export const itemLoading =(loading : boolean) => ({
    type: COURSE_ITEM_LOADING,
    payload: loading
})

export const sendCourseDetailInfo = (courseVideoDetail : ICourseVideoSection) => ({
    type : COURSE_VIDEO_DETAIL_INFO,
    payload : courseVideoDetail
})


export const showMessage = (isAdded : boolean)  => ({
    type : COURSE_IS_ADDED,
    payload : isAdded
})

export const resetMessage = () => ({
    type : RESET_MESSAGE
})