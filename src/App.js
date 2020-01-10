import React, {Component} from 'react';
import Map from './containers/map/Map.js';
import './App.css';
import logo from './flair.png';
import Accueil from './containers/accueil/Accueil.js';
import Search from './containers/map/search/Search.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {

  return (

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
      </footer>
    </div>
  );
}

export default App;

