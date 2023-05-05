import React, { useEffect, useState } from 'react'
import '../style.css'
import DropwDownOptions from './DropwDownOptions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons'

import '../bg-animation.css'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckIcon } from '@radix-ui/react-icons';
import api from '../../../api/axios'

import { v4 as uuidv4 } from 'uuid';

const CatadoresProximos = () => {
    const [selected, setSelected] = useState('')
    const [regiao, setRegiao] = useState([])
    const [data, setData] = useState([])
    const [checkFavorite, setCheckFavorite] = useState([])
    const [isFavorited, setIsFavorited] = useState(false)
    const [mensagem, setMensagem] = useState('')
    const [codeTrue, setCodeTrue] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/endereco/${localStorage.getItem('id')}`).then(response => response.json()).then(resposta => setRegiao(resposta.map((item) => {
            return (

                {
                    label: item.endereco.apelido,
                    value: item.endereco.apelido,
                    id: item.id,
                    id_endereco: item.id_endereco

                }

            )
        })))
    }, [])

    const handleDropChange = (id) => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/gerador/${id}`, {
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
        }).then(response => response.json()).then(resposta => setData(resposta.map((item) => {
       
            console.log(resposta);
            
            return ({
                id: item.id_usuario,
                id_modo: item.id_catador,
                foto: item.foto,
                endereco: `${item.logradouro} - ${item.cidade}, ${item.numero}`,
                nome: item.nome ? item.nome : item.nome_fantasia
            })


        })))

    }

    function clickFavorite() {
        api.get(`/favoritar/endereco/${localStorage.getItem('id_modo')}/${localStorage.getItem('idEnd')}`, {
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
        }).then(response => setCheckFavorite(response.data.map((elemento) => {
            setIsFavorited(true)
            setCodeTrue(true)
            return ({
                nome: elemento.nome,
                logradouro: elemento.logradouro,
                foto: elemento.foto
            })
        })
        ))
    }


    function handleClickFavorite() {

        setCodeTrue(prevCodeTrue => !prevCodeTrue) // prevIsFavorited == true / !prev == false / function alternate

    }

    return (
        <div>
            <div className='bg-proximos'>
                <div className='wave -one'></div>
                <div className='wave -two'></div>
                <div className='wave -three'></div>
            </div>



            <div className="search-box">
                <input className="search-txt" type="text" name="" placeholder="Procure por nome ou endereço" />
                <a className="search-btn">
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffff", }} />
                </a>
            </div>
            <div className='scroll'>
                <div className='infoS'>
                    <h1 className='titleBoxU'>Catadores proximos</h1>

                    <div>
                        <h2>Catadores Favoritos</h2>
                        <input type="checkbox" name="" id="check"
                            onClick={(event) => {

                                if (event.currentTarget.checked) {
                                    clickFavorite()

                                } else {
                                    setCodeTrue(false)

                                }

                            }}
                        />

                    </div>


                    <div className='reg-bt'>
                        <DropwDownOptions dropChange={handleDropChange} selected={selected} setSelected={setSelected} regiao={regiao} setRegiao={setRegiao} />
                    </div>
                </div>

                {codeTrue ? checkFavorite.map((elemento) => {

                    return (

                        <>
                            <div id={elemento.id} key={`${elemento.id}_${uuidv4()}`} className="boxUserProximos" onClick={(event) => {
                                console.log(event.currentTarget.id);

                                localStorage.setItem('view-edit', 'view')
                                navigate(`/profile/${event.currentTarget.id}`,)
                                localStorage.setItem('viewPriv', event.currentTarget.id)
                            }} >
                                <img src={elemento.foto} alt="photo" className='fotoUser' style={{ borderRadius: 100, width: 93, height: 93 }} />
                                <div className='boxInfoU'>

                                    <h3>{elemento.nome} <FontAwesomeIcon icon={faStar} style={{ color: "#ffea00", }} /></h3>
                                    <p>{elemento.logradouro}</p>
                                </div>
                                <div className='buttonPosition'>
                                    <button className='buttonBox'>Solicite</button>
                                </div>
                            </div>
                            <hr />
                        </>
                    )


                })
                    : ''}


                {data.length == 0 &&
                    <>

                        <h1 style={{ paddingTop: 400, alignItems: 'center', display: 'flex', justifyContent: 'center    ' }}>Sselecione um local para saber quais catadores estao pertos</h1>
                    </>
                }


                {data.map((item) => {
                    if (codeTrue == false) {


                        return (

                            <>
                                <h1>{codeTrue == false ? mensagem : ''}</h1>
                                <div id={item.id} key={`${item.id_modo}_${uuidv4()}`} data-key={item.id_modo} className="boxUserProximos" onClick={(event) => {
                                    localStorage.setItem('view-edit', 'view')
                                    navigate(`/profile/${event.currentTarget.id}`,)
                                    localStorage.setItem('viewPriv', event.currentTarget.getAttribute('data-key'))
                                }} >
                                    <img src={item.foto} alt="photo" className='fotoUser' style={{ borderRadius: 100, width: 93, height: 93 }} />
                                    <div className='boxInfoU'>
                                        <h3>{item.nome}</h3>
                                        <p>{item.endereco}</p>
                                    </div>
                                    <div className='buttonPosition'>
                                        <button className='buttonBox'>Solicite</button>
                                    </div>
                                </div>
                                <hr />
                            </>
                        )
                    }
                })}
            </div>
        </div >
    )
}

export default CatadoresProximos