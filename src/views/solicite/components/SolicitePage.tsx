import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
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
import { faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons'
import { buildTransform } from 'framer-motion';
import solicite_img from '../../../assets/solicite_img.png'

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

type dadosOrder = {
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


const SolicitePage = () => {
    const [order, setOrder] = useState<data>({ id: 0, id_material: [{ material: { nome: '' } }], id_gerador: 0, id_catador: 0, id_status: 0, endereco: { id: 0, bairro: '', cidade: '', estado: '', cep: '', complemento: '', latitude: 0, longitude: 0, apelido: '', numero: '', logradouro: '' }, created_at: new Date('0000-00-00T00:00:00'), finished_at: new Date('0000-00-00T00:00:00'), distancia: 0 })

    const [complementoOptions, setComplementoOptions] = useState([])

    console.log(`https://webappdeploy-backend.azurewebsites.net/endereco/${localStorage.getItem('id')}`);

    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/endereco/${localStorage.getItem('id')}`, {
            headers: {
                
  'Access-Control-Allow-Origin': '*'
            }
        }).then(response => response.json()).then(resposta => setComplementoOptions(resposta.map((item) => {
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
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response => response.json()).then(resposta => {

            if (resposta[0].id) {
                setOrder(resposta[0])
            }
        }).catch((e) => {

            setData(false)
        })
    }, [])




    connectionWebSocket.on("orderError", (order) => {
        setOrder({ id: 0, id_material: [{ material: { nome: '' } }], id_gerador: 0, id_catador: 0, id_status: 0, endereco: { id: 0, bairro: '', cidade: '', estado: '', cep: '', complemento: '', latitude: 0, longitude: 0, apelido: '', numero: '', logradouro: '' }, created_at: new Date('0000-00-00T00:00:00'), finished_at: new Date('0000-00-00T00:00:00'), distancia: 0 })
    })


    const [dropOptions2, setDropOptions2] = useState([])
    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/materiais`, {
            headers: {
                
  'Access-Control-Allow-Origin': '*'
            }
        }).then(response => response.json()).then(resposta => setDropOptions2(resposta.message.map((item) => {
            return (
                {

                    label: item.nome,
                    value: item.nome,
                    id: item.id
                }
            )
        })))
    }, [])

    const [dropOptions, setDropOptions] = useState([])

    if (localStorage.getItem('viewPriv') != null) {
        useEffect(() => {
            fetch(`https://webappdeploy-backend.azurewebsites.net/materiais/${localStorage.getItem('viewPriv')}`, {
                headers: {
                    
  'Access-Control-Allow-Origin': '*'
                }
            }).then(response => response.json()).then(resposta => setDropOptions(resposta.map((item) => {
                return (
                    {

                        label: item.material.nome,
                        value: item.material.nome,
                        id: item.material.id
                    }
                )
            })))
        }, [])
    }












    const soliciteSpec = async () => {

        const requisitos: dados = {
            id_endereco: Number(local),
            id_gerador: Number(localStorage.getItem('id_modo')),
            id_materiais: selected
        }


            ;


        const cadastrarPedido = await fetch(`https://zero-waste-logistic.azurewebsites.net/order/${localStorage.getItem('viewPriv')}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(requisitos)
        })



        const a = await cadastrarPedido.json()
        console.log(a);


        if (cadastrarPedido.ok) {
            Swal.fire({
                title: 'Tudo certo!!',
                text: 'Pedido enviado!',
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


        fetch(`https://zero-waste-logistic.azurewebsites.net/order/cancel/${order.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => {

            setOrder({ id: 0, id_material: [{ material: { nome: '' } }], id_gerador: 0, id_catador: 0, id_status: 0, endereco: { id: 0, bairro: '', cidade: '', estado: '', cep: '', complemento: '', latitude: 0, longitude: 0, apelido: '', numero: '', logradouro: '' }, created_at: new Date('0000-00-00T00:00:00'), finished_at: new Date('0000-00-00T00:00:00'), distancia: 0 })

            Swal.fire({
                title: 'Tudo certo!!',
                text: 'Solicitação cancelada',
                icon: 'success'
            })
        }).catch((e) => {


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



        const cadastrarPedido = await fetch('https://zero-waste-logistic.azurewebsites.net/order', {
            method: 'POST',
            body: JSON.stringify(requisitos),
            headers: {
                'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*'
            }
        })




        if (cadastrarPedido.ok) {
            Swal.fire({
                title: 'Tudo certo!!',
                text: 'Solicitação enviada!',
                icon: 'success'
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Não existe um catador que atenda esta região',
            })
        }

    }

    const [dataSpec, setDataSpec] = useState<dadosUser>()
    const [dataOrder, setDataOrder] = useState(false)

    if (localStorage.getItem('id-other-person') != null) {
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
    }


    



    const [local, setLocal] = useState('')
    const [selected, setSelected] = useState<string[]>([]);


    const handleChange = (value: any) => {
        let array: string[] = []

        value.map((item: drop) => {

            array.push(item.id)
        })

        setSelected(array)
    }




    const navigate = useNavigate()

    const [isActive, setIsActive] = useState(false)

    const handleToggle = () => {
        setIsActive(!isActive);
    };


    const btnTextRef = useRef<HTMLSpanElement>(null);
    const [checkedItems, setCheckedItems] = useState({});
    useEffect(() => {
        const checkedCount = selected.length;
        const btnTextElement = btnTextRef.current;

        if (btnTextElement) {
            if (checkedCount > 0) {
                btnTextElement.innerText = `${checkedCount} Selecionado`;
            } else {
                btnTextElement.innerText = "Selecione";
            }
        }
    }, [checkedItems]);

    const [IsChecked, setIsChecked] = useState(false)
    const [isActiveMaterial, setIsActiveMaterial] = useState(false)

    const handleToggleMaterial = () => {
        setIsActiveMaterial(!isActiveMaterial);
    };

    const handleSelectChange = (value: any) => {

        setLocal(value.id)
    }

    const handleToggleChecked = () => {
        setIsChecked(!IsChecked)
    }

    const handleChangeMaterial = (itemId: string) => {
        setSelected(prevSelected => {
            if (prevSelected.includes(itemId)) {
                return prevSelected.filter(id => id !== itemId);
            } else {
                return [...prevSelected, itemId];
            }
        });
    };



    const [nome, setNome] = useState<string[]>([])

    const [isActive2, setIsActive2] = useState(false)

    const handleToggle2 = () => {
        setIsActive2(!isActive2);
    };


    const btnTextReff = useRef<HTMLSpanElement>(null);
    const [nomeSelecioned, setNomeSelecioned] = useState({});
    useEffect(() => {
        const checkedCount = selected.length;
        const btnTextElement = btnTextRef.current;

        if (btnTextElement) {
            if (checkedCount > 0) {
                btnTextElement.innerText = `${nome} Selecionado`;
            } else {
                btnTextElement.innerText = "Selecione";
            }
        }
    }, [nomeSelecioned]);


    const [selectedValue, setSelectedValue] = useState('');
    const handleItemClick = (value: string) => {
        setSelectedValue(value);
        setIsActive(false);
    };


    connectionWebSocket.on('finishOrder', (_order) => {
        setOrder({ id: 0, id_material: [{ material: { nome: '' } }], id_gerador: 0, id_catador: 0, id_status: 0, endereco: { id: 0, bairro: '', cidade: '', estado: '', cep: '', complemento: '', latitude: 0, longitude: 0, apelido: '', numero: '', logradouro: '' }, created_at: new Date('0000-00-00T00:00:00'), finished_at: new Date('0000-00-00T00:00:00'), distancia: 0 })
    })

    connectionWebSocket.on('acceptOrder', (order) => {
        console.log(order)
        setOrder(order)
    })




    return (

        <div className="bdd">
            <div className="card_solicite">
                <img src={solicite_img} style={{ height: 610, marginLeft: -6, marginTop: -10 }} alt="" />
                {order.id_status == 0 &&
                    <div className="card_info_solicite">
                        <h1>SOLICITE UMA COLETA</h1>
                        <p>Formulario para solicitacao de coleta</p>

                        {localStorage.getItem('orderSpec') != '0' ?
                            <>
                                {dataSpec?.email.length > 0 &&

                                    <div className="SpecificCatador">
                                        <div className="circleSpec"><FontAwesomeIcon icon={faUser} style={{ fontSize: 30 }} /></div>
                                        <div className="infoCatadorSpec">

                                            <h2 style={{ color: 'white' }} >{dataSpec?.pessoa_fisica.length > 0 ? dataSpec?.pessoa_fisica[0].nome : dataSpec?.pessoa_juridica[0].nome_fantasia}</h2>
                                            <p>Catador</p>
                                        </div>
                                    </div>


                                }
                            </>
                            : ''}
                        <form onSubmit={pedido} className='form'>
                            <div className="middle_card_info_solicite">
                                <span>Selecione o local que será solicitado</span>
                                <div onClick={handleToggle} className={isActive ? 'select-btn_solicite open' : 'select-btn_solicite'}>
                                    <span ref={btnTextReff} className="btn-text_solicite">{selectedValue || 'Selecione'}</span>
                                    <span className="arrow-dwn">
                                        <i className="fa-solid fa-chevron-down"></i>
                                    </span>
                                </div>
                                <ul className="list-items_solicite">
                                    {complementoOptions.map((item) => {

                                        return (
                                            <li key={item.value} className="item" onChange={handleSelectChange} onClick={() => {
                                                setLocal(item.id)
                                                handleItemClick(item.value)




                                            }} >
                                                <span className="item-text">{item.value}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>

                            <div className="middle_card_info_solicite">
                                <span>Selecione os materiais que serão descartados</span>
                                <div onClick={handleToggle2} className={isActive2 ? 'select-btn_solicite open' : 'select-btn_solicite'}>
                                    <span ref={btnTextRef} className="btn-text_solicite">Selecione</span>

                                </div>
                                {localStorage.getItem('orderSpec') != '0' ?
                                    <>
                                        <ul className="list-items_solicite">
                                            {dropOptions.map((item) => {
                                                const isChecked = checkedItems[item.id] || false;
                                                return (
                                                    <li
                                                        id={item.id}
                                                        key={item.id}
                                                        onClick={e => {
                                                            e.currentTarget.id

                                                            handleChangeMaterial(item.id)
                                                            handleToggleChecked();
                                                            const itemId = e.currentTarget.id;
                                                            setCheckedItems(prevState => ({
                                                                ...prevState,
                                                                [itemId]: !prevState[itemId]

                                                            }));
                                                        }}
                                                        className={isChecked ? 'item checked' : 'item'}
                                                    >
                                                        <span className="checkbox">
                                                            <i className="fa-solid fa-check check-icon"></i>
                                                        </span>
                                                        <span className="item-text">{item.label}</span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </>

                                    :
                                    <>
                                        <ul className="list-items_solicite">
                                            {dropOptions2.map((item) => {
                                                const isChecked = checkedItems[item.id] || false;
                                                return (
                                                    <li
                                                        id={item.id}
                                                        key={item.id}
                                                        onClick={e => {
                                                            e.currentTarget.id

                                                            handleChangeMaterial(item.id)
                                                            handleToggleChecked();
                                                            const itemId = e.currentTarget.id;
                                                            setCheckedItems(prevState => ({
                                                                ...prevState,
                                                                [itemId]: !prevState[itemId]

                                                            }));
                                                        }}
                                                        className={isChecked ? 'item checked' : 'item'}
                                                    >
                                                        <span className="checkbox">
                                                            <i className="fa-solid fa-check check-icon"></i>
                                                        </span>
                                                        <span className="item-text">{item.label}</span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </>

                                }



                            </div>


                            {localStorage.getItem('orderSpec') != '0' ?
                                <button type='button' className='solicite_button' onClick={(event) => {
                                    event.preventDefault()
                                    Swal.fire({
                                        title: 'Voce confirma em fazer a solicitação?',
                                        text: "Você não conseguira reverter isso depois!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: 'green',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Sim, confirmo',
                                        cancelButtonText: 'Cancelar'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            soliciteSpec()
                                        }
                                    })
                                }}>Solicite</button> :

                                <button className='solicite_button' onClick={(event) => {
                                    event.preventDefault()
                                    Swal.fire({
                                        title: 'Voce confirma em fazer a solicitação?',
                                        text: "Você não conseguira reverter isso depois!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: 'green',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Sim, confirmo',
                                        cancelButtonText: 'Cancelar'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            pedido(event)
                                        }
                                    })
                                }} >Solicite</button>}
                        </form>


                    </div>
                }
                {order.id_status == 2 &&
                    <>

                        <div className='SoliAndamento-container'>
                            <div className="circle-warning" style={{ border: "3px solid black", }}>
                                <FontAwesomeIcon icon={faTriangleExclamation} style={{ fontSize: 35, alignItems: 'center', justifyContent: 'center', marginBottom: 5 }} />
                            </div>

                            <h1 style={{ marginTop: 15, color: 'black' }} >Você já tem uma solicitação em andamento</h1>
                            <button className="btn-hover color-11" type='button' onClick={() => {
                                cancelOrder()

                            }}>Cancelar corrida</button>
                        </div>
                    </>
                }
            </div>









        </div>








    )
}

export default SolicitePage; teste
