import { useEffect, useState } from 'react'
import '../styles/bio.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons'
import EditProfile from '../components/EditProfile'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../api/axios'
import FavoritarButton from './FavoritarButton';
import EditAdress from '../components/EditAdress'
import Swal from 'sweetalert2';
import { number } from 'yup'
import { Item } from 'firebase/analytics'
import minhafoto from '../../../assets/a - Copia.png'
import { color } from 'framer-motion'


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
                        nome: string
                    }
                }
            ]
        }
    ],
    gerador: [],
    pessoa_fisica?: [
        {
            length: number
            lenght: number
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

type view = 'view' | 'edit'

const Container = () => {


    const { id }: { id: number } = useParams()
    const [recolhoMateriais, setRecolhoMateriais] = useState([])
    const [clicado, setClicado] = useState(false);
    const [info, setInfo] = useState<dados>()
    const [viewState, setViewState] = useState<view>('edit')
    const [foto, setFoto] = useState(localStorage.getItem('foto'))
    const [modal, setModal] = useState(false);
    const [nota3, setNota3] = useState(Number)

    const handleClick = () => {
        setClicado(!clicado);
    };

    useEffect(() => {
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        let teste = '/user'

        if (localStorage.getItem('view-edit') == 'view') {
            teste = `https://webappdeploy-backend.azurewebsites.net/user/${id}`
        }

        api.get(teste, config).then(response => {
            setInfo(response.data)
        })

    }, [])

    useEffect(() => {
        if (localStorage.getItem('view-edit') == 'view') {
            setViewState('view')
        }
    }, [])

    const update = () => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/user`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
        }).then(response => response.json())
            .then(data => setInfo(data))
    }

    useEffect(() => {
         api.get(`/materiais/${localStorage.getItem(localStorage.getItem('view-edit') == 'view' ? 'viewPriv' : 'id_modo')}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
        }).then(resposta => setRecolhoMateriais(resposta.data.map((item) => {
            return (
                {

                    label: item.material.nome,
                    value: item.material.nome,
                    id: item.id
                }
            )
        })))
    }, [])

    const [clicked, setClicked] = useState(Number(null))

    useEffect(() => {
        console.log(clicked);

    }, [clicked]);




    const avaliarUser = async () => {

        let bodyUserAvaliation

        bodyUserAvaliation = {
            nota: clicked,
            id_catador: Number(localStorage.getItem('viewPriv'))
        }

        const avaliar = await fetch(`https://zero-waste-logistic.azurewebsites.net/rating`, {
            method: 'POST',
            body: JSON.stringify(bodyUserAvaliation),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        })

        if (avaliar.status == 201) {
            setReaval(true)
            Swal.fire({
                text: 'Agradescemos pela sua avaliação',
                title: 'Usuário avaliado',
                icon: 'success'
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo deu errado!',
            })
        }
    }

    const [arrayNota, setArrayNota] = useState([{ media: 0 }])

    useEffect(() => {
        fetch(`https://zero-waste-logistic.azurewebsites.net/rating/${localStorage.getItem('viewPriv')}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
        }).then(response => response.json()).then(data => {
            let rounded = [{
                media: data[0].media
            }]

            setArrayNota(rounded)
        })

    }, [])

    const [newClicked, setNewClicked] = useState(0)

    useEffect(() => {
    }, [newClicked]);



    const updateNota = async () => {

        let bodyUserAvaliation = {
            nota: clicked,
            id_catador: Number(localStorage.getItem('viewPriv'))
        }

        console.log(bodyUserAvaliation);

        const avaliarUp = await fetch(`https://zero-waste-logistic.azurewebsites.net/rating`, {
            method: 'PUT',
            body: JSON.stringify(bodyUserAvaliation),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        })

        console.log(avaliarUp.status);


        if (avaliarUp.status == 200) {
            Swal.fire({
                text: 'Agradescemos pela sua avaliação',
                title: 'Usuário avaliado',
                icon: 'success'
            })
            
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo deu errado!',
            })
        }

    }
    const [isRating, setIsRating] = useState(false)

    useEffect(() => {
        fetch(`https://zero-waste-logistic.azurewebsites.net/rating/my/${localStorage.getItem('viewPriv')}`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
        }).then(response => response.json()).then(resposta => {
            if (resposta.nota) {
                setIsRating(true)
                setClicked(resposta.nota)
            }

        })
    }, [])

    console.log(isRating);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const [modalRecolho, setModalRecolho] = useState(false)

    const toggleModalRecolho = () => {
        setModalRecolho(!modalRecolho);
    };

    if (modalRecolho) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const [reaval, setReaval] = useState(false)
    console.log(clicked)

    const [aboutClick, setAboutClick] = useState(false)
    const [bioClick, setBioClick] = useState(false)

    return (

        <div className="containerProfile">
            <div className="container_profile">
                <div className="top_profile_info">
                    {localStorage.getItem('view-edit') == 'view' ?
                        <>
                            {arrayNota.map((star) => {
                                return (
                                    <>
                                        <div className="rating">{star.media}
                                            <FontAwesomeIcon icon={faStar} style={{ color: "#f7d702", fontSize: 40, marginLeft: 10 }} />
                                        </div>
                                    </>
                                )
                            })}
                        </>
                        : ''}
                    <img   src={localStorage.getItem('view-edit') == 'view' ? info?.foto : localStorage.getItem('foto')} />
                    <div className="info_userr" style={localStorage.getItem('tipo') == 'Gerador' ? {height: 140} : {height: 600}} >
                        <h1 style={{marginTop: 10}} >{info?.pessoa_fisica[0] ? info?.pessoa_fisica[0].nome : info?.pessoa_juridica[0].nome_fantasia}</h1>
                        <h2>{info?.gerador.length > 0 ? 'Gerador' : 'Catador'}</h2>
                        {viewState == 'view' &&
                            <FavoritarButton id={Number(localStorage.getItem('viewPriv'))}></FavoritarButton>
                        }
                    </div>
                    {
                        viewState == 'view' ?
                            <div className="infos_buttuns_container">
                                <button type='button' id={localStorage.getItem('viewPriv')} onClick={(e) => {
                                    e.currentTarget.id
                                    console.log(e.currentTarget.id);
                                    localStorage.setItem('orderSpec', '999')
                                    location.href = '/ZEROWASTE-WEB/solicite#/solicite'
                                    navigator.geolocation.getCurrentPosition(function (position) {
                                        console.log(position.coords);
                                    })
                                }}>Solicite uma coleta</button>
                                <button onClick={toggleModal} >{reaval ? 'Reavaliar' : 'Avaliar'}</button>
                            </div>
                            :
                            <EditAdress></EditAdress>
                    }

                    {modal && (

                        <div className="modal-aval ">

                            <div className="overlay-aval "></div>
                            <div className="modal-content-aval">
                                <div className="rating-aval">
                                    <input type="radio" name="rating" id="star1" onClick={() => { setClicked(5) }} />
                                    <label htmlFor="star1">&#9733;</label>
                                    <input type="radio" name="rating" id="star2" onClick={() => { setClicked(4) }} />
                                    <label htmlFor="star2">&#9733;</label>
                                    <input type="radio" name="rating" id="star3" onClick={() => { setClicked(3) }} />
                                    <label htmlFor="star3">&#9733;</label>
                                    <input type="radio" name="rating" id="star4" onClick={() => { setClicked(2) }} />
                                    <label htmlFor="star4">&#9733;</label>
                                    <input type="radio" name="rating" id="star5" onClick={() => { setClicked(1) }} />
                                    <label htmlFor="star5">&#9733;</label>
                                </div>
                                <button className="button-liked">
                                    <div className="hand">
                                        <div className="thumb"></div>
                                    </div>
                                    <span className='spanLiked1' onClick={() => {
                                        if (isRating) {
                                            updateNota()
                                        } else {
                                            avaliarUser()
                                        }

                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 3000);

                                    }} >Avaliar</span>
                                </button>


                                <button className='closeButtonRating' onClick={toggleModal}>Fechar</button>
                            </div>

                        </div>

                    )}  

                    {
                        viewState == 'edit' &&
                        <EditProfile foto={foto} setFoto={setFoto} setInfo={update} />
                    }

                    {info?.catador.length > 0 &&

                        <div className="middle_material_info">
                            <div onClick={toggleModalRecolho} className="materiais_atendidos" style={{}}>
                                <nav className='' onClick={handleClick}>
                                    <h3 style={{fontSize: 15, cursor: 'pointer'}}>
                                        Materiais atendidos
                                    </h3>
                                   
                                </nav>
                            </div>
                            </div>
                     
                        
                    }
    {info?.catador.length > 0 && 
    <>
        {modalRecolho && (
                           <div className="modal-recolho ">
                            <div className="overlay-recolho "></div>
                            <div className="modal-content-recolho animate__animated animate__fadeInUp">
                            <div className='material-list'>
                                {viewState == 'edit' ?  
                                <div className="top_material_recolho"><h1>Materiais que {localStorage.getItem('nome')} Recolhe</h1></div> 
                                : <div className="top_material_recolho"><h1>Materiais que {info?.pessoa_fisica[0] ? 
                                info?.pessoa_fisica[0].nome : 
                                info?.pessoa_juridica[0].nome_fantasia} recolhe</h1></div>}
                                   
                                            {recolhoMateriais.map((item) => {
                                                return (
                                                    <div className="item-text-div">
                                                         <li className='item-text-li'>{item.value}</li>
                                                    </div>
                                                   
                                                )
                                            })}
                                            <div onClick={toggleModalRecolho} style={{cursor: 'pointer', background: 'red', padding: 8 , width: 100, borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}} className="close-modal-recolhe">
                                                 <h1 style={{color: 'white', alignItems: 'center', justifyContent: 'center'}}>FECHAR</h1>
                                            </div>
                                       
                                    </div>
                            </div>
                           </div>     
                    )}
                    </>
    }
                    

                </div>

                <div className="under_profile_info">
                    <div className="bio_and_about">
                        <h1 onClick={() => {
                            setBioClick(false)
                            setAboutClick(true)
                        }} >Sobre</h1>
                        <h1 onClick={() => {
                            setAboutClick(false)
                            setBioClick(true)

                        }}>Biografia</h1>
                    </div>
                    {aboutClick &&
                        <div className='about_infos_user'>
                            <ul>
                        <li className='phone'>
                            <h1 className='label'>Telefone:</h1>
                            <span className='info'>{info?.telefone}</span>
                        </li>
                        <li className='adress'>
                            <h1 className='label'>CEP:</h1>
                            <span className='info'>{info?.endereco_usuario[0].endereco.cep}</span>
                        </li>
                        <li className='email'>
                            <h1 className='label'>Email:</h1>
                            <span className='info'>{info?.email}</span>
                        </li>
                        <li className=''>
                            <span className='info'></span>

                        </li>
                    </ul>
                        </div>
                    }

                    {bioClick &&
                        <div className='bio_infos_user'>
                            <span>{info?.biografia}
                            </span></div>
                    }
                </div>
            </div>
        </div>














































        /*<div className='container-bio'>



            {modal && (

                <div className="modal-aval ">

                    <div className="overlay-aval "></div>
                    <div className="modal-content-aval">
                        <div className="rating-aval">
                            <input type="radio" name="rating" id="star1" onClick={() => { setClicked(5) }} />
                            <label htmlFor="star1">&#9733;</label>
                            <input type="radio" name="rating" id="star2" onClick={() => { setClicked(4) }} />
                            <label htmlFor="star2">&#9733;</label>
                            <input type="radio" name="rating" id="star3" onClick={() => { setClicked(3) }} />
                            <label htmlFor="star3">&#9733;</label>
                            <input type="radio" name="rating" id="star4" onClick={() => { setClicked(2) }} />
                            <label htmlFor="star4">&#9733;</label>
                            <input type="radio" name="rating" id="star5" onClick={() => { setClicked(1) }} />
                            <label htmlFor="star5">&#9733;</label>
                        </div>
                        <button className="button-liked">
                            <div className="hand">
                                <div className="thumb"></div>
                            </div>
                            <span className='spanLiked1' onClick={() => {
                                if (isRating) {
                                    updateNota()
                                } else {
                                    avaliarUser()
                                }

                            }} >Okkk</span>
                        </button>


                        <button onClick={toggleModal}>Fechar</button>
                    </div>

                </div>

            )}

            <section className="userProfile card" style={localStorage.getItem('tipo') == 'Gerador' ? {height: 400} : {height: 360}}>
                <div className="profile">
                    <figure><img src={localStorage.getItem('view-edit') == 'view' ? info?.foto : localStorage.getItem('foto')} style={localStorage.getItem('tipo') == 'Gerador' ? {} : { border: "4px solid red" }} alt="profile" width="250px" height="250px" />
                        <h1 className='statusCliente'>{localStorage.getItem('tipo') == 'Gerador' ? '' : 'Status:'}</h1>
                    </figure>

                </div>
            </section>

            <section className="work_skills card">

                <div className="work">
                    <div className="primary">
                        <h1>Biografia</h1>
                        <hr></hr>
                        <span>{info?.biografia}</span>

                    </div>
                </div>
            </section>

            <section className="userDetails card">
                <div className='userName'>
                    <h1 className='name' id='name'>{info?.pessoa_fisica[0] ? info?.pessoa_fisica[0].nome : info?.pessoa_juridica[0].nome_fantasia}</h1>
                    {viewState == 'view' &&
                        <FavoritarButton id={Number(localStorage.getItem('viewPriv'))}></FavoritarButton> // aqui
                    }
                    <div className='map'>
                        <span>{info?.endereco_usuario[0].endereco.cidade}</span>
                    </div>
                    <p>{info?.gerador.length > 0 ? 'Gerador' : 'Catador'}</p>
                </div>
                
                {Number(localStorage.getItem('view-edit') == 'view') ?
                    <div className='rank'>

                        <h1 className="heading">Avaliação</h1>
                        <div className="ranknota">
                            {arrayNota.map((item) => {
                                return (
                                    <span style={{ color: 'green' }} >{item.media ? item.media : '0'}</span>
                                )
                            })}


                            <div className="rating">
                                <FontAwesomeIcon icon={faStar} className={arrayNota[0].media === 1 ? 'star-iconcolor' : 'star-icon'} style={{ height: 25 }} />
                                <FontAwesomeIcon icon={faStar} className={arrayNota[0].media === 2 ? 'star-iconcolor' : 'star-icon'} style={{ height: 25 }} />
                                <FontAwesomeIcon icon={faStar} className={arrayNota[0].media === 3 ? 'star-iconcolor' : 'star-icon'} style={{ height: 25 }} />
                                <FontAwesomeIcon icon={faStar} className={arrayNota[0].media === 4 ? 'star-iconcolor' : 'star-icon'} style={{ height: 25 }} />
                                <FontAwesomeIcon icon={faStar} className={arrayNota[0].media === 5 ? 'star-iconcolor' : 'star-icon'} style={{ height: 25 }} />

                            </div>

                        </div>
                    </div>
                    : ''}
                    



                {
                    viewState == 'view' &&
                    < div className="btns">
                        <ul>
                            <li className="sendMsg">
                                <button type='button' id={localStorage.getItem('viewPriv')} onClick={(e) => {
                                    e.currentTarget.id
                                    console.log(e.currentTarget.id);
                                    localStorage.setItem('orderSpec', '999')
                                    location.href = '/ZEROWASTE-WEB/solicite#/solicite'
                                    navigator.geolocation.getCurrentPosition(function (position) {
                                        console.log(position.coords);
                                    })

                                }}>Solicite uma coleta</button>
                            </li>
                            <button className="login-trigger" onClick={toggleModal} >{reaval ? 'Reavaliar' : 'Avaliar'}</button>
                        </ul>
                    </div>
                }



                {
                    viewState == 'edit' &&
                    <EditProfile foto={foto} setFoto={setFoto} setInfo={update} />
                }

            </section >



            <section className="timeline_about card">

                <div className="tabss">
                    <ul>
                        <li className="about active">
                            <i className="ri-user-3-fill ri"></i>
                            <hr></hr>
                            <span>Sobre</span>
                        </li>
                    </ul>
                </div>

                <div className='contact_info'>
                    <ul>
                        <li className='phone'>
                            <h1 className='label'>Telefone:</h1>
                            <span className='info'>{info?.telefone}</span>
                        </li>
                        <li className='adress'>
                            <h1 className='label'>CEP:</h1>
                            <span className='info'>{info?.endereco_usuario[0].endereco.cep}</span>
                        </li>
                        <li className='email'>
                            <h1 className='label'>Email:</h1>
                            <span className='info'>{info?.email}</span>
                        </li>
                        <li className=''>
                            {viewState == 'edit' &&
                                <h1 className='label'>Endereços: <EditAdress></EditAdress></h1>
                            }
                            <span className='info'></span>

                        </li>
                    </ul>
                </div>

                {info?.catador.length > 0 &&

                    <div className='section-recolher'>
                        <div className='OqRecolho'>

                            <h1>Materiais que <span>{localStorage.getItem('view-edit') == 'view' ? info.pessoa_fisica.length > 0 && info.pessoa_fisica[0].nome || info.pessoa_juridica.length > 0 && info.pessoa_juridica[0].nome_fantasia : localStorage.getItem('nome')}</span> recolhe:</h1>
                        </div>
                        <div className='recolheButton'>
                            <nav className={clicado ? "botao clicado" : "botao"} onClick={handleClick}>
                                <h3 className={clicado ? "iconclicado" : "iconnaoclicado"}>
                                    Ver
                                </h3>
                                <div className=''>
                                    <ul className={clicado ? "retangulo" : "quadrado"} >


                                        {recolhoMateriais.map((item) => {
                                            return (
                                                <li className='item-text'>{item.value}</li>
                                            )

                                        })}



                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>


                }

          


            </section>

        </div >*/

    )
}

export default Container;


