import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import '../styles/formSignUp.css'
import '../styles/drop.css'
import logo from '../../../assets/logo.png'
import SwitchSelector from "react-switch-selector";
import { faUser, faPhone, faFile, faEnvelope, faLocationDot, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from "react-select";
import InputMask from "react-input-mask";
import { IMaskInput } from "react-imask";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getLatitudeLongitude } from '../../../utils/getLatitudeLongitude';
import cadastroValidation from '../../../validations/cadastroValidation';

type dados = {
    email: string,
    senha: string,
    telefone: string,
    data_nascimento: string,
    nome?: string,
    cpf?: string,
    cnpj?: string,
    nome_fantasia?: string,
    endereco: {
        logradouro: string,
        bairro: string,
        cidade: string,
        estado: string,
        cep: string,
        numero: string,
        complemento: string,
        latitude: number,
        longitude: number
    },
    materiais?: string[]

}

type drop = {
    id: string,
    value: string,
    label: string
}






function RegisterForm() {

    const navigate = useNavigate()

    const [dropOptions, setDropOptions] = useState([])

    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/materiais`).then(response => response.json()).then(resposta => setDropOptions(resposta.message.map((item) => {
            return (
                {
                    label: item.nome,
                    value: item.nome,
                    id: item.id
                }
            )
        })))
    }, [])

    const options = [
        {
            label: "Pessoa Juridica",
            value: "CNPJ",
            selectedBackgroundColor: "#fff",
            fontColor: "#000000"
        },
        {
            label: "Pessoa Fisica",
            value: "CPF",
            selectedBackgroundColor: "#fff",
            fontColor: "#000000"

        }
    ];

    const [selected, setSelected] = useState<string[]>([]);

    const handleChange = (value: any) => {
        let array: string[] = []

        value.map((item: drop) => {
            console.log(typeof (item.id))
            array.push(item.id)
        })
        console.log(array);
        setSelected(array)
    }

    const [cpfCnpj, setCpfCnpj] = useState('CNPJ')
    const [isMaterialVisible, setIsmaterialVisible] = useState('none')

    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cpfValue, setCpfValue] = useState('')
    const [email, setEmail] = useState('')
    const [data, setData] = useState('')
    const [cep, setCep] = useState('')
    const [complemento, setComplemento] = useState('')
    const [numero, setNumero] = useState('')
    const [senha, setSenha] = useState('')
    const [maskState, setMaskState] = useState('99.999.999/9999-99')

    const [user, setUser] = useState({
        nome: nome,
        telefone: telefone,
        cpf: cpfValue,
        email: email,
        data_nascimento: data,
        cep: cep,
        complemento: complemento,
        numero: numero,
        senha: senha
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>): void => {
        setNome(event.target.value)
        setUser({ nome: event.target.value, telefone, cpf: cpfValue, email, data_nascimento: data, cep, complemento, numero, senha })
    }
    const handleChangePhone = (event: ChangeEvent<HTMLInputElement>): void => {
        setTelefone(event.target.value)
        setUser({ nome, telefone: event.target.value, cpf: cpfValue, email, data_nascimento: data, cep, complemento, numero, senha })
    }
    const handleChangeCpf = (event: ChangeEvent<HTMLInputElement>): void => {
        setCpfValue(event.target.value)
        setUser({ nome, telefone, cpf: event.target.value, email, data_nascimento: data, cep, complemento, numero, senha })
    }
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value)
        setUser({ nome, telefone, cpf: cpfValue, email: event.target.value, data_nascimento: data, cep, complemento, numero, senha })
    }
    const handleChangeData = (event: ChangeEvent<HTMLInputElement>): void => {
        setData(event.target.value)
        setUser({ nome, telefone, cpf: cpfValue, email, data_nascimento: event.target.value, cep, complemento, numero, senha })
    }
    const handleChangeCep = (event: ChangeEvent<HTMLInputElement>): void => {
        setCep(event.target.value)
        setUser({ nome, telefone, cpf: cpfValue, email, data_nascimento: data, cep: event.target.value, complemento, numero, senha })
    }
    const handleChangeComplemento = (event: ChangeEvent<HTMLInputElement>): void => {
        setComplemento(event.target.value)
        setUser({ nome, telefone, cpf: cpfValue, email, data_nascimento: data, cep, complemento: event.target.value, numero, senha })
    }
    const handleChangeNumero = (event: ChangeEvent<HTMLInputElement>): void => {
        setNumero(event.target.value)
        setUser({ nome, telefone, cpf: cpfValue, email, data_nascimento: data, cep, complemento, numero: event.target.value, senha })
    }
    const handleChangeSenha = (event: ChangeEvent<HTMLInputElement>): void => {
        setSenha(event.target.value)
        setUser({ nome, telefone, cpf: cpfValue, email, data_nascimento: data, cep, complemento, numero, senha: event.target.value })
    }

    const onChange = (newValue: any) => {
        setCpfCnpj(newValue)
        setMaskState(newValue == 'CNPJ' ? '99.999.999/9999-99' : '999.999.999-99')
    };

    async function registrar(event: FormEvent) {
        event.preventDefault()


        if (!(await cadastroValidation(user, setStatus))) {
            return
        }

        if (isMaterialVisible == 'block' && selected.length < 0) {
            return
        }

        const cepInfo = await fetch(`https://opencep.com/v1/${cep.replace('-', '')}.json`)
        const cepInfoResponse = await cepInfo.json()
        const latlong = await getLatitudeLongitude({ logradouro: cepInfoResponse.logradouro, cidade: cepInfoResponse.localidade, estado: cepInfoResponse.uf })

        const usuario: dados = {
            nome: nome,
            endereco: {
                cep: cep,
                logradouro: cepInfoResponse.logradouro,
                bairro: cepInfoResponse.bairro,
                cidade: cepInfoResponse.localidade,
                estado: cepInfoResponse.uf,
                numero: numero,
                complemento: complemento ? complemento : " ",
                latitude: latlong.lat,
                longitude: latlong.lng
            },
            telefone: telefone,
            email: email,
            senha: senha,
            data_nascimento: `${data}T12:01:30.543Z`
        }



        if (cpfCnpj == 'CPF') {
            usuario.cpf = cpfValue
            usuario.nome = nome
        } else {
            usuario.cnpj = cpfValue
            usuario.nome_fantasia = nome
        }

        const catadorGerador = isMaterialVisible == 'block' ? 'catador' : 'gerador'

        if (catadorGerador == 'catador') {
            usuario.materiais = selected
        }

        const cadastro = await fetch(`https://webappdeploy-backend.azurewebsites.net/${catadorGerador}`, {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'content-type': 'application/json'
            }
        })

        const cadastroa = await cadastro.json()

        console.log(cadastroa);

        if (cadastro.ok) {
            Swal.fire(
                'Tudo certo!!',
                'Conta criada com sucesso',
                'success'
            )
            navigate('/', { replace: true })
            setNome('')
            setCep('')
            setComplemento('')
            setCpfValue('')
            setData('')
            setEmail('')
            setNumero('')
            setSenha('')
            setTelefone('')
            setIsmaterialVisible('false')
            setStatus({ message: '', type: '' })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }



    return (
        <form onSubmit={registrar} id="form-sign-up" action="#" className="sign-up-form">
            {status.type === 'success' ? <p style={{ color: "green" }}>{status.message}</p> : ""}
            {status.type === 'error' ? <p style={{ color: "red" }}>{status.message}</p> : ""}
            <img src={logo} className='logoo' alt="logo" />
            <h2 className='title'>Registrar-se</h2>
            <div className="input-field">
                <i><FontAwesomeIcon icon={faUser} /></i>
                <input onChange={handleChangeName} value={nome} type="text" id="username" placeholder="Nome" />
            </div>

            <div className="input-field">
                <i><FontAwesomeIcon icon={faPhone} /></i>

                <InputMask placeholder="Telefone"  mask="(99) 99999-9999" maskChar={null} value={telefone} onChange={handleChangePhone} />
            </div>

            <div className="sw" style={{ width: 350, height: 45 }}>
                <SwitchSelector
                    onChange={onChange}
                    options={options}
                    backgroundColor={"#006400"}
                    selectedFontColor={"#000000"}
                />
            </div>
            <div className="input-field" id="adicionar_CPFCNPJ">
                <i id="icone_cpfcnpj"><FontAwesomeIcon icon={faFile} /></i>
                <InputMask placeholder={cpfCnpj} value={cpfValue} onChange={handleChangeCpf} mask={maskState} maskChar={null} />
            </div>

            <div className="input-field">
                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                <input onChange={handleChangeEmail} value={email} type="email" id="email" name="email" placeholder="Email" />
            </div>
            <div className="input-field">
                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                <input onChange={handleChangeData} value={data} type="date" id="nascimento" name="nascimento" placeholder="Data de nascimento" required />
            </div>
            <div className="input-field">
                <i><FontAwesomeIcon icon={faLocationDot} /></i>
                <InputMask mask="99999-999" maskChar={null} onChange={handleChangeCep} value={cep} placeholder="CEP" />
                <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank"
                    className="consultacep">Consultar CEP</a>
            </div>

            <div className="divbotao">
                <input onChange={handleChangeComplemento} value={complemento} type="text" id="complemento" placeholder="Complemento" />
                <input onChange={handleChangeNumero} value={numero} type="number" id="numero" placeholder="Numero" />
            </div>


            <div className="input-field">
                <i ><FontAwesomeIcon icon={faLock} /></i>
                <input onChange={handleChangeSenha} value={senha} type="password" id="senha" placeholder="Senha" />
            </div>


            <div className='drop' style={{ width: 375, height: 50, borderRadius: 100, display: isMaterialVisible }}>
                <Select
                    defaultValue={[dropOptions[2]]}
                    isMulti
                    name="materials"
                    options={dropOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleChange}
                />

            </div>

            <ul id="lista" className="list-items"></ul>

            <div className="divbotao">
                <button type="button" className="btnescolha" id="btn-catador"
                    value="Catador(a)" onClick={() => setIsmaterialVisible('block')}>Catador(a)</button>
                <button type="button" className="btnescolha" id="btn-gerador"
                    value="Gerador de residuo" onClick={() => setIsmaterialVisible('none')}>Gerador</button>
            </div>
            <button type="submit" value="Registar-se" className="btn solid" id="sign-in">Registrar-se</button>

        </form >
    )
}

export default RegisterForm