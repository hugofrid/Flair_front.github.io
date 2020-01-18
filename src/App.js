import React from 'react';
import './App.css';
import logo from './icons/flair.png';
import Accueil from './containers/accueil/Accueil.js';
import Search from "../src/componants/search/Search.js";
import { BrowserRouter as Link } from 'react-router-dom';
import Info from "./componants/info/Info.js";


function App() {

  return (
    <div className="app">
      <header className="head">
        <img className="sizeLogo" src={logo} alt="logo"/> 
        <div className="title">Investissez le futur</div>
      </header>
    
      <div className="accueil">
      <Accueil></Accueil>
      </div>

      <Info></Info>

      <Search></Search>

      <mapBtn></mapBtn>

      <footer>Credits @ Bienassis, Botrel, Chammas, Fridlansky, Lemerle, Noé & Nunez</footer>
    </div>
  );
}

export default App;