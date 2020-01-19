import React, { useState } from 'react';
import './MapSettings.css'
import Checkbox from '../../../componants/checkbox/Checkbox.js'
import IconBtn from '../../../componants/iconBtn/iconBtn.js';
import { settignsIcon, closeIcon,sunIcon, moonIcon } from '../../../icons/icons.js'
import { toggleMode } from '../mapUtils';
import DropDownSelect from '../../../componants/dropDownSelect/DropDownSelect.js'
import ToggleButton from '../../../componants/toggleButton/ToggleButton';

function MapSettings(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [displayOptions, setDisplayOptions] = useState([{ value: "estimation5",text:'sur 5 ans' }, { value: "estimation10",text:'sur 10 ans' }]);
    
    const closeSettings = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={"settingsComponent " + (isOpen ? "isOpen" : "")}>

            
            <IconBtn className="settingsIcon" icon={isOpen ? closeIcon : settignsIcon} onClick={closeSettings}></IconBtn>
            {isOpen && 
                <div className="settings">
                <div className="title">Réglages</div>
                <div className="section">
                    <DropDownSelect  label='Estimation :' defaultValue={props.displayedInfo} options={displayOptions} valueChange={(value) => props.setDisplayedInfo(value)}></DropDownSelect>
                </div>
                <div className="section">
                    <ToggleButton label='Afficher les biens :' checkedValue={props.showHousing} checkedValueChange={value => props.setShowHousing(value)}/>
                </div>
                <div className="section">
                    <ToggleButton
                        label='Dark mode :'
                        checkedValue={props.mapStyle === 'dark'} checkedValueChange={() => toggleMode
                    (props.mapStyle, props.setMapStyle)}  alt='switch mode' />
                </div>
                </div>
            }
            


        </div>)
}
export default MapSettings;