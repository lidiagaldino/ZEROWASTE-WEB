import React, { useEffect, useState } from 'react';
import api from '../../../api/axios'
import '../styles/favorite.css'
import { useRef } from 'react';
import gsap from 'gsap';

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
            nome: number
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

function FavoritarButton(props: { id: number }) {
  console.log(props)

  const [info, setInfo] = useState<dados>()
  const buttonRef = useRef(null);
  const [isUserFavorited, setIsUserFavorited] = useState(localStorage.getItem('favorito') == '200')
  const [isClicked, setIsClicked] = useState(false)
  const [viewPriv, setViewPriv] = useState(localStorage.getItem('viewPriv'))
  const [favorite, setFavorited] = useState(false)
  const [button, setButton] = useState('')

  const verifyClick = async () => {

    await fetch(`https://webappdeploy-backend.azurewebsites.net/favoritar/${localStorage.getItem('id_modo')}/${props.id}`, {
    }).then(response => {
      console.log(response);

      if (response.status == 200) {
        setButton('active')
        setFavorited(true)
      } else {
        setButton('')
        setFavorited(false)
      }
    })
  }



  verifyClick()

  const handleClick = () => {

    api.patch(`/favoritar`, {
      "id_gerador": localStorage.getItem('id_modo'),
      "id_catador": props.id
    },
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      })
      .then(response => {
        setTimeout(() => {
          setIsClicked(!isClicked)

          localStorage.setItem('favorito', JSON.stringify(response.status));
        }, 3000);
      })
      .catch(error => {
        alert('Erro ao favoritar: ' + error.message);
      });
  }

  const handleClickk = () => {
    const button = buttonRef.current;

    if (button.classList.contains('animated')) {
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
    <button onClick={() => {
      handleClick()
      setIsClicked(true)

    }}
      onClickCapture={() => {
        handleClickk()
      }} ref={buttonRef} className={`${button} favorite-button`}>
      <div className="iconn">
        <div className='starr'></div>
      </div>
      <span className='favorite_span'>{favorite ? 'Favoritado' : 'Favoritar'}</span>
    </button>
  );
}
export default FavoritarButton