import React from 'react';
import './MarkerInfo.css'
import { capitalize } from '../../../pipes/stringpipe.js'
import IconBtn from '../../../componants/iconBtn/iconBtn.js';
import { closeIcon } from '../../../icons/icons.js'


function MarkerInfo(props) {

    return (
        <div className="markerInfo">

            <IconBtn className="closeIcon" icon={closeIcon} onClick={() => props.onClose()} alt="close"/>
            {props.feature.properties.city ? <div className="titleCity">{capitalize(props.feature.properties.city)}</div> : null}
            {props.feature.properties.title ? <div className="subInfo">{props.feature.properties.title}</div> : null}
            {props.feature.properties.photo && props.feature.properties.photo.url ? <img src={props.feature.properties.photo.url} className="subImg" alt="Here is an picture" height="150px" width="150px"/> : null}
            {props.feature.properties.type ? <div className="subInfo">Type de bien : {props.feature.properties.type}</div> : null}
            {props.feature.properties.surface ? <div className="subInfo">Surface : {props.feature.properties.surface}</div> : null}
            {props.feature.properties.nbRooms ? <div className="subInfo">Nombre de pièces : {props.feature.properties.nbRooms}</div> : null}
            {props.feature.properties.price ? <div className="subInfo">Prix : {props.feature.properties.price}</div> : null}
            {props.feature.properties.url ? <a href={props.feature.properties.url} className="subInfo">{props.feature.properties.url}</a> : null}
            
            
        </div>
    )

}
export default MarkerInfo;