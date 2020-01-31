import React, { useState, useEffect } from 'react';
import './CityList.css'
import { capitalize } from '../../../pipes/stringpipe.js'
import IconBtn from '../../../componants/iconBtn/iconBtn.js';
import { closeIcon, searchIcon, sortDscIcon, sortAscIcon } from '../../../icons/icons.js'
import SearchInput from '../../../componants/searchInput/SearchInput.js'
import { colors, colorBoundaries } from '../mapStyle'


function CityList(props) {

    const [loadLimite, setLoadLimite] = useState(100);
    const [orderList, setOrderList] = useState(false);


    const sortByCityName = (a, b) => {
        if (a.properties.city_name < b.properties.city_name)
            return -1;
        if (a.properties.city_name > b.properties.city_name)
            return 1;
        return 0;
    }

    const sortByDisplayedInfo = (a, b) => {
        if (orderList) {
            if (parseFloat(a.properties[props.displayedInfo]) < parseFloat(b.properties[props.displayedInfo]))
                return -1;
            if (parseFloat(a.properties[props.displayedInfo]) > parseFloat(b.properties[props.displayedInfo]))
                return 1;
        }
        else {
            if (parseFloat(a.properties[props.displayedInfo]) > parseFloat(b.properties[props.displayedInfo]))
                return -1;
            if (parseFloat(a.properties[props.displayedInfo]) < parseFloat(b.properties[props.displayedInfo]))
                return 1;
        }

    }


    const sortFeatures = (filteredList) => {
        if (filteredList && filteredList.length > 0) {

           let  list = [...(filteredList.sort(sortByCityName)).sort(sortByDisplayedInfo)]
            return list;
        }

    }


    const featureList = [...sortFeatures(props.features)];
    const [filteredList, setFilteredList] = useState([...sortFeatures(featureList)]);



    const reduceList = () => {
        props.setShowCityList(!props.showCityList);
    }

    const getColor = (estimation, value) => {
        if (value <= colorBoundaries(estimation)[1]) {
            return colors[0];
        }
        if (value > colorBoundaries(estimation)[1] && value <= colorBoundaries(estimation)[2]) {

            return colors[1];
        }
        if (value > colorBoundaries(estimation)[2] && value <= colorBoundaries(estimation)[3]) {

            return colors[2];
        }
        if (value > colorBoundaries(estimation)[3]) {

            return colors[3];
        }

    }

    
    useEffect(() => {
        const orderedFilterList =[...sortFeatures(filteredList)]
        setFilteredList([...orderedFilterList]);
    },[orderList])


    return (
        <div className={"listComponent " + (props.showCityList ? "isOpen" : "")}>

            <IconBtn className={("toggleIcon ") + (props.showCityList && "closeIcon")} icon={props.showCityList ? closeIcon : searchIcon} onClick={reduceList}></IconBtn>


            {props.showCityList && featureList && featureList.length > 0 && loadLimite &&
                <div className="visibleList">

                    <IconBtn className="listOrder" icon={orderList ? sortDscIcon : sortAscIcon} onClick={() => setOrderList(!orderList)}></IconBtn>

                    <SearchInput arraySource={featureList} returnedArray={(elem) => setFilteredList(elem)}></SearchInput>


                    <div className="list">
                    <div className="scrollComponant">
                        { filteredList && filteredList.length === 0 && <div className="noResult">Aucun résultat pour cette récherche</div>}
                            {(filteredList && 

                                filteredList.slice(0, loadLimite).map((elem, index) =>

                                    <div className={"city " + ((elem.properties === props.activeFeature) ? "selected" : "")} key={index}
                                        onClick={() => {
                                            props.onClickFeature(elem, index);

                                        }}

                                    >
                                        <div className="cityName">  {capitalize(elem.properties.city_name)}  - {elem.properties.codePostal}</div>
                                        <div className="infoByCity">

                                            <div className="estimation">{props.displayedInfo === "estimation2" ? 'Prix du m² à 2 ans :' : 'Prix du m² à 5 ans :'}</div><div className="pourcent" style={{ color: getColor(props.displayedInfo, elem.properties[props.displayedInfo]) }}>{elem.properties[props.displayedInfo] > 0 ? "+" + (elem.properties[props.displayedInfo]).toFixed(2) : (elem.properties[props.displayedInfo]).toFixed(2) }%</div>





                                        </div>
                                    </div>)

                        ) 
                        }
                        
                        {(loadLimite <= filteredList.length) &&
                                <div className="showMore" onClick={() => setLoadLimite(loadLimite + 100)}>voir plus </div>}

                        </div>
                    </div>
                </div>
            }

        </div>
    )

}
export default CityList;