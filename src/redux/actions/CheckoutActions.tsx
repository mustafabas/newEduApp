
import { AsyncStorage } from "react-native";
import axios from 'axios'
import { EDU_API_ADRESS_CITY, EDU_API_GET_CART_LIST, EDU_API_BASE, EDU_API_COURSE_BASE, EDU_API_ADRESS_LOCALITY, EDU_API_ADRESS_DISTRICT, EDU_API_ADRESS_NEIGHBOORS, EDU_API_GET_BASKET_ID, EDU_API_GET_CREDIT_CARD, EDU_API_PAYMENT_BYCREDITCARD } from '../../constants'
import { Dispatch } from "react";
import { ADDRESS_GET_CITY, SWIPE_CARD, ADRESS_LOADING, ADDRESS_GET_LOCALITY, ADDRESS_GET_DISTRICT, ADDRESS_GET_NEIGHBOOR, CreditCard_LOADING, CreditCard_Message } from './types'
import { Action } from "../../models/action";
import { IBasket, ICrediCartInfo, ICrediCartInfoRequestModel } from "../../models/course/coruseItem";
import { navigate } from "../services/Navigator";



export interface moneyOrder {
    bankName: string;
    disyplayPayTotalAmount: string;
    ibanNumber: string;
    orderNo: string;
    orderType: number;
    ownerName: string;


}


export interface adress {
    id: number;
    name: string;

}

export enum adressType {
    CITY = "city",
    LOCALITY = "locality",
    DISTRICT = "district",
    NEIGHBOORS = "neighboors",
}


export function cardSwiped(swiped: boolean) {
    return (dispatch: Dispatch<Action>) => {
        console.log("girmisartik")
        dispatch(swipe(swiped));

    }
}



export function getBasketId(basket: IBasket) {
    return (dispatch: Dispatch<Action>) => {
        dispatch(loading(true));
        AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
            let token = res[0][1];
            let userId = res[1][1];

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

            console.log(token)
            console.log(userId)
            basket.userId = parseInt(userId);
            axios.post(EDU_API_GET_BASKET_ID, {
                userId: basket.userId,
                cityId: basket.cityId,
                localityId: basket.localityId,
                districtId: basket.districtId,
                neighboorId: basket.neighboorId,
                adressInfo: basket.adressInfo,
                companyName: basket.companyName,
                taxOffice: basket.taxOffice,
                taxNumber: basket.taxNumber,
                ipAdress: basket.ipAdress,
                identityNo: basket.identityNo,
                courseIds: basket.courseIds,
                courseType: basket.courseType,
                orderType: basket.orderType,
            }, { headers: headers }).then((res) => {
                if (res.data.isSuccess) {
                    var moneyOrderTmp = {} as moneyOrder;

                    let data = res.data.result;
                    moneyOrderTmp.bankName = data.bankName;
                    moneyOrderTmp.disyplayPayTotalAmount = data.disyplayPayTotalAmount;
                    moneyOrderTmp.ibanNumber = data.ibanNumber;
                    moneyOrderTmp.orderNo = data.orderNo;
                    moneyOrderTmp.orderType = data.orderType;
                    moneyOrderTmp.ownerName = data.ownerName;
                    console.log(data)

                    if (basket.orderType == 2) {
                        // havale icin
                        navigate('MoneyOrder', { moneyOrder: moneyOrderTmp });
                    }
                    else if (basket.orderType == 1) {
                        let basketId = data.basketId;
                        console.log("basket");
                        navigate('CreditCart', {basketId: basketId, userId:userId});
                
                        // kredi icin
                        /* axios.post(EDU_API_GET_CREDIT_CARD, {
                             basketId: basketId
                         },{ headers: headers }).then((response) => {
 
                            if(response.data.isSuccess) {
                                console.log("Asasd")
                                console.log(response.data)
                           
                                 console.log(checkoutFormContent)
                                 navigate('checkoutWeb',{checkoutFormContent : checkoutFormContent})
                
 
                            }
                            else {
                                console.log("olmadi")
                            }
                         }).catch(err=> {
                             console.log(err)
                         })*/



                    }



                }

                console.log(res)
            }).catch(err => {
                console.log(err)
            })



        })

        dispatch(loading(false));
    }
}



export function getAdressList(adress: adressType, id: number) {
    console.log("girdi");
    return (dispatch: Dispatch<Action>) => {
        console.log("girdi2");
        dispatch(loading(true));

        var adressCityList: adress[] = [];
        if (adress === adressType.CITY) {
            axios.get(EDU_API_ADRESS_CITY).then((res) => {
                if (res.data.isSuccess) {
                    res.data.result.forEach(element => {
                        console.log(element.name)
                        adressCityList.push({
                            id: element.id,
                            name: element.name
                        })
                    });
                    dispatch(getListAdressCity(adressCityList));
                    dispatch(loading(false));
                }
            })
        }
        else if (adress === adressType.LOCALITY) {
            dispatch(loading(true));
            console.log(id)
            axios.get(EDU_API_ADRESS_LOCALITY + `${id}`).then((res) => {
                if (res.data.isSuccess) {
                    res.data.result.forEach(element => {
                        console.log(element.name)
                        adressCityList.push({
                            id: element.id,
                            name: element.name
                        })
                    });
                    dispatch(getListAdressLocality(adressCityList));
                    dispatch(loading(false));
                }
            }).catch(err => {
                console.log(err)
            })
        }
        else if (adress === adressType.DISTRICT) {
            dispatch(loading(true));
            console.log(id + "asd")
            axios.get(EDU_API_ADRESS_DISTRICT + `${id}`).then((res) => {
                if (res.data.isSuccess) {
                    res.data.result.forEach(element => {
                        console.log(element.name)
                        adressCityList.push({
                            id: element.id,
                            name: element.name
                        })
                    });
                    dispatch(getListAdressDistrict(adressCityList));
                    dispatch(loading(false));
                }
            }).catch(err => {
                console.log(err)
            })
        }
        else if (adress === adressType.NEIGHBOORS) {
            dispatch(loading(true));
            console.log(id + "asd")
            axios.get(EDU_API_ADRESS_NEIGHBOORS + `${id}`).then((res) => {
                if (res.data.isSuccess) {
                    res.data.result.forEach(element => {
                        console.log(element.name)
                        adressCityList.push({
                            id: element.id,
                            name: element.name
                        })
                    });
                    dispatch(getListAdressNeighboor(adressCityList));
                    dispatch(loading(false));
                }
            }).catch(err => {
                console.log(err)
            })
        }

    }

}
export function payWithCreditCard(creditCardInfo: ICrediCartInfoRequestModel) {


    return (dispatch: Dispatch<Action>) => {
        dispatch(creditCardloading(true));
        AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
            let token = res[0][1];
            let userId = res[1][1];
 
console.log("gelen data", creditCardInfo);
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            axios.post(EDU_API_GET_CREDIT_CARD, {
                basketId: creditCardInfo.basketId,
                cardNameSurname:creditCardInfo.nameSurname,
                creditCardNumber:creditCardInfo.creditCardNumber,
                month:creditCardInfo.month,
                year:creditCardInfo.year,
                cvv2:creditCardInfo.cvv2
            }, { headers: headers }).then((response) => {
    console.log("kredi kartı gelen data",response.data);
                if (response.data.isSuccess) {
                    console.log(response.data);
                    navigate('checkoutWeb', { creditCardInfo:creditCardInfo });
                }
                else {
                    dispatch(creditCardloading(false));
                    dispatch(creditCardMessage(response.data.message));
                }
            }).catch(err => {
                console.log(err)
            })

        });

    }


}


export const swipe = (swiped: boolean) => ({
    type: SWIPE_CARD,
    payload: swiped
})

export const getListAdressCity = (response: adress[]) => ({
    type: ADDRESS_GET_CITY,
    payload: response
})



export const getListAdressLocality = (response: adress[]) => ({
    type: ADDRESS_GET_LOCALITY,
    payload: response
})


export const getListAdressDistrict = (response: adress[]) => ({
    type: ADDRESS_GET_DISTRICT,
    payload: response
})


export const getListAdressNeighboor = (response: adress[]) => ({
    type: ADDRESS_GET_NEIGHBOOR,
    payload: response
})



export const loading = (loading: boolean) => ({
    type: ADRESS_LOADING,
    payload: loading
});

export const creditCardloading = (loading: boolean) => ({
    type: CreditCard_LOADING,
    payload: loading
});

export const creditCardMessage = (message:string) => ({
    type: CreditCard_Message,
    payload: message
});