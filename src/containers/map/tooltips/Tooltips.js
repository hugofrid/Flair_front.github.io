import React, { useState, useEffet } from "react";
import './Tooltips.css';
import {capitalize} from '../../../pipes/stringpipe.js'

function Tooltips({feature,tooltipsPosition}) {

    return(tooltipsPosition && feature ? 
        <div className='tooltips' style={{ left: tooltipsPosition.x, top: tooltipsPosition.y }}>
        {feature ? capitalize(feature.city_name) : null}
        </div> : null
    )
}
export default Tooltips;