import {applyMiddleware,combineReducers, legacy_createStore} from 'redux'
import {reducer as authReducer } from "./reducer"
import thunk from 'redux-thunk'
const root=combineReducers({
    authReducer
   
})

export const store=legacy_createStore(root,applyMiddleware(thunk))