import React from 'react';
import './Accueil.css'; 
import Btn from "../../componants/mapBtn/mapBtn.js";
import {
  Route,
  NavLink,
  HashRouter,
  BrowserRouter
} from "react-router-dom";

function Accueil() {

  return (

    <div className="App">
      <h2> Notre objectif : <span className="obj">permettre aux jeunes actifs de se créer rapidement un patrimoine immobilier rentable et durable.</span> </h2>
      
      <h3 className="description">
      <dl></dl>
  Flair est une application qui permet de savoir dans quel quartier investir en île de France pour que dans 10,20 ou 30 ans, on puisse parler de retour sur investissement.
  Nous nous basons sur des données telles que les données démograpiques, les tendances du marché et les futurs aménagements pour établir une carte permettant de visualiser les lieux où votre investissement vous rapportera le plus.
      </h3>

      <Btn></Btn>
    </div>
  );
}
export default Accueil;