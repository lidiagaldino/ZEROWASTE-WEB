import React, { useState, useEffect } from "react";
import "../materialcadastro.css";
import Select from "react-select";

type drop = {
  id: string,
  value: string,
  label: string
}

const Dropdown = () => {
  const [dropOptions, setDropOptions] = useState([])

  useEffect(() => {
      fetch(`https://webappdeploy-backend.azurewebsites.net/materiais/`).then(response => response.json()).then(resposta => setDropOptions(resposta.message.map((item) => {
          return (
              {

                  label: item.nome,
                  value: item.nome,
                  id: item.id
              }
          )
      })))
  }, [])

  
  const [selected, setSelected] = useState<string[]>([]);
    

    const handleChange = (value: any) => {
        let array: string[] = []

        value.map((item: drop) => {
            console.log(typeof (item.id))
            array.push(item.id)
        })
        console.log(array);
        setSelected(array)
    }

  return (
    <div className='drop'>
    <Select
     defaultValue={[dropOptions[2]]}
      isMulti
      name={"materials-select"}
      options={dropOptions}
      className={'basic-multi-selectt'}
      onChange={handleChange}
      placeholder="Selecione os materiais:"
      blurInputOnSelect = {true}
    
      required
     />
     </div>
  );
};

export default Dropdown;