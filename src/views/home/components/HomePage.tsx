import React, { useEffect, useState } from 'react'
import '../styles/HomePage.css'
import devicelogo from '../../../assets/devices.png'
import devicelogo2 from '../../../assets/devices2.png'
import devicelogo3 from '../../../assets/devices3.png'
import { createContext } from "react"
import Switch from "react-switch";
import { Link, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'animate.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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


export const ThemeContext = createContext(null)

const HomePage = () => {

  const [theme, setTheme] = useState("dark")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }

  const [data, setData] = useState({ id_status: 0 })

  useEffect(() => {
    fetch(`https://zero-waste-logistic.azurewebsites.net/order/gerador`, {
      headers: {
        'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
      }
    }).then(response => response.json()).then((resposta) => {
      setData(
        {
          id_status: resposta[0].id_status
        }
      )
    }).catch((e) => {
      console.log(e)
      setData({ id_status: 1 })
    })
  }, [])

  const [info, setInfo] = useState<dados>({ id: 0, id_material: [{ material: { nome: '' } }], id_gerador: 0, id_catador: 0, id_status: 0, endereco: { id: 0, bairro: '', cidade: '', estado: '', cep: '', complemento: '', latitude: 0, longitude: 0, apelido: '', numero: '', logradouro: '' }, created_at: new Date('0000-00-00T00:00:00'), finished_at: new Date('0000-00-00T00:00:00'), distancia: 0 })

  useEffect(() => {
    fetch(`https://zero-waste-logistic.azurewebsites.net/order`, {
      headers: {
        'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
      }
    }).then(response => response.json()).then((resposta) => {
      console.log(resposta.pedido.FilaPedidoCatador)
      setInfo(
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







  return (

    <ThemeContext.Provider value={{ theme, toggleTheme }}>


      <section className="seção" id={theme}>
        <div className="circlee"></div>

        <div className="content">

          <div className="textBox">

            {data.id_status == 2 &&
              localStorage.getItem('tipo') == 'Gerador' ?
              <div className='progressSolicite'>
                <div className="blip">
                  <div className="blip-base" style={{ background: '#F0AD4E' }}>
                  </div>
                  <div className="blip-pulse" style={{ background: '#F0AD4E' }}>
                  </div>
                </div>
                <div>
                  <h1>Sua solicitação foi aceita, o catador esta a caminho</h1>
                </div>
              </div> : ''
            }



            <h2><span className="zerowastetext">ZeroWaste</span> é fazer nossa parte para um mundo mais sustentável.</h2>
            <p>Seja bem vindo ao nosso website, caso não saiba por quais materiais reciclar, clique
              no botão "Saiba mais" para ter uma representação em slides.
            </p>
            <Link to='/dicas' className="SAIBAMAIS">Saiba mais</Link>
            <div className="switch">
              <label className='labeltheme'>{theme === "light" ? "Modo escuro" : "Modo escuro"}</label>
              <Switch onChange={toggleTheme} checked={theme === "dark"} />
            </div>

          </div>
          <div className="imgBox">
            <img src={devicelogo2} alt="aa" />
          </div>
          {info.id_status == 2 &&

            <div className="containerAviso">
              <div className="iconAviso">
                <div className="circleAviso">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">--&gt;<path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" /></svg>
                </div>
              </div>
              <div className="infoAviso">
                <h1>Atencao</h1>
                <span>Voce tem uma coleta em andamento <div className="X"><FontAwesomeIcon icon={faXmark} className="icon-xmark" /></div></span>
              </div>
            </div>
          }
        </div>

      </section>

    </ThemeContext.Provider >
  )
}

export default HomePage