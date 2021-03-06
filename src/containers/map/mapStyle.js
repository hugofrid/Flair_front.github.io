


//export const colors = ['#BC3F1E', '#E5F52B', '#41BA29', '#36951D']
export const colors = ['#D64823', '#E5F52B', '#92BA29', '#49C826']

export const colorBoundaries = (displayedInfo) => displayedInfo === "estimation2" ? [-8, 0, 6, 10, 23] : [-50, 0, 15, 25, 137];

export const mapStyleLayer = (displayedInfo) => {

    const renderedColor = [
        [colorBoundaries(displayedInfo)[0], colors[0]],
        [colorBoundaries(displayedInfo)[1], colors[0]],
        [colorBoundaries(displayedInfo)[1] + 0.0001, colors[1]],
        [colorBoundaries(displayedInfo)[2], colors[2]],
        [colorBoundaries(displayedInfo)[3], colors[2]],
        [colorBoundaries(displayedInfo)[3]+0.1, colors[3]]] 
    return {
        id: 'data',
        source: 'mainMap',
        type: 'fill',
        paint: {
            'fill-outline-color':"rgba(255, 255, 255, 0.6)",
            'fill-color': {
                property: displayedInfo,
                stops: [...renderedColor]
            },
            'fill-opacity': 0.7
        }
    }
}

export const selectedAreastyle = () => {
    return [{
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
    ]
}