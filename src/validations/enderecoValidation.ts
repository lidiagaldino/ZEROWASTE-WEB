import * as yup from 'yup'
import React, { Dispatch, SetStateAction } from 'react'

const schemaEndereco = yup.object().shape({
    apelido: yup.string().required("Campo apelido é obrigatório").min(3, 'Apelido deve ter no minímo 3 caracteres'),
    cidade: yup.string().required('Campo cidade é obrigatório'),
    estado: yup.string().required('Campo estado é obrigatório'),
    logradouro: yup.string().required('Campo logradouro é obrigatório'),
    numero: yup.string().required('Campo número é obrrigatório'),
    complemento: yup.string(),
    cep: yup.string().required("Campo CEP é obrigatório")
})

type status = {
    type: string,
    message: string
}

export const validateEndereco = async (endereco: { apelido: string, cep: string, cidade: string, estado: string, logradouro: string, numero: string, complemento: string }, setStatus: Dispatch<SetStateAction<status>>) => {
    try {
        await schemaEndereco.validate(endereco)
        return true
    } catch (error) {
        setStatus({
            type: 'error',
            message: error.errors.toString()
        })
        return false
    }
}