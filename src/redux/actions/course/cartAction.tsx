
import { AsyncStorage } from "react-native";
import axios from 'axios'
import { EDU_API_LOGIN, EDU_API_GET_BASKET_ID, EDU_API_GET_CART_LIST, EDU_API_BASE, EDU_API_COURSE_BASE } from '../../../constants'
import { Dispatch } from "react";
import { CART_GET_COURSE, CART_LOADING } from './../types'
import { Action } from "redux";
import { ICourseItem, ICourseAmount, IBasket } from "../../../models/course/coruseItem";
import { ICourseItemRequest } from "../../../models/course/courseItemRequest";
import { courseType, localType } from "./homeAction";



enum OrderType {
    KrediKarti = 1,
    Havale = 2

}






export function removeItemFromCart(id: string, list: ICourseItem[]) {
    return async (dispatch: Dispatch<Action>) => {
        dispatch(loading(true));
        let products = await AsyncStorage.getItem('products')
        let newProduct: localType[] = [];
        if (products) {
            newProduct = await JSON.parse(products);
        }
        if (newProduct) {

            newProduct = newProduct.filter((course: localType) => (course.id !== id));
            await AsyncStorage.setItem('products', JSON.stringify(newProduct))
            list = list.filter(course => (course.id.toString() !== id));

        }
        if (list.length === 0) {
            await AsyncStorage.removeItem('products')
        }
        let courseAmount: ICourseAmount = {} as ICourseAmount;

        let courses = ""
        for (let i = 0; i < list.length; i++) {
            courses += list[i].id.toString() + ','
        }
        courses = courses.substring(0, courses.length - 1)
        console.log("ss" + courses)
        axios.get(EDU_API_GET_CART_LIST + "?courseTopicIds=" + courses
        )
            .then(async (response) => {
                console.log(response)
                if (response.data.isSuccess) {
                    let data = response.data.result;

                    courseAmount.discountRate = data.discountRate;
                    courseAmount.displayDiscountAmount = data.displayDiscountAmount;
                    courseAmount.displayPayTotalAmount = data.displayPayTotalAmount;
                    courseAmount.displayTotalAmount = data.displayTotalAmount;
                    dispatch(loading(false));
                }
            }).catch((err) => {
                loading(false);
            });

        dispatch(cartData(list, courseAmount))



    }

}

export function getCart() {
    return async (dispatch: Dispatch<Action>) => {
        dispatch(loading(true));

        let courseAmount: ICourseAmount = {} as ICourseAmount;


        let courseItems: ICourseItem[] = [];
        let products = await AsyncStorage.getItem('products')
        let newProduct: localType[] = []
        if (products) {
            newProduct = await JSON.parse(products);
        }

        console.log("hey" + newProduct)
        if (newProduct) {

            let courses = ""
            console.log('girdr' + products)
            if (newProduct) {
                if (newProduct.some(val => val.courseType === courseType.COURSE_ALL)) {
                    courses = newProduct.find(val => val.courseType === courseType.COURSE_ALL).id;
                    axios.get(EDU_API_COURSE_BASE + `/${parseInt(courses)}`).then((res) => {
                        if (res.data.isSuccess) {
                            console.log("yeppp")
                            let data = res.data.result
                            courseItems!.push({
                                id: data.courseId,
                                name: data.courseName,
                                displayPrice: data.displayPrice,
                                price: data.price,
                                courseType: courseType.COURSE_ALL,

                            })
                            courseAmount.displayPayTotalAmount = data.displayPrice
                            dispatch(cartData(courseItems, courseAmount));
                        }
                    })
                }
                else {

                    newProduct.forEach((element: localType) => {
                        console.log("id" + element.id)
                        courses = courses + element.id + ","

                    });
                    console.log(courses)
                    if (courses.length > 1) {
                        console.log("222" + courses)
                        courses = courses.substring(0, courses.length - 1)
                        console.log("ss" + courses)
                        axios.get(EDU_API_GET_CART_LIST + "?courseTopicIds=" + courses
                        )
                            .then(async (response) => {
                                console.log(response)
                                if (response.data.isSuccess) {


                                    await response.data.result.courseTopicItems.forEach((element: ICourseItemRequest) => {
                                        courseItems!.push(
                                            ({
                                                id: element.courseTopicId,
                                                name: element.topicName,
                                                content: element.content,
                                                displayPrice: element.priceDisplayName,
                                                IsCheckout: true,
                                                courseType: newProduct.filter(val => (val.id === element.courseTopicId.toString()))[0].courseType,
                                                isOrdered: element.isOrdered,
                                                isAddedFromBase: false,
                                                price: element.price
                                            }
                                            ));
                                    });
                                    let data = response.data.result;
                                    courseAmount.discountRate = data.discountRate;
                                    courseAmount.displayDiscountAmount = data.displayDiscountAmount;
                                    courseAmount.displayPayTotalAmount = data.displayPayTotalAmount;
                                    courseAmount.displayTotalAmount = data.displayTotalAmount;

                                    console.log(data)

                                    dispatch(cartData(courseItems, courseAmount));
                                    dispatch(loading(false));
                                }
                            }).catch((err) => {
                                loading(false);
                            });
                    }
                    else {
                        console.log("sonunda")
                        dispatch(cartData(courseItems, courseAmount));
                    }

                }



            }



        }

    }

}
function courseCartList(products: [string]) {
    console.log('girdr' + products)
    return (dispatch: Dispatch<Action>) => {
        let courses = ""
        console.log('girdr' + products)
        if (products) {
            products.forEach(element => {
                courses = courses + element.toString() + ","
            });

            courses = courses.substring(0, -1)
            console.log("ss" + courses)
            axios.get(EDU_API_GET_CART_LIST + courses
            )
                .then((response) => {
                    if (response.data.isSuccess) {
                        let courseItems: ICourseItem[] = [];

                        response.data.result!.forEach((element: ICourseItemRequest) => {
                            courseItems!.push(
                                ({
                                    id: element.courseTopicId,
                                    name: element.topicName,
                                    content: element.content,
                                    displayPrice: element.priceDisplayName,
                                    IsCheckout: true
                                }
                                ));
                        });
                        dispatch(cartData(courseItems));
                        dispatch(loading(false));
                    }
                }).catch((err) => {
                    loading(false);
                });
        }

    };


};


export const loading = (loading: boolean) => ({
    type: CART_LOADING,
    payload: loading
})

export const cartData = (response: ICourseItem[], courseAmount: ICourseAmount) => ({
    type: CART_GET_COURSE,
    payload: [response, courseAmount]
})





