import React from 'react';
import './MarkerInfo.css'
import { capitalize } from '../../../pipes/stringpipe.js'
import IconBtn from '../../../componants/iconBtn/iconBtn.js';
import { closeIcon, housingIcon, foreignIcon } from '../../../icons/icons.js'


function MarkerInfo(props) {
    return (
        <div className={"markerInfo " + props.className}>

            <IconBtn className="closeIcon" icon={closeIcon} onClick={() => props.onClose()} alt="close" />
            {props.marker && props.marker.properties &&
                <div className="infos">
                    <div className="city_name">
                        {capitalize(props.marker.properties.type)} ({props.marker.properties.surface}m&sup2;)
                    </div>

                    <div className="infoArea">
                        <div className="pictureArea">
                            <img src={props.marker.properties.photo.url || housingIcon} className="picture" alt="housing picture" />
                        </div>
                        <div className="houseInfo">
                            <div className="rooms">{props.marker.properties.nbRooms ?(props.marker.properties.nbRooms + ' pièces') : "" } </div>
                        <div className="price">{props.marker.properties.price ? ((props.marker.properties.price).toFixed(0)) : ""} €</div>
                        <div className="price">Prix dans {props.displayedInfo === "estimation2" ? '2 ans' : '5 ans'} : {props.marker.properties.price ? ((props.marker.properties.price * props.feature[props.displayedInfo]).toFixed(0)) + ' €' : ""}</div>
                        {props.marker.properties.url && 
                            <a target='blank' href={props.marker.properties.url} className="housingUrl">
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