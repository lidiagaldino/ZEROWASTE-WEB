import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import UpdateAdress from './UptadeAdress';
import '../styles/editadress.css'
import '../styles/uptadeadress.css'

export default function EditAdress() {
    const [modal, setModal] = useState(false);
    const [modall, setModall] = useState(false);
    const [regiao, setRegiao] = useState([])


    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/endereco/${localStorage.getItem('id')}`).then(response => response.json()).then(resposta => setRegiao(resposta.map((item) => {
            return (
                {
                    label: item.endereco.apelido,
                    value: item.endereco.apelido,
                    id: item.id,
                    id_endereco: item.id_endereco
                }
            )
        })))
    }, [])


    async function updateAdress(event: FormEvent) {

    }

    const toggleModal = () => {
        setModal(!modal);

    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const toggleModall = () => {
        setModall(!modall);

    };

    if (modall) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }



    return (
        <>
            <button onClick={toggleModal}>ver endereços</button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <form onSubmit={updateAdress} className="modal-content">
                        <div className='top-content-profile'>
                            <h1>Endereços Cadastrados de (nome usuario)</h1>
                            <hr />
                        </div>

                        <div className='under-content-profile'>
                            <div className='content-edit-profile'>
                                {regiao.map((item) => {
                                    return (
                                        <>
                                            <div className="boxUserProximos" >
                                                <div className=''>
                                                    <h3>{item.value}</h3>
                                                </div>
                                                <div className=''>
                                                    <button id={item.id} key={item.id} onClick={toggleModall} className='Edit_adress_buton'>Editar</button>

                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    )
                                })}


                            </div>
                        </div>

                        <div className='save-changes-position'>
                            <button type='submit' className='save-changes' >  </button>
                        </div>



                        <button className="close-modal" onClick={toggleModal}>
                            Fechar
                        </button>
                    </form>
                </div >
            )}
        </>
    )
}