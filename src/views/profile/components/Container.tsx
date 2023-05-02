import { useEffect, useState } from 'react'
import '../styles/bio.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import EditProfile from '../components/EditProfile'
import { useParams } from 'react-router-dom'
import api from '../../../api/axios'
import FavoritarButton from './FavoritarButton';
import EditAdress from '../components/EditAdress'



type dados = {
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

type view = 'view' | 'edit'


const Container = (props) => {


    const { id }: { id: number } = useParams()
    const [recolhoMateriais, setRecolhoMateriais] = useState([])
    const [clicado, setClicado] = useState(false);
    const [info, setInfo] = useState<dados>()
    const [viewState, setViewState] = useState<view>('edit')
    const [foto, setFoto] = useState(localStorage.getItem('foto'))


    const handleClick = () => {
        setClicado(!clicado);
    };

    useEffect(() => {
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        let teste = '/user'

        if (localStorage.getItem('view-edit') == 'view') {
            teste = `https://webappdeploy-backend.azurewebsites.net/user/${id}`
        }

        api.get(teste, config).then(response => {
            setInfo(response.data)
        })

    }, [])

    useEffect(() => {
        if (localStorage.getItem('view-edit') == 'view') {
            setViewState('view')
        }
    }, [])

    const update = () => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/user`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
        }).then(response => response.json())
            .then(data => setInfo(data))
    }

    useEffect(() => {
        api.get(`/materiais/${localStorage.getItem('id_modo')}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
        }).then(resposta => setRecolhoMateriais(resposta.data.map((item) => {
            return (
                {

                    label: item.material.nome,
                    value: item.material.nome,
                    id: item.id
                }
            )
        })))
    }, [])

    console.log(info)

    return (

        <div className='container-bio'>
            <section className="userProfile card">
                <div className="profile">
                    <figure><img src={localStorage.getItem('view-edit') == 'view' ? info?.foto : localStorage.getItem('foto')} style={localStorage.getItem('tipo') == 'Gerador' ? {} : {border: "4px solid red"} } alt="profile" width="250px" height="250px" />
                        <h1 className='statusCliente'>{localStorage.getItem('tipo') == 'Gerador' ? '' : 'Status:'}</h1>
                    </figure>

                </div>
            </section>

            <section className="work_skills card">

                <div className="work">
                    <div className="primary">
                        <h1>Biografia</h1>
                        <hr></hr>
                        <span>{info?.biografia}</span>

                    </div>
                </div>
            </section>

            <section className="userDetails card">
                <div className='userName'>
                    <h1 className='name' id='name'>{info?.pessoa_fisica[0] ? info?.pessoa_fisica[0].nome : info?.pessoa_juridica[0].nome_fantasia}</h1>
                    {viewState == 'view' &&
                        <FavoritarButton id={info?.catador[0].id}></FavoritarButton>
                    }
                    <div className='map'>
                        <span>{info?.endereco_usuario[0].endereco.cidade}</span>
                    </div>
                    <p>{info?.gerador.length > 0 ? 'Gerador' : 'Catador'}</p>
                </div>
                <div className='rank'>
                    <h1 className="heading">Avaliação</h1>
                    <span>8,6</span>
                    <div className="rating">
                        <FontAwesomeIcon icon={faStar} style={{ height: 20 }} />
                        <FontAwesomeIcon icon={faStar} style={{ height: 20 }} />
                        <FontAwesomeIcon icon={faStar} style={{ height: 20 }} />
                        <FontAwesomeIcon icon={faStar} style={{ height: 20 }} />
                        <FontAwesomeIcon icon={faStar} style={{ height: 20 }} />
                    </div>
                </div>

                {
                    viewState == 'view' &&
                    < div className="btns">
                        <ul>
                            <li className="sendMsg">
                                <a href="#">Solicite uma coleta</a>
                            </li>
                            <li className="sendMsgC active">
                                <a href="#">Contatos</a>
                            </li>
                            <li className="sendMsg">
                                <a href="#">Avaliar usuario</a>
                            </li>
                        </ul>
                    </div>
                }

                {
                    viewState == 'edit' &&
                    <EditProfile foto={foto} setFoto={setFoto} setInfo={update} />
                }

            </section >



            <section className="timeline_about card">

                <div className="tabss">
                    <ul>
                        <li className="about active">
                            <i className="ri-user-3-fill ri"></i>
                            <hr></hr>
                            <span>Sobre</span>
                        </li>
                    </ul>
                </div>

                <div className='contact_info'>
                    <ul>
                        <li className='phone'>
                            <h1 className='label'>Telefone:</h1>
                            <span className='info'>{info?.telefone}</span>
                        </li>
                        <li className='adress'>
                            <h1 className='label'>CEP:</h1>
                            <span className='info'>{info?.endereco_usuario[0].endereco.cep}</span>
                        </li>
                        <li className='email'>
                            <h1 className='label'>Email:</h1>
                            <span className='info'>{info?.email}</span>
                        </li>
                        <li className=''>
                            {viewState == 'edit' &&
                                <h1 className='label'>Endereços: <EditAdress></EditAdress></h1>
                            }
                            <span className='info'></span>

                        </li>
                    </ul>
                </div>

                {info?.catador.length > 0 &&

                    <div className='section-recolher'>
                        <div className='OqRecolho'>

                            <h1>Materiais que <span>{localStorage.getItem('view-edit') == 'view' ? info.pessoa_fisica.length > 0 && info.pessoa_fisica[0].nome || info.pessoa_juridica.length > 0 && info.pessoa_juridica[0].nome_fantasia : localStorage.getItem('nome')}</span> recolhe:</h1>
                        </div>
                        <div className='recolheButton'>
                            <nav className={clicado ? "botao clicado" : "botao"} onClick={handleClick}>
                                <h3 className={clicado ? "iconclicado" : "iconnaoclicado"}>
                                    Ver
                                </h3>
                                <div className=''>
                                    <ul className={clicado ? "retangulo" : "quadrado"} >


                                        {recolhoMateriais.map((item) => {
                                            return (
                                                <li className='item-text'>{item.value}</li>
                                            )

                                        })}



                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>


                }


                {/* <div className='basic_info'>
                    <ul>
                        <li className="birthday">
                            <h1 className="label">{localStorage.getItem('tipo') == "Catador" ? 'Hora/Disponível:' : ''}</h1>
                            <span className="info">{localStorage.getItem('tipo') == "Catador" ? '14:00 -- 19:30' : ''}</span>
                        </li>
                    </ul>
                </div> */}

                {/* {info?.user.catador.length > 0 && info?.user.catador[0].materiais_catador.map((item) => {
                    return (
                        <li className='item' key={item.id}>
                            <span className='checkbox'>
                                <i></i>
                            </span>
                            <span className='item-text'>{item.material.nome}</span>
                        </li>
                    )
                })} */}


            </section>

        </div >

    )
}

export default Container