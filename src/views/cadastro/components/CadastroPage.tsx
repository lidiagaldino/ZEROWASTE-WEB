import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import '../styles/cadastroPage.css'
import celular from '../../../assets/celular.png'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import InputMask from "react-input-mask";
import { getLatitudeLongitude } from '../../../utils/getLatitudeLongitude';
import enderecoValidation from '../../../validations/cadastroValidation';
import { validateEndereco } from '../../../validations/enderecoValidation';
import api from '../../../api/axios';
import wave from '../img/wave.png'
import  bg from '../img/bg.svg'


type dados = {

    logradouro: string,
    cidade: string,
    estado: string,
    complemento: string,
    cep: string,
    bairro: string,
    apelido: string,
    numero: string,
    id_usuario: string,
    latitude: number,
    longitude: number

}

type dadosCEP = {
    logradouro: string,
    localidade: string,
    uf: string,
    complemento?: string,
    cep: string,
    bairro: string,
    id_usuario: string
}


const CadastroPage = () => {

    const [cep, setCep] = useState('')
    const [complemento, setComplemento] = useState('')
    const [estado, setEstado] = useState('')
    const [cidade, setCidade] = useState('')
    const [logradouro, setLogradouto] = useState('')
    const [apelido, setApelido] = useState('')
    const [numero, setNumero] = useState('')
    const [cepData, setCepData] = useState<dadosCEP>()
    const [endereco, setEndereco] = useState({
        cep,
        cidade,
        estado,
        complemento,
        logradouro,
        apelido,
        numero
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const handleChangeCep = (event: ChangeEvent<HTMLInputElement>): void => {
        setCep(event.target.value)
        setEndereco({ cep: event.target.value, cidade, estado, complemento, logradouro, apelido, numero })
    }
    const handleChangeComplemento = (event: ChangeEvent<HTMLInputElement>): void => {
        setComplemento(event.target.value)
        setEndereco({ cep, complemento: event.target.value, cidade, estado, logradouro, apelido, numero })
    }
    const handleChangeEstado = (event: ChangeEvent<HTMLInputElement>): void => {
        setEstado(event.target.value)
        setEndereco({ cep, estado: event.target.value, cidade, complemento, logradouro, numero, apelido })
    }
    const handleChangeCidade = (event: ChangeEvent<HTMLInputElement>): void => {
        setCidade(event.target.value)
        setEndereco({ cep, cidade: event.target.value, estado, complemento, logradouro, apelido, numero })
    }
    const handleChangeLogradouro = (event: ChangeEvent<HTMLInputElement>): void => {
        setLogradouto(event.target.value)
        setEndereco({ cep, logradouro: event.target.value, cidade, estado, complemento, apelido, numero })
    }
    const handleChangeApelido = (event: ChangeEvent<HTMLInputElement>): void => {
        setApelido(event.target.value)
        setEndereco({ cep, logradouro, cidade, estado, complemento, apelido: event.target.value, numero })
    }
    const handleChangeNumero = (event: ChangeEvent<HTMLInputElement>): void => {
        setNumero(event.target.value)
        setEndereco({ cep, logradouro, cidade, estado, complemento, apelido, numero: event.target.value })
    }

    async function registrar(event: FormEvent) {
        event.preventDefault()

        if (!(await validateEndereco(endereco, setStatus))) {
            return
        }

        const latlong = await getLatitudeLongitude({ logradouro: cepData.logradouro, cidade: cepData.localidade, estado: cepData.uf })

        const pontocadastro: dados = {

            cep: cep,
            logradouro: cepData.logradouro,
            cidade: cepData.localidade,
            estado: cepData.uf,
            complemento: !complemento ? ' ' : complemento,
            bairro: cepData.bairro,
            apelido: apelido,
            numero: numero,
            id_usuario: localStorage.getItem('id'),
            latitude: latlong.lat,
            longitude: latlong.lng

        }
        console.log(pontocadastro);

        const cadstro = await fetch(`https://webappdeploy-backend.azurewebsites.net/endereco`, {
            method: 'POST',
            body: JSON.stringify(pontocadastro),
            headers: {
                'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            }
        })
        // const json = await cadstro.json()
        // console.log(json)
        console.log(cadstro);


        if (cadstro.status == 201) {
            Swal.fire({
                title: 'Tudo certo!!',
                text: 'Endereço criado com sucesso',
                icon: 'success'
            })
            setCep('')
            setCidade('')
            setComplemento('')
            setLogradouto('')
            setEstado('')
            setApelido('')
            setNumero('')
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo está errado!',
            })
        }


    }

    const { register } = useForm()


    const checkCEP = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {

        setCep(event.target.value)

        if (event.target.value.length == 9) {
            try {
                console.log(event.target.value)
                const data = await fetch(`https://opencep.com/v1/${event.target.value.replace('-', '')}.json`).then(res => res.json())
                setCidade(data.localidade)
                setEstado(data.uf)
                setLogradouto(data.logradouro)
                setCepData(data)

            } catch (error) {
                console.log(`teste`)
                setCidade('')
                setEstado('')
                setLogradouto('')
            }
        } else {
            setCidade('')
            setEstado('')
            setLogradouto('')
        }



    }



    return (
        <>
        <div className='bd'>

        
        <img className="wavee" src={wave}/> 
        <div className="container-cadastro">
            <div className="img-cadastro">
                <img src={bg} />
            </div>
            <div className="login-content">

                <div className="form-box">
                    <h2>Cadastrar um novo endereço</h2>
                    <p>{localStorage.getItem('tipo') == 'Catador' ? 'Cadastre uma região em que você atua.' : 'Cadastre um ponto de entrega.'}</p>
                    <form onSubmit={registrar} action="#" className='form-endereco'>
                    {status.type === 'success' ? <p style={{ color: "green" }}>{status.message}</p> : ""}
                        {status.type === 'error' ? <p style={{ color: "red" }}>{status.message}</p> : ""}
                        <div className="input-group">
                        <InputMask {...register("cep")} mask="99999-999" maskChar={null} onChange={checkCEP} placeholder="CEP" />
                        </div>

                        <div className="input-group w50">

                        <input  {...register("city")} onChange={handleChangeCidade} value={cidade} type="text" id="cidade" placeholder="Cidade" />
                        </div>

                        <div className="input-group w50">

                            <input {...register("estado")} onChange={handleChangeEstado} value={estado} type="text" id="estado"
                                placeholder="Estado" />
                        </div>

                        <div className="input-group w50">

                            <input {...register("logradouro")} onChange={handleChangeLogradouro} value={logradouro} type="text" id="logradouro"
                                placeholder="Logradouro" />
                        </div>

                        <div className="input-group w50">

                            <input {...register("numero")} onChange={handleChangeNumero} value={numero} type="text" id="numero"
                                placeholder="Numero" />
                        </div>

                        <div className="input-group">

                            <input onChange={handleChangeComplemento} value={complemento} type="text" id="complemento"
                                placeholder="Complemento" />
                        </div>

                        <div className="input-group">
                            <input onChange={handleChangeApelido} type="text" id="cep" placeholder="Nomear Local" />
                        </div>

                        <div className="input-group w50">
                            <button type='submit'>Cadastrar</button>
                        </div>


                    </form>
                </div>

            </div>
        </div>
        </div>
        </>
    )
}


export default CadastroPage