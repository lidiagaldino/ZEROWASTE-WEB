import React from 'react'
import CatadoresProximos from './components/CatadoresProximos'
import MenuLateral from '../home/components/MenuLateral'

const CatadorePro = () => {
    return (
        <body>
            <div className='containerr'>
                <div>
                    <MenuLateral />
                </div>
                <section className='home-section-catadores-proximos'>
                    <CatadoresProximos />
                </section>
            </div>
        </body>
    )
}

export default CatadorePro