import React, { useState } from 'react';
import './ModalInfo.css'

function ModalInfo(props){

    return (
        <div className="modalInfo"> 
            <div className="closeIcon" onClick={() => props.onClose()}>X</div>
            <div className="titleCity">{props.feature.libelle_geographique}</div>
            <div className="subInfo">{props.feature.departement} - {props.feature.nom_dept}</div>
        </div>
    )

}
export default ModalInfo;