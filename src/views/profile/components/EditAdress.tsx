import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import InputMask from "react-input-mask";
import  '../styles/editadress.css'
import '../styles/uptadeadress.css'
import api from '../../../api/axios';
import Swal from 'sweetalert2';
import { getLatitudeLongitude } from '../../../utils/getLatitudeLongitude';
import 'animate.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type dados = {
    id: string,
    logradouro: string,
    cidade: string,
    complemento: string,
    apelido: string,
    numero: string
    latitude: string,
    longitude: string

}

type view = 'view' | 'edit'

type dadosCEP = {
    logradouro: string,
    localidade: string,
    complemento?: string,
    uf: string,
    cep: string,
    numero: string,
    id_usuario: string
}

export default function EditAdress() {

    const [isLoading, setIsLoading] = useState(false);
    const [regiao, setRegiao] = useState([])
    function handleClick() {
        setIsLoading(true);
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

    useEffect(() => {
        api.get(`/endereco/${localStorage.getItem('id')}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
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
        api.get(`/endereco/unique/${e.currentTarget.id}`, {

        }).then(response => {
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
            setCep(response.data.cep)
        })
    }

    const deleteAdresss = () => {
        api.delete(`/endereco/${localStorage.getItem('id')}/${localStorage.getItem('clickEdit')}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then(() => {

            Swal.fire({
                text: 'Tudo certo!!',
                title: 'Endereço removidos com sucesso',
                icon: 'success'
            })
        }).catch((e) => {
            console.log(e);

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo deu errado!',
            })
        })
    }
    const [viewState, setViewState] = useState<view>('edit')
    const [modal, setModal] = useState(false);
    const [modall, setModall] = useState(false);
    const [numero, setNumero] = useState<string>()
    const [apelido, setApelido] = useState<string>()
    const [complemento, setComplemento] = useState<string>()
    const [cidade, setCidade] = useState<string>()
    const [logradouro, setLogradouro] = useState<string>()
    const [bairro, setBairro] = useState<string>()
    const [estado, setEstado] = useState<string>()
    const [latitude, setLatitude] = useState<number>()
    const [longitude, setLongitude] = useState<number>()
    const [local, setLocal] = useState({ id: '', logradouro: '', bairro: '', cidade: '', estado: '', apelido: '', numero: '', complemento: '', cep: '' })
    const [cepData, setCepData] = useState<dadosCEP>()
    const [infoo, setInfoo] = useState<dados>()
    const [cep, setCep] = useState('')
    const [user, setUser] = useState({
        cep, logradouro, cidade, complemento, apelido, numero, bairro, estado, latitude, longitude
    })




    const handleChangeCep = (event: ChangeEvent<HTMLInputElement>): void => {
        setCep(event.target.value)
        setLocal({ ...local, cep: event.target.value })
    }

    const handleChangeLogradouro = (event: ChangeEvent<HTMLInputElement>): void => {
        setLogradouro(event.target.value)
        setLocal({ ...local, logradouro: event.target.value })
    }
    const handleChangeCidade = (event: ChangeEvent<HTMLInputElement>): void => {
        setCidade(event.target.value)
        setLocal({ ...local, cidade: event.target.value })
    }
    const handleChangeBairro = (event: ChangeEvent<HTMLInputElement>): void => {
        setBairro(event.target.value)
        setLocal({ ...local, bairro: event.target.value })
    }

    const handleChangeEstado = (event: ChangeEvent<HTMLInputElement>): void => {
        setEstado(event.target.value)
        setLocal({ ...local, estado: event.target.value })
    }
    const handleChangeComplemento = (event: ChangeEvent<HTMLInputElement>): void => {
        setComplemento(event.target.value)
        setLocal({ ...local, complemento: event.target.value })
    }
    const handleChangeApelido = (event: ChangeEvent<HTMLInputElement>): void => {
        setApelido(event.target.value)
        setLocal({ ...local, apelido: event.target.value })
    }
    const handleChangeNumero = (event: ChangeEvent<HTMLInputElement>): void => {
        setNumero(event.target.value)
        setLocal({ ...local, numero: event.target.value })
    }



    async function updateAdress(event: FormEvent) {
        event.preventDefault()


        const latlong2 = await getLatitudeLongitude({ logradouro: local.logradouro, cidade: local.cidade, estado: local.estado })

        const enderecoEdit = {
            cep: local.cep,
            complemento: local.complemento ? local.complemento : ' ',
            cidade: local.cidade,
            logradouro: local.logradouro,
            apelido: local.apelido,
            numero: local.numero,
            bairro: local.bairro,
            estado: local.estado,
            latitude: `${latlong2.lat}`,
            longitude: `${latlong2.lng}`
        }

        const enderecoAtualizado = await api.put(`/endereco/${localStorage.getItem('clickEdit')}`, enderecoEdit, {
            headers: {
                'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        })

        console.log(enderecoAtualizado.status);

        if (enderecoAtualizado.status == 200) {
            Swal.fire({
                text: 'Tudo certo!!',
                title: 'Endereço atualizado com sucesso',
                icon: 'success'
            })

            toggleModal()

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

    const checkCEP = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        setLocal({ ...local, cep: event.target.value })

        if (event.target.value.length == 9) {
            try {

                const data = await fetch(`https://opencep.com/v1/${event.target.value.replace('-', '')}.json`).then(res => res.json())
                setLocal({
                    ...local,
                    cep: data.cep,
                    cidade: data.localidade,
                    bairro: data.bairro,
                    estado: data.uf,
                    complemento: data.complemento,
                    logradouro: data.logradouro
                })

            } catch (error) {

                setCidade('')
                setLogradouro('')
            }
        } else {

            setCidade('')
            setLogradouro('')
        }



    }


    return (
        <>

            <button onClick={toggleModal} className='edit-adresss'>Ver endereços</button>


            {modal && (
                <div className="modal ">
                    <div className="overlay "></div>
                    <form className="modal-contentt animate__animated animate__fadeInUp ">
                        <div className='modal-support animate__animated animate__fadeInUp'>

                        
                        <div className='top-content-adress'>
                            <h2 className='titulo-content-adress'>Endereços Cadastrados de <small>{localStorage.getItem('nome')}</small></h2>
               
                        </div>
                        <div className='under-content-adress'>
                            <div className='content-edit-adress'>
                                {regiao.map((item) => {


                                    return (
                                        <>
                                            <div className='scrolll'>
                                                <div className="boxUserProximos" >
                                                    <div className='container_apelido_adress'>
                                                        <h3 className='apelido_adress'>{item.apelido}</h3>
                                                    </div>
                                                    <div className=''>
                                                        <div className='box_edit_adress'>
                                                            {viewState == 'edit' &&
                                                                <button type='button' id={item.id} key={item.id} onClick={(e) => {
                                                                    toggleModall()
                                                                    e.currentTarget.id
                                                                    localStorage.setItem('clickEdit', e.currentTarget.id)

                                                                    takeID(e)

                                                                }} className='Edit_adress_buton'>Editar</button>
                                                            }
                                                        </div>
                                                        {viewState == 'edit' &&
                                                            <button type='button' id={item.id} key={item.id} onClick={(e) => {

                                                                e.currentTarget.id
                                                                localStorage.setItem('clickEdit', e.currentTarget.id)

                                                                deleteAdresss()
                                                                handleClick()
                                                            }} className='Edit_adress_buton_remove'>Remover</button>
                                                        }
                                                    </div>
                                                    <>

                                                        {modall && (

                                                            <div className="modal-2">
                                                                <div className="overlay-2"></div>
                                                                <form onSubmit={updateAdress} className="modal-content-2">
                                                                    <div className='top-contentadrees-profile-2'>
                                                                        <h1 className='toph1'>Editar enderecos</h1>
                                                                        <hr />
                                                                    </div>

                                                                    <div className='under-content-profile-2'>
                                                                        <div className='content-edit-profile-2'>

                                                                            <div className="form__group field">
                                                                                <InputMask mask="99999-999" maskChar={null} onChange={checkCEP} className="form_field_adress" value={local.cep} placeholder="CEP" />
                                                                                <label htmlFor="name" className="form__label">CEP</label>
                                                                            </div>

                                                                            <div className="form__group field">
                                                                                <input onChange={handleChangeLogradouro} value={local.logradouro} type="text" className="form_field_adress" placeholder="Name" />
                                                                                <label htmlFor="name" className="form__label">Rua</label>
                                                                            </div>


                                                                            <div className="form__group field">
                                                                                <input onChange={handleChangeNumero} type="text" value={local.numero} className="form_field_adress" placeholder="Name" />
                                                                                <label htmlFor="name" className="form__label">Numero</label>
                                                                            </div>

                                                                            <div className="form__group field">
                                                                                <input onChange={handleChangeComplemento} type="text" value={local.complemento} className="form_field_adress" placeholder="Name" />
                                                                                <label htmlFor="name" className="form__label">Complemento</label>
                                                                            </div>

                                                                            <div className="form__group field">
                                                                                <input onChange={handleChangeApelido} type="text" className="form_field_adress" value={local.apelido} placeholder="Name" name="name" />
                                                                                <label htmlFor="name" className="form__label">Renomear local</label>
                                                                            </div>

                                                                            <div className="form__group field">
                                                                                <input onChange={handleChangeBairro} type="text" className="form_field_adress" value={local.bairro} placeholder="Name" />
                                                                                <label htmlFor="name" className="form__label">Bairro</label>
                                                                            </div>

                                                                            <div className="form__group field">
                                                                                <input onChange={handleChangeCidade} type="text" value={local.cidade} className="form_field_adress" placeholder="Name" name="name" />
                                                                                <label htmlFor="name" className="form__label">Cidade</label>
                                                                            </div>

                                                                            <div className="form__group field">
                                                                                <input onChange={handleChangeEstado} type="text" value={local.estado} className="form_field_adress" placeholder="Name" name="name" />
                                                                                <label htmlFor="name" className="form__label">Estado</label>
                                                                            </div>


                                                                        </div>
                                                                    </div>

                                                                    <div className='save-changes-position-2'>
                                                                        <button type='submit' className='save-changes-2' onClick={updateAdress}> {isLoading ? 'Salvando alteracoes...' : 'Salvar Alteracoes'} </button>

                                                                    </div>


                                                                    <button className="close-modal-2" onClick={toggleModall} >
                                                                        Fechar2
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

                        <button className="close-modall" onClick={toggleModal}>
                        <FontAwesomeIcon icon={faXmark} className="icon-xmark" />
                        </button>
                        </div>
                    </form>
                </div >
            )}
        </>
    )
}