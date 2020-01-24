import React from 'react';
import './FlairButton.scss'

function FlairButton(props) {

    return (<button className={'flairBtn '+ props.className} onClick={props.onClick}>
            {props.children}
    </button>)
}
export default FlairButton