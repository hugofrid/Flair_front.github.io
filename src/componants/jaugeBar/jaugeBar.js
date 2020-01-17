import React, { useState } from 'react';
import './jaugeBar.css';

function JaugeBar({colors, point}) {

    

    const bar = {
        background:"linear-gradient(to right," + colors + ")",
        height: "12px",
        marginTop:"5px",
        width: "90%",
        marginBottom: "5px",
        position: 'relative',
        borderRadius: '6px',
        margin:'auto'
        
    }

    const pointPosition = {
        position: "absolute",
        left: ((point)*100/9) + "%",
        top: "50%",
        height: "18px",
        width: "18px",
        borderRadius: "50%",
        background:"black",
        transform: "translate(-50%,-50%)"
    }
    return (
        <div className="jaugeBar"  style={bar}> 
            <div className="point" style={pointPosition} />
        </div>
    )
}
export default JaugeBar