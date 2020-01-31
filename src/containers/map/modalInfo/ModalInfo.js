import React, { useState } from 'react';
import './ModalInfo.css'
import { capitalize } from '../../../pipes/stringpipe.js'
import GaugeChart from 'react-gauge-chart';
import IconBtn from '../../../componants/iconBtn/iconBtn.js';
import { closeIcon, leftArrowIcon, rightArrowIcon } from '../../../icons/icons.js'
import { colors, colorBoundaries } from '../mapStyle';


function ModalInfo(props) {

    const closeInfo = () => {
        props.setClickedFeature(null);
        props.setClickedSource(null);
    }
    const [slide, setSlide] = useState(0)


    const getPourcent = (value) => {
        let pourcentValue;

        if (value >= colorBoundaries(props.displayedInfo)[0] && value < colorBoundaries(props.displayedInfo)[1]) {
            pourcentValue = (((value + Math.abs(colorBoundaries(props.displayedInfo)[0])) * 25) / Math.abs(colorBoundaries(props.displayedInfo)[0]));

        }
        else if (value >= colorBoundaries(props.displayedInfo)[1] && value < colorBoundaries(props.displayedInfo)[2]) {


            pourcentValue = ((value * 25) / (colorBoundaries(props.displayedInfo)[2] - colorBoundaries(props.displayedInfo)[1])) + 25;

        }
        else if (value >= colorBoundaries(props.displayedInfo)[2] && value < colorBoundaries(props.displayedInfo)[3]) {

            pourcentValue = (((value - colorBoundaries(props.displayedInfo)[2]) * 25) / (colorBoundaries(props.displayedInfo)[3] - colorBoundaries(props.displayedInfo)[2])) + 50;

        }
        else if (value >= colorBoundaries(props.displayedInfo)[3] && value <= colorBoundaries(props.displayedInfo)[4]) {

            pourcentValue = (((value - colorBoundaries(props.displayedInfo)[3]) * 25) / (colorBoundaries(props.displayedInfo)[4] - colorBoundaries(props.displayedInfo)[3])) + 75;
        }

        return parseFloat(pourcentValue);
    }

    return (
        <div className="modalInfo">

            <IconBtn className="closeIcon" icon={closeIcon} onClick={closeInfo} alt="close" />

            <div className="titleCity">{capitalize(props.feature.city_name)}</div>
            <div className="m2"></div>

            <div className="carrousel">
                <div className={"arrow " + (slide === 0 ? " dissable" : "")} onClick={() => setSlide(0)}>
                    <img src={leftArrowIcon} alt="précedent" />
                </div>
                <div className="slides">

                    <div className="slide " className={"slide " + ('movedBy' + slide)}>
                        <GaugeChart id="gauge-chart"
                            nrOfLevels={4}
                            colors={colors}
                            percent={getPourcent(props.feature[props.displayedInfo]) / 100}
                            formatTextValue={() => (props.feature[props.displayedInfo] > 0 ? "+ " : "") + (props.feature[props.displayedInfo]).toFixed(2) + "%"}
                            textColor={'#000000'}
                            animDelay={0}
                        />
                        <div className="chartTitle">Estimation de la rentabilité{props.displayedInfo === 'estimation2' ? ' à 2 ans' : ' à 5 ans'}</div>
                    </div>
                    <div className={"slide cityDatas " + ('movedBy' + slide)} >
                        <div className="data"> 
                        <div className="dataName">Prix moyen du m² :</div>
                            <div className="dataNumb">Actuel : {props.feature.prixActuel}</div>
                            <div className="dataNumb">{props.displayedInfo==="estimation2" ? 'Dans 2 ans:' + props.feature.prix_2 + "€" :'Dans 5 ans:' + props.feature.prix_5 + "€"}</div>
                        </div>
                        <div className="data">
                            <div className="dataName">Population :</div>
                            <div className="dataNumb">{props.feature.population} </div>
                        </div>
                        <div className="data">
                            <div className="dataName">Prix moyen de vente d'un bien :</div>
                            <div className="dataNumb">{props.feature.prixVenteMoyen}€</div>
                        </div>
                       
                    </div>

                </div>
                <div className={"arrow " + (slide === 1 ? "dissable" : "")} onClick={() => setSlide(1)}>
                    <img src={rightArrowIcon} alt="précedent" />
                </div>

            </div>
        </div>
    )

}
export default ModalInfo;