import React, { useState } from 'react'
import './Checkbox.css';
import { checkIcon } from '../../icons/icons.js'

function Checkbox(props) { // text , options,  valueChange

    return (<div className="checkboxComponant" onClick={() => props.checkedValueChange(!props.checkedValue)}>
        <div className="checkboxLabel">{props.label}</div>
        <div className={props.checkedValue ? 'checkbox checked' : 'checkbox unchecked'}>
            <img alt='check' src={checkIcon} className="checkIcon"/>
        </div>
    </div>
    )


}
export default Checkbox
