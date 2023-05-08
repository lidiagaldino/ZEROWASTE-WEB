import React, { useEffect, useState } from 'react'
import DropwDownColetas from './DropDownColetas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../bg-animation.css'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckIcon } from '@radix-ui/react-icons';
import api from '../../../api/axios'
import { v4 as uuidv4 } from 'uuid';
import { connectionWebSocket } from '../../../utils/connectionWebSocket'
import Swal from 'sweetalert2'


type dados = {
    id: number;
    id_material: { material: { nome: string } }[];
    id_gerador: number;
    id_catador?: number;
    endereco: {
        id?: number,
        bairro?: string,
        logradouro?: string
        cidade?: string,
        estado?: string,
        cep?: string,
        complemento?: string,
        latitude?: number
        longitude?: number,
        apelido?: string,
        numero?: string
    };
    created_at: Date;
    finished_at?: Date;
    id_status: number;
    distancia?: number;
}

const ColetasProximas = () => {
    const [selected, setSelected] = useState('')
    const [regiao, setRegiao] = useState([])
    const [data, setData] = useState<dados>({ id: 0, id_material: [{ material: { nome: '' } }], id_gerador: 0, id_catador: 0, id_status: 0, endereco: { id: 0, bairro: '', cidade: '', estado: '', cep: '', complemento: '', latitude: 0, longitude: 0, apelido: '', numero: '', logradouro: '' }, created_at: new Date('0000-00-00T00:00:00'), finished_at: new Date('0000-00-00T00:00:00'), distancia: 0 })
    const [resIO, setResIO] = useState([])
    const [checkFavorite, setCheckFavorite] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`https://zero-waste-logistic.azurewebsites.net/order`, {
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        }).then(response => response.json()).then((resposta) => {
            console.log(resposta.pedido.FilaPedidoCatador)
            setData(
                {
                    id: resposta.pedido.id,
                    id_gerador: resposta.pedido.id_gerador,
                    id_catador: resposta.pedido.id_catador,
                    id_status: resposta.pedido.id_status,
                    endereco: {
                        id: resposta.pedido.endereco.id,
                        bairro: resposta.pedido.endereco.bairro,
                        cidade: resposta.pedido.endereco.cidade,
                        estado: resposta.pedido.endereco.estado,
                        cep: resposta.pedido.endereco.cep,
                        complemento: resposta.pedido.endereco.complemento,
                        latitude: resposta.pedido.endereco.latitude,
                        longitude: resposta.pedido.endereco.longitude,
                        apelido: resposta.pedido.endereco.apelido,
                        numero: resposta.pedido.endereco.numero,
                        logradouro: resposta.pedido.endereco.logradouro
                    },
                    created_at: resposta.pedido.created_at,
                    finished_at: resposta.pedido.finished_at,
                    distancia: resposta.pedido.FilaPedidoCatador[0].distancia,
                    id_material: resposta.pedido.MateriaisPedido
                }
            )
        })

    }, [])


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

    const acceptOrder = () => {
        fetch(`https://zero-waste-logistic.azurewebsites.net/order/${data.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        }).then(() => {
            Swal.fire({
                title: 'Tudo certo!!',
                text: 'Aceito criado com sucesso',
                icon: 'success'
            })
        }).catch((e) => {

            console.log(e)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo está errado!',
            })
        })
    }

    const finishOrder = () => {
        fetch(`https://zero-waste-logistic.azurewebsites.net/order/finish/${data.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        }).then(() => {
            Swal.fire({
                title: 'Tudo certo!!',
                text: 'Finalizada criado com sucesso',
                icon: 'success'
            })
        }).catch((e) => {

            console.log(e)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo está errado!',
            })
        })
    }

    const denyOrder = () => {
        fetch(`https://zero-waste-logistic.azurewebsites.net/order/deny/${data.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        }).then(() => {
            Swal.fire({
                title: 'Tudo certo!!',
                text: 'Recusada criado com sucesso',
                icon: 'success'
            })
        }).catch((e) => {

            console.log(e)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo está errado!',
            })
        })
    }



    connectionWebSocket.on('newOrder', (order) => {
        setData(order)
    })


    console.log(data)


    return (
        <div>
            <div className='bg-proximos'>
                <div className='wave -one'></div>
                <div className='wave -two'></div>
                <div className='wave -three'></div>
            </div>



            <div className="search-box">
                <input className="search-txt" type="text" name="" placeholder="Procure por nome ou endereço" />
                <a className="search-btn">
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffff", }} />
                </a>
            </div>
            <div className='scroll'>
                <div className='infoS'>
                    <h1 className='titleBoxU'>Coletas proximas</h1>
                    <div className='reg-bt'>

                    </div>
                </div>



                {data.id == 0 &&
                    <>

                        <h1 style={{ paddingTop: 400, alignItems: 'center', display: 'flex', justifyContent: 'center    ' }}>Você não recebeu nenhuma solicitação de coleta</h1>
                    </>
                }


                {data.id > 0 &&

                    <>
                        <div id={`${data.id}`} key={`${data.id}_${uuidv4()}`} className="boxUserProximos">

                            <div className="container-branco">
                                <div className="subContainer-info">
                                    <div className="info-card">
                                        <h1>{data.distancia} Metros de distancia</h1>
                                        <h2>Destino: {data.endereco.logradouro} {data.endereco.numero}, {data.endereco.cidade} - {data.endereco.estado}</h2>
                                        <h2>Materiais presentes no local: {data.id_material.map((elemento) => {
                                            return (
                                                <p>{elemento.material.nome} </p>
                                            )
                                        })} </h2>
                                    </div>
                                    <div className="AcceptRecuse">
                                        {data.id_status == 2 &&
                                            <button className='acceptButton' type='button' onClick={finishOrder}>Já recolhi o material</button>
                                        }
                                        {data.id_status == 1 &&
                                            <>
                                                <button className="acceptButton" type='button' onClick={acceptOrder}>Aceitar</button>
                                                <button className="declineButton" type='button' onClick={denyOrder}>Recusar</button>
                                            </>


                                        }

                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </>
                }

            </div>
        </div >
    )
}

export default ColetasProximas