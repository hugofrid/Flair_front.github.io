import React from 'react';
import './ModalInfo.css'
import { capitalize } from '../../../pipes/stringpipe.js'
import GaugeChart from 'react-gauge-chart';
import IconBtn from '../../../componants/iconBtn/iconBtn.js';
import { closeIcon } from '../../../icons/icons.js'
import { colors, colorBoundaries } from '../mapStyle';


function ModalInfo(props) {

    const closeInfo = () => {
        props.setClickedFeature(null);
        props.setClickedSource(null);
    }


    const getPourcent = (value) => {
        let pourcentValue;

            if( value >= colorBoundaries(props.displayedInfo)[0] && value < colorBoundaries(props.displayedInfo)[1]) {
                pourcentValue = (((value + Math.abs(colorBoundaries(props.displayedInfo)[0])) * 25) / Math.abs(colorBoundaries(props.displayedInfo)[0]));

            }
            else if(value >= colorBoundaries(props.displayedInfo)[1] && value < colorBoundaries(props.displayedInfo)[2])
                {


                    pourcentValue = ((value * 25) / (colorBoundaries(props.displayedInfo)[2] - colorBoundaries(props.displayedInfo)[1])) + 25;

                }
            else if(value >= colorBoundaries(props.displayedInfo)[2] && value < colorBoundaries(props.displayedInfo)[3])
                {

                    pourcentValue = (((value - colorBoundaries(props.displayedInfo)[2]) * 25) / (colorBoundaries(props.displayedInfo)[3] - colorBoundaries(props.displayedInfo)[2])) + 50;

                }
            else if( value >= colorBoundaries(props.displayedInfo)[3] && value <= colorBoundaries(props.displayedInfo)[4])
                {

                    pourcentValue = (((value - colorBoundaries(props.displayedInfo)[3]) * 25) / (colorBoundaries(props.displayedInfo)[4] - colorBoundaries(props.displayedInfo)[3])) + 75;
                }

        return parseFloat(pourcentValue);
    }

    return (
        <div className="modalInfo">

            <IconBtn className="closeIcon" icon={closeIcon} onClick={closeInfo} alt="close" />

            <div className="titleCity">{capitalize(props.feature.city_name)}</div>
            <div className="subInfo">Population : {props.feature.population}</div>


            <GaugeChart id="gauge-chart2"
                nrOfLevels={4}
                colors={colors}
                percent={getPourcent(props.feature[props.displayedInfo])/100}
                formatTextValue={() => "+ " + props.feature[props.displayedInfo] + "%"}
                textColor={'#000000'}
                animDelay={0}
            />
            <div className="chartTitle">Estimation de la {props.displayedInfo==='estimation2' ? 'rentabilité à 2 ans' : 'rentabilité à 2 ans'}</div>
        </div>
    )

}
export default ModalInfo;