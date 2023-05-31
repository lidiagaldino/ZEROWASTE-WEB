import { faRecycle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

type dados = {
    id: number,
    id_catador: number,
    id_gerador: number,
    catador: {
        id: number,
        id_usuario: number,
        id_status_catador: number,
        user: {
            id: number,
            email: string,
            senha: string,
            telefone: string,
            foto: string,
            biografia: string,
            pontos: number,
            pessoa_fisica: [
                {
                    id: number,
                    cpf: string,
                    nome: string,
                    data_nascimento: string,
                    id_usuario: number
                }
            ],
            pessoa_juridica: [
                {
                    id: number,
                    cnpj: string,
                    nome_fantasia: string,
                    id_usuario: number
                }
            ]
        }
    }
}

const Contacts = ({ changeChat }) => {
    const [contacts, setContacts] = useState<Array<dados>>([{
        id: 0,
        id_catador: 0,
        id_gerador: 0,
        catador: {
            id: 0,
            id_usuario: 0,
            id_status_catador: 0,
            user: {
                id: 0,
                email: '',
                senha: '',
                telefone: '',
                foto: '',
                biografia: '',
                pontos: 0,
                pessoa_fisica: [
                    {
                        id: 0,
                        cpf: '',
                        nome: '',
                        data_nascimento: '',
                        id_usuario: 0
                    }
                ],
                pessoa_juridica: [
                    {
                        id: 0,
                        cnpj: '',
                        nome_fantasia: '',
                        id_usuario: 0
                    }
                ]
            }
        }
    }])

    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/favoritar/${localStorage.getItem('id_modo')}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => response.json()).then(resposta => setContacts(resposta))
    }, [])

    const [currentSelected, setCurrentSelected] = useState(0)

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    return (
        <Container>
            <div className="brand">
                <FontAwesomeIcon className='icon-logo' icon={faRecycle} />
                <h3>Zero Waste</h3>
            </div>
            <div className='contacts'>
                {contacts.map((item, index) => {
                    return (
                        <div
                            key={item.id}
                            className={`contact ${index === currentSelected ? "selected" : ""
                                }`}
                            onClick={() => changeCurrentChat(index, item)}
                        >
                            <div className="avatar">
                                <img
                                    src={`${item.catador.user.foto}`}
                                    alt="avatar"
                                />
                            </div>
                            <div className="username">
                                <h3>{item.catador.user.email}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>

        </Container>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    icon-logo {
      height: 3rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9cd689;
    }
  }

  .current-user {
    background-color: #2a4a00;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts