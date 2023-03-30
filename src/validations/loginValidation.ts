import * as yup from 'yup'

const schemaLogin = yup.object().shape({
    email: yup.string().required().email(),
    senha: yup.string().required().min(5)
})

export default schemaLogin