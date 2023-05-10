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


export const ThemeContext = createContext(null)

const HomePage = () => {

  const [theme, setTheme] = useState("dark")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }

  const [data, setData] = useState(false)

  useEffect(() => {
    fetch(`https://zero-waste-logistic.azurewebsites.net/order/gerador`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
      }
    }).then((response) => {
      console.log(response.status == 201 ? true : false)

      setData(response.status == 200 ? true : false)
    }).catch((e) => {
      console.log(e)
      setData(false)
    })
  }, [])



  console.log(data);


  return (

    <ThemeContext.Provider value={{ theme, toggleTheme }}>


      <section className="seção" id={theme}>
        <div className="circlee"></div>
        <div className="content">
          <div className="textBox">

            {data == true &&
              localStorage.getItem('tipo') == 'Gerador' ?
              <div className='progressSolicite'>
                <div className="blip">
                 
                </div>
                <div>
                  <h1>Sua solicitação foi aceita, o catador esta a caminho</h1>
                </div>
              </div> : ''
            }



            <h2><span className="zerowastetext">ZeroWaste</span> é fazer nossa parte para um mundo mais sustentável.</h2>
            <p>Seja bem vindo ao nosso website, caso não saiba por onde começar, clique
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
        </div>
      </section>

    </ThemeContext.Provider>
  )
}

export default HomePage