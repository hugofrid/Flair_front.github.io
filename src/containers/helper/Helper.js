import React from 'react';
import './Helper.scss'
import { helpIcon } from '../../icons/icons';


function Helper(props) {

    return (
        <div className={"helper " + props.className}>

            <img className="helpIcon" src={helpIcon}/> 
                <div className="textInt">
                    <h3 className="endLine">Bienvenue sur Flair</h3>
                    <h5>Chaque ville de la carte a une couleur correspondant à son score d'investissement, allant du rouge pour un quartier peu attractif au vert pour un quartier très attractif.</h5>
                    <h5><li> Utiliser la map intéractive pour explorer les zones qui vous plaisent</li><br />
                        <li> Cliquer sur une ville pour avoir accès à son score d'investissement détaillé</li><br />
                        <li> Utiliser la barre de recherche pour connaître les informations d'une ville en particulier</li><br /> </h5>
                    <h3 className="endLine">Bon Flairage !</h3>
                </div>
            </div>)
   };
export default Helper;