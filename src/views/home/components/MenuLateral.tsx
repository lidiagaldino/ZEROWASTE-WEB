import React, { useState } from 'react'
import '../styles/SideNavBar.css'
import { faBook, faHouseUser, faMapLocationDot, faMapPin, faStreetView, faTicket, faRecycle, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import 'boxicons'
import storage from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function limitarTexto(texto, limite) {
    if (texto.length > limite) {
        return texto.slice(0, limite) + "...";
    } else {
        return texto;
    }
}


const MenuLateral = () => {
    const [isLoading, setIsLoading] = useState(false);
    function handleClick() {
        setIsLoading(true);
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }

    const texto = localStorage.getItem('nome')

    const [isExpanded, setExpendState] = useState(false);

    const navigate = useNavigate()
    const menuItems = [
        {
            text: "Home",
            icon: <FontAwesomeIcon className='icon' icon={faHouseUser} />,
            href: '/home'
        },
        {
            text: localStorage.getItem('tipo') == "Catador" ? "Cadastre um novo material" : "Solicite uma coleta",
            icon: <FontAwesomeIcon className='icon' icon={faStreetView} />,
            href: localStorage.getItem('tipo') == "Catador" ? '/material' : '/solicite'
        },
        {
            text: "Cadastre um endereço",
            icon: <FontAwesomeIcon className='icon' icon={faMapLocationDot} />,
            href: '/cadastro'
        },
        {
            text: localStorage.getItem('tipo') == "Catador" ? 'Coletas' : "Mapa de catadores proximos",
            icon: <FontAwesomeIcon className='icon' icon={faMapPin} />,
            href: localStorage.getItem('tipo') == "Catador" ? '/coletas_proximas' : "/catadores_proximos"
        },
        {
            text: "Pontuação",
            icon: <FontAwesomeIcon className='icon' icon={faTicket} />,
            href: '/'
        },
        {
            text: "Dicas",
            icon: <FontAwesomeIcon className='icon' icon={faBook} />,
            href: '/dicas'
        }


    ];

    return (
        <div
            className={
                isExpanded
                    ? "side-nav-container"
                    : "side-nav-container side-nav-container-NX"
            }
        >
            <div className="nav-upper">
                <div className="nav-heading">
                    {isExpanded && (
                        <div className="nav-brand">
                            <FontAwesomeIcon className='icon-logo' icon={faRecycle} />
                            <h2>Zero Waste</h2>
                        </div>
                    )}
                    <button
                        className={
                            isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
                        }
                        onClick={() => setExpendState(!isExpanded)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="nav-menu">
                    {menuItems.map(({ text, icon, href }) => (
                        <a
                            className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
                            key={text}
                            onClick={() => {
                                navigate(href, { replace: true })
                            }}
                        >
                            {icon}
                            {isExpanded && <p>{text}</p>}
                            <span className='tooltip'>{text}</span>
                        </a>
                    ))}
                </div>
            </div>
            <div className="nav-footer">
                {isExpanded && (
                    <div className="nav-details" onClick={() => {
                        handleClick()
                        console.log('object');
                        localStorage.setItem('view-edit', 'edit')
                        navigate(`/profile`, { replace: true })
                    }
                    }>
                        <img
                            className="nav-footer-avatar"

                            src={`https://firebasestorage.googleapis.com/v0/b/profile-picture-zerowaste.appspot.com/o/image%2F${localStorage.getItem('id')}?alt=media&token=5d893246-31d9-4e40-af16-8bbb8df714d9`} style={{ borderRadius: 100 }}
                            alt=""

                        />

                        <div className="nav-footer-info">

                            <p className="nav-footer-user-name">{limitarTexto(texto, 5)}</p>

                            <p className="nav-footer-user-position">{localStorage.getItem('tipo')}</p>
                        </div>
                    </div>
                )}
                <FontAwesomeIcon onClick={() => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('nome')
                    localStorage.removeItem('tipo')
                    navigate('/', { replace: true })
                }} className='logout-icon' icon={faRightFromBracket} />
            </div>
        </div >
    )

}

export default MenuLateral