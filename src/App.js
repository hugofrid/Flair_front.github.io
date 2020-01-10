<<<<<<< Updated upstream
import React from 'react';
import logo from './flair.png';
=======
import React, {Component} from 'react';
import Map from './containers/map/Map.js';
>>>>>>> Stashed changes
import './App.css';
import logo from './flair.png';
import Accueil from './containers/accueil/Accueil.js';
import Search from './containers/map/search/Search.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {

  return (
<<<<<<< Updated upstream
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <body>

      <h1>Bienvenue sur Flair</h1>
      <h3>Flair est une application qui vous permet de savoir où investir en île de France.
Nous nous basons sur des données publiques telles que les évolutions de tendance des quartiers, les futurs aménagements...</h3>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          C'est parti !
        </a>

        <button
                  className="App-link"
                  onClick="window.open('https://reactjs.org')">C'est parti !</button>

      </body>
      <footer>
      <p>
          Edit <code>src/App.js</code> and save to reload.
      </p>
=======

    <div className="app">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div className="navBar"></div>
      <div className="mapArea">
        <Search></Search>
      </div>

      <footer>
        <div className="credits">
        Credits @ Bienassis, Botrel, Chammas, Fridlansky, Lemerle, Noé & Nunez
        </div>
>>>>>>> Stashed changes
      </footer>
    </div>
  );
}

export default App;
