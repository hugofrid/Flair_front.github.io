import React from 'react';
import './Helper.scss'
import { helpIcon } from '../../icons/icons';


function Helper(props) {

    return (
        <div className={"helper " + props.className}>

            <img className="helpIcon" src={helpIcon}/> 
                <div className="textInt">
                    <h3 className="endLine">Bienvenue sur la map Flair ! </h3>
                    <h5>Chaque ville de la map a une couleur correspondant à son score d'investissement, allant du <span className="rouge">rouge</span> pour un quartier peu attractif au <span className="vert">vert</span> pour un quartier très attractif. Vous pouvez :</h5>
                    <h6><li>Utiliser la map intéractive pour explorer les zones qui vous plaisent</li>
                        <li>Cliquer sur une ville pour avoir accès à son score d'investissement détaillé</li>
                        <li>Utiliser la barre de recherche pour connaître les informations d'une ville en particulier</li> </h6>
                    <h5 className="endLine">Bon Flairage !</h5>
                </div>
            </div>)
   };
export default Helper;