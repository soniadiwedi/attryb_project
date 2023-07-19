import React from 'react'
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const Private = ({children}) => {
  const isAuth=useSelector((store)=>{
    console.log( store.authReducer.isAuth)
    return  store.authReducer.isAuth
})

const location=useLocation()
console.log(location);
if(!isAuth){
return <Navigate to={"/login"} state={location.pathname} replace/>
}

return children
}
