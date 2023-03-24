import React from 'react'
import { useState, useEffect } from "react"


type drop = {
    id: string,
    value: string,
    label: string
}

function DropwDownOptions({ selected, setSelected }) {

    const [regiao, setRegiao] = useState([])

    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/endereco/${localStorage.getItem('id')}`).then(response => response.json()).then(resposta => setRegiao(resposta.map((item) => {
            console.log(item.endereco)
            return (
                {
                    label: item.endereco.logradouro,
                    value: item.endereco.logradouro,
                    id: item.id
                }
            )
        })))
    }, [])


    const handleChange = (value: any) => {
        let array: string[] = []

        value.map((item: drop) => {
            console.log(typeof (item.id))
            array.push(item.id)
        })
        console.log(array);
        setSelected(array)
    }



    const [isActive, setIsActive] = useState(false)

    const [query, setQuery] = useState("")
    const options = ['Barueri', 'Jandira', 'Itapevi', 'Osasco', 'Carapicuiba']


    console.log(selected);

    return (
        <div className="dropdown">

            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}> Região: {selected}</div>
            {isActive && (
                <div className="dropdown-content" onChange={handleChange}>
                    {options.map((option) => (
                        <div onClick={(e) => {
                            setSelected(option)
                            setIsActive(false)

                        }}
                            className="dropdown-item">
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}


export default DropwDownOptions
