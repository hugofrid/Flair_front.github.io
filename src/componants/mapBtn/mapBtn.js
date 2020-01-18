import React from 'react';
import './mapBtn.css';
import Map from "../../containers/map/Map.js"

import {
  Route,
  NavLink,
  HashRouter,
} from "react-router-dom";

function mapBtn() {

 /* 
    //if use hashrouter to change page else button not connected
        <HashRouter>
            <button className="btn"><NavLink to="/map">Commencer !</NavLink></button>
            <Route path="/map" component={Map}/>
        </HashRouter>
    
  */

  return (

<div>
          <button className="btn">Commencer !</button>    
</div> 
  );
}

export default mapBtn;