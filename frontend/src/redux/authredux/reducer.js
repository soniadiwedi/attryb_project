import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./actinType"


const initialState={
    isLoading:false,
    isAuth:false,
    token:"",
    isError:false,
    errorMsg: ""
}

export const reducer =(state=initialState,{type,payload})=>{
    switch(type){
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
            return{...state, isLoading:true, isError:false, errorMsg: ""};
        case LOGIN_SUCCESS:
            return{...state, isLoading:false, isAuth:true, token:payload.token};
        case SIGNUP_SUCCESS:
            return{...state, isLoading:false, }
        case LOGIN_FAILURE:
        case SIGNUP_FAILURE:
            return{...state, isLoading:false, isError:true, errorMsg:payload.errorMsg};
        case LOGOUT:
            return{...state, isAuth:false, token:""};
        default:
            return state;
    }
}