import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import succes from '../../img/success-35.png'
const Pagoerror = () => {



  return (
    <div className='succes-pay'>
    <div className='center-succes'>
    <h2>Pago Exitoso</h2>
    <p>El pago se ha realizado de manera exitosa.</p>
    <img className='img2' src={succes}></img>
    <br/>
    <Link to="/"><button className='btndata'>Ir al Inicio</button></Link>
  </div>
  </div>
  );
};

export default Pagoerror;
