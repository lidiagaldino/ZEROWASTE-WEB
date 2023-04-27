import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import api from '../../../api/axios';
import Swal from 'sweetalert2';
import '../styles/uptadeadress.css'


type dados = {
    id: string,
    logradouro: string,
    cidade: string,
    complemento: string,
    apelido: string,
    numero: string

}

export default function UpdateAdress() {
    const [modall, setModall] = useState(false);
    const [regiao, setRegiao] = useState([])
    const [info, setInfo] = useState<dados>()
    const [numero, setNumero] = useState<string>()
    const [apelido, setApelido] = useState<string>()
    const [complemento, setComplemento] = useState<string>()
    const [cidade, setCidade] = useState<string>()
    const [logradouro, setLogradouro] = useState<string>()
    const [user, setUser] = useState({
        logradouro, cidade, complemento, apelido, numero
    })

    api.get(`/endereco/${localStorage.getItem('id')}`, {
        headers: {
            'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
        },
    }).then(response => setRegiao(response.data.map((elemento) => {


        return ({
            id: elemento.endereco.id,
            logradouro: elemento.endereco.logradouro,
            cidade: elemento.endereco.cidade

        })
    })))


    const handleChangeLogradouro = (event: ChangeEvent<HTMLInputElement>): void => {
        setLogradouro(event.target.value)
        setUser({ logradouro: event.target.value, cidade, complemento, apelido, numero })
    }
    const handleChangeCidade = (event: ChangeEvent<HTMLInputElement>): void => {
        setCidade(event.target.value)
        setUser({ logradouro, cidade: event.target.value, complemento, apelido, numero })
    }
    const handleChangeComplemento = (event: ChangeEvent<HTMLInputElement>): void => {
        setComplemento(event.target.value)
        setUser({ logradouro, cidade, complemento: event.target.value, apelido, numero })
    }
    const handleChangeApelido = (event: ChangeEvent<HTMLInputElement>): void => {
        setApelido(event.target.value)
        setUser({ logradouro, cidade, complemento, apelido: event.target.value, numero })
    }
    const handleChangeNumero = (event: ChangeEvent<HTMLInputElement>): void => {
        setNumero(event.target.value)
        setUser({ logradouro, cidade, complemento, apelido, numero: event.target.value })
    }

    async function updateAdress(event: FormEvent) {
        event.preventDefault()

        let enderecoEdit

        enderecoEdit = {
            complemento: complemento,
            cidade: cidade,
            logradouro: logradouro,
            apelido: apelido,
            numero: numero
        }

        const enderecoAtualizado = await fetch(`https://webappdeploy-backend.azurewebsites.net/endereco/${localStorage.getItem('id')}`, {
            method: 'PUT',
            body: JSON.stringify(enderecoEdit),
            headers: {
                'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        })

        const enderecoa = await enderecoAtualizado.json()



        if (enderecoAtualizado.ok) {
            Swal.fire({
                text: 'Tudo certo!!',
                title: 'Conta atualizada com sucesso',
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

    const toggleModal = () => {
        setModall(!modall);

    };

    if (modall) {
        document.body.classList.add('active-modal-2')
    } else {
        document.body.classList.remove('active-modal-2')
    }

    return (
        <>



            {modall && (
                <div className="modal-2">
                    <div onClick={toggleModal} className="overlay-2"></div>
                    <form onSubmit={updateAdress} className="modal-content-2">
                        <div className='top-content-profile-2'>
                            <h1>Editar enderecos</h1>
                            <hr />
                        </div>

                        <div className='under-content-profile-2'>
                            <div className='content-edit-profile-2'>

                                <div className="form__group field">
                                    <input defaultValue='' onChange={handleChangeCidade} type="text" className="form__field" placeholder="Name" name="name" id='nomeedit' required />
                                    <label htmlFor="name" className="form__label">Cidade</label>
                                </div>


                            </div>
                        </div>

                        <div className='save-changes-position-2'>
                            <button type='submit' className='save-changes-2' >  </button>
                        </div>



                        <button className="close-modal-2" onClick={toggleModal}>
                            Fechar
                        </button>
                    </form>
                </div >
            )}
        </>
    )
}