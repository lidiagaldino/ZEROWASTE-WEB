import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import '../styles/editprofile.css'
import '../styles/bio.css'
import logofoto from '../../../assets/catadores_proximosfoto.png'
import { defer } from 'react-router-dom';
import storage from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { refresh } from '../../../utils/refreshToken';

type edituser = {
    foto: string,
    nome: string,
    email: string,
    telefone: string,
    biografia: string,
    senha: string,
    cpf: string
}

export default function EditProfile({ foto, setFoto, setInfo }) {

    const [nome, setNome] = useState(localStorage.getItem('nome'))
    const [telefone, setTelefone] = useState(localStorage.getItem('telefone'))
    const [cpfValue, setCpfValue] = useState(localStorage.getItem('cpfcnpj'))
    const [email, setEmail] = useState(localStorage.getItem('email'))
    const [senha, setSenha] = useState('')
    const [biografia, setBiografia] = useState("Eu amo reciclar <3")
    const [modal, setModal] = useState(false);

    const handleChangeTelefone = (event: ChangeEvent<HTMLInputElement>): void => {
        setTelefone(event.target.value)
    }
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value)
    }
    const handleChangeBiografia = (event: ChangeEvent<HTMLInputElement>): void => {
        setBiografia(event.target.value)
    }
    const handleChangeSenha = (event: ChangeEvent<HTMLInputElement>): void => {
        setSenha(event.target.value)
    }
    const handleChangeCpf = (event: ChangeEvent<HTMLInputElement>): void => {
        setCpfValue(event.target.value)
    }
    const handleChangeNome = (event: ChangeEvent<HTMLInputElement>): void => {
        setNome(event.target.value)
    }

    async function registrarEdit(event: FormEvent) {
        event.preventDefault()

        if (image) {
            handleSubmitImage()
        }


        const usuarioEdit: edituser = {
            foto: url ? url : localStorage.getItem('foto'),
            nome: nome,
            telefone: telefone,
            email: email,
            senha: senha,
            biografia: biografia,
            cpf: cpfValue
        }

        if (!nome || !telefone || telefone == "(" || !email || !senha || !cpfValue) {
            return
        }

        const cadastroAtualizado = await fetch(`https://webappdeploy-backend.azurewebsites.net/user`, {
            method: 'PUT',
            body: JSON.stringify(usuarioEdit),
            headers: {
                'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        })

        const cadastroa = await cadastroAtualizado.json()

        console.log(cadastroa);

        if (cadastroAtualizado.ok) {
            Swal.fire({
                text: 'Tudo certo!!',
                title: 'Conta atualizada com sucesso',
                icon: 'success'
            })
            toggleModal()
            await refresh(email, senha)
            setInfo()

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo deu errado!',
            })
        }
    }

    const [image, setImage] = useState(null)
    const [url, setUrl] = useState(null);
    const handleImageChange = (e: any) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleSubmitImage = () => {
        const imageRef = ref(storage, `image/${localStorage.getItem('id')}`);
        uploadBytes(imageRef, image)
            .then(() => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        localStorage.setItem('foto', url)
                        setFoto(url)
                        setUrl(url);
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
                    <form onSubmit={registrarEdit} className="modal-content">
                        <div className='top-content-profile'>
                            <h1>Minha Conta</h1>
                            <img src={localStorage.getItem('foto')} style={{ width: 190, height: 190, borderRadius: 100 }} alt="fotologo" />
                            <input type="file" onChange={handleImageChange} className='customfile' />

                            <hr />
                        </div>

                        <div className='under-content-profile'>
                            <div className='content-edit-profile'>

                                <div className="form__group field">
                                    <input defaultValue={localStorage.getItem('nome')} onChange={handleChangeNome} type="text" className="form__field" placeholder="Name" name="name" id='nomeedit' required />
                                    <label htmlFor="name" className="form__label">Nome</label>
                                </div>

                                <hr />

                                <div className="form__group field">
                                    <input defaultValue={localStorage.getItem('email')} onChange={handleChangeEmail} type="email" className="form__field" placeholder="email" name="name" id='email' required />
                                    <label htmlFor="name" className="form__label">Email</label>
                                </div>


                                <hr />

                                <div className="form__group field">
                                    <input defaultValue={localStorage.getItem('telefone')} onChange={handleChangeTelefone} type="text" className="form__field" placeholder="telefone" name="name" id='telefone' required />
                                    <label htmlFor="name" className="form__label">Telefone</label>
                                </div>

                                <hr />

                                <div className="form__group field">
                                    <input defaultValue="Eu amo reciclar <3" onChange={handleChangeBiografia} type="input" className="form__field" placeholder="Biografia" name="name" id='biografia' required />
                                    <label htmlFor="name" className="form__label">Biografia</label>
                                </div>

                                <div className="form__group field">
                                    <input onChange={handleChangeSenha} type="password" className="form__field" placeholder="Password" name="name" required />
                                    <label htmlFor="name" className="form__label">Senha</label>
                                </div>

                                <div className="form__group field">
                                    <input defaultValue={localStorage.getItem('cpfcnpj')} type="text" className="form__field" placeholder={localStorage.getItem('cpfcnpj')} onChange={handleChangeCpf} name="name" required />
                                    <label htmlFor="name" className="form__label">{localStorage.getItem('tipo_pessoa') == 'Pessoa Fisica' ? 'CPF' : 'CNPJ'}</label>
                                </div>

                            </div>
                        </div>

                        <div className='save-changes-position'>
                            <button type='submit' className='save-changes'>Salvar Alteracoes</button>
                        </div>

                        <button className="close-modal" onClick={toggleModal}>
                            Fechar
                        </button>
                    </form>
                </div >
            )
            }

        </>
    );
}