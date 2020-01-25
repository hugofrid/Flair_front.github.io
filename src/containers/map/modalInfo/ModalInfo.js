import React from 'react';
import './ModalInfo.css'
import { capitalize } from '../../../pipes/stringpipe.js'
import GaugeChart from 'react-gauge-chart';
import IconBtn from '../../../componants/iconBtn/iconBtn.js';
import { closeIcon } from '../../../icons/icons.js'
import { colors } from '../mapStyle';


function ModalInfo(props) {

    const closeInfo = () => {
        props.setClickedFeature(null);
        props.setClickedSource(null);
    }

    return (
        <div className="modalInfo">

            <IconBtn className="closeIcon" icon={closeIcon} onClick={closeInfo} alt="close" />
            
            <div className="titleCity">{capitalize(props.feature.city_name)}</div>
            <div className="subInfo">Population : {props.feature.population}</div>


            <GaugeChart id="gauge-chart2"
                nrOfLevels={9}
                colors={colors}
                percent={(props.feature[props.displayedInfo]) / 9}
                formatTextValue={() => props.feature[props.displayedInfo] + 1}
                textColor={'#000000'}
                animDelay={0}
            />
            <div className="chartTitle">Estimation de la rentabilité à 5 ans</div>
        </div>
    )

}
export default ModalInfo;