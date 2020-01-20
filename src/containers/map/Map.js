import React, { useState, useEffect } from "react";

import MapGL, { Source, Layer, FlyToInterpolator, Marker } from 'react-map-gl';
import { toggleMode, zoom, onMapClick, goToUserLocation, onHover, zoomToFeature } from './mapUtils'


import './Map.css'
import './modalInfo/ModalInfo.js'
import Tooltips from "./tooltips/Tooltips.js";
import ModalInfo from "./modalInfo/ModalInfo.js";
import MarkerInfo from "./markerInfo/MarkerInfo.js";
import IconBtn from '../../componants/iconBtn/iconBtn.js';

import { locationIcon, plusIcon, minusIcon, markerIcon, selectedMarkerIcon } from '../../icons/icons.js'

import getApiSet from '../../services/apiServices.js'
import getDataSet from '../../services/dataServices.js';
import CityList from './cityList/CityList.js'
import MapSettings from "./mapSettings/MapSettigs";



function Map(props) {
    const fetchMapData = async () => {
        let res = await getDataSet();
        if (res) {
            const newLayer = await JSON.parse(res)
            console.log(newLayer)
            setMapLayer(await newLayer);
        }
    }
    const [mapLayer, setMapLayer] = useState();
    const [mapMarker, setMapMarker] = useState();
    const [displayedInfo, setDisplayedInfo] = useState('estimation5');
    const [showHousing, setShowHousing] = useState(false);

    //NE PAS SUPPRIMER
    //const fetchApiData =  async (a,b,c,d,e,f,g) => {
    const fetchApiData = async () => {
        if (clickedFeature && clickedFeature.codePostal && showHousing) {
            const res = await getApiSet(clickedFeature.codePostal);
            //NE PAS SUPPRIMER
            //const res = await  getApiSet(a,b,c,d,e,f,g);

            //console.log("nombre de résultats : " + res.length);
            let geoData = {
                "type": "FeatureCollection",
                "features": []
            }
            res.map(elem => {
                let feature = {
                    "type": 'Feature',
                    "geometry": {
                        "type": 'Point',
                        "coordinates": [elem.localization.lng, elem.localization.lat],
                    },
                    "properties": {
                        "title": elem.title,
                        "text": elem.text,
                        "nbRooms": parseInt(elem.nb_rooms),
                        "price": parseInt(elem.price),
                        "surface": parseInt(elem.surface),
                        "type": elem.type.name,
                        "city": elem.localization.city,
                        "url": elem.url,
                        "photo": elem.photos[0],
                        "codeP": elem.localization.zip_code
                    }
                }
                geoData.features.push(feature);
            })


            //console.log(geoData.features);
            // jsonContent  = await  JSON.stringify(geoData);
            setMapMarker(await geoData.features);
            //console.log(mapMarker,geoData.features);

            //console.log(jsonContent)
        }
    }

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
    const [dataLayer, setLayer] = useState({
        id: 'data',
        source: 'mainMap',
        type: 'fill',
        paint: {
            'fill-color': [
                'interpolate',
                ["linear"],
                ['get', displayedInfo],
                0,
                '#ef2917',
                1,
                '#ed4a00',
                2,
                '#e86400',
                3,
                '#de7c00',
                4,
                '#d09100',
                5,
                '#bfa500',
                6,
                '#a9b700',
                7,
                '#8dc800',
                8,
                '#67d800',
                9,
                '#01e70b'
            ],
            'fill-opacity': 0.5
        }
    })
    const [clickedFeature, setClickedFeature] = useState(null);
    const [clickedLayer, setClickedLayer] = useState([{
        type: 'line',
        source: 'clickedLayer',
        id: 'line',
        paint: {
            'line-color': 'black',
            'line-width': 4
        }
    }, {
        type: 'fill',
        source: 'clickedLayer',
        id: 'fillClicked',
        paint: {
            'fill-opacity': 0.2,
        }
    }
    ]);
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
        setLayer({
            id: 'data',
            source: 'mainMap',
            type: 'fill',
            paint: {
                'fill-color': [
                    'interpolate',
                    ["linear"],
                    ['get', displayedInfo],
                    0,
                    '#ef2917',
                    1,
                    '#ed4a00',
                    2,
                    '#e86400',
                    3,
                    '#de7c00',
                    4,
                    '#d09100',
                    5,
                    '#bfa500',
                    6,
                    '#a9b700',
                    7,
                    '#8dc800',
                    8,
                    '#67d800',
                    9,
                    '#01e70b'
                ],
                'fill-opacity': 0.5
            }
        })
    },[displayedInfo])
    useEffect(() => {

        fetchMapData();
    }, [props])

    useEffect(() => {

        fetchApiData();
    }, [clickedFeature])

    useEffect(() => {
        if (showHousing) {
           fetchApiData()
       }
    },[showHousing])

    return (
        <div className="mapContainer">
            <div className="rightOptions">
                {mapLayer && <CityList features={mapLayer.features} onClickFeature={feat => { zoomToFeature(feat, setViewport, setClickedFeature, setClickedSource) }} activeFeature={clickedFeature || null}
                    displayedInfo={displayedInfo}></CityList>}
                {(clickedFeature && clickedLayer && clickedSource) &&

                    <ModalInfo setClickedFeature={setClickedFeature} setClickedSource={setClickedSource} feature={clickedFeature}
                        displayedInfo={displayedInfo}
                    />}
            </div>
            {(clickedMarker && clickedFeature && clickedMarker.properties.codeP == clickedFeature.codePostal) && <MarkerInfo onClose={closeMarkerInfo} feature={clickedMarker} />}

            <div className="settingsPart">
                <MapSettings mapStyle={mapStyle} displayedInfo={displayedInfo} setDisplayedInfo={value => setDisplayedInfo(value)} setMapStyle={value => setMapStyle(value)} showHousing={showHousing} setShowHousing={value => setShowHousing(value)}></MapSettings>
            </div>

            <div className="buttons">


                <IconBtn onClick={() => zoom(viewport, setViewport, '+')} icon={plusIcon} alt='Zomm +' />
                <IconBtn onClick={() => zoom(viewport, setViewport, '-')} icon={minusIcon} alt='Zomm -' />
                <IconBtn onClick={() => goToUserLocation(viewport, setViewport)} icon={locationIcon} alt='go to my location' />

            </div>

            <MapGL {...viewport}
                mapStyle={'mapbox://styles/mapbox/' + mapStyle + '-v10'} onViewportChange={(viewport => setViewport(viewport))}
                onHover={event => onHover(setTooltipsPosition, setHoveredFeature, event)}
                onClick={event => onMapClick(setViewport, setClickedFeature, setClickedSource, event)}
                mapboxApiAccessToken="pk.eyJ1IjoiYm90cmVsIiwiYSI6ImNrM2Z5ODVxdzA5N3YzY3FjajcwcmloM2UifQ.rYqepC72dc2DxKTLLPCPgQ"
            >
                {mapLayer && mapLayer.features && <Source id='mainMap' type="geojson" data={mapLayer} >
                    <Layer  {...dataLayer} /*beforeId={mapStyle === 'dark' ? 'settlement-label' : null}*/ 
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
                        <Layer  {...clickedLayer[0]}   />
                        <Layer  {...clickedLayer[1]}   />

                    </Source>}


                {hoveredFeature && <Tooltips feature={hoveredFeature.properties} tooltipsPosition={tooltipsPosition}></Tooltips>}

            </MapGL>
        </div >
    )
}

export default Map;
