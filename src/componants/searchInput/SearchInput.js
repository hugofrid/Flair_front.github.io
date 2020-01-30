import React, {useState, useEffect} from 'react';
import "./SearchInput.css";
import { searchIcon } from "../../icons/icons.js";

function SearchInput (props) {
    const [input, setInput] = useState("");
    function handleNameChange(e) {
        setInput(e.target.value);
       
        
    }

    useEffect(() => {
        if (props.arraySource) {

            const filtered = _filter();
            props.returnedArray(filtered)
        }
        else return props.arraySource
    },[input])
    
    const _filter = () => {
        
        
        const filteredArray = props.arraySource.filter(elem => {
            const cityName = (elem.properties.city_name).toLowerCase().replace(/-/gi, ' ');
            return cityName.includes(input.toLowerCase().replace(/-/gi, ' ')) || elem.properties.codePostal.includes(input)
        } 
        ) 
        
        return filteredArray
     }    
    return (
    <div>
    <div className="wrap">
                <input type="text" className="searchTerm" placeholder="Ville, Code postal... " onChange={handleNameChange}/>
            <button className="searchButton" type="submit" > 
            <img className="icon" src={searchIcon}/>
            </button>
    </div>
    </div>
    )

}
export default SearchInput;