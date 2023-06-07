import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import '../styles/editprofile.css'
import '../styles/bio.css'
import storage from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from 'sweetalert2';
import { refresh } from '../../../utils/refreshToken';
import editValidation from '../../../validations/editValidation';
import InputMask from "react-input-mask";

type edituser = {
    foto: string,
    nome: string,
    email: string,
    telefone: string,
    biografia: string,
    senha: string,
    cpf: string
}

type dados = {
    user: {
        id: number,
        email: string,
        senha: string,
        cpf: string,
        telefone: string,
        biografia: string
    }
}

export default function EditProfile({ foto, setFoto, setInfo }) {

    const [isLoading, setIsLoading] = useState(false);
    const [infoo, setInfoo] = useState<dados>()
    function handleClick() {
        setIsLoading(true);
        setTimeout(() => {
            window.location.reload();
        }, 2500);
    }



    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/user`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
        }).then(response => response.json())
            .then(data => setInfoo(data))

    }, [])




    const [nome, setNome] = useState(localStorage.getItem('nome'))
    const [telefone, setTelefone] = useState(localStorage.getItem('telefone'))
    const [cpfValue, setCpfValue] = useState(localStorage.getItem('cpfcnpj'))
    const [email, setEmail] = useState(localStorage.getItem('email'))
    const [senha, setSenha] = useState('')
    const [biografia, setBiografia] = useState(localStorage.getItem('biografia'))
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState({
        nome, telefone, cpf: cpfValue, email, biografia, senha
    })
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const handleChangeTelefone = (event: ChangeEvent<HTMLInputElement>): void => {
        setTelefone(event.target.value)
        setUser({ telefone: event.target.value, nome, cpf: cpfValue, email, biografia, senha })
    }
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value)
        setUser({ telefone, nome, cpf: cpfValue, email: event.target.value, biografia, senha })
    }
    const handleChangeBiografia = (event: ChangeEvent<HTMLInputElement>): void => {
        setBiografia(event.target.value)
        setUser({ telefone, nome, cpf: cpfValue, email, biografia: event.target.value, senha })

    }
    const handleChangeSenha = (event: ChangeEvent<HTMLInputElement>): void => {
        setSenha(event.target.value)
        setUser({ telefone, nome, cpf: cpfValue, email, biografia, senha: event.target.value })
    }
    const handleChangeCpf = (event: ChangeEvent<HTMLInputElement>): void => {
        setCpfValue(event.target.value)
        setUser({ telefone, nome, cpf: event.target.value, email, biografia, senha })


    }
    const handleChangeNome = (event: ChangeEvent<HTMLInputElement>): void => {
        setNome(event.target.value)
        setUser({ telefone, nome: event.target.value, cpf: cpfValue, email, biografia, senha })
    }

    async function registrarEdit(event: FormEvent) {
        event.preventDefault()

        if (image) {
            handleSubmitImage()
        }

        console.log(localStorage.getItem('foto'));

        let usuarioEdit

        if (localStorage.getItem('tipo_pessoa') == 'Pessoa Fisica') {
            usuarioEdit = {
                foto: url ? url : localStorage.getItem('foto'),
                nome: nome,
                telefone: telefone,
                email: email,
                senha: senha,
                biografia: biografia,
                cpf: cpfValue
            }
        } else {
            usuarioEdit = {
                foto: url ? url : localStorage.getItem('foto'),
                nome: nome,
                telefone: telefone,
                email: email,
                senha: senha,
                biografia: biografia,
                cnpj: cpfValue
            }
        }


        if (!(await editValidation(user, setStatus))) {
            return
        }

        console.log(usuarioEdit)

        const cadastroAtualizado = await fetch(`https://webappdeploy-backend.azurewebsites.net/user`, {
            method: 'PUT',
            body: JSON.stringify(usuarioEdit),
            headers: {
                'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        })

        const cadastroa = await cadastroAtualizado.json()

        console.log(cadastroa.nome);

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
    const [cpfCnpj, setCpfCnpj] = useState('CPF')
    const [maskState, setMaskState] = useState(localStorage.getItem('tipo_pessoa') == "Pessoa Fisica" ? '999.999.999-99' : '99.999.999/9999-99')
    const mask = (newValue: any) => {
        setCpfCnpj(newValue)
        setMaskState(localStorage.getItem('tipo_pessoa') == "Pessoa Fisica" ? '999.999.999-99' : '99.999.999/9999-99')
    };

    const [image, setImage] = useState(null)
    const [url, setUrl] = useState(null);
    const handleImageChange = (e: any) => {

console.log(image);

        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
        const imageRef = ref(storage, `image/${localStorage.getItem('id')}`);
        uploadBytes(imageRef, image)
            .then(() => {
                getDownloadURL(imageRef)
                    .then((url) => {

                        setFoto(url)
                        setUrl(url);


                    })
            })

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
                        <button onClick={toggleModal}>Editar Perfil</button>

                    </li>
                </ul>
            </div>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <form onSubmit={registrarEdit} className="modal-content form">
                        <div className='top-content-profile'>
                            <h1>Minha Conta</h1>
                            {image ? 
                                <img src={URL.createObjectURL(image)} style={{ width: 190, height: 190, borderRadius: 100 }} alt="Preview" />
                            : <img src={localStorage.getItem('foto')} style={{ width: 190, height: 190, borderRadius: 100 }} alt="Preview" />}
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
                                    <input defaultValue={localStorage.getItem('biografia')} onChange={handleChangeBiografia} type="input" className="form__field" placeholder="Biografia" name="name" id='biografia' required />
                                    <label htmlFor="name" className="form__label">Biografia</label>
                                </div>

                                <div className="form__group field">
                                    <input onChange={handleChangeSenha} type="password" className="form__field" placeholder="Password" name="name" />
                                    <label htmlFor="name" className="form__label">Senha <small>(confirme a senha para salvar as alterações)</small></label>
                                </div>

                                <div className="form__group field">
                                    <InputMask defaultValue={localStorage.getItem('cpfcnpj')} type="text" className="form__field" placeholder="" onChange={handleChangeCpf} mask={maskState} maskChar={null} name="CPF" required />
                                    <label htmlFor="name" className="form__label">{localStorage.getItem('tipo_pessoa') == 'Pessoa Fisica' ? 'CPF' : 'CNPJ'}</label>
                                </div>

                            </div>
                        </div>

                        <div className='save-changes-position'>
                            <button type='submit' onClick={() => {
                                setTimeout(() => {
                                    window.location.reload()
                                }, 2500);
                            }} className='save-changes' > {isLoading ? 'Salvando alteracoes...' : 'Salvar Alteracoes'} </button>
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