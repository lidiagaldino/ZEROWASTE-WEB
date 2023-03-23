import React from 'react'
import Slide from './components/Slide'
import MenuLateral from '../home/components/MenuLateral'

const Dicas = () => {
    return (
        <body>
            <div className='container-dicas'>
                <div className='container-menu'>
                    <MenuLateral />
                </div>
                <section className='home-section-slide'>
                    <Slide />
                </section>
            </div>
        </body>
    )
}

export default Dicas