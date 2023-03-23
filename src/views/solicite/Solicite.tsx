import React from 'react'
import SolicitePage from './components/SolicitePage'
import MenuLateral from '../home/components/MenuLateral'

const Solicite = () => {
    return (
        <body>
            <div className='containerr'>
                <div>
                    <MenuLateral />
                </div>
                <section className='home-section-solicite'>
                    <SolicitePage />
                </section>
            </div>
        </body>
    )
}

export default Solicite