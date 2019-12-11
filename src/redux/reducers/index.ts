import {combineReducers} from 'redux';
import LoginReducers from './LoginReducers';
import SignUpReducers from './SignUpReducers'
import HomeReducers from './HomeReducers';
import UserReducer from './userReducers'
// import RegisterReducers from './RegisterReducers';
// import MemberReducers from './MemberReducers';

export default combineReducers({
    LoginResponse:LoginReducers,
    RegisterResponse: SignUpReducers,
    HomeReducers : HomeReducers,
    UserReducer : UserReducer

})