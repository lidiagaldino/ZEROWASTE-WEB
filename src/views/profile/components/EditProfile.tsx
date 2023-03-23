import React, { useState } from 'react'
import '../styles/editprofile.css'
import '../styles/bio.css'
import logofoto from '../../../assets/catadores_proximosfoto.png'


export default function EditProfile() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            <div className="btns">
                <ul>
                    <li className="sendMsg">
                        <button onClick={toggleModal}>Editar</button>
                    </li>
                </ul>
            </div>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <div className='top-content-profile'>
                            <h1>Minha Conta</h1>
                            <img src={logofoto} alt="fotologo" />
                            <button>Editar foto</button>
                            <hr />
                        </div>

                        <div className='under-content-profile'>
                            <div className='content-edit-profile'>

                                <div className="form__group field">
                                    <input type="input" className="form__field" placeholder="Name" name="name" id='name' required />
                                    <label htmlFor="name" className="form__label">Name</label>
                                </div>

                                <hr />

                                <div className="form__group field">
                                    <input type="email" className="form__field" placeholder="Name" name="name" id='name' required />
                                    <label htmlFor="name" className="form__label">Email</label>
                                </div>


                                <hr />

                                <div className="form__group field">
                                    <input type="number" className="form__field" placeholder="Name" name="name" id='name' required />
                                    <label htmlFor="name" className="form__label">Telefone</label>
                                </div>

                                <hr />

                                <div className="form__group field">
                                    <input type="input" className="form__field" placeholder="Name" name="name" id='name' required />
                                    <label htmlFor="name" className="form__label">Biografia</label>
                                </div>

                            </div>
                        </div>

                        <div className='save-changes-position'>
                            <button className='save-changes'>Salvar Alteracoes</button>
                        </div>

                        <button className="close-modal" onClick={toggleModal}>
                            Fechar
                        </button>
                    </div>
                </div >
            )
            }

        </>
    );
}