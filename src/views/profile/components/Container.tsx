import React, { useEffect, useState } from 'react'
import '../styles/bio.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faStar } from '@fortawesome/free-solid-svg-icons'

type dados = {
    user: {
        id: string,
        email: string,
        senha: string,
        telefone: string,
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

const Container = () => {

    const [info, setInfo] = useState<dados>()

    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/user`, {
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
        }).then(response => response.json())
            .then(data => setInfo(data))

    }, [])




    return (
        <div className='container-bio'>
            <section className="userProfile card">
                <div className="profile">
                    <figure><img src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" alt="profile" width="250px" height="250px"/>
                    <h1 className='statusCliente'>Status: Indisponivel</h1>
                    </figure>
                        
                </div>
            </section>

            <section className="work_skills card">

                <div className="work">
                    <div className="primary">
                        <h1>Biografia</h1>
                        <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
                            was popularised in the 1960s.</span>

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
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                </div>
                <div className="btns">
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
            </section>



            <section className="timeline_about card">

                <div className="tabs">
                    <ul>
                        <li className="about active">
                            <i className="ri-user-3-fill ri"></i>
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

        </div>

    )
}

export default Container