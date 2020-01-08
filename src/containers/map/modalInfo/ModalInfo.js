import React, { useState } from 'react';
import './ModalInfo.css'

function ModalInfo(props){

    return (
        <div className="modalInfo"> 
            <div className="closeIcon" onClick={() => props.onClose()}>X</div>
            <div className="titleCity">PARIS - 75</div>
            <div className="subInfo"> popultatin: 2 </div>
        </div>
    )

}
export default ModalInfo;