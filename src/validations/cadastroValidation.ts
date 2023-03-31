import * as yup from 'yup'
import React, { Dispatch, SetStateAction } from 'react'
import _ from 'lodash'

const schemaCadastro = yup.object().shape({
    nome: yup.string().required("Campo nome é obrigratório"),
    telefone: yup.string().min(14, "Digite um telefone válido").max(16).required("Campo telefone é obrigatório"),
    cpf: yup.string().required('Informe um CPF ou CNPJ'),
    email: yup.string().email("Digite um e-mail válido").required("Campo e-mail é obrigatório"),
    data_nascimento: yup.date().max(new Date(), "Não é possível incluir uma data futura").required("Campo data de nascimento é obrigatório"),
    cep: yup.string().required("Campo CEP é obrigatório"),
    complemento: yup.string().nullable(),
    numero: yup.string().required("Campo número é obrigatório"),
    senha: yup.string().min(5, "A senha deve ter no mínimo 5 caracteres").required("Campo senha é obrigatório")
})

type status = {
    type: string,
    message: string
}

const cadastroValidation = async (user: { nome: string, telefone: string, cpf: string, email: string, data_nascimento: string, cep: string, complemento: string, numero: string, senha: string }, setStatus: Dispatch<SetStateAction<status>>) => {
    try {
        await schemaCadastro.validate(user)
        return true
    } catch (error) {
        setStatus({
            type: 'error',
            message: error.errors.toString()
        })
        return false
    }
}

export default cadastroValidation