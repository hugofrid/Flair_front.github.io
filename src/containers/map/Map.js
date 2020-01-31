import React, { useState, useEffect } from "react";

import MapGL, { Source, Layer, FlyToInterpolator, Marker } from 'react-map-gl';
import { zoom, onMapClick, goToUserLocation, onHover, zoomToFeature,fetchApiData ,fetchMapData } from './mapUtils'
import {mapStyleLayer, selectedAreastyle} from './mapStyle.js'
import './Map.css'
import './modalInfo/ModalInfo.js'
import Tooltips from "./tooltips/Tooltips.js";
import ModalInfo from "./modalInfo/ModalInfo.js";
import MarkerInfo from "./markerInfo/MarkerInfo.js";
import IconBtn from '../../componants/iconBtn/iconBtn.js';

import { locationIcon, plusIcon, minusIcon, markerIcon, selectedMarkerIcon } from '../../icons/icons.js'


import CityList from './cityList/CityList.js'
import MapSettings from "./mapSettings/MapSettigs";



function Map(props) {

    const [mapLayer, setMapLayer] = useState();
    const [mapMarker, setMapMarker] = useState();
    const [showCityList, setShowCityList] = useState(false);
    const [displayedInfo, setDisplayedInfo] = useState('estimation2');
    const [showHousing, setShowHousing] = useState(false);
    const [nbRooms, setNbRooms] = useState(0);
    const [surface, setSurface] = useState({min:0,max:300});
    const [price, setPrice] = useState({ min: 50, max:1000});
    

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 48.8534,
        longitude: 2.3488,
        transitionDuration: 1500,
        transitionInterpolator: new FlyToInterpolator(),
        zoom: 9
    })

    const [hoveredFeature, setHoveredFeature] = useState(null)
    const [mapStyle, setMapStyle] = useState('dark')
    const [tooltipsPosition, setTooltipsPosition] = useState({ x: null, y: null });
    const [dataLayer, setLayer] = useState(mapStyleLayer(displayedInfo))
    const [clickedFeature, setClickedFeature] = useState(null);
    const [clickedLayer, setClickedLayer] = useState(selectedAreastyle);
    const [clickedSource, setClickedSource] = useState(null);
    const [clickedMarker, setClickedMarker] = useState(null);
    const [selected, setSelected] = useState(null);
    const onMarkerClick = (elem) => {
        setClickedMarker(elem);
    };

    const closeMarkerInfo = () => {
        setClickedMarker(null);
        setSelected(null)
    }
    useEffect(() => {
        setLayer(mapStyleLayer(displayedInfo))
    }, [displayedInfo])
    
    useEffect(() => {

        fetchMapData(setMapLayer);
    }, [props])

    useEffect(() => {
        closeMarkerInfo();
    },[nbRooms,surface,price])
 

    useEffect(() => {
        if (showHousing) {
            fetchApiData(clickedFeature,price.min,price.max,surface.min,surface.max,nbRooms,setMapMarker)
        } else {
            closeMarkerInfo()
        }

    }, [showHousing,clickedFeature])


    
    return (
        <div className="mapContainer">
            <div className="rightOptions">
                {mapLayer && <CityList features={mapLayer.features} onClickFeature={feat => { zoomToFeature(feat, setViewport, setClickedFeature, setClickedSource) }} activeFeature={clickedFeature || null}
                    displayedInfo={displayedInfo} showCityList={showCityList} setShowCityList={(elem) => setShowCityList(elem)}></CityList>}
                {(clickedFeature && clickedLayer && clickedSource) &&

                    <ModalInfo setClickedFeature={setClickedFeature} setClickedSource={setClickedSource} feature={clickedFeature}
                        displayedInfo={displayedInfo}
                    />}
                {(clickedMarker && clickedFeature && clickedMarker.properties.codeP == clickedFeature.codePostal) && <MarkerInfo className={showCityList && "movedLeft"} onClose={closeMarkerInfo} marker={clickedMarker} feature={clickedFeature} displayedInfo={displayedInfo}/>}
            </div>
          

            <div className="settingsPart">
                <MapSettings mapStyle={mapStyle} displayedInfo={displayedInfo} setDisplayedInfo={value => setDisplayedInfo(value)} setMapStyle={value => setMapStyle(value)} showHousing={showHousing} setShowHousing={value => setShowHousing(value)}
                    nbRooms={nbRooms} setNbRooms={setNbRooms}
                    surface={surface} setSurface={setSurface}
                    price={price} setPrice={setPrice} showHousing={showHousing} setMapMarker={setMapMarker} clickedFeature={clickedFeature} closeMarkerInfo={closeMarkerInfo}
                ></MapSettings>
            </div>

            <div className="buttons">


                <IconBtn onClick={() => zoom(viewport, setViewport, '+')} icon={plusIcon} alt='Zomm +' />
                <IconBtn onClick={() => zoom(viewport, setViewport, '-')} icon={minusIcon} alt='Zomm -' />
                <IconBtn onClick={() => goToUserLocation(viewport, setViewport)} icon={locationIcon} alt='go to my location' />

            </div>

            <MapGL {...viewport}
                mapStyle={mapStyle === 'dark' ? 'mapbox://styles/hugofrid/ck622xrs60ool1imt2w7wyjn7' : 'mapbox://styles/hugofrid/ck622uk1w0ogr1inzcrgzhiho'} onViewportChange={(viewport => setViewport(viewport))}
                onHover={event => onHover(setTooltipsPosition, setHoveredFeature, event)}
                onClick={event => onMapClick(setViewport, setClickedFeature, setClickedSource, event)}
                mapboxApiAccessToken="pk.eyJ1IjoiaHVnb2ZyaWQiLCJhIjoiY2s1M3RpeXlvMGJkdTNscnJ3YWxiMWw1MSJ9.ZdCzWSCG53V78zgGEez6dg"
            >
                {mapLayer && mapLayer.features && <Source id='mainMap' type="geojson" data={mapLayer} >
                    <Layer  {...dataLayer} beforeId='settlement-major-label' beforeId='settlement-minor-label'
                    beforeId='settlement-subdivision-label'
 />
                </Source>}


                {
                    (clickedFeature && clickedLayer && clickedSource) && mapMarker && mapMarker.length && showHousing &&
                    mapMarker.map((elem, index) => {
                        return ((elem.properties.codeP === clickedFeature.codePostal) &&
                            <Marker key={index} latitude={parseFloat(elem.geometry.coordinates[1])} longitude={parseFloat(elem.geometry.coordinates[0])} >
                                {(selected === index && elem.properties.codeP === clickedMarker.properties.codeP) ? <img src={selectedMarkerIcon} onClick={() => {
                                    onMarkerClick(elem, index)
                                    setSelected(null)
                                    closeMarkerInfo()
                                }} alt="Here is a marker" height="24px" width="24px" /> : <img src={markerIcon} onClick={() => {
                                    onMarkerClick(elem)
                                    setSelected(index)
                                }} alt="Here is a marker" height="24px" width="24px" />
                                }

                            </Marker>)

                    })
                }

                {(clickedFeature && clickedLayer && clickedSource) &&

                    <Source id='clickedLayer' type="geojson" data={clickedSource}>
                        <Layer  {...clickedLayer[0]}  beforeId='settlement-major-label' beforeId='settlement-minor-label'
                    beforeId='settlement-subdivision-label' />
                        <Layer  {...clickedLayer[1]} beforeId='settlement-major-label' beforeId='settlement-minor-label'
                    beforeId='settlement-subdivision-label'  />

                    </Source>}


                {hoveredFeature && <Tooltips feature={hoveredFeature.properties} tooltipsPosition={tooltipsPosition}></Tooltips>}

            </MapGL>
        </div >
    )
}

export default Map;
