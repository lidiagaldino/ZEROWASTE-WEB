import React, { useState, useEffect, Fragment } from 'react'
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

    const [addclass, setaddclass] = useState("");


    return (
        <>
            <div className={`material ${addclass}`} id="material">
                <div className="form-material  sign-up-material">
                    <form className='form-cadastro-material'>
                        <div className='material-content'>
                            <h1>Olá, {localStorage.getItem('nome')}!</h1>
                            <p>Selecione materiais que voce queira remover</p>
                            <ul>
                                <li>a</li>
                                <li>a</li>
                                <li>a</li>
                                <li>a</li>
                                <li>a</li>
                                <li>a</li>
                                <li>a</li>
                            </ul>
                        </div>
                        <button className='btn-register-mt' type="submit">Confirmar</button>
                    </form>
                </div>
                <div className="form-material sign-in-material">
                    <form className='form-cadastro-material'>
                        <div className='material-content'>
                            <h1>Bem-vindo {localStorage.getItem('nome')} ao cadastro de materiais !</h1>
                            <p>Selecione materiais que voce recolhe</p>
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
                        <button className='btn-register-mt' type="submit">Confirmar</button>
                    </form>
                </div>
                <div className="overlay-material">
                    <div className="overlay-mt">
                        <div className="overlay-panel-mt overlay-left-mt">
                            <button
                                className="ghost"
                                id="signIn"
                                onClick={() => setaddclass("")}>Adicionar Materiais</button>
                        </div>
                        <div className="overlay-panel-mt overlay-right-mt">
                            <button
                                className="ghost"
                                id="signUp"
                                onClick={() => setaddclass("right-panel-active-mt")}>Remover materiais</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MaterialCadastro