
import React from 'react'

import Login from './login/Login'

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home/Home'

//import ProtectedRoutes from './ProtectedRoutes'
import Profile from './profile/Profile'
import Cadastro from './cadastro/Cadastro'
import Solicite from './solicite/Solicite'
import Dicas from './dicas/Dicas'
import CatadoresProximos from './catadoresProximos/components/CatadoresProximos'
import CatadorePro from './catadoresProximos/CatadorePro'
import Material from './materialCadastro/Material'
import { ProtectedRoutes, CatadorRoutes, GeradorRoutes } from './ProtectedRoutes'


const Routess = () => {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route path='/home' element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>

        } />

        <Route path='/profile' element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        } />

        <Route path='/cadastro' element={
          <ProtectedRoutes>
            <Cadastro />
          </ProtectedRoutes>
        } />

        <Route path='/solicite' element={
          <ProtectedRoutes>
            <GeradorRoutes>
              <Solicite />
            </GeradorRoutes>
          </ProtectedRoutes>
        } />

        <Route path='/material' element={
          <ProtectedRoutes>
            <CatadorRoutes>
              <Material />
            </CatadorRoutes>

          </ProtectedRoutes>
        } />

        <Route path='/dicas' element={
          <ProtectedRoutes>
            <Dicas />
          </ProtectedRoutes>
        } />

        <Route path='/catadores_proximos' element={
          <ProtectedRoutes>
            <GeradorRoutes>
              <CatadorePro />
            </GeradorRoutes>
          </ProtectedRoutes>
        } />


      </Routes>
    </Router>

  )
}

export default Routess