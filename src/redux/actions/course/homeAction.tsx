
import { AsyncStorage } from "react-native";
import axios from 'axios'
import { EDU_API_LOGIN, EDU_API_COURSES } from '../../../constants'
import { Dispatch } from "react";
import { HOME_LOADING, HOME_GET_COURSE,COURSE_ITEM_LOADING } from './../types'
import { Action } from "redux";
import { ICourseItem,ICourseBase } from "../../../models/course/coruseItem";
import { ICourseItemRequest } from "../../../models/course/courseItemRequest";



export interface localType  {
    id: string;
    courseType : courseType
}

export enum courseType  {
    COURSE_ALL= 'courseBase',
    COURSE_ONE= 'courseOne',
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

 dispatch(loading(false));
//  AsyncStorage.removeItem('products')
 }

      
}


export function CourseHomeListData(){
   

    return async (dispatch: Dispatch<Action>) => {


             dispatch(loading(true));

            let products  =  await AsyncStorage.getItem('products')
            let courseBase = {} as ICourseBase;
            let userID  =  await AsyncStorage.getItem('userID')
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