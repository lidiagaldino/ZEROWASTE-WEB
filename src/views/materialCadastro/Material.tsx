import React, { useState } from 'react'
import MenuLateral from '../home/components/MenuLateral'
import MaterialCadastro from './components/MaterialCadastro'


const Material = () => {



    return (
        <div className='main-material'>
            <MenuLateral />
            <div className='body-cadastro'>
                <MaterialCadastro />
            </div>

        </div>

    )
}

export default Material