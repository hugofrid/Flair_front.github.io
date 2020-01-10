import React, {Component} from 'react';
import './Accueil.css';
import Map from "../map/Map.js"

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

function Accueil() {

  return (

    <div className="App">
      <body>
      <h1>Bienvenue sur Flair</h1>
      <h3>Flair est une application qui vous permet de savoir où investir en île de France.
Nous nous basons sur des données publiques telles que les évolutions de tendance des quartiers, les futurs aménagements...</h3>
        
  <HashRouter>
            <button className="App-link"><NavLink to="/map">Map</NavLink></button>
             <Route path="/map" component={Map}/>
  </HashRouter>

      </body>
    </div>
  );
}

export default Accueil;