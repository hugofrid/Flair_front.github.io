import React from "react";
import './Tooltips.css';
import {capitalize} from '../../../pipes/stringpipe.js'

function Tooltips({feature,tooltipsPosition}) {

    return(tooltipsPosition && feature ? 
        <div className='tooltips' style={{ left: tooltipsPosition.x, top: tooltipsPosition.y }}>
        {feature && feature.city_name ? capitalize(feature.city_name) : null}
        </div> : null
    )
}
export default Tooltips;