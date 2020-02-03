import React, { useState } from 'react'
import './HomePopup.scss';
import FlairButton from '../../componants/flairButton/FlairButton';
import { flairIcon } from '../../icons/icons.js';
import Stepper from '../../componants/stepper/Stepper.js'
import { tuto1,tuto2,tuto3 } from '../../images/images.js';



function HomePopup(props) {

  const [step, setStep] = useState(0)



  const  StepDescritpion = ()=> {
    switch (step) {
      case 0: {
        return <p className="textTuto">Flair est une application qui vous aiguille dans vos investissements grâce à une carte de l'Ile-de-France.<br/> Elle trouve pour vous les villes pour lesquelles l’investissement sera le plus rentable. Et vous affiche cette rentabilité selon un code couleur.</p>
      }
      case 1: {
        return <p className="textTuto">En cliquant sur une ville, vous trouverez des informations provenant des données démographiques, des tendances du marché et des futurs projets d’aménagement urbain.<br/> 
        Ces informations passent par notre algorithme, qui calcule pour vous les zones avec les meilleures rentabilités.</p>
      }
      case 2: {
        return <p className="textTuto">Chaque ville possède un pourcentage de rentabilité. Vous pouvez accéder aux informations détaillées par ville pour en savoir davantage.<br/><br/>Bon Flairage !</p>
       
      }
      default: {
        return null;
      }
    }
  }


  const TutoScreen = () => {
    switch (step) {
      case 0: {
        return <img src={tuto1} alt="tutoriel screen" /> 
        ;
      }
      case 1: {
        return<img src={tuto2} alt="tutoriel screen" /> 

      }
      case 2: {
         return<img src={tuto3} alt="tutoriel screen" /> 
 
      }
      default: {
        return null;
      }
    }
  }



  return (

    <div className="popupWindow">
      <div className="popup">
        <div className="logoSpace">
          <img className='flairLogo' src={flairIcon} />
        </div>
        <Stepper steps={3} activeStep={step}></Stepper>
        <h2>Bienvenue sur Flair !</h2>

        <div className="description">
          <StepDescritpion />
          <div className="tutoScreen">
              <TutoScreen/>
          </div>
        </div>

        <div className="buttonSpace">
          <FlairButton  className={step===0 ? 'disabled' : 'secondary'} onClick={() => step > 0 ? setStep(step-1) : null}>Retour</FlairButton>
          <FlairButton className="primary" onClick={() => step === 2 ? props.goToNav() : setStep(step+1)}>{step === 2 ? 'Commencer !' : 'Suivant'}</FlairButton>
        </div>


        <div className="prevention">
          Attention : Notre outil vous aiguille mais puisqu’il s’agit de prédictions, et malgré la forte fiabilité de notre algorithme, nous ne pouvons pas garantir 100% de fiabilité.
      </div>
      </div>

    </div>
  );
}
export default HomePopup;