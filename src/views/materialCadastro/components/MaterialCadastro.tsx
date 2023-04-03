import React, {useState,useEffect} from 'react'
import '../materialcadastro.css'
import Select from "react-select";
import Dropdown from './DropDown';

type drop = {
    id: string,
    value: string,
    label: string
}

type dados = {
    materiais?: string[]
}

const MaterialCadastro = () => {

    const [selected, setSelected] = useState<string[]>([]);

    const handleChange = (value: any) => {
        let array: string[] = []

        value.map((item: drop) => {
            console.log(typeof (item.id))
            array.push(item.id)
        })
        console.log(array);
        setSelected(array)
    }


    

    return (
    <div className='material-section'>
        <div className='material-container'>
            <div className='material-content'>
                <h1>Bem-vindo Eduardo Perucci
                    ao cadastro de materiais !</h1>
                <p>Selecione materiais que voce recolhe</p>
                <Dropdown/>
                <button className='buttonMaterial'>CONFIRMAR</button>
            </div>
            </div>
        </div>
   
    )
}

export default MaterialCadastro