
import { AsyncStorage } from "react-native";
import axios from 'axios'
import { EDU_API_ADRESS_CITY, EDU_API_GET_CART_LIST, EDU_API_BASE ,EDU_API_COURSE_BASE, EDU_API_ADRESS_LOCALITY, EDU_API_ADRESS_DISTRICT, EDU_API_ADRESS_NEIGHBOORS} from '../../constants'
import { Dispatch } from "react";
import { ADDRESS_GET_CITY,SWIPE_CARD,ADRESS_LOADING, ADDRESS_GET_LOCALITY, ADDRESS_GET_DISTRICT, ADDRESS_GET_NEIGHBOOR } from './types'
import { Action } from "../../models/action";






export interface adress {
    id : number;
    name :string;

}   

export enum adressType {
    CITY = "city",
    LOCALITY = "locality",
    DISTRICT = "district",
    NEIGHBOORS ="neighboors",
}


export function cardSwiped(swiped : boolean) {
    return(dispatch : Dispatch<Action>) => {
        console.log("girmisartik")
        dispatch(swipe(swiped));

    }
}

export function getAdressList(adress : adressType, id : number) {
    console.log("girdi");
    return (dispatch : Dispatch<Action> ) => {
        console.log("girdi2");
        dispatch(loading(true));
       
        var adressCityList : adress[] =[];
        if(adress === adressType.CITY) {
            axios.get(EDU_API_ADRESS_CITY).then((res)=>{
                if(res.data.isSuccess){
                     res.data.result.forEach(element => {
                         console.log(element.name)
                        adressCityList.push({
                            id : element.id,
                            name: element.name
                        })
                    });
                    dispatch(getListAdressCity(adressCityList));
                    dispatch(loading(false));
                }
            })
        }
        else if(adress === adressType.LOCALITY){
            dispatch(loading(true));
            console.log(id)
            axios.get(EDU_API_ADRESS_LOCALITY+`${id}`).then((res)=>{
                if(res.data.isSuccess){
                     res.data.result.forEach(element => {
                         console.log(element.name)
                        adressCityList.push({
                            id : element.id,
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
        else if(adress === adressType.DISTRICT){
            dispatch(loading(true));
            console.log(id+"asd")
            axios.get(EDU_API_ADRESS_DISTRICT+`${id})`).then((res)=>{
                if(res.data.isSuccess){
                     res.data.result.forEach(element => {
                         console.log(element.name)
                        adressCityList.push({
                            id : element.id,
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
        else if(adress === adressType.NEIGHBOORS){
            dispatch(loading(true));
            console.log(id+"asd")
            axios.get(EDU_API_ADRESS_NEIGHBOORS+`${id})`).then((res)=>{
                if(res.data.isSuccess){
                     res.data.result.forEach(element => {
                         console.log(element.name)
                        adressCityList.push({
                            id : element.id,
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


export const swipe = (swiped : boolean) => ({
    type : SWIPE_CARD,
    payload: swiped
})

export const getListAdressCity = (response:adress[]) => ({
    type: ADDRESS_GET_CITY,
    payload: response
})



export const getListAdressLocality = (response:adress[]) => ({
    type: ADDRESS_GET_LOCALITY,
    payload: response
})


export const getListAdressDistrict = (response:adress[]) => ({
    type: ADDRESS_GET_DISTRICT,
    payload: response
})


export const getListAdressNeighboor = (response:adress[]) => ({
    type: ADDRESS_GET_NEIGHBOOR,
    payload: response
})



export const loading = (loading :boolean) => ({
    type: ADRESS_LOADING,
    payload: loading
})

