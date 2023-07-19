import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../Pages/Login'
import { Signin } from '../Pages/Signin'
import { Dashboard } from '../Pages/Dashboard'
import { Private } from '../Pages/Private'
export const AllRoute = () => {
  return (
    <Routes>
       <Route index element={<Login />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='dashboard' element={<Dashboard/>}/>

      {/* <Route path='dashboard' element={<Private><Dashboard/></Private>}/> */}
      </Routes>
  )
}
