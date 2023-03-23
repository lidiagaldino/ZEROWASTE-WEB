import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import '../styles/cadastroPage.css'
import celular from '../../../assets/celular.png'
import Select from "react-select";
import Item from 'antd/es/list/Item';
import { valueContainerCSS } from 'react-select/dist/declarations/src/components/containers';
import useCep from 'react-hook-usecep'
import { useForm } from 'react-hook-form';
import Placeholder from 'react-select/dist/declarations/src/components/Placeholder';
import { useRouteLoaderData } from 'react-router-dom';
import { encodePlaceholder } from '@syncfusion/ej2-react-dropdowns';


type dados = {

    logradouro: string,
    cidade: string,
    estado: string,
    complemento: string,
    cep: string,
    bairro: string,
    id_usuario: string

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

type drop = {
    id: string,
    value: string,
    label: string
}


const CadastroPage = () => {

    // //DROP DOWN
    // const [dropOptions, setDropOptions] = useState([])

    // useEffect(() => {
    //     fetch(`https://webappdeploy-backend.azurewebsites.net/materiais`).then(response => response.json()).then(resposta => setDropOptions(resposta.message.map((item) => {
    //         return (
    //             {
    //                 label: item.nome,
    //                 value: item.nome,
    //                 id: item.id
    //             }
    //         )
    //     })))
    // }, [])

    // const [selected, setSelected] = useState<string[]>([])

    // const handleChange = (value: any) => {
    //     let array: string[] = []

    //     value.map((item: drop) => {
    //         array.push(item.id)
    //     })
    //     setSelected(array)
    // }



    const [cep, setCep] = useState('')
    const [complemento, setComplemento] = useState('')
    const [estado, setEstado] = useState('')
    const [cidade, setCidade] = useState('')
    const [logradouro, setLogradouto] = useState('')
    const [cepData, setCepData] = useState<dadosCEP>()

    const handleChangeCep = (event: ChangeEvent<HTMLInputElement>): void => {
        setCep(event.target.value)
    }
    const handleChangeComplemento = (event: ChangeEvent<HTMLInputElement>): void => {
        setComplemento(event.target.value)
    }
    const handleChangeEstado = (event: ChangeEvent<HTMLInputElement>): void => {
        console.log(event.target.value)
        setEstado(event.target.value)
    }
    const handleChangeCidade = (event: ChangeEvent<HTMLInputElement>): void => {
        setCidade(event.target.value)
    }
    const handleChangeLogradouro = (event: ChangeEvent<HTMLInputElement>): void => {
        setLogradouto(event.target.value)
    }

    async function registrar(event: FormEvent) {
        event.preventDefault()

        if (!cep || !complemento || !estado || !cidade || !logradouro) {
            return
        }

        const pontocadastro: dados = {

            cep: cep,
            logradouro: cepData.logradouro,
            cidade: cepData.localidade,
            estado: cepData.uf,
            complemento: complemento,
            bairro: cepData.bairro,
            id_usuario: localStorage.getItem('id')

        }




        const cadastroPonto = await fetch(`https://webappdeploy-backend.azurewebsites.net/endereco`, {
            method: 'POST',
            body: JSON.stringify(pontocadastro),
            headers: {
                'content-type': 'application/json'
            }
        })

        const teste = await cadastroPonto.json()
        console.log(teste);


        if (cadastroPonto.ok) {
            alert('Cadastro feito com sucesso')
            setCep('')
            setCidade('')
            setComplemento('')
            setLogradouto('')
            setEstado('')
        } else {
            alert('Algo deu errado')
        }

    }

    const { register, setValue, handleSubmit } = useForm()


    const checkCEP = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {

        setCep(event.target.value)

        if (event.target.value.length == 8) {
            console.log(cep)
            try {

                const data = await fetch(`https://viacep.com.br/ws/${event.target.value}/json/`).then(res => res.json())
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
        <div className="bd">
            <div className="box">
                <div className="img-box">
                    <img src={celular} />
                </div>
                <div className="form-box">
                    <h2>Cadastrar um novo endereço</h2>
                    <p> Cadastre um ponto de entrega.</p>
                    <form onSubmit={handleSubmit(onsubmit)} action="#" className='form-endereco'>
                        <div className="input-group">
                            <input  {...register("cep")} onChange={checkCEP} maxLength={8} /*onChange={handleChangeCep} value={cep}*/ type="text" id="cep" placeholder="CEP" />
                        </div>

                        <div className="input-group w50">

                            <input  {...register("city")} onChange={handleChangeCidade} value={cidade} type="text" id="cidade" placeholder="Cidade" />
                        </div>

                        <div className="input-group w50">

                            <input {...register("estado")} onChange={handleChangeEstado} value={estado} type="text" id="estado" placeholder="Estado" />
                        </div>

                        <div className="input-group w50">

                            <input {...register("logradouro")} onChange={handleChangeLogradouro} value={logradouro} type="text" id="logradouro" placeholder="Logradouro" />
                        </div>

                        <div className="input-group w50">

                            <input onChange={handleChangeComplemento} value={complemento} type="text" id="complemento" placeholder="Complemento" />
                        </div>

                        {/* <div className="input-group">
                            <input type="text" id="nomelocal" placeholder="Nomear Local ?" required />
                        </div> */}

                        {/* <div className='drop' style={{ width: 375, height: 50, borderRadius: 100}}>
                            <Select
                                defaultValue={[dropOptions[2]]}
                                isMulti
                                name="materials"
                                options={dropOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleChange}
                            />
                        </div> */}




                        <div className="input-group w50">
                            <button type='submit'>Cadastrar</button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    )
}


export default CadastroPage