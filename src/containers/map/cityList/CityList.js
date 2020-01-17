import React, { useState, useEffect } from 'react';
import './CityList.css'
import { capitalize } from '../../../pipes/stringpipe.js'
import IconBtn from '../../../componants/iconBtn/iconBtn.js';
import { closeIcon, listIcon, sortDscIcon, sortAscIcon } from '../../../icons/icons.js'
import JaugeBar from '../../../componants/jaugeBar/jaugeBar';


function CityList(props) {

    const sortByCityName = (a, b) => {
        if (a.properties.city_name < b.properties.city_name)
            return -1;
        if (a.properties.city_name > b.properties.city_name)
            return 1;
        return 0;
    }

    const sortFeatures = (featureList) => {

        let list = [];
        featureList.map(elem => {
            if (!list[elem.properties.estimation5]) {
                list[elem.properties.estimation5] = []
            }
            list[elem.properties.estimation5].push(elem)

        })
        list.forEach(elem => elem.sort(sortByCityName));
        let arrayList;
        if (orderList === '-') {
            arrayList = list.reduce((accumulator, object) => accumulator = [...accumulator, ...object])
        }
        if (orderList === '+') {

            arrayList = list.reverse().reduce((accumulator, object) => accumulator = [...accumulator, ...object])
        }
        return arrayList;
    }


    const [isOpen, setIsOpen] = useState(false);
    const [loadLimite, setLoadLimite] = useState(100);
    const [orderList, setOrderList] = useState("+");
  

    useEffect(() => { setFeatureList(sortFeatures(props.features)) }, [orderList])

    const [featureList, setFeatureList] = useState(sortFeatures(props.features));


    const reduceList = () => {
        setIsOpen(!isOpen);
    }

    const colors = '#ef2917,#ed4a00,#e86400,#de7c00,#d09100,#bfa500, #a9b700,#8dc800, #67d800, #01e70b'
    return (
        <div className={"listComponent " + (isOpen ? "isOpen" : "")}>

            <IconBtn className="toggleIcon" icon={isOpen ? closeIcon : listIcon} onClick={reduceList}></IconBtn>


            {isOpen && featureList && featureList.length && loadLimite &&
                <div className="visibleList">

                    <IconBtn className="listOrder" icon={orderList === "+" ? sortDscIcon : sortAscIcon} onClick={() => orderList === "+" ? setOrderList("-") : setOrderList("+")}></IconBtn>
                    <div className="list">

                        <div className="listOption">

                        </div>
                        {

                            featureList.slice(0, loadLimite).map((elem, index) =>

                                <div className={"city " + ((elem.properties === props.activeFeature) ? "selected" :"")}key={index}
                                    onClick={() => {
                                        props.onClickFeature(elem, index);
                                      
                                    }}

                                >
                                    <div className="cityName">  {capitalize(elem.properties.city_name)}  - {elem.properties.codePostal}</div>
                                    <div >
                                        <JaugeBar colors={colors} point={elem.properties.estimation5} ></JaugeBar>
                                    </div>
                                </div>)

                        }
                        <div  className="showMore" onClick={() => setLoadLimite(loadLimite + 100)}>show moreeeeee</div>
                    </div>
                </div>
            }

        </div>
    )

}
export default CityList;