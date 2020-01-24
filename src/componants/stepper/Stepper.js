import React from 'react';
import './Stepper.scss'

function Stepper(props) {
    return (
        <div className="stepContainer">
            <div className={"step " + (props.activeStep === 0 ? 'active' : "") + (props.activeStep > 0 ? " passed" : "")}>1</div>
            <div className="progressionBar">
                <div className="fullBar" style={{'flex':(props.activeStep/(props.steps-1))}}></div>
                <div className="dashedBar" style={{'flex':((props.steps-props.activeStep-1)/(props.steps-1))}}></div>
            </div>
            {
                Array.from(Array(props.steps - 1), (e, i) => {
                    return (   
                     
                        <div key={i} className={"step " + (props.activeStep === i+1 ? 'active' : "") + (props.activeStep > i+1 ? " passed" : "")}>{i + 2}</div>
                    )
                    
                })
            }

        </div>
    )
}
export default Stepper;