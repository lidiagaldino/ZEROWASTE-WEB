import React from 'react'
import { useState, useEffect } from "react"


type drop = {
    id: string,
    value: string,
    label: string
}

function DropwDownOptions() {

    const [regiao, setRegiao] = useState([])
    const [selected, setSelected] = useState('')

    useEffect(() => {
        fetch(`https://webappdeploy-backend.azurewebsites.net/endereco/${localStorage.getItem('id')}`).then(response => response.json()).then(resposta => setRegiao(resposta))
    }, [])

    const [isActive, setIsActive] = useState(false)

    return (
        <div className="dropdown">

            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}> Região: {selected}</div>
            {isActive && (
                <div className="dropdown-content">
                    {regiao.map((option) => (
                        <div key={option.id} onClick={(e) => {
                            console.log(e.target)
                            setSelected(option.endereco.logradouro)
                            setIsActive(false)

                        }}
                            className="dropdown-item">
                            {option.endereco.logradouro}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}


export default DropwDownOptions
