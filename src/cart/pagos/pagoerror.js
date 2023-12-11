import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import False from '../../img/false.png';
const PagoExitoso = () => {



  return (
    <div className='succes-pay'>
    <div className='center-succes'>
    <h2>Pago Rechazado</h2>
    <p>El pago no se pudo realizar de manera exitosa.</p>
    <img className='img3' src={False}></img>
    <br/>
    <Link to="/"><button className='btndata'>Ir al Inicio</button></Link>
  </div>
  </div>
  );
};

export default PagoExitoso;
