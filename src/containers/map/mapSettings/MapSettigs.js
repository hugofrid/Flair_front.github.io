import React, { useState } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import DropDownSelect from '../../../componants/dropDownSelect/DropDownSelect.js';
import IconBtn from '../../../componants/iconBtn/iconBtn.js';
import ToggleButton from '../../../componants/toggleButton/ToggleButton';
import { closeIcon, settignsIcon } from '../../../icons/icons.js';
import { toggleMode,fetchApiData } from '../mapUtils';
import './MapSettings.scss';

function MapSettings(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [displayOptions, setDisplayOptions] = useState([{ value: "estimation5", text: 'sur 5 ans' }, { value: "estimation10", text: 'sur 10 ans' }]);

    const closeSettings = () => {
        setIsOpen(!isOpen);
    }
    const formatPrice = (value) => {
        if (value > 999) {
            return (value / 1000).toFixed(2) + "M €"
        
        } else return value + 'K €'
    }
    const setApi = () => {
        if (props.showHousing) {
            fetchApiData(props.clickedFeature,props.price.min,props.price.max,props.surface.min,props.surface.max,props.nbRooms,props.setMapMarker)
        } else {
            props.closeMarkerInfo()
        }
    }


    return (
        <div className={"settingsComponent " + (isOpen ? "isOpen" : "")}>


            <IconBtn className={!isOpen ? "settingsIcon" : "closeIcon"} icon={isOpen ? closeIcon : settignsIcon} onClick={closeSettings}></IconBtn>
            {isOpen &&
                <div className="settings">
                    <div className="title">Réglages</div>
                    <div className="section">
                        <DropDownSelect label='Estimation :' defaultValue={props.displayedInfo} options={displayOptions} valueChange={(value) => props.setDisplayedInfo(value)}></DropDownSelect>
                    </div>
                    <div className="section">
                        <ToggleButton
                            label='Mode nuit :'
                            checkedValue={props.mapStyle === 'dark'} checkedValueChange={() => toggleMode
                                (props.mapStyle, props.setMapStyle)} alt='switch mode' />
                    </div>
                    <div className="section">
                        <ToggleButton label='Afficher les biens :' checkedValue={props.showHousing} checkedValueChange={value => props.setShowHousing(value)} />
                    </div>
                    {
                        props.showHousing &&
                        <div>
                            <h3>Filtre de recherche :</h3>
                            <div className="houssingSetting">
                                <div className="housingLabel">
                                    <span style={{ whiteSpace: "nowrap" }}>Nombre de pièces :</span> {props.nbRooms > 0 ? props.nbRooms : '..'}
                                </div>
                                <div className="rangeArea">
                                    <InputRange className='selectRange' formatLabel={value => {
                                        if (value === 0) {
                                            return '...'
                                        } else {
                                            return value
                                        }
                                    }}
                                        maxValue={5}
                                        onChange={v => props.setNbRooms(v)}
                                        onChangeComplete={() =>setApi()}
                                        value={props.nbRooms}
                                        formatLabel={value => value === 5 ? ">= " + 5 : value }
                                        allowSameValues={true}
                                    />
                                </div>

                            </div>
                            <div className="houssingSetting">
                                <div className="housingLabel">
                                    Surface : {props.surface.min}{"m" + '\u00b2'} - {props.surface.max > 300 ? ">300m" + '\u00b2' : props.surface.max + "m" + '\u00b2'}
                                </div>
                                <div className="rangeArea">
                                    <InputRange className='selectRange'
                                        allowSameValues={true}
                                        minValue={0}
                                        maxValue={300}
                                        value={props.surface}
                                        formatLabel={value => value === 300 ? ">= " + 300 + "m" + '\u00b2' : value + "m" + '\u00b2'}
                                    onChange={v => {
                                        console.log(v.max);
                                            props.setSurface(v);
                                        }}
                                        onChangeStart={v => {
                                            if (v.max > 300) {
                                                props.setSurface({ min: props.surface.min, max: 300 });
                                            } else {
                                                props.setSurface(v);
                                            }
                                        }}
                                        onChangeComplete={() =>setApi()}

                                        
                                    />
                                </div>


                            </div>
                            <div className="houssingSetting">
                                <div className="housingLabel">
                                    Prix : {formatPrice(props.price.min)} - {formatPrice(props.price.max)}
                                </div>
                                <div className="rangeArea">
                                    <InputRange className='selectRange'
                                        
                                        allowSameValues={true}
                                        minValue={50}
                                        maxValue={1000}
                                        value={props.price}
                                        //formatLabel={value => formatPrice(value)}
                                        formatLabel={value => value === 1000 ? ">= " + 1 + "M €" : value + "k €"}
                                        onChange={v => {
                                            props.setPrice(v);
                                        }}
                                        onChangeStart={v => {
                                            if (v.max > 1000) {
                                                props.setPrice({ min: props.price.min, max: 1000 });
                                            } else {
                                                props.setPrice(v);
                                            }
                                        }}
                                        onChangeComplete={() =>setApi()}

                                    />
                                </div>


                            </div>
                        </div>
                    }

                </div>
            }



        </div>)
}
export default MapSettings;