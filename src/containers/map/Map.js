import React, { useState, useEffect } from "react";
import MapGL, { Source, Layer, Marker } from 'react-map-gl';

import './Map.css'
import './modalInfo/ModalInfo.js'
import Tooltips from "./tooltips/Tooltips.js";
import ModalInfo from "./modalInfo/ModalInfo.js";
import IconBtn from '../../componants/iconBtn/iconBtn.js';
import { locationIcon, plusIcon, minusIcon, sunIcon, moonIcon, markerIcon } from '../../icons/icons.js'
import getDataSet from '../../services/dataServices.js'
import getApiSet from '../../services/apiServices.js'


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
        fetchMapData();
        fetchApiData();
    }, [props])




    /**useEffect(() => {
        fetch(
            `http://api.gedeon.im/ads?key=xg4oQJjIMtzetP02EbcIiv7FrVT2g7en&localization=75015`
            
          )
            .then(res => res.json())
            .then(response => {
              
              console.log(response.results[0].id)
              //return response;
            })
            .catch(error => console.log(error));
    },[props])*/


    const [mapMarker, setMapMarker] = useState();

    const fetchApiData =  async () => {
        const res = await  getApiSet("75015");
        //console.log(res.length);
        let geoData = {
            "type": "FeatureCollection",
            "features": []
        }
         await res.map(elem => {
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
                    "url": elem.url
                }
            }
            geoData.features.push(feature);
        })
        console.log(mapMarker);


        //console.log(geoData.features);
        // jsonContent  = await  JSON.stringify(geoData);
        setMapMarker(geoData.features);
        //console.log(jsonContent)

    }

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 48.8534,
        longitude: 2.3488,
        zoom: 9
    })
    const [hoveredFeature, setHoveredFeature] = useState(null)
    const [mapStyle, setMapStyle] = useState('light')

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



    const goToUserLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            let newViewport = {
                height: "100%",
                width: "100%",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 11
            }

            setViewport(newViewport)
        })
    }
    const zoom = (dir) => {
        let vp = viewport;
        if (dir === "+" && vp.zoom < 24) {
            vp.zoom = vp.zoom + 1
        }
        if (dir === "-" && vp.zoom > 0) {
            vp.zoom = vp.zoom - 1
        }
        setViewport(vp)
        console.log(vp.zoom, viewport.zoom)

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
        console.log(event)
        const {
            features,
        } = event;


        if (features && features.length && features[0].source === 'mainMap') {


            const newClickedFeature = features && features.find(f => f.layer.id === 'data');


            console.log("click", newClickedFeature.geometry.coordinates);

            const newClickedSourceFeature = {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": newClickedFeature.geometry.coordinates
                    }
                }]
            }
            setClickedFeature(newClickedFeature.properties);
            setClickedSource(newClickedSourceFeature);
            console.log(clickedFeature, clickedLayer, clickedSource)
        }
        else {
            setClickedFeature(null);
            setClickedSource(null);
        }
    };

    const toggleMode = () => {
        mapStyle === 'light' ? setMapStyle('dark') : setMapStyle('light')
    }
    const closeInfo = () => {
        setClickedFeature(null);
        setClickedSource(null);
    }

    const onMarkerClick = event => {
        console.log("displayed");
    };

    return (
        <div className="mapContainer">
            {(clickedFeature && clickedLayer && clickedSource) && <ModalInfo onClose={closeInfo} feature={clickedFeature} />}

            <div className="buttons">

                <IconBtn onClick={toggleMode} icon={mapStyle === 'light' ? moonIcon : sunIcon} alt='switch mode' />
                <IconBtn onClick={() => zoom('+')} icon={plusIcon} alt='Zomm +' />
                <IconBtn onClick={() => zoom('-')} icon={minusIcon} alt='Zomm -' />
                <IconBtn onClick={goToUserLocation} icon={locationIcon} alt='go to my location' />


            </div>

            <MapGL {...viewport}
                mapStyle={'mapbox://styles/mapbox/' + mapStyle + '-v10'} onViewportChange={(viewport => setViewport(viewport))}
                onHover={onHover}
                onClick={onClick}
                mapboxApiAccessToken="pk.eyJ1IjoiYm90cmVsIiwiYSI6ImNrM2Z5ODVxdzA5N3YzY3FjajcwcmloM2UifQ.rYqepC72dc2DxKTLLPCPgQ" >

                {mapLayer && <Source id='mainMap' type="geojson" data={mapLayer} >
                    <Layer  {...dataLayer} />
                </Source>}


                

                {
                    (clickedFeature && clickedFeature.codePostal==75015 && clickedLayer && clickedSource) && mapMarker && mapMarker.length  &&
                    mapMarker.map((elem, index) => {
                        return (
                            <Marker key={index} latitude={parseFloat(elem.geometry.coordinates[1])} longitude={parseFloat(elem.geometry.coordinates[0])} offsetLeft={-20} offsetTop={-10}>
                            <img src={markerIcon} onClick={onMarkerClick} alt="Here is a marker" height="24px" width="24px"/>
                    </Marker>
                        )
                    })
                }
                




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
