import React from 'react'
import { Children } from 'react'
import { Navigate, useNavigation } from 'react-router-dom'

type props = JSX.Element

export const ProtectedRoutes = ({ children: props }): JSX.Element => {
    const user = localStorage.getItem('token')
    console.log(user);
    return user != null && user != 'undefined' ? props : <Navigate to='/' replace={true} />
}

export const CatadorRoutes = ({ children: props }): JSX.Element => {
    const tipo = localStorage.getItem('tipo')
    return tipo == 'Catador' ? props : <Navigate to='/' replace={true} />
}

export const GeradorRoutes = ({ children: props }): JSX.Element => {
    const tipo = localStorage.getItem('tipo')
    return tipo == 'Gerador' ? props : <Navigate to='/' replace={true} />
}
