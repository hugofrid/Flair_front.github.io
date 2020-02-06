import {FlyToInterpolator} from 'react-map-gl'
import bbox from '@turf/bbox';
import {getApiSet,getDataSet} from '../../services/frontServices.js'


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
        zoom: 12
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



export const onMapClick = (setViewport,setClickedFeature, setClickedSource,clickedFeature, event) => {
    const {
        features,
    } = event;

    const newClickedFeature = features && features.find(f => f.layer.id === 'data');
  
    if (features && features.length && newClickedFeature && features[0].source === 'mainMap') {
        zoomToFeature(newClickedFeature, setViewport, setClickedFeature, setClickedSource)
    }
    else  if (features && features.length && newClickedFeature && features[1].source === 'mainMap' && (!clickedFeature ||clickedFeature.codeINSEE !== newClickedFeature.properties.codeINSEE)) {
        
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
            zoom: 12
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
  
export const fetchApiData = async (clickedFeature, b,c,d,e,f, setMapMarker) => {
    
    if (clickedFeature && clickedFeature.codePostal) {

        //const res = await getApiSet(clickedFeature.codePostal);

        
        b=b*1000;
        c=c*1000;
        const res = await  getApiSet(clickedFeature.codePostal,b,c,d,e,f);

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
            return feature;
        })


        setMapMarker(await geoData.features);

    }
}

export  const fetchMapData = async (setMapLayer) => {
    let res = await getDataSet();
    if (res) {
        let newLayer = await JSON.parse(res)
        newLayer.features = newLayer.features.map(elem => {
            let newFeat = elem;
            newFeat.properties.codePostal = elem.properties.codePostal +"";


            newFeat.properties.prixActuel = parseFloat(elem.properties.prixActuel);
            newFeat.properties.prix_2 = parseFloat(elem.properties.prix_2);
            newFeat.properties.estimation2 = parseFloat(elem.properties.estimation2);
            newFeat.properties.prix_5 = parseFloat(elem.properties.prix_5);
            newFeat.properties.estimation5 = parseFloat(elem.properties.estimation5);
            return newFeat
        })
        setMapLayer(await newLayer);
    }
}

