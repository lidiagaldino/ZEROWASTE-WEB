import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import InputMask from "react-input-mask";
import UpdateAdress from './UptadeAdress';
import '../styles/editadress.css'
import '../styles/uptadeadress.css'
import api from '../../../api/axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { setLocale } from 'yup';

type dados = {
    id: string,
    logradouro: string,
    cidade: string,
    complemento: string,
    apelido: string,
    numero: string
    lat: number;
    lng: number;

}

type dadosCEP = {
    logradouro: string,
    complemento?: string,
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
        })
    }


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
        setUser({ cep: event.target.value, logradouro, cidade, complemento, apelido, numero, bairro, estado, latitude, longitude })
    }

    const handleChangeLogradouro = (event: ChangeEvent<HTMLInputElement>): void => {
        setLogradouro(event.target.value)
        setUser({ cep, logradouro: event.target.value, cidade, complemento, apelido, numero, bairro, estado, latitude, longitude })
    }
    const handleChangeCidade = (event: ChangeEvent<HTMLInputElement>): void => {
        setCidade(event.target.value)
        setUser({ cep, logradouro, cidade: event.target.value, complemento, apelido, numero, bairro, estado, latitude, longitude })
    }
    const handleChangeBairro = (event: ChangeEvent<HTMLInputElement>): void => {
        setBairro(event.target.value)
        setUser({ cep, logradouro, cidade, complemento, apelido, numero, bairro: event.target.value, estado, latitude, longitude })
    }

    const handleChangeEstado = (event: ChangeEvent<HTMLInputElement>): void => {
        setEstado(event.target.value)
        setUser({ cep, logradouro, cidade, complemento, apelido, numero, bairro, estado: event.target.value, latitude, longitude })
    }
    const handleChangeComplemento = (event: ChangeEvent<HTMLInputElement>): void => {
        setComplemento(event.target.value)
        setUser({ cep, logradouro, cidade, complemento: event.target.value, apelido, numero, bairro, estado, latitude, longitude })
    }
    const handleChangeApelido = (event: ChangeEvent<HTMLInputElement>): void => {
        setApelido(event.target.value)
        setUser({ cep, logradouro, cidade, complemento, apelido: event.target.value, numero, bairro, estado, latitude, longitude })
    }
    const handleChangeNumero = (event: ChangeEvent<HTMLInputElement>): void => {
        setNumero(event.target.value)
        setUser({ cep, logradouro, cidade, complemento, apelido, numero: event.target.value, bairro, estado, latitude, longitude })
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
            numero: numero,
            bairro: bairro,
            estado: estado,
            latitude: latitude,
            longitude: longitude
        }
        console.log(enderecoEdit);



        const enderecoAtualizado = await fetch(`https://webappdeploy-backend.azurewebsites.net/endereco/${localStorage.getItem('id')}`, {
            method: 'PUT',
            body: JSON.stringify(enderecoEdit),
            headers: {
                'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        })

        console.log(`https://webappdeploy-backend.azurewebsites.net/endereco/${localStorage.getItem('id')}`);

        console.log(enderecoAtualizado.ok);

        if (enderecoAtualizado.ok) {
            Swal.fire({
                text: 'Tudo certo!!',
                title: 'Endereço atualizado com sucesso',
                icon: 'success'
            })

            toggleModal()

            console.log(enderecoAtualizado);
            alert('certo')

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo deu errado!',
            })
            alert('errado')
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
    const { register } = useForm()
    const checkCEP = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {

        setCep(event.target.value)

        if (event.target.value.length == 9) {
            try {

                const data = await fetch(`https://opencep.com/v1/${event.target.value.replace('-', '')}.json`).then(res => res.json())
                setCidade(data.localidade)
                setLogradouro(data.logradouro)
                setApelido(data.complemento)
                setBairro(data.bairro)
                setComplemento(data.complemento)
                setEstado(data.uf)
                setCepData(data)

            } catch (error) {
                console.log(`teste`)
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

            <button onClick={toggleModal}>ver endereços</button>


            {modal && (
                <div className="modal">
                    <div className="overlay"></div>
                    <form className="modal-content">
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
                                                                <div className="overlay-2"></div>
                                                                <form onSubmit={updateAdress} className="modal-content-2">
                                                                    <div className='top-contentadrees-profile-2'>
                                                                        <h1 className='toph1'>Editar enderecos</h1>
                                                                        <hr />
                                                                    </div>

                                                                    <div className='under-content-profile-2'>
                                                                        <div className='content-edit-profile-2'>

                                                                            <div className="form__group field">
                                                                                <InputMask mask="99999-999" maskChar={null} onChange={checkCEP} placeholder="CEP" />
                                                                                <label htmlFor="name" className="form__label">CEP</label>
                                                                            </div>

                                                                            <div className="form__group field">
                                                                                <input defaultValue={local.logradouro} value={logradouro} onChange={handleChangeLogradouro} type="text" className="form__field" placeholder="Name" />
                                                                                <label htmlFor="name" className="form__label">Rua</label>
                                                                            </div>


                                                                            <div className="form__group field">
                                                                                <input defaultValue={local.numero} value={numero} onChange={handleChangeNumero} type="text" className="form__field" placeholder="Name" />
                                                                                <label htmlFor="name" className="form__label">Numero</label>
                                                                            </div>

                                                                            <div className="form__group field">
                                                                                <input defaultValue={local.complemento} onChange={handleChangeComplemento} type="text" className="form__field" placeholder="Name" />
                                                                                <label htmlFor="name" className="form__label">Complemento</label>
                                                                            </div>

                                                                            <div className="form__group field">
                                                                                <input defaultValue={local.apelido} value={apelido} onChange={handleChangeApelido} type="text" className="form__field" placeholder="Name" name="name" />
                                                                                <label htmlFor="name" className="form__label">Renomear local</label>
                                                                            </div>

                                                                            <div className="form__group field">
                                                                                <input defaultValue={local.bairro} value={bairro} onChange={handleChangeBairro} type="text" className="form__field" placeholder="Name" />
                                                                                <label htmlFor="name" className="form__label">Bairro</label>
                                                                            </div>

                                                                            <div className="form__group field">
                                                                                <input defaultValue={local.estado} value={estado} onChange={handleChangeEstado} type="text" className="form__field" placeholder="Name" name="name" />
                                                                                <label htmlFor="name" className="form__label">Estado</label>
                                                                            </div>


                                                                        </div>
                                                                    </div>

                                                                    <div className='save-changes-position-2'>
                                                                        <button type='submit' className='save-changes-2' onClick={updateAdress}> {isLoading ? 'Salvando alteracoes...' : 'Salvar Alteracoes'} </button>

                                                                    </div>


                                                                    <button className="close-modal-2" onClick={toggleModall} >
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

                        <button className="close-modal" onClick={toggleModal}>
                            Fechar
                        </button>
                    </form>
                </div >
            )}
        </>
    )
}