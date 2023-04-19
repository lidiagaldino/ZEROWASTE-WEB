import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import UpdateAdress from './UptadeAdress';
import '../styles/editadress.css'
import '../styles/uptadeadress.css'
import api from '../../../api/axios';
import Swal from 'sweetalert2';
import { setLocale } from 'yup';

type dados = {
    id: string,
    logradouro: string,
    cidade: string,
    complemento: string,
    apelido: string,
    numero: string

}

type dadosCEP = {
    logradouro: string,
    complemento?: string,
    cep: string,
    numero: string,
    id_usuario: string
}

export default function EditAdress() {
    const [modal, setModal] = useState(false);
    const [modall, setModall] = useState(false);
    const [regiao, setRegiao] = useState([])
    const [numero, setNumero] = useState<string>()
    const [apelido, setApelido] = useState<string>()
    const [complemento, setComplemento] = useState<string>()
    const [cidade, setCidade] = useState<string>()
    const [logradouro, setLogradouro] = useState<string>()
    const [local, setLocal] = useState({ id: '', logradouro: '', bairro: '', cidade: '', estado: '', apelido: '', numero: '', complemento: '', cep: '' })
    const [cepData, setCepData] = useState<dadosCEP>()
    const [cep, setCep] = useState('')
    const [user, setUser] = useState({
        cep, logradouro, cidade, complemento, apelido, numero
    })

    useEffect(() => {
        api.get(`/endereco/${localStorage.getItem('id')}`, {
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
        }).then(response => setRegiao(response.data.map((elemento) => {
            return ({
                id: elemento.endereco.id,
                logradouro: elemento.endereco.logradouro,
                cidade: elemento.endereco.cidade,
                apelido: elemento.endereco.apelido

            })
        })))
    }, [])



    const takeID = (e) => {
        api.get(`/endereco/unique/${e.currentTarget.id}`, {})
            .then(response => {
                setLocal({
                    id: response.data.id,
                    logradouro: response.data.logradouro,
                    bairro: response.data.bairro,
                    cidade: response.data.cidade,
                    estado: response.data.estado,
                    apelido: response.data.apelido,
                    numero: response.data.numero,
                    complemento: response.data.complemento,
                    cep: response.data.cep
                })
            })
    }

    const handleChangeCep = (event: ChangeEvent<HTMLInputElement>): void => {
        setCep(event.target.value)
        setUser({ cep: event.target.value, logradouro, cidade, complemento, apelido, numero })
    }

    const handleChangeLogradouro = (event: ChangeEvent<HTMLInputElement>): void => {
        setLogradouro(event.target.value)
        setUser({ cep, logradouro: event.target.value, cidade, complemento, apelido, numero })
    }
    const handleChangeCidade = (event: ChangeEvent<HTMLInputElement>): void => {
        setCidade(event.target.value)
        setUser({ cep, logradouro, cidade: event.target.value, complemento, apelido, numero })
    }
    const handleChangeComplemento = (event: ChangeEvent<HTMLInputElement>): void => {
        setComplemento(event.target.value)
        setUser({ cep, logradouro, cidade, complemento: event.target.value, apelido, numero })
    }
    const handleChangeApelido = (event: ChangeEvent<HTMLInputElement>): void => {
        setApelido(event.target.value)
        setUser({ cep, logradouro, cidade, complemento, apelido: event.target.value, numero })
    }
    const handleChangeNumero = (event: ChangeEvent<HTMLInputElement>): void => {
        setNumero(event.target.value)
        setUser({ cep, logradouro, cidade, complemento, apelido, numero: event.target.value })
    }

    async function updateAdress(event: FormEvent) {
        event.preventDefault()

        let enderecoEdit

        enderecoEdit = {
            cep: cep,
            complemento: complemento,
            cidade: cidade,
            logradouro: logradouro,
            apelido: apelido,
            numero: numero
        }

        const enderecoAtualizado = await fetch(`https://webappdeploy-backend.azurewebsites.net/endereco/${localStorage.getItem('id')}`, {
            method: 'PUT',
            body: JSON.stringify(enderecoEdit),
            headers: {
                'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        })

        const enderecoa = await enderecoAtualizado.json()



        if (enderecoAtualizado.ok) {
            Swal.fire({
                text: 'Tudo certo!!',
                title: 'Conta atualizada com sucesso',
                icon: 'success'
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo deu errado!',
            })
        }
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
                    <div className="overlay"></div>
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
                                                    <h3>{item.apelido}</h3>
                                                </div>
                                                <div className=''>

                                                    <button type='button' id={item.id} key={item.id} onClick={(e) => {
                                                        toggleModall()
                                                        e.currentTarget.id
                                                        takeID(e)

                                                    }} className='Edit_adress_buton'>Editar</button>
                                                    <>

                                                        {modall && (

                                                            <div className="modal-2">
                                                                <div onClick={toggleModal} className="overlay-2"></div>
                                                                <form onSubmit={updateAdress} className="modal-content-2">
                                                                    <div className='top-content-profile-2'>
                                                                        <h1>Editar enderecos</h1>
                                                                        <hr />
                                                                    </div>

                                                                    <div className='under-content-profile-2'>
                                                                        <div className='content-edit-profile-2'>

                                                                            <div className="form__group field">
                                                                                <input defaultValue={local.cep} type="text" className="form__field" placeholder="Name" name="name" id='nomeedit' required />
                                                                                <label htmlFor="name" className="form__label">CEP</label>
                                                                            </div>

                                                                            <div className="form__group field">
                                                                                <input defaultValue={local.logradouro} type="text" className="form__field" placeholder="Name" name="name" id='nomeedit' required />
                                                                                <label htmlFor="name" className="form__label">Rua</label>
                                                                            </div>


                                                                            <div className="form__group field">
                                                                                <input defaultValue={local.numero} type="text" className="form__field" placeholder="Name" name="name" id='nomeedit' required />
                                                                                <label htmlFor="name" className="form__label">Numero</label>
                                                                            </div>

                                                                            <div className="form__group field">
                                                                                <input defaultValue={local.complemento} type="text" className="form__field" placeholder="Name" name="name" id='nomeedit' required />
                                                                                <label htmlFor="name" className="form__label">Complemento</label>
                                                                            </div>

                                                                            <div className="form__group field">
                                                                                <input defaultValue={local.apelido} type="text" className="form__field" placeholder="Name" name="name" id='nomeedit' required />
                                                                                <label htmlFor="name" className="form__label">Renomear local</label>
                                                                            </div>


                                                                        </div>
                                                                    </div>

                                                                    <div className='save-changes-position-2'>
                                                                        <button type='submit' className='save-changes-2' >  </button>
                                                                    </div>


                                                                    <button className="close-modal-2" onClick={toggleModall}>
                                                                        Fechar
                                                                    </button>
                                                                </form>
                                                            </div >
                                                        )}
                                                    </>
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    )
                                })}
                            </div>
                        </div>


                    </form>
                </div >
            )}
        </>
    )
}