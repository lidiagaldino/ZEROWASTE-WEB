import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import '../styles/solicitepage.css'
import celular from '../../../assets/celular.png'

const SolicitePage = () => {

    const [dropOptions, setDropOptions] = useState([])

    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/gerador`).then(response => response.json()).then(resposta => setDropOptions(resposta.message.map((item) => {
            return (
                {
                    label: localStorage.getItem('complemento'),
                    value: item.complemento,
                    id: item.id
                }
            )
        })))
    }, [])








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
                        <div className="input-groupp">
                            <input type="text" id="localizacao" placeholder="Localizaçao" required />
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