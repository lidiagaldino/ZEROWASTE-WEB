import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import '../styles/solicitepage.css'
import celular from '../../../assets/celular.png'
import Swal from 'sweetalert2';
import { connectionWebSocket } from '../../../utils/connectionWebSocket';
import Select from "react-select";
import teste from "../../profile/components/Container";
import { response } from 'express';
import { Divide } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons'
import { buildTransform } from 'framer-motion';


type dados = {
    id_endereco: number
    id_gerador: number
    id_materiais?: string[]
}

type drop = {
    id: string,
    value: string,
    label: string
}

type data = {
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

type dadosUser = {
    id: number,
    email: string,
    senha: string,
    telefone: string,
    foto: string,
    biografia: string
    catador: [
        {
            id: number,
            id_usuario: number,
            materiais_catador: [
                {
                    id: number,
                    id_materiais: number,
                    id_catador: number,
                    material: {
                        id: number,
                        nome: string
                    }
                }
            ]
        }
    ],
    gerador: [],
    pessoa_fisica?: [
        {
            id: number,
            cpf: string,
            nome: string,
            data_nascimento: string,
            id_usuario: number
        }
    ],
    pessoa_juridica?: [
        {
            id: number,
            cnpj: string,
            nome_fantasia: string,
            id_usuario: number
        }
    ],
    endereco_usuario: [
        {
            id: number,
            id_endereco: number,
            id_usuario: number,
            endereco: {
                id: number,
                logradouro: string,
                bairro: string,
                cidade: string,
                estado: string,
                cep: string,
                complemento: string
            }
        }
    ]

}




const SolicitePage = () => {

    const [complementoOptions, setComplementoOptions] = useState([])

    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/endereco/${localStorage.getItem('id')}`).then(response => response.json()).then(resposta => setComplementoOptions(resposta.map((item) => {
            localStorage.setItem('idEndP', item.id)
            return (
                {
                    label: item.endereco.apelido,
                    value: item.endereco.apelido,
                    id: item.id
                }
            )
        })))
    }, [])

    const [data, setData] = useState(false)

    useEffect(() => {
        fetch(`https://zero-waste-logistic.azurewebsites.net/order/gerador`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        }).then((response) => {


            setData(response.status == 200 ? true : false)
        }).catch((e) => {
            console.log(e)
            setData(false)
        })
    }, [])

    connectionWebSocket.on("orderError", (order) => {
        console.log(order);
    })

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

    const [order, setOrder] = useState<data>({ id: 0, id_material: [{ material: { nome: '' } }], id_gerador: 0, id_catador: 0, id_status: 0, endereco: { id: 0, bairro: '', cidade: '', estado: '', cep: '', complemento: '', latitude: 0, longitude: 0, apelido: '', numero: '', logradouro: '' }, created_at: new Date('0000-00-00T00:00:00'), finished_at: new Date('0000-00-00T00:00:00'), distancia: 0 })

    useEffect(() => {
        fetch(`https://zero-waste-logistic.azurewebsites.net/order/gerador`, {
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        }).then(response => response.json()).then(resposta => setOrder(resposta.map((item) => {
            return {
                id: item.id,
                id_gerador: item.id_gerador,
                id_catador: item.id_catador,
                id_status: item.id_status,
                endereco: {
                    id: item.endereco.id,
                    bairro: item.endereco.bairro,
                    cidade: item.endereco.cidade,
                    estado: item.endereco.estado,
                    cep: item.endereco.cep,
                    complemento: item.endereco.complemento,
                    latitude: item.endereco.latitude,
                    longitude: item.endereco.longitude,
                    apelido: item.endereco.apelido,
                    numero: item.endereco.numero,
                    logradouro: item.endereco.logradouro
                },
                created_at: item.created_at,
                finished_at: item.finished_at,
                distancia: item.FilaPedidoCatador[0].distancia,
                id_material: item.MateriaisPedido
            }
        })))
    }, [])




    const soliciteSpec = () => {

        const requisitos: dados = {
            id_endereco: Number(local),
            id_gerador: Number(localStorage.getItem('id_modo')),
            id_materiais: selected
        }


        const cadastrarPedido = fetch(`https://zero-waste-logistic.azurewebsites.net/order/${localStorage.getItem('viewPriv')}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
            body: JSON.stringify(requisitos)
        })

        if (cadastrarPedido) {
            Swal.fire({
                title: 'Tudo certo!!',
                text: 'pedido enviado para catador especifico',
                icon: 'success'
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'pedido nao enviado para catador especifico',
            })
        }
    }




    const cancelOrder = () => {


        fetch(`https://zero-waste-logistic.azurewebsites.net/order/cancel/${order[0].id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);

            Swal.fire({
                title: 'Tudo certo!!',
                text: 'Solicitação cancelada',
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



    async function pedido(event: FormEvent) {
        event.preventDefault()


        const requisitos: dados = {
            id_endereco: Number(local),
            id_gerador: Number(localStorage.getItem('id_modo')),
            id_materiais: selected
        }
        console.log(requisitos);


        const cadastrarPedido = await fetch('https://zero-waste-logistic.azurewebsites.net/order', {
            method: 'POST',
            body: JSON.stringify(requisitos),
            headers: {
                'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        })




        if (cadastrarPedido.ok) {
            Swal.fire({
                title: 'Tudo certo!!',
                text: 'Material foi enviado (fila)',
                icon: 'success'
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Nao foi possivel criar a fila',
            })
        }

    }

    const [dataSpec, setDataSpec] = useState<dadosUser>()
    const [dataOrder, setDataOrder] = useState(false)


    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/user/${localStorage.getItem('id-other-person')}`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        }).then(response => response.json()).then(resposta => setDataSpec(resposta)).catch((e) => {
            setDataOrder(true)
        })
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
        console.log(value);

        setLocal(value.id)
    }



    const navigate = useNavigate()






    return (
        <div className="bdd">
            <div className="boxx">
                <div className="img-boxx">
                    <img src={celular} />
                </div>
                <div className="form-boxx">
                    {data == false &&

                        <>
                            <h2>Solicite uma coleta</h2>
                            <p>Formulario para solicitacao de uma coleta</p>

                            {localStorage.getItem('orderSpec') != '0' ?
                                <>
                                    {dataSpec?.email.length > 0 &&

                                        <div className="SpecificCatador">
                                            <div className="circleSpec"><FontAwesomeIcon icon={faUser} style={{fontSize: 30}} /></div>
                                            <div className="infoCatadorSpec">
                                                
                                                <h2>{dataSpec?.pessoa_fisica.length > 0 ? dataSpec?.pessoa_fisica[0].nome : dataSpec?.pessoa_juridica[0].nome_fantasia}</h2>
                                                <p>Catador</p>
                                            </div>
                                        </div>


                                    }
                                </>
                                : ''}




                            <form onSubmit={pedido} className='form-solicite'>

                                <div className='drop' style={{ width: 375, height: 50, borderRadius: 100 }}>
                                    <p style={{fontSize: 15}}>Selecione o local que será solicitado:</p>
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
                                    <p>Selecione os materiais que serão descartados:</p>
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


                                <div className="input-groupp w50">
                                    {localStorage.getItem('orderSpec') != '0' ? 
                                       <button type='button' onClick={soliciteSpec}>Solicite</button>  : <button type='submit'>Solicite</button>}
                                   
                                </div>


                            </form>
                        </>
                    }
                    {data == true &&
                        <>

                            <div className='SoliAndamento-container'>
                                <div className="circle-warning" style={{border: "3px solid black",  }}>
                                    <FontAwesomeIcon icon={faTriangleExclamation} style={{fontSize: 35, alignItems: 'center', justifyContent: 'center', marginBottom: 5}}/>
                                </div>
                                
                                <h1 style={{marginTop: 15}} >Você já tem uma solicitação em andamento</h1>
                                <button className="btn-hover color-11" type='button' onClick={cancelOrder}>Cancelar corrida</button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default SolicitePage; teste
