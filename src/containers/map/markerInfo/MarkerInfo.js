import React from 'react';
import './MarkerInfo.css'
import { capitalize } from '../../../pipes/stringpipe.js'
import IconBtn from '../../../componants/iconBtn/iconBtn.js';
import { closeIcon, housingIcon, foreignIcon } from '../../../icons/icons.js'


function MarkerInfo(props) {

    return (
        <div className={"markerInfo " + props.className}>

            <IconBtn className="closeIcon" icon={closeIcon} onClick={() => props.onClose()} alt="close" />
            {props.feature.properties &&
                <div className="infos">
                    <div className="city_name">
                        {capitalize(props.feature.properties.type)} ({props.feature.properties.surface}m&sup2;)
                    </div>

                    <div className="infoArea">
                        <div className="pictureArea">
                            <img src={props.feature.properties.photo.url || housingIcon} className="picture" alt="housing picture" />
                        </div>
                        <div className="houseInfo">
                            <div className="rooms">{props.feature.properties.nbRooms ?(props.feature.properties.nbRooms + ' pièces') : "" } </div>
                        <div className="price">{props.feature.properties.price ? (props.feature.properties.price + ' €') : ""}</div>
                        {props.feature.properties.url && 
                            <a target='blank' href={props.feature.properties.url} className="housingUrl">
                                <div className="aganceSite">Voir l'annonce</div>
                                <div className="foreignLogo">
                                    <img src={foreignIcon} className="picture" alt="go to the agence site" />
                                </div>
                            </a>}
                        </div>
                    </div>
                   


                </div>
            }


        </div>
    )

}
export default MarkerInfo;