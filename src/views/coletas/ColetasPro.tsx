import React from 'react'
import MenuLateral from '../home/components/MenuLateral'
import ColetasProximas from './components/ColetasProximas'
const ColetasPro = () => {
    return (
        <body className='body-proximos'>
            <div className='containerr'>
                <div>
                    <MenuLateral />
                </div>
                <section className='home-section-coletas-proximas'>
                    <ColetasProximas />
                </section>
            </div>
        </body>
    )
}

export default ColetasPro