import { Item } from 'firebase/analytics'
import React from 'react'
import { useState, useEffect } from "react"


type drop = {
    id: string,
    value: string,
    label: string
}

function DropwDownOptions({ selected, setSelected, regiao, setRegiao, dropChange }) {




    const [isActive, setIsActive] = useState(false)
    console.log(regiao)

    return (
        <div className="dropdown">

            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}> Local: {selected}</div>
            {isActive && (
                <div className="dropdown-content">
                    {regiao.map((option) => {
                        return (
                            <div key={option.id} onClick={(e) => {
                                console.log(option.value)
                                setSelected(option.value)
                                setIsActive(false)
                                dropChange(option.id_endereco)
                                localStorage.setItem('idEnd', option.id_endereco)
                            }}
                                className="dropdown-item">
                                {option.value}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}


export default DropwDownOptions
