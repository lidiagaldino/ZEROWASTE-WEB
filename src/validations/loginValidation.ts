import * as yup from 'yup'
import React, { Dispatch, SetStateAction } from 'react'

const schemaLogin = yup.object().shape({
    email: yup.string().email("Digite um email válido").required("Campo email é obrigatório"),
    senha: yup.string().min(5, "A senha precisa ter no mínimo 5 caracteres").required("Campo senha é obrigatório")
})

type status = {
    type: string,
    message: string
}

export const validateLogin = async (user: { email: string, senha: string }, setStatus: Dispatch<SetStateAction<status>>) => {
    try {
        await schemaLogin.validate(user)
        return true
    } catch (error) {
        setStatus({
            type: 'error',
            message: error.errors.toString()
        })
        return false
    }
}