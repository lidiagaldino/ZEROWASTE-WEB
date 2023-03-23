import React from 'react'
import CadastroPage from './components/CadastroPage'
import MenuLateral from '../home/components/MenuLateral'
import '../home/styles/SideNavBar.css'

const Cadastro = () => {
  return (
    <body>
      <div className='containerr'>
        <div>
          <MenuLateral />
        </div>
        <section className='home-section-cadastro'>
          <CadastroPage />
        </section>
      </div>
    </body>

  )
}

export default Cadastro