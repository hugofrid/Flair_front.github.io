import React from 'react';
import './Helper.scss'
import { helpIcon } from '../../icons/icons';


function Helper(props) {

    return (
        <div className={"helper " + props.className}>

            <img className="helpIcon" src={helpIcon} alt="help" /> 
                <div className="textInt">
                    <h3 className="endLine">Bienvenue sur Flair</h3>
                    <div>Chaque ville de la carte a une couleur correspondant à son score d'investissement, allant du rouge pour un quartier peu attractif au vert pour un quartier très attractif.</div><br/>
                <div>
                    <li> Utiliser la map intéractive pour explorer les zones qui vous plaisent</li><br />
                    <li> Cliquer sur une ville pour avoir accès à son score d'investissement détaillé</li><br />
                    <li> Utiliser la barre de recherche pour connaître les informations d'une ville en particulier</li><br /> </div>
                    <div className="endLine">Bon Flairage !</div>
                </div>
            </div>)
   };
export default Helper;