import React, { useState } from "react";
import Select from "react-select";
import '../styles/drop.css'

const DropDown: React.FC = () => {
  
  const options = [
    { label: "Plastico", value: "Plastico" },
    { label: "Vidros", value: "Vidros" },
    { label: "Organicos", value: "Organicos"},
  ];



  const [selected, setSelected] = useState([]);

  const handleChange = (value: any) => {
    console.log(value);
    setSelected(value)
  }

 

  return (
    <div className="dropdown">
  
  <Select
    defaultValue={[options[2], options[3]]}
    isMulti
    name="materials"
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={handleChange}
  />
    </div>
  );
};

export default DropDown;