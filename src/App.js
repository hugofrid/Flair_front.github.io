import React, { useState } from 'react';
import Map from './containers/map/Map.js';
import './App.css';
import HomePopup from './containers/homePopup/HomePopup.js';
import Header from './containers/header/Header.js'


function App() {


  const [firstTime, setFirstTime] = useState(localStorage.getItem('firstTime') || true);
  console.log(firstTime);


  const goToNav = () => {
    localStorage.setItem('firstTime',false)
    setFirstTime(false);
  }

  return (
    <div className="app">
      {
        firstTime===true && <HomePopup goToNav={() => goToNav()}/>
      }
    
      <div className="navBar">
        <Header></Header>
      </div>
      <div className="mapArea">
        <Map ></Map>
      </div>
    </div>
  );
}

export default App;
