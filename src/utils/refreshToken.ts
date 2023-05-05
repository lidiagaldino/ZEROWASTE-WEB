export const refresh = async (email: string, senha: string) => {
  const url = 'https://webappdeploy-backend.azurewebsites.net/user/auth'
  const options = {
    method: 'POST',
    body: JSON.stringify({
      email,
      senha
    }),
    headers: {
      'content-type': 'application/json'
    }
  }

  const response = await fetch(url, options)
  const user = await response.json()



  localStorage.setItem('email', user.user.email)
  localStorage.setItem('telefone', user.user.telefone)
  localStorage.setItem('token', user.token)
  localStorage.setItem('nome', user.user.pessoa_juridica.length > 0 ? user.user.pessoa_juridica[0].nome_fantasia : user.user.pessoa_fisica[0].nome)
  localStorage.setItem('tipo', user.user.catador.length > 0 ? 'Catador' : 'Gerador')
  localStorage.setItem('id', user.user.id)
  localStorage.setItem('foto', user.user.foto)
  localStorage.setItem('cpfcnpj', user.user.pessoa_juridica.length > 0 ? user.user.pessoa_juridica[0].cnpj : user.user.pessoa_fisica[0].cpf)
  localStorage.setItem('biografia', user.user.biografia)
}