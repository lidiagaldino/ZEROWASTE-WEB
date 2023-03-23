import React from 'react'
import { Children } from 'react'
import { Navigate } from 'react-router-dom'

type props = JSX.Element

const ProtectedRoutes = ({ children: props }): JSX.Element => {
    const user = localStorage.getItem('token')
    console.log(user);
    return user != null && user != 'undefined' ? props : <Navigate to='/ZEROWASTE' />
}

export default ProtectedRoutes