import React, {Component} from 'react';
import "./Search.css";
// Navigation/Navigation.js
function Search() {

    /*function recherche(){
        var t = document.getElementsByClassName("typeahead")[0].value; 
        var tb = document.getElementsByClassName("ulaffiche")[0].children ;
        
        for(var i=0; i<tb.length;i++){
            if (t.toUpperCase()!= null && t.toUpperCase() != ""  && tb[i].textContent.toUpperCase().indexOf(t.toUpperCase()) == -1){
            }
    };*/

    return (
        <div>
<form>
    <input className="search" type="text" name="search" onfocus="if(this.value=='Rechercher...')this.value=''" onblur="if(this.value=='')this.value='Rechercher...'" />
    <button className="button">Rechercher</button>
</form>
        </div>
    )
}
export default Search;