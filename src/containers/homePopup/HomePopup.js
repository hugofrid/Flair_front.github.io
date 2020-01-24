import React, { useState } from 'react'
import './HomePopup.scss';
import FlairButton from '../../componants/flairButton/FlairButton';
import { flairIcon } from '../../icons/icons.js';
import Stepper from '../../componants/stepper/Stepper.js'



function HomePopup(props) {

  const [step, setStep] = useState(0)



  const  StepDescritpion = ()=> {
    switch (step) {
      case 0: {
        return <p>Flair est une application qui vous permet d'investir à l'aide  d'une carte de l'Île de France en constante mutation. <br/><br/> Elle analyse et trouve pour vous les villes pour lesquelles l’investissement sera le plus rentable.</p>
      }
      case 1: {
        return <p>Les informations que vous trouverez proviennent des données démographiques, des tendances du marché et des futurs projets d’aménagement urbains. <br/> <br/>
        Ces information passe par notre algorithme, qui calcule pour vous les zones avec les meilleures rentabilité.</p>
      }
      case 2: {
        return <p>Chaque ville possède un pourcentage de rentabilité. Vous pouvez accédez aux informations détaillées par ville pour comprendre plus en profondeur la provenance de nos résultats.<br/><br/> Bon Flairage !</p>
       
      }
      default: {
        console.log(step, 'step ');
        return null;
      }
    }
  }



  return (

    <div className="popupWindow">
      <div className="popup">
        <div className="logoSpace">
          <img className='flairLogo' src={flairIcon}></img>
        </div>
        <Stepper steps={3} activeStep={step}></Stepper>
        <h2>Bienvenu sur Flair !</h2>

        <div className="description">
          <StepDescritpion />
        </div>

        <div className="buttonSpace">
          <FlairButton  className={step===0 ? 'disabled' : 'secondary'} onClick={() => step > 0 ? setStep(step-1) : null}>Retour</FlairButton>
          <FlairButton className="primary" onClick={() => step === 2 ? props.goToNav() : setStep(step+1)}>{step === 2 ? 'Commencer !' : 'Suivant'}</FlairButton>
        </div>


        <div className="prevention">
          Prévention car prévision dans un astérisque en bas !! Notre outil vous aiguille mais puisqu’il s’agit de prédiction et malgré la forte fiabilité de notre algorithme, nous ne pouvons pas garantir 100% de fiabilité
      </div>
      </div>

    </div>
  );
}
export default HomePopup;