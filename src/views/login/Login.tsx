import { motion } from 'framer-motion'
import React, { createRef, useRef, useState } from 'react'

import './styles/circle.css'
import './styles/button.css'
import './styles/style.css'
import './styles/form.css'
import './styles/reset.css'
import './styles/panels.css'
import Form from './components/Form'
import RegisterForm from './components/RegisterForm'
import boneco from '../../assets/login-boneco.png'
import boneco2 from '../../assets/cadatro-boneco.png'

const Login = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSignInOpen, setSignIn] = useState(true)
  const [isSignInContainerOpen, setSignInContaienr] = useState(true)
  const [isSignUpOpen, setSignUp] = useState(false)
  const [isSignUpContainerOpen, setSignUpContaienr] = useState(false)



  const circleVariants = {
    hidden: {
      scale: [2, 4, 2],
      transition: {
        duration: 1,
        type: 'spring',
      }
    },
    visible: {
      scale: [2, 4, 2],
      transition: {
        duration: 1,
        type: 'spring',
      }
    }


  }

  const signInVariants = {
    hidden: {
      display: 'none',
      opacity: 0
    },
    visible: {
      display: 'block',
      opacity: 1,
      transition: {
        delay: 0.5
      }
    }
  }
  const signUpVariants = {
    hidden: {
      display: 'none',
      opacity: 0
    },
    visible: {
      display: 'block',
      opacity: 1,
      transition: {
        delay: 0.5
      }
    }
  }


  const signInContainerVariants = {
    hidden: {

      opacity: 0
    },
    visible: {

      opacity: 1,
      transition: {
        delay: 0.2
      }
    }
  }

  const signUpContainerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2
      }
    }
  }

  return (
    <div className='container'>

      <motion.div className='circle' variants={circleVariants} initial='hidden' animate={isOpen ? 'visible' : 'hidden'}></motion.div>

      <div className='forms-container'>
        <motion.div className='sign-in' variants={signInVariants} initial='visible' animate={isSignInOpen ? 'visible' : 'hidden'}>
          <Form />
        </motion.div>

        <motion.div className='sign-up' variants={signUpVariants} initial='hidden' animate={isSignUpOpen ? 'visible' : 'hidden'}>
          <RegisterForm />
        </motion.div>
      </div>

      < div className='panels-container'>
        <motion.div variants={signInContainerVariants} initial='visible' animate={isSignInContainerOpen ? 'visible' : 'hidden'}>
          <div className='panel left-panel'>
            <div className='content'>
              <h3>É novo por aqui ?</h3>
              <p>
                Cadastra-se para participar de uma nova inovação no mundo para salvar nosso planeta.
              </p>

              <button className='button' onClick={() => {
                setIsOpen(!isOpen)
                setSignIn(false)
                setSignUp(true)
                setSignInContaienr(false)
                setSignUpContaienr(true)
              }}>Registre-se</button>

              <img src={boneco2} alt="" />
            </div>



          </div>

        </motion.div>

        <motion.div variants={signUpContainerVariants} initial='hidden' animate={isSignUpContainerOpen ? 'visible' : 'hidden'}>
          <div className='panel right-panel'>
            <div className='content'>
              <h3>Ja faz parte da nossa comunidade ?</h3>
              <p>
                Faça login em sua conta e continue nos ajudando a salvar o planeta.
              </p>

              <button className='button' onClick={() => {
                setIsOpen(!isOpen)
                setSignUp(false)
                setSignIn(true)
                setSignUpContaienr(false)
                setSignInContaienr(true)
              }}>Entrar</button>

              <img src={boneco} alt="" />


            </div>

          </div>
        </motion.div>
      </div>
    </div>

  )
}

export default Login