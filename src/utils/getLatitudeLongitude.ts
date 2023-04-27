interface Geometry {
    lat: number;
    lng: number;
}

interface Payload {
    cidade: string,
    logradouro: string,
    estado: string
}

const convertToQuery = (local: Payload) => {
    const text = `${local.logradouro}, ${local.cidade}, ${local.estado}`
    const query = encodeURIComponent(text)

    return query
}

export const getLatitudeLongitude = async (local: Payload): Promise<Geometry> => {

    const query = convertToQuery(local)
    console.log(query)

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=8c86308380ad443fac12280fd96b4ac5`

    const result = await fetch(url)
    const response = await result.json()
    console.log(response)
    const retorno: Geometry = response.results[0].geometry

    return retorno
}