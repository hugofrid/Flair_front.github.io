import React from 'react';
import './Header.scss'
import { flairIcon } from '../../icons/icons.js'
import Helper from '../helper/Helper'

function Header() {

    return ( <header className="head">
    <img className="sizeLogo" src={flairIcon} alt="logo"/> 
        <div className="title">Investissez le futur</div>
        <Helper className="help"></Helper>
  </header>)
};
export default Header;