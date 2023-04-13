import React, { useEffect, useState } from 'react'
import '../style.css'
import DropwDownOptions from './DropwDownOptions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../bg-animation.css'
import { useNavigate, useParams } from 'react-router-dom'



const CatadoresProximos = () => {
    const [selected, setSelected] = useState('')
    const [regiao, setRegiao] = useState([])
    const [data, setData] = useState([])
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
            return ({

                id: item.id_usuario,
                foto: item.foto,
                endereco: `${item.logradouro} - ${item.cidade}, ${item.numero}`,
                nome: item.nome ? item.nome : item.nome_fantasia
            })


        })))

    }





    console.log(data)

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


                    <div className='reg-bt'>
                        <DropwDownOptions dropChange={handleDropChange} selected={selected} setSelected={setSelected} regiao={regiao} setRegiao={setRegiao} />
                    </div>
                </div>

                {data.length == 0 &&
                    <>

                        <h1 style={{ paddingTop: 400, alignItems: 'center', display: 'flex', justifyContent: 'center    ' }}>Selecione um local para saber quais catadores estao pertos</h1>
                    </>
                }

                {data.map((item) => {
                    return (
                        <>


                            <div id={item.id} key={item.id_usuario} className="boxUserProximos" onClick={(event) => {
                                localStorage.setItem('view-edit', 'view')
                                navigate(`/profile/${event.currentTarget.id}`,)
                                localStorage.setItem('viewPriv', event.currentTarget.id)

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
                })}
            </div>

        </div >
    )
}

export default CatadoresProximos