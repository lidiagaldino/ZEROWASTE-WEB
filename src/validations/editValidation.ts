import * as yup from 'yup'
import React, { Dispatch, SetStateAction } from 'react'
import _ from 'lodash'

const schemaEdit = yup.object().shape({
    nome: yup.string().required("Campo nome é obrigratório"),
    telefone: yup.string().min(14, "Digite um telefone válido").max(16).required("Campo telefone é obrigatório"),
    cpf: yup.string().required('Informe um CPF ou CNPJ'),
    email: yup.string().email("Digite um e-mail válido").required("Campo e-mail é obrigatório"),
    senha: yup.string().min(5, "A senha deve ter no mínimo 5 caracteres").required("Campo senha é obrigatório"),
    biografia: yup.string()
})

type status = {
    type: string,
    message: string
}

const editValidation = async (user: { nome: string, telefone: string, cpf: string, email: string, senha: string, biografia: string }, setStatus: Dispatch<SetStateAction<status>>) => {
    try {
        await schemaEdit.validate(user)
        return true
    } catch (error) {
        setStatus({
            type: 'error',
            message: error.errors.toString()
        })
        return false
    }
}

export default editValidation