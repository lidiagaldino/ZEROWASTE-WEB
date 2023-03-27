import React, { useState, ChangeEvent } from 'react'
import '../styles/editprofile.css'
import '../styles/bio.css'
import logofoto from '../../../assets/catadores_proximosfoto.png'
import { defer } from 'react-router-dom';
import storage from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditProfile() {





    const [modal, setModal] = useState(false);
    const [editnome, setEditNome] = useState("")

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>): void => {
        setEditNome(event.target.value)
    }


    const [updatecpfcnpj, setUpdateCpfCnpj] = useState('')


    const [image, setImage] = useState(null)
    const [url, setUrl] = useState(null);
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleSubmitImage = () => {
        const imageRef = ref(storage, "image");
        uploadBytes(imageRef, image)
            .then(() => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        setUrl(url);
                    })
                    .then(() => {
                        localStorage.setItem('foto', ref(storage, "image"))
                    })
                    .catch((error) => {
                        console.log(error.message, "error getting the image url");
                    });
                setImage(null);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    function handleSubmit(event) {
        event.preventDefault();

    }

    const removeName = () => {
        localStorage.removeItem('nome')
    }



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
                            <img src={url} style={{ width: 190, height: 190, borderRadius: 100 }} alt="fotologo" />
                            <input type="file" onChange={handleImageChange} className='customfile' />
                            <button onClick={handleSubmitImage}>Salvar</button>
                            <hr />
                        </div>

                        <div className='under-content-profile'>
                            <div className='content-edit-profile'>

                                <div className="form__group field">
                                    <input defaultValue={localStorage.getItem('nome')} onClick={removeName} type="text" className="form__field" placeholder="Name" name="name" id='nomeedit' required />
                                    <label htmlFor="name" className="form__label">Nome</label>
                                </div>

                                <hr />

                                <div className="form__group field">
                                    <input type="email" className="form__field" placeholder="email" name="name" id='email' required />
                                    <label htmlFor="name" className="form__label">Email</label>
                                </div>


                                <hr />

                                <div className="form__group field">
                                    <input type="number" className="form__field" placeholder="telefone" name="name" id='telefone' required />
                                    <label htmlFor="name" className="form__label">Telefone</label>
                                </div>

                                <hr />

                                <div className="form__group field">
                                    <input type="input" className="form__field" placeholder="Biografia" name="name" id='biografia' required />
                                    <label htmlFor="name" className="form__label">Biografia</label>
                                </div>

                                <div className="form__group field">
                                    <input type="password" className="form__field" placeholder="Password" name="name" id='password' required />
                                    <label htmlFor="name" className="form__label">Senha</label>
                                </div>

                                <div className="form__group field">
                                    <input type="text" className="form__field" placeholder={localStorage.getItem('cpfcnpj')} name="name" id='password' required />
                                    <label htmlFor="name" className="form__label">CPF</label>
                                </div>

                            </div>
                        </div>

                        <div className='save-changes-position'>
                            <button onSubmit={handleSubmit} onChange={handleChangeName} className='save-changes'>Salvar Alteracoes</button>
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