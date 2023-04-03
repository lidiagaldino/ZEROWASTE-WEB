import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import '../styles/solicitepage.css'
import celular from '../../../assets/celular.png'
import Select from "react-select";

type drop = {
    id: string,
    value: string,
    label: string
}

const SolicitePage = () => {

    const [complementoOptions, setComplementoOptions] = useState([])

    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/endereco/${localStorage.getItem('id')}`).then(response => response.json()).then(resposta => setComplementoOptions(resposta.map((item) => {
            console.log(item.endereco)
            return (
                {
                    label: item.endereco.apelido,
                    value: item.endereco.apelido,
                    id: item.id
                }
            )
        })))
    }, [])



    const [dropOptions, setDropOptions] = useState([])

    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/materiais`).then(response => response.json()).then(resposta => setDropOptions(resposta.message.map((item) => {
            return (
                {

                    label: item.nome,
                    value: item.nome,
                    id: item.id
                }
            )
        })))
    }, [])
    const [local, setLocal] = useState('')
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

    const handleSelectChange = (value: any) => {
        setLocal(value)
    }






    return (
        <div className="bdd">
            <div className="boxx">
                <div className="img-boxx">
                    <img src={celular} />
                </div>
                <div className="form-boxx">
                    <h2>Solicite uma coleta</h2>
                    <p>Formulario para solicitacao de uma coleta</p>
                    <form action="#" className='form-solicite'>
                        {/* <div className="input-groupp">
                            <input type="text" id="localizacao" placeholder="Localizaçao" required />
                        </div> */}

                        <div className='drop' style={{ width: 375, height: 50, borderRadius: 100 }}>
                            <p>Selecione o local que será solicitado:</p>
                            <Select
                                name="materials"
                                options={complementoOptions}
                                className="basic-multi-select"
                                classNamePrefix="Selecione"
                                onChange={handleSelectChange}
                                required
                            />

                        </div>



                        <div className='drop' style={{ width: 375, height: 50, borderRadius: 100, paddingTop: 30 }}>
                            <p>Selecione os materiais que sera descartado:</p>
                            <Select
                                defaultValue={[dropOptions[2]]}
                                isMulti
                                name="materials"
                                options={dropOptions}
                                className="basic-multi-select"
                                classNamePrefix="Selecione"
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* <div className='drop' style={{ width: 375, height: 50, borderRadius: 100}}>
                    <Select
                        defaultValue={[dropOptions[2]]}
                        isMulti
                        name="materials"
                        options={dropOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleChange}
                    />
                </div> */}




                        <div className="input-groupp w50">
                            <button type='submit'>Solicite</button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default SolicitePage