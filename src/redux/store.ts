import { compose, applyMiddleware, createStore ,combineReducers} from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AsyncStorage from '@react-native-community/async-storage';
import reducer from "./reducers";
import signupred from './reducers/SignUpReducers'
import loginRed from './reducers/LoginReducers'
import HomeReducers from './reducers/HomeReducers';
import cartReducers from './reducers/cartReducers';
import courseCheckoutReducers from './reducers/courseCheckoutReducers'
import userReducer from './reducers/userReducers'
const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

const rootReducer = combineReducers({
  home : HomeReducers,
  system: reducer,
  login: loginRed,
  signup: signupred,
  cart : cartReducers,
  courseCheckout : courseCheckoutReducers,
  user :userReducer
})


export type AppState = ReturnType<typeof rootReducer>


export default function configureStore() {
  const enhancer = compose(applyMiddleware(...middlewares));
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);
  return { store, persistor };
}
