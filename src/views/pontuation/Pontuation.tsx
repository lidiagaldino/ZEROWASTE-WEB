import React, { useState } from 'react';
import MenuLateral from '../home/components/MenuLateral';
import PontuationCupom from './components/PontuationCupom'



const Pontuation = () => {



    return (
        <div className='main-material'>
            <MenuLateral />
            <div className='body-pontuation'>
                <PontuationCupom />
            </div>

        </div>

    )
}

export default Pontuation