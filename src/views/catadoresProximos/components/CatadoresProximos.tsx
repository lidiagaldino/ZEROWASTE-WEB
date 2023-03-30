import React, { useEffect, useState } from 'react'
import '../style.css'
import DropwDownOptions from './DropwDownOptions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../bg-animation.css'



const CatadoresProximos = () => {
    const [selected, setSelected] = useState('')
    const [regiao, setRegiao] = useState([])
    const [data, setData] = useState([])

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
                    < span > Selecione um endereço para ver os catadores disponíveis</span>
                }

                {data.map((item) => {
                    return (
                        <>
                            <div className="boxUserProximos">

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