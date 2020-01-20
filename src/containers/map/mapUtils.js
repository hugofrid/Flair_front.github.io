import React from 'react';
import {FlyToInterpolator} from 'react-map-gl'
import bbox from '@turf/bbox';



export const zoom = (viewport, setViewport, dir) => {
    if (dir === "+" && viewport.zoom < 24) {
       
        let newViewport = {
            height: "100%",
            width: "100%",
            latitude: viewport.latitude,
            longitude: viewport.longitude,
            transitionDuration: 1500,
            transitionInterpolator: new FlyToInterpolator(),
            zoom: viewport.zoom + 1
        }
        setViewport(newViewport);
    }else 
    if (dir === "-" && viewport.zoom > 0) {
         let newViewport = {
            height: "100%",
            width: "100%",
            latitude: viewport.latitude,
            longitude:viewport.longitude,
            transitionDuration: 1500,
            transitionInterpolator: new FlyToInterpolator(),
            zoom: viewport.zoom - 1 
         }
         setViewport(newViewport);
    }


}

export const toggleMode = (mapStyle,setMapStyle) => {
    mapStyle === 'streets' ? setMapStyle('dark') : setMapStyle('streets')
}

export const zoomToFeature = (feature,setViewport,setClickedFeature, setClickedSource) => {
    
     
    
           
    const [minLng, minLat, maxLng, maxLat] = bbox(feature);

    let newViewport = {
        height: "100%",
        width: "100%",
        latitude: ((maxLat + minLat)/2),
        longitude: ((maxLng + minLng)/2)+0.03,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
        zoom: 11
     }
     setViewport(newViewport);

        const newClickedSourceFeature = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": feature.geometry.coordinates
                }
            }]
        }
        setClickedFeature(feature.properties);
        setClickedSource(newClickedSourceFeature);

}



export const onMapClick = (setViewport,setClickedFeature, setClickedSource, event) => {
    const {
        features,
    } = event;

  
    if (features && features.length && features[0].source === 'mainMap') {
        const newClickedFeature = features && features.find(f => f.layer.id === 'data');
        zoomToFeature(newClickedFeature, setViewport, setClickedFeature, setClickedSource)
    
        
    }
    else {
        setClickedFeature(null);
        setClickedSource(null);
    }
};

export const goToUserLocation = (viewport,setViewport) => {
    navigator.geolocation.getCurrentPosition(position => {
        let newViewport = {
            height: "100%",
            width: "100%",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            transitionDuration: 1500,
            transitionInterpolator: new FlyToInterpolator(),
            zoom: 11
        }

        setViewport(newViewport)
    })
}

export const onHover = (setTooltipsPosition,setHoveredFeature,event) => {
    const {
        features,
        srcEvent: { offsetX, offsetY }
    } = event;

    const newHoveredFeature = features && features.find(f => f.layer.id === 'data');

    setTooltipsPosition({ x: offsetX, y: offsetY });
    setHoveredFeature(newHoveredFeature);
}; 


export  const updateViewport = (viewport,setViewport) => {
    setViewport(viewport);
  };