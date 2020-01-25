


export const colors = ['#E5E3E0', '#E5D0BE', '#D3AF8F', '#DDA16C', '#D68D4D', '#D38037', '#C1681F', '#A34E09', '#68340A', '#442002']

export const mapStyleLayer = (displayedInfo) => {
    const renderedColor = colors.reduce((acc, e, i) => {
        if (i === 1) {
            acc = [0,  acc ,1,e ];
        }
        else acc = [...acc ,i, e ];
        return acc
    })

    return {
        id: 'data',
        source: 'mainMap',
        type: 'fill',
        paint: {
            'fill-color': [
                'interpolate',
                ["linear"],
                ['get', displayedInfo],
                ...renderedColor
            ],
            'fill-opacity': 0.5
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