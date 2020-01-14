import React, { useState, useEffect } from "react";
import MapGL, { Source, Layer, FlyToInterpolator } from 'react-map-gl';
import { toggleMode, zoom, onMapClick, goToUserLocation, onHover } from './mapUtils'

import './Map.css'
import './modalInfo/ModalInfo.js'
import Tooltips from "./tooltips/Tooltips.js";
import ModalInfo from "./modalInfo/ModalInfo.js";
import IconBtn from '../../componants/iconBtn/iconBtn.js';
import { locationIcon, plusIcon, minusIcon, sunIcon, moonIcon } from '../../icons/icons.js'
import getDataSet from '../../services/dataServices.js';
import CityList from './cityList/CityList.js'


function Map(props) {



    const [mapLayer, setMapLayer] = useState();
    const fetchMapData = async () => {
        let res = await getDataSet();
        if (res) {
            const newLayer = JSON.parse(res)
            setMapLayer(newLayer);
        }
    }

    useEffect(() => {
        fetchMapData()
    }, [props])

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 48.8534,
        longitude: 2.3488,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
        zoom: 9
    })

    const [hoveredFeature, setHoveredFeature] = useState(null)
    const [mapStyle, setMapStyle] = useState('streets')

    const [tooltipsPosition, setTooltipsPosition] = useState({ x: null, y: null });
    const [dataLayer, setLayer] = useState({
        id: 'data',
        source: 'mainMap',
        type: 'fill',
        paint: {
            'fill-color': [
                'interpolate',
                ["linear"],
                ['get', 'estimation5'],
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
            'fill-opacity': 0.3
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








    return (
        <div className="mapContainer">
            <div className="rightOptions">
                {(clickedFeature && clickedLayer && clickedSource) &&

                    <ModalInfo setClickedFeature={setClickedFeature} setClickedSource={setClickedSource} feature={clickedFeature}
                    />}

                {mapLayer && <CityList features={mapLayer.features}></CityList>}
            </div>
            <div className="buttons">

                <IconBtn onClick={() => toggleMode(mapStyle, setMapStyle)} icon={mapStyle === 'light' ? moonIcon : sunIcon} alt='switch mode' />
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

                {mapLayer && <Source id='mainMap' type="geojson" data={mapLayer} >
                    <Layer  {...dataLayer} />
                </Source>}



                {(clickedFeature && clickedLayer && clickedSource) &&

                    <Source id='clickedLayer' type="geojson" data={clickedSource}>
                        <Layer  {...clickedLayer[0]} />
                        <Layer  {...clickedLayer[1]} />

                    </Source>}


                {hoveredFeature && <Tooltips feature={hoveredFeature.properties} tooltipsPosition={tooltipsPosition}></Tooltips>}

            </MapGL>
        </div>
    )
}

export default Map;
