import React from 'react';
import logo from './flair.png';
import './App.css';


function App() {
  return (
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
      </footer>
    </div>
  );
}

export default App;
