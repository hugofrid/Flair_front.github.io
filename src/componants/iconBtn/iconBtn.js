import React from 'react';
import './iconBtn.css'

function iconBtn({className, icon, onClick,alt }) {
    return (
        <div  className={"iconBtn " + className } onClick={onClick}>
            <img className="icon" src={icon} alt={alt}/>
        </div>
    )
}
export default iconBtn;