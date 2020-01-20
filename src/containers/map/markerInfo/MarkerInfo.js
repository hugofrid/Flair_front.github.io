import React from 'react';
import './MarkerInfo.css'
import { capitalize } from '../../../pipes/stringpipe.js'
import IconBtn from '../../../componants/iconBtn/iconBtn.js';
import { closeIcon, housingIcon, foreignIcon } from '../../../icons/icons.js'


function MarkerInfo(props) {

    return (
        <div className="markerInfo">

            {/* <IconBtn className="closeIcon" icon={closeIcon} onClick={() => props.onClose()} alt="close" />
            {props.feature.properties.city && <div className="titleCity">{capitalize(props.feature.properties.city)}</div>}
            {props.feature.properties.title ? <div className="subInfo">{props.feature.properties.title}</div> : null}
            {props.feature.properties.photo && props.feature.properties.photo.url ? <img src={props.feature.properties.photo.url || housingIcon} className="picutre" alt="housing picture" /> : null}
            {props.feature.properties.type ? <div className="subInfo">Type de bien : {props.feature.properties.type}</div> : null}
            {props.feature.properties.surface ? <div className="subInfo">Surface : {props.feature.properties.surface}</div> : null}
            {props.feature.properties.nbRooms ? <div className="subInfo">Nombre de pièces : {props.feature.properties.nbRooms}</div> : null}
            {props.feature.properties.price ? <div className="subInfo">Prix : {props.feature.properties.price}</div> : null}
            {props.feature.properties.url ? <a href={props.feature.properties.url} className="subInfo">{props.feature.properties.url}</a> : null} */}

            <IconBtn className="closeIcon" icon={closeIcon} onClick={() => props.onClose()} alt="close" />
            {props.feature.properties &&
                <div className="infos">
                    <div className="pictureArea">
                        <img src={props.feature.properties.photo.url || housingIcon} className="picutre" alt="housing picture" />
                    </div>
                    <div className="infoArea">
                        <div className="title">
                            {capitalize(props.feature.properties.type)} ({props.feature.properties.surface}m&sup2;)
                        </div>
                        <div className="houseInfo">
                            <div className="rooms">{props.feature.properties.nbRooms} pièces</div>
                            <div className="price">{props.feature.properties.price}€</div>
                        </div>
                    </div>

                    <div className="housingUrl">
                        <img src={foreignIcon} className="picutre" alt="go to the agence site " />
                    </div>

                </div>
            }


        </div>
    )

}
export default MarkerInfo;