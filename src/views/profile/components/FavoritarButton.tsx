import React, { useEffect, useState } from 'react';
import api from '../../../api/axios'
import { useParams } from 'react-router-dom'
import '../styles/favorite.css'
import { useRef } from 'react';
import gsap from 'gsap';
import { faL } from '@fortawesome/free-solid-svg-icons';


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
    const buttonRef = useRef(null);

    const [isClicked, setIsClicked] = useState(false)

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
            setTimeout(() => {
              alert('Favoritado com sucesso!');
              setIsClicked(!isClicked)
              localStorage.setItem('favorito', JSON.stringify(response.data));
            }, 3000);
          })
          .catch(error => {
            alert('Erro ao favoritar: ' + error.message);
          });
      }
    
      const handleClickk = () => {
        const button = buttonRef.current;
    
        if(button.classList.contains('animated')) {
          return;
        }
        button.classList.add('animated')
    
        gsap.to(button, {
          keyframes: [{
            '--star-y': '-36px',
            duration: .3,
            ease: 'power2.out'
          }, {
            '--star-y': '48px',
            '--star-scale': .4,
            duration: .325,
            onStart() {
              button.classList.add('star-round')
            }
          }, {
            '--star-y': '-64px',
            '--star-scale': 1,
            duration: .45,
            ease: 'power2.out',
            onStart() {
              button.classList.toggle('active')
              setTimeout(() => button.classList.remove('star-round'), 100)
            }
          }, {
            '--star-y': '0px',
            duration: .45,
            ease: 'power2.in'
          }, {
            '--button-y': '3px',
            duration: .11
          }, {
            '--button-y': '0px',
            '--star-face-scale': .65,
            duration: .125
          }, {
            '--star-face-scale': 1,
            duration: .15
          }],
          clearProps: true,
          onComplete() {
            button.classList.remove('animated')
          }
        })
    
        gsap.to(button, {
          keyframes: [{
            '--star-hole-scale': .8,
            duration: .5,
            ease: 'elastic.out(1, .75)'
          }, {
            '--star-hole-scale': 0,
            duration: .2,
            delay: .2
          }]
        })
    
        gsap.to(button, {
          '--star-rotate': '360deg',
          duration: 1.55,
          clearProps: true
        })
      }
    
      return (
        <button  onClick={()=> {
            handleClick()
            setIsClicked(true)

        }} onClickCapture={handleClickk} ref={buttonRef} className="favorite-button">
          <div className="iconn">
            <div className="starr"></div>
          </div>
          <span className='favorite_span'>{isClicked ? 'Desfavoritar' : 'Favoritar'}</span>
        </button>
      );
}

export default FavoritarButton