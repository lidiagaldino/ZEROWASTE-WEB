import React from 'react'
import { useState } from "react"
 
function DropwDownOptions ({selected, setSelected}) {

    const [isActive, setIsActive] = useState(false)
    const options = ['Barueri', 'Jandira', 'Itapevi', 'Osasco', 'Carapicuiba']

    return (
        <div className="dropdown">
             <div className="dropdown-btn" onClick={(e) => 
                setIsActive(!isActive)}>
                    Região: {selected}
             </div>
                {isActive && (
                   <div className="dropdown-content">
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
