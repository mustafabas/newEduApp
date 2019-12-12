import { ADDRESS_GET_CITY,ADDRESS_GET_LOCALITY,ADRESS_LOADING, ADDRESS_GET_DISTRICT, ADDRESS_GET_NEIGHBOOR, SWIPE_CARD, ORDER_STATUS_GET_LIST, CreditCard_Message, RESET_PROPS } from "../actions/types";
import { Action } from "../../models/action";
import { HomeState } from "../../models/state";
import { adress, IorderStatus } from "../actions/CheckoutActions";

export interface AdressState {
    loading: boolean;
    adressCity : adress[];  
    adressLocality : adress[];
    adressDistrict : adress[];
    adressNeighboor : adress[];
    isCardSwiped : boolean,
    orderList : IorderStatus[];
    isTried : boolean;
    isSucceed : boolean;
    CardErrorMessage:string;


  }
  

const intialState = {
  loading: false,
  adressCity : [],
  adressLocality: [],
  adressDistrict : [],
  adressNeighboor : [],
  isCardSwiped : false ,
  orderList : [],
  isTried : false,
  isSucceed : false,
  CardErrorMessage : ""

};

export default (state: AdressState = intialState, action: Action) => {
  switch (action.type) {
    case ADRESS_LOADING :
        return {
            ...state,
            loading : action.payload
        }
    case ADDRESS_GET_CITY :
        return {
            ...state,
            adressCity : action.payload,
            adressLocality : [],
            adressDistrict : [],
            adressNeighboor : [],

        }
    case ADDRESS_GET_LOCALITY :
      return {
        ...state,
        adressLocality : action.payload,
        adressDistrict : [],
        adressNeighboor : [],

      }
    case ADDRESS_GET_DISTRICT :
      return {
        ...state,
        adressDistrict :action.payload,
        adressNeighboor : []
      }
    case ADDRESS_GET_NEIGHBOOR :
      return {
        ...state,
        adressNeighboor : action.payload

      }
      case SWIPE_CARD :
        return {
          ...state, 
          isCardSwiped : action.payload
        }

      case ORDER_STATUS_GET_LIST:
        return {
          ...state,
          orderList : action.payload,
          loading : false
        }
        case CreditCard_Message:
          return{
            ...state,
            CardErrorMessage:action.payload,
            loading:false,
            isTried : true,
            isSucceed: false,
  
          }
          case RESET_PROPS :
            return {
              ...state,
              loading:false,
              isTried : false,
              isSucceed: false,
            }

    default:
      return {...state};
  }
};
