import React, { useState } from 'react';
import './MapSettings.css'

import IconBtn from '../../../componants/iconBtn/iconBtn.js';
import { settignsIcon, closeIcon,sunIcon, moonIcon } from '../../../icons/icons.js'
import { toggleMode } from '../mapUtils'

function MapSettings(props) {
    const [isOpen, setIsOpen] = useState(false);
   //use props.displayedInfo to get the value displayed on the map 
    // use props.mapStyle for the theme 
    //props.showHousing for the housing 
  

    const closeSettings = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={"settingsComponent " + (isOpen ? "isOpen" : "")}>

            <IconBtn className="settingsIcon" icon={isOpen ? closeIcon : settignsIcon} onClick={closeSettings}></IconBtn>
            {isOpen && 
                <div className="settings">
                <div className="displaySelection">
                    
                </div>
                <div className="displayHousing">

                </div>
                <div className="theme">
                <IconBtn onClick={() => toggleMode(props.mapStyle, props.setMapStyle)} icon={props.mapStyle === 'light' ? moonIcon : sunIcon} alt='switch mode' />
                </div>
                </div>
            }


        </div>)
}
export default MapSettings;