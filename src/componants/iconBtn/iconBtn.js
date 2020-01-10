import React from 'react';
import './iconBtn.css'

function iconBtn({className, icon, onClick}) {
    return (
        <div  className={"iconBtn " + className } onClick={onClick}>
            <img className="icon" src={icon} />
        </div>
    )
}
export default iconBtn;