import React, { useEffect, useState } from 'react';
import api from '../../../api/axios'
import { useParams } from 'react-router-dom'
import '../styles/bio.css'


type dados = {
    id: string,
    email: string,
    senha: string,
    telefone: string,
    foto: string,
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

function FavoritarButton(props: { id: string }) {
    const [info, setInfo] = useState<dados>()

    const handleClick = () => {


        api.patch(`/favoritar`, {
            "id_gerador": localStorage.getItem('id_modo'),
            "id_catador": props.id
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then(response => {
                alert('Favoritado com sucesso!');
            })
            .catch(error => {
                alert('Erro ao favoritar: ' + error.message);
            });
    }

    return (
        <>
            <button onClick={handleClick} className="favorite-button">
                <div className="icon">
                    <div className="star"></div>
                </div>
                <span>Favorite</span>
            </button>

        </>



    );
}

export default FavoritarButton