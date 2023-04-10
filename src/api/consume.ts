import api from "./axios";

export async function getUsetData(token: string): Promise<any> {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    let data = {}

    api.get('/user', config).then(response => data = response.data)

    return data
}