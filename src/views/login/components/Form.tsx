import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import logo from '../../../assets/logo.png'
import '../styles/formSignIn.css'
import '../styles/button.css'
import { Person, Envelope } from 'phosphor-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const form = () => {
  const [emailState, setEmailState] = useState({ value: '' })
  const [passState, setPassState] = useState({ value: '' })

  const navigate = useNavigate()



  function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    setEmailState({ value: event.target.value })
  }

  function handlePassChange(event: ChangeEvent<HTMLInputElement>): void {
    setPassState({ value: event.target.value })
  }

  async function login(event: FormEvent) {
    event.preventDefault()

    if (!emailState.value || !passState.value) {
      return
    }

    const usuario = {
      email: emailState.value,
      senha: passState.value
    }

    const teste = await fetch('https://webappdeploy-backend.azurewebsites.net/user/auth', {
      method: 'POST',
      body: JSON.stringify(usuario),
      headers: {
        'content-type': 'application/json'
      }
    })

    const responde = await teste.json()

    setEmailState({ value: '' })
    setPassState({ value: '' })

    if (teste.ok) {
      localStorage.setItem('token', responde.token)
      localStorage.setItem('nome', responde.user.pessoa_juridica.length > 0 ? responde.user.pessoa_juridica[0].nome_fantasia : responde.user.pessoa_fisica[0].nome)
      localStorage.setItem('tipo', responde.user.catador.length > 0 ? 'Catador' : 'Gerador')
      localStorage.setItem('id', responde.user.id)
      navigate('/home', { replace: true })
    }
  }

  return (
    <form onSubmit={login} className="sign-in-form">
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