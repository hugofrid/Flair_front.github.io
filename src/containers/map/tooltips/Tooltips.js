import React, { useState, useEffet } from "react";
import './Tooltips.css'

function Tooltips({feature,tooltipsPosition}) {

    return(tooltipsPosition && feature ? 
        <div className='tooltips' style={{ left: tooltipsPosition.x, top: tooltipsPosition.y }}>
        {feature ? feature.libelle_geographique : null}
        </div> : null
    )
}
export default Tooltips;