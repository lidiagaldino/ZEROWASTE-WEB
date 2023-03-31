import { useEffect, useState } from 'react'
import '../styles/bio.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import EditProfile from '../components/EditProfile'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

type dados = {
    user: {
        id: string,
        email: string,
        senha: string,
        telefone: string,
        biografia: string
        catador: [
            {
                id: string,
                id_usuario: string,
                materiais_catador: [
                    {
                        id: string,
                        id_materiais: string,
                        id_catador: string,
                        material: {
                            id: string,
                            nome: string
                        }
                    }
                ]
            }
        ],
        gerador: [],
        pessoa_fisica?: [
            {
                id: string,
                cpf: string,
                nome: string,
                data_nascimento: string,
                id_usuario: string
            }
        ],
        pessoa_juridica?: [
            {
                id: string,
                cnpj: string,
                nome_fantasia: string,
                id_usuario: string
            }
        ],
        endereco_usuario: [
            {
                id: string,
                id_endereco: string,
                id_usuario: string,
                endereco: {
                    id: string,
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
}

type view = 'view' | 'edit'

const Container = () => {



        const [clicado, setClicado] = useState(false);
      
        const handleClick = () => {
          setClicado(!clicado);
        };

    const [info, setInfo] = useState<dados>()
    const [viewState, setViewState] = useState<view>('edit')
    const [foto, setFoto] = useState(localStorage.getItem('foto'))


    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/user`, {
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
        }).then(response => response.json())
            .then(data => setInfo(data))

    }, [])
    console.log(localStorage.getItem('view-edit'))

    useEffect(() => {
        if (localStorage.getItem('view-edit') == 'view') {
            setViewState('view')
        }

    }, [])

    const update = () => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/user`, {
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
        }).then(response => response.json())
            .then(data => setInfo(data))
    }



    return (
        <div className='container-bio'>
            <section className="userProfile card">
                <div className="profile">
                    <figure><img src={localStorage.getItem('foto')} alt="profile" width="250px" height="250px" />
                        <h1 className='statusCliente'>Status: Indisponivel</h1>
                    </figure>

                </div>
            </section>

            <section className="work_skills card">

                <div className="work">
                    <div className="primary">
                        <h1>Biografia</h1>
                        <hr></hr>
                        <span>{info?.user.biografia}</span>

                    </div>
                </div>
            </section>

            <section className="userDetails card">
                <div className='userName'>
                    <h1 className='name' id='name'>{info?.user.pessoa_fisica[0] ? info?.user.pessoa_fisica[0].nome : info?.user.pessoa_juridica[0].nome_fantasia}</h1>
                    <div className='map'>
                        <span>{info?.user.endereco_usuario[0].endereco.cidade}</span>
                    </div>
                    <p>{info?.user.gerador.length > 0 ? 'Gerador' : 'Catador'}</p>
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

                {viewState == 'view' &&
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

                {viewState == 'edit' &&
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
                            <span className='info'>{info?.user.telefone}</span>
                        </li>
                        <li className='adress'>
                            <h1 className='label'>CEP:</h1>
                            <span className='info'>{info?.user.endereco_usuario[0].endereco.cep}</span>
                        </li>
                        <li className='email'>
                            <h1 className='label'>Email:</h1>
                            <span className='info'>{info?.user.email}</span>
                        </li>
                    </ul>
                </div>

                <div className='section-recolher'>
                    <div className='OqRecolho'>
                        <h1>Materiais que {localStorage.getItem('nome')} recolhe:</h1>
                    </div>
                    <div className='recolheButton'>
                    <nav className={clicado ? "botao clicado" : "botao"} onClick={handleClick}>
                    <h3 className={clicado? "iconclicado" : "iconnaoclicado"}>
                        Ver 
                        </h3>
                        <div className='cu'>
                            <ul className={clicado ? "retangulo" : "quadrado"} >
                            <li className='opa'>Metais</li>
                            <li>Papeis</li>
                            <li>Orgânicos</li>
                            <li>Plásticos</li>
                            <li>Eletrônicos</li>
                            <li>Comun</li>
                            </ul>
                        </div>
                        </nav>
                    </div>

                </div>

                



                <div className='basic_info'>
                    <ul>
                        <li className="birthday">
                            <h1 className="label">{localStorage.getItem('tipo') == "Catador" ? 'Hora/Disponível:' : ''}</h1>
                            <span className="info">{localStorage.getItem('tipo') == "Catador" ? '14:00 -- 19:30' : ''}</span>
                        </li>
                    </ul>
                </div>

                {info?.user.catador.length > 0 && info?.user.catador[0].materiais_catador.map((item) => {
                    return (
                        <li className='item' key={item.id}>
                            <span className='checkbox'>
                                <i></i>
                            </span>
                            <span className='item-text'>{item.material.nome}</span>
                        </li>
                    )
                })}


            </section>

        </div >

    )
}

export default Container