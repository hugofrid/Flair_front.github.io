import React, {Component, useState, useEffect} from 'react';
import "./Search.css";
import search from "../../icons/search.png";
import elem from "../../datasets/mapLayer.js";

function Search () {

    //contenu de recherche
    const [input, setInput] = useState("");
    const regex = new RegExp(input+".*", 'gi');

    //contenu de features
    const JSONString= elem;
    const featString = JSON.stringify(JSONString.features, null, "\t");

    //a utiliser pour la liste deroulante
    //const [list, setList] = useState("");

    function handleNameChange(e) {
        setInput(e.target.value);
      }

    function searchTown() {

        //alert("features :"+featString);

        //donne la correspondance de l'input avec le JSON  
        const resultString = featString.match(regex);

        if (regex.test(featString)===false)
        {
            alert ("Aucune ville ne correspond à votre recherche");
        } else alert("Les villes qui correpondent :" +resultString);
       
    }
    
    return (
    <div>
    <div className="wrap">
        <input type="text" className="searchTerm" placeholder="Rechercher le nom d'une ville ?" onChange={handleNameChange}/>
            <button className="searchButton" type="submit" onClick={searchTown}> 
            <img className="icon" src={search}/>
            </button>
    </div>
    </div>
    )

}
export default Search;
