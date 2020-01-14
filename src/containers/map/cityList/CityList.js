import React, { useState } from 'react';
import './CityList.css'
import { capitalize } from '../../../pipes/stringpipe.js'
import IconBtn from '../../../componants/iconBtn/iconBtn.js';
import { closeIcon,listIcon } from '../../../icons/icons.js'


function CityList(props) {

    const sortByCityName = (a, b) => {
        if (a.properties.city_name < b.properties.city_name)
           return -1;
        if (a.properties.city_name > b.properties.city_name)
           return 1;
        return 0;
    }
    
    const sortFeatures = (featureList, order) => {
        console.log(featureList)

        let list = [];
        featureList.map(elem => {
            if (!list[elem.properties.estimation5]) {
               list[elem.properties.estimation5] = []
            }
            list[elem.properties.estimation5].push(elem)
           
        })
        // const list = featureList.reduce((accumulator, object) => {

        //     let featureEstimation = object.properties.estimation5;


        //     if (!accumulator[featureEstimation]) {
        //         accumulator[featureEstimation] = []
        //     } 
        //     accumulator[featureEstimation] = [...accumulator[featureEstimation],object]
        //     return accumulator;

        // })
        console.log(list)
        list.forEach(elem => elem.sort(sortByCityName));
        console.log(list[0], list[9]);
        let arrayList;
        if (order === '-') {
             arrayList = list.reduce((accumulator,object) =>   accumulator = [...accumulator,...object])
        }
        if (order === '+') {
            
             arrayList = list.reverse().reduce((accumulator,object) => accumulator = [...accumulator,...object])
        }
        return arrayList;
    }


    const [isOpen, setIsOpen] = useState(false);
    const [loadLimite, setLoadLimite] = useState(100);
    const [featureList, setFeatureList] = useState(sortFeatures(props.features, '+'));


    const reduceList = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={"listComponent " + (isOpen ? "isOpen" : "")}>
            <IconBtn className="toggleIcon" icon={isOpen ? closeIcon : listIcon} onClick={reduceList}></IconBtn>
            {isOpen ?
                <div className="list">
                    <div>List</div>
                </div>
                : null
            }

        </div>
    )

}
export default CityList;