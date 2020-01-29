import React, { useState, useEffect } from 'react';
import './CityList.css'
import { capitalize } from '../../../pipes/stringpipe.js'
import IconBtn from '../../../componants/iconBtn/iconBtn.js';
import { closeIcon, listIcon, sortDscIcon, sortAscIcon } from '../../../icons/icons.js'
import JaugeBar from '../../../componants/jaugeBar/jaugeBar';
import SearchInput from '../../../componants/searchInput/SearchInput.js'
import { colors } from '../mapStyle'


function CityList(props) {

    const sortByCityName = (a, b) => {
        if (a.properties.city_name < b.properties.city_name)
            return -1;
        if (a.properties.city_name > b.properties.city_name)
            return 1;
        return 0;
    }

    const sortByDisplayedInfo = (a, b) => {
      
       if(orderList === "-") {
            if (parseFloat(a.properties[props.displayedInfo]) < parseFloat(b.properties[props.displayedInfo]))
            return -1;
        if (parseFloat(a.properties[props.displayedInfo]) > parseFloat(b.properties[props.displayedInfo]))
               return 1;
       }
       else {
        if (parseFloat(a.properties[props.displayedInfo]) > parseFloat(b.properties[props.displayedInfo]))
        return -1;
    if (parseFloat(a.properties[props.displayedInfo]) < parseFloat(b.properties[props.displayedInfo]))
        return 1;}

    } 
  

    const sortFeatures =  (featureList) => {
        if (featureList && featureList.length > 0) {
            let list = [];

            list = featureList.sort(sortByCityName)
            list = list.sort(sortByDisplayedInfo);
            return list;
        }

    }


    const [loadLimite, setLoadLimite] = useState(100);
    const [orderList, setOrderList] = useState("+");


    useEffect(() => { setFilteredList(sortFeatures(filteredList)) }, [orderList])

    const [featureList, setFeatureList] = useState(sortFeatures(props.features));
    const [filteredList, setFilteredList] = useState(featureList);



    const reduceList = () => {
        props.setShowCityList(!props.showCityList);
    }

    const getColor = (a,b) => {
        if(a=="estimation2"){
            if(b<=0){
                return colors[0];
            }
            if(b>0 && b<=6){
                return colors[1];
            }
            if(b>6 && b<=11){
                return colors[2];
            }
            if(b>11){
                return colors[3];
            }
            
        }else{
            if(b<=0){
                return colors[0];
            }
            if(b>0 && b<=6){
                return colors[1];
            }
            if(b>6 && b<=11){
                return colors[2];
            }
            if(b>11){
                return colors[3];
            }
        }
        
    }

    const renderedColors = colors.reduce((acc, obj) =>
        acc = acc + "," + obj)
    
    return (
        <div className={"listComponent " + (props.showCityList ? "isOpen" : "")}>

            <IconBtn className={("toggleIcon ") + (props.showCityList && "closeIcon")} icon={props.showCityList ? closeIcon : listIcon} onClick={reduceList}></IconBtn>


            {props.showCityList && featureList && featureList.length >0 && loadLimite &&
                <div className="visibleList">
                
                    <IconBtn className="listOrder" icon={orderList === "+" ? sortDscIcon : sortAscIcon} onClick={() => orderList === "+" ? setOrderList("-") : setOrderList("+")}></IconBtn>

                    <SearchInput arraySource={featureList} returnedArray={(elem) => setFilteredList(elem)}></SearchInput>


                    <div className="list">
                        {

                            filteredList.slice(0, loadLimite).map((elem, index) =>

                                <div className={"city " + ((elem.properties === props.activeFeature) ? "selected" : "")} key={index}
                                    onClick={() => {
                                        props.onClickFeature(elem, index);

                                    }}

                                >
                                    <div className="cityName">  {capitalize(elem.properties.city_name)}  - {elem.properties.codePostal}</div>
                                    <div className="infobyCity">
                                        { (props.displayedInfo=="estimation2") &&
                                            <p>Prix du m² à 2 ans : <span style={{color:getColor(props.displayedInfo,elem.properties[props.displayedInfo])}}>{elem.properties[props.displayedInfo] > 0 ? "+"+elem.properties[props.displayedInfo]:elem.properties[props.displayedInfo]}%</span></p>
                                        }
                                        { (props.displayedInfo=="estimation5") &&
                                            <p>Prix du m² à 5 ans : <span style={{color:getColor(props.displayedInfo,elem.properties[props.displayedInfo])}}>{elem.properties[props.displayedInfo] > 0 ? "+"+elem.properties[props.displayedInfo]:elem.properties[props.displayedInfo]}%</span></p>
                                        }

                                        {/* <JaugeBar colors={renderedColors} point={elem.properties[props.displayedInfo]} ></JaugeBar> */}
                                    </div>
                                </div>)

                        }{(loadLimite <= filteredList.length) &&
                            <div className="showMore" onClick={() => setLoadLimite(loadLimite + 100)}>voir plus </div>}
                    </div>
                </div>
            }

        </div>
    )

}
export default CityList;