
import React from 'react'
import MenuLateral from '../home/components/MenuLateral'
import Container from './components/Container'

import './styles/main.css'

const Profile = () => {
  return (
    <div className='main'>
        <MenuLateral />
        <div className='body'>
            <Container />
        </div>
        
    </div>
    
  )
}

export default Profile