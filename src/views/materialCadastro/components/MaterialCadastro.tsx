import React, { useState, useEffect } from 'react'
import '../materialcadastro.css'
import Select from "react-select";


type dadosMateriais = {
    id_catador: string,
    id_materiais: string[]
}

type drop = {
    id: string,
    value: string,
    label: string
}

const MaterialCadastro = () => {

    const [isRemoverClicked, setIsRemoverClicked] = useState(false)
    const [dropOptions, setDropOptions] = useState([])
    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/materiais/not_collect/${localStorage.getItem('id_modo')}`).then(response => response.json()).then(resposta => setDropOptions(resposta.map((item) => {
            return (
                {

                    label: item.nome,
                    value: item.nome,
                    id: item.id
                }
            )
        })))
    }, [])

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


    async function registrarMaterial() {

        const usuario: dadosMateriais = {
            id_catador: localStorage.getItem('id_modo'),
            id_materiais: selected
        }



        const cadastro = await fetch(`https://webappdeploy-backend.azurewebsites.net/materiais/catador`, {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        })

        if (cadastro.ok) {
            alert('oi')
        }



    }


    return (
        <>
            <div>
                <button>Adicione material</button>
                <button>Remover material</button>
            </div>

            <form onSubmit={registrarMaterial} className='material-section'>
                <div className='material-container'>

                    <div className='material-content'>
                        <h1>Bem-vindo Eduardo Perucci
                            ao cadastro de materiais !</h1>
                        <p>Selecione materiais que voce recolhe</p>
                        <div className='drop'>
                            <Select
                                defaultValue={[dropOptions[2]]}
                                isMulti
                                name={"materials-select"}
                                options={dropOptions}
                                className={'basic-multi-selectt'}
                                onChange={handleChange}
                                placeholder="Selecione os materiais:"
                                blurInputOnSelect={true}
                                required
                            />
                        </div>
                        <button type='submit' className='buttonMaterial'>CONFIRMAR</button>
                    </div>
                </div>
            </form>

            <form onSubmit={registrarMaterial} className='material-section'>
                <div className='material-container'>

                    <div className='material-content'>
                        <h1>Bem-vindo Eduardo Perucci
                            a remocao de materiais !</h1>
                        <p>Selecione materiais que voce queira apagar</p>
                        <div className='drop'>
                            <Select
                                defaultValue={[dropOptions[2]]}
                                isMulti
                                name={"materials-select"}
                                options={dropOptions}
                                className={'basic-multi-selectt'}
                                onChange={handleChange}
                                placeholder="Selecione os materiais:"
                                blurInputOnSelect={true}
                                required
                            />
                        </div>
                        <button type='submit' className='buttonMaterial'>CONFIRMAR</button>
                    </div>
                </div>
            </form>
        </>

    )
}

export default MaterialCadastro