import React, { useState } from "react";
import MapGL, { Source, Layer } from 'react-map-gl';
import data from '../../datasets/idf-pop.js';
import './Map.css'
import Tooltips from "./tooltips/Tooltips.js";

function Map(props) {

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 48.8534,
        longitude: 2.3488,
        zoom: 9
    })
    const [hoveredFeature, setHoveredFeature] = useState(null)
    const [mapStyle, setMapStyle] = useState('light-v10')

    const [tooltipsPosition, setTooltipsPosition] = useState({ x: null, y: null });
    const [dataLayer, setLayer] = useState({
        id: 'data',
        source: 'hdensity',
        type: 'fill',
        paint: {
            'fill-color': [
                'interpolate',
                ["linear"],
                ['get', 'pop_0_14_ans_en_2011_princ'],
                0.0,
                '#F2F12D',
                500.0,
                '#EED322',
                750.0,
                '#E6B71E',
                1000,
                '#DA9C20',
                2500,
                '#CA8323',
                5000,
                '#B86B25',
                7500,
                '#A25626',
                10000,
                '#8B4225',
                25000,
                '#723122'
            ],
            'fill-opacity': 0.5
        }
    })
    const [clickedFeature, setClickedFeature] = useState(null);
    const [clickedLayer, setClickedLayer] = useState({
        type: 'line',
        source: 'clickedLayer',
        id: 'line',
        paint: {
            'line-color': 'black',
            'line-width': 8
        }
    });
    const [clickedSource, setClickedSource] = useState(null);



    const goToUserLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            let newViewport = {
                height: "100%",
                width: "100%",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 12
            }

            setViewport(newViewport)
        })
    }


    const onHover = event => {
        const {
            features,
            srcEvent: { offsetX, offsetY }
        } = event;



        const newHoveredFeature = features && features.find(f => f.layer.id === 'data');

        setTooltipsPosition({ x: offsetX, y: offsetY });
        setHoveredFeature(newHoveredFeature);
    };

    const onClick = event => {
        const {
            features,
        } = event;



        const newClickedFeature = features && features.find(f => f.layer.id === 'data');


        console.log("click", newClickedFeature.geometry.coordinates);

        const newClickedSourceFeature = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Point",
                    "coordinates": newClickedFeature.geometry.coordinates
                }
            }]
        }
        setClickedFeature(newClickedFeature.properties);
        setClickedSource(newClickedSourceFeature);
        console.log(clickedFeature,clickedLayer,clickedSource)
    };

    const toggleMode = () => {
        mapStyle === 'light-v10' ? setMapStyle('dark-v10') : setMapStyle('light-v10')
    }

    return (<div className="mapContainer">
        <button onClick={goToUserLocation}>My location</button>
        <button onClick={toggleMode}>Dark/Light</button>

        <MapGL {...viewport}
            mapStyle={'mapbox://styles/mapbox/' + mapStyle} onViewportChange={(viewport => setViewport(viewport))}
            onHover={onHover}
            onClick={onClick}
            mapboxApiAccessToken="pk.eyJ1IjoiYm90cmVsIiwiYSI6ImNrM2Z5ODVxdzA5N3YzY3FjajcwcmloM2UifQ.rYqepC72dc2DxKTLLPCPgQ" >

            <Source id='hdensity' type="geojson" data={data} />
            <Layer  {...dataLayer} />


            {(clickedFeature && clickedLayer && clickedSource) &&

                <Source id='clickedLayer' type="geojson" data={clickedSource}>
                    <Layer  {...clickedLayer} />
                </Source>}
            

            {hoveredFeature && <Tooltips feature={hoveredFeature.properties} tooltipsPosition={tooltipsPosition}></Tooltips>}

        </MapGL>
    </div>
    )
}

export default Map;
