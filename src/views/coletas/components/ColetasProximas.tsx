import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faLocationDot, faRecycle } from '@fortawesome/free-solid-svg-icons'
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
    const [modal, setModal] = useState(false)
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



    const toggleModal = () => {
        setModal(true);

    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }


    connectionWebSocket.on('newOrder', (order) => {
        setData(order)
    })

    const [appeared, setAppeared] = useState(false)
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
           
            <div className='scrollc'>
            {data.id_status == 1 &&
            
            <>
                <div className='infoS'>
                    {data.id == 0 && 
                    <h1 className='titleBoxU'>Coletas proximas</h1>
                    }
                    
                    <div className='reg-bt'>

                    </div>
                </div>
            </>
            }


                {data.id == 0 &&
                    <>

                        <h1 style={{ paddingTop: 400, alignItems: 'center', display: 'flex', justifyContent: 'center    ' }}>Você não recebeu nenhuma solicitação de coleta</h1>
                    </>
                }

               {modal == false &&
               <>
                {data.id > 0 && data.id_status == 1 &&

                    <>

                        <div id={`${data.id}`} key={`${data.id}_${uuidv4()}`} className="boxUserProximoss">

                            <div className="container-branco">
                                <div className="subContainer-info">
                                    <div className="info-card">
                                        <h1>{data.distancia} Metros de distância</h1>
                                        <h2><FontAwesomeIcon icon={faLocationDot} /> <h2>Destino:</h2> {data.endereco.logradouro} {data.endereco.numero}, {data.endereco.cidade} - {data.endereco.estado}</h2>
                                        <h2><FontAwesomeIcon icon={faRecycle} /> <h3>Materiais presentes no local:</h3> {data.id_material.map((elemento) => {
                                            return (
                                                <p>{elemento.material.nome} </p>
                                            )
                                        })} </h2>
                                    </div>
                                    <div className="AcceptRecuse">
                                    {data.id_status == 1 &&
                                            <>
                                                <button className="acceptButton" type='button' onClick={() => {
                                                    acceptOrder()
                                                    toggleModal()
                                                }}>Aceitar</button>
                                                <button className="declineButton" type='button' onClick={denyOrder}>Recusar</button>
                                            </>
                                        }
                                        
                                        </div>
                                </div>
                            </div>
                         </div>
                         </>
                }
                </>
            }
                           <div className="AcceptRecuse">
                                        
                                       {modal == false &&
                                       <>
                                        {data.id_status == 2 &&  
                                            
                                            <>
                                                <div className="containerProgress">
                                                    <div className="infoProgress">
                                                        <h2>Destino:</h2>
                                                        <h3>{data.endereco.logradouro}</h3>
                                                        <h1 >Materiais:</h1>
                                                        <div className="materiais">
                                                            <p>{data.id_material.map((elemento) => {
                                                                return (
                                                                <p>{elemento.material.nome}</p>
                                                                )
                                                            }) }</p>

                                                        </div>

                                                    </div>
                                                    <div className="circleProgress">
                                                        <div className="nb-spinner"></div>
                                                        <span>O cliente esta aguardando</span>
                                                    </div>
                                                    <div className="buttonsProgress">
                                                        <button className="accept" type='button' onClick={finishOrder} >Eu recolhi o material</button>
                                                        <button className="decline" type='button' onClick={denyOrder}>Cancelar corrida</button>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        </>
                                    }
                                
                                        </div>
            </div>
        </div >
    )
}

export default ColetasProximas