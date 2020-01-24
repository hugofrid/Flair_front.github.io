import React, { useState } from 'react'
import './ToggleButton.scss';
import { checkIcon } from '../../icons/icons.js'

function ToggleButton(props) { // text , options,  valueChange

    return (<div className="toggleButtonComponant" onClick={() => props.checkedValueChange(!props.checkedValue)}>
        <div className="toggleButtonLabel">{props.label}</div>
        <div className={props.checkedValue ? 'toggleButton checked' : 'toggleButton unchecked'}>
            <div className="checkToggle"/>
        </div>
    </div>
    )


}
export default ToggleButton
