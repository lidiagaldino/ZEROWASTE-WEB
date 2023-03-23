import React , {useState} from 'react'
import '../style.css'
import catadores_proximosfoto from '../../../assets/catadores_proximosfoto.png'
import DropwDownOptions from './DropwDownOptions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'rsuite';



const CatadoresProximos = () => {

    const [selected, setSelected] = useState("")


    return (
        <div>
            <div className="search-box">
            <input className="search-txt" type="text" name="" placeholder="Procure por nome ou endereço"/>
            <a className="search-btn">
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#ffffff",}} />
                </a>
            </div>
            <div className='scroll'>
                <div className='infoS'>
                    <h1 className='titleBoxU'>Catadores proximos</h1>

                    <div className='reg-bt'>
                        <DropwDownOptions selected={selected} setSelected={setSelected} />
                    </div>
                </div>
                <div className="boxUserProximos">
                    <img src={catadores_proximosfoto} alt="photo" />
                    <div className='boxInfoU'>
                        <h3>Eduardo Perucci Martins de Souza</h3>
                        <p>Jandira</p>
                    </div>
                    <div className='buttonPosition'>
                        <button className='buttonBox'>Solicite</button>
                    </div>
                </div>

                <hr />

                <div className="boxUserProximos">
                    <img src={catadores_proximosfoto} alt="photo" />
                    <div className='boxInfoU'>
                        <h3>Lidia Galdiano</h3>
                        <p>Jandira</p>
                    </div>
                    <div className='buttonPosition'>
                        <button className='buttonBox'>Solicite</button>
                    </div>
                </div>
                <hr />
                <div className="boxUserProximos">
                    <img src={catadores_proximosfoto} alt="photo" />
                    <div className='boxInfoU'>
                        <h3>Miguel</h3>
                        <p>Jandira</p>
                    </div>
                    <div className='buttonPosition'>
                        <button className='buttonBox'>Solicite</button>
                    </div>
                </div>
                <hr />
                <div className="boxUserProximos">
                    <img src={catadores_proximosfoto} alt="photo" />
                    <div className='boxInfoU'>
                        <h3>Larissa</h3>
                        <p>Jandira</p>
                    </div>
                    <div className='buttonPosition'>
                        <button className='buttonBox'>Solicite</button>
                    </div>
                </div>
                <hr />
                <div className="boxUserProximos">
                    <img src={catadores_proximosfoto} alt="photo" />
                    <div className='boxInfoU'>
                        <h3>Ana</h3>
                        <p>Jandira</p>
                    </div>
                    <div className='buttonPosition'>
                        <button className='buttonBox'>Solicite</button>
                    </div>
                </div>
                <hr />
                <div className="boxUserProximos">
                    <img src={catadores_proximosfoto} alt="photo" />
                    <div className='boxInfoU'>
                        <h3>Eduardo</h3>
                        <p>Jandira</p>
                    </div>
                    <div className='buttonPosition'>
                        <button className='buttonBox'>Solicite</button>
                    </div>
                </div>
                <hr />
                <div className="boxUserProximos">
                    <img src={catadores_proximosfoto} alt="photo" />
                    <div className='boxInfoU'>
                        <h3>Eduardo</h3>
                        <p>Jandira</p>
                    </div>
                    <div className='buttonPosition'>
                        <button className='buttonBox'>Solicite</button>
                    </div>
                </div>
                <hr />
                <div className="boxUserProximos">
                    <img src={catadores_proximosfoto} alt="photo" />
                    <div className='boxInfoU'>
                        <h3>Eduardo</h3>
                        <p>Jandira</p>
                    </div>
                    <div className='buttonPosition'>
                        <button className='buttonBox'>Solicite</button>
                    </div>
                </div>
                <hr />
                <div className="boxUserProximos">
                    <img src={catadores_proximosfoto} alt="photo" />
                    <div className='boxInfoU'>
                        <h3>Eduardo</h3>
                        <p>Jandira</p>
                    </div>
                    <div className='buttonPosition'>
                        <button className='buttonBox'>Solicite</button>
                    </div>
                </div>
                <hr />
                <div className="boxUserProximos">
                    <img src={catadores_proximosfoto} alt="photo" />
                    <div className='boxInfoU'>
                        <h3>Eduardo</h3>
                        <p>Jandira</p>
                    </div>
                    <div className='buttonPosition'>
                        <button className='buttonBox'>Solicite</button>
                    </div>
                </div>
                <hr />
                <div className="boxUserProximos">
                    <img src={catadores_proximosfoto} alt="photo" />
                    <div className='boxInfoU'>
                        <h3>Eduardo</h3>
                        <p>Jandira</p>
                    </div>
                    <div className='buttonPosition'>
                        <button className='buttonBox'>Solicite</button>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default CatadoresProximos