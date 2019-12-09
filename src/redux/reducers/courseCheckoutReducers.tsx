import { ADDRESS_GET_CITY,ADDRESS_GET_LOCALITY,ADRESS_LOADING, ADDRESS_GET_DISTRICT, ADDRESS_GET_NEIGHBOOR, SWIPE_CARD } from "../actions/types";
import { Action } from "../../models/action";
import { HomeState } from "../../models/state";
import { adress } from "../actions/CheckoutActions";

export interface AdressState {
    loading: boolean;
    adressCity : adress[];  
    adressLocality : adress[];
    adressDistrict : adress[];
    adressNeighboor : adress[];
    isCardSwiped : boolean,
  }
  

const intialState = {
  loading: false,
  adressCity : [],
  adressLocality: [],
  adressDistrict : [],
  adressNeighboor : [],
  isCardSwiped : false 
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

    default:
      return {...state};
  }
};
