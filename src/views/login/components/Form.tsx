import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import logo from '../../../assets/logo.png'
import '../styles/formSignIn.css'
import '../styles/button.css'
import { Person, Envelope } from 'phosphor-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { validateLogin } from '../../../validations/loginValidation'
import api from '../../../api/axios'

import { connectionWebSocket } from '../../../utils/connectionWebSocket'




const form = () => {
  const [emailState, setEmailState] = useState({ value: '' })
  const [passState, setPassState] = useState({ value: '' })

  const [status, setStatus] = useState({
    type: '',
    message: ''
  })
  const [user, setUser] = useState({
    email: emailState.value,
    senha: passState.value
  })



  const navigate = useNavigate()

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    setEmailState({ value: event.target.value })
    setUser({ email: event.target.value, senha: passState.value })
  }

  function handlePassChange(event: ChangeEvent<HTMLInputElement>): void {
    setPassState({ value: event.target.value })
    setUser({ email: emailState.value, senha: event.target.value })
  }

  async function login(event: FormEvent) {
    event.preventDefault()




    if (!(await validateLogin(user, setStatus))) {
      return
    }

    const usuario = {
      email: emailState.value,
      senha: passState.value
    }

    api.post('/user/auth', usuario, {
      headers: {
        'content-type': 'application/json'
      }
    }).then((responde) => {
      setEmailState({ value: '' })
      setPassState({ value: '' })
      localStorage.setItem('email', responde.data.user.email)
      localStorage.setItem('telefone', responde.data.user.telefone)
      localStorage.setItem('token', responde.data.token)
      localStorage.setItem('nome', responde.data.user.pessoa_juridica.length > 0 ? responde.data.user.pessoa_juridica[0].nome_fantasia : responde.data.user.pessoa_fisica[0].nome)
      localStorage.setItem('tipo', responde.data.user.catador.length > 0 ? 'Catador' : 'Gerador')
      localStorage.setItem('tipo_pessoa', responde.data.user.pessoa_juridica.length > 0 ? 'Pessoa Juridica' : 'Pessoa Fisica')
      localStorage.setItem('id', responde.data.user.id)
      localStorage.setItem('biografia', responde.data.user.biografia)
      localStorage.setItem('foto', responde.data.user.foto)
      localStorage.setItem('cpfcnpj', responde.data.user.pessoa_juridica.length > 0 ? responde.data.user.pessoa_juridica[0].cnpj : responde.data.user.pessoa_fisica[0].cpf)
      localStorage.setItem('id_modo', responde.data.user.catador.length > 0 ? responde.data.user.catador[0].id : responde.data.user.gerador[0].id)
   
      navigate('/home', { replace: true })

      connectionWebSocket.connect();

      if(connectionWebSocket.connected){
      console.log('conectou');
      
      } else {
        console.log('n conectou');
        
      }


    }).catch(() => {
      setStatus({
        message: 'Email ou senha incorretos',
        type: 'error'
      })
    })
  }

  return (

    <form onSubmit={login} className="sign-in-form">
      {status.type === 'success' ? <p style={{ color: "green" }}>{status.message}</p> : ""}
      {status.type === 'error' ? <p style={{ color: "red" }}>{status.message}</p> : ""}
      <img src={logo} className='logoo' alt="logo" />
      <h2 className='title'>Entrar</h2>
      <div className="input-field">
        <i><Person /></i>
        <input autoComplete='current-password' type="email" name='email' placeholder="Email" value={emailState.value} onChange={handleEmailChange} />
      </div>

      <div className="input-field">
        <i><Envelope /></i>
        <input value={passState.value} name='pass' type="password" placeholder="Senha" onChange={handlePassChange} />
      </div>

      <button type="submit" value="Entrar" className="btn solid">Entrar</button>


    </form>
  )
}

export default form