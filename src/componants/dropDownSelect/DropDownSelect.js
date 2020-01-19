import React, { useState } from 'react'
import './DropDownSelect.css'

function DropDownSelect(props) { // defaultValue , options,  valueChange

    const [value, setValue] = useState(props.defaultValue);

    const handleChangeValue = (e) => {
        setValue(e.target.value);
        props.valueChange(e.target.value);
    }


    return (
        <div className="dropDownComponent">
            <div className="selectLabel">{props.label} </div>
        <select className="selectInput" name="" value={value} onChange={(e) => handleChangeValue(e)}>
            {props.options.map((elem, index) => <option key={index} value={elem.value}>{elem.text || elem.value}</option> )}
            </select>
            </div>
    )


}
export default DropDownSelect
