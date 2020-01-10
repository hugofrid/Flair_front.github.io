import React from 'react';
import './ModalInfo.css'
import { capitalize } from '../../../pipes/stringpipe.js'
import GaugeChart from 'react-gauge-chart';
import IconBtn from '../../../componants/iconBtn/iconBtn.js';
import { closeIcon } from '../../../icons/icons.js'


function ModalInfo(props) {

    return (
        <div className="modalInfo">

            <IconBtn className="closeIcon" icon={closeIcon} onClick={() => props.onClose()} alt="close"/>
            <div className="titleCity">{capitalize(props.feature.city_name)}</div>
            <div className="subInfo">Population : {props.feature.population}</div>


            <GaugeChart id="gauge-chart2"
                nrOfLevels={9}
                colors={['#ef2917', '#e86400', '#de7c00', '#d09100', '#bfa500', '#a9b700', '#8dc800', '#67d800', '#01e70b']}
                percent={(props.feature.estimation5) / 9}
                formatTextValue={() => props.feature.estimation5 + 1}
                textColor={'#000000'}
                animDelay={0}
            />
            <div className="chartTitle">Éstimation de la rentabilité à 5 ans</div>
        </div>
    )

}
export default ModalInfo;