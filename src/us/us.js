
import './us.css';
import "bootstrap/dist/css/bootstrap.css"
import React, { useEffect, useRef } from 'react';
import "aos/dist/aos.css"
import Aos from 'aos';

import 'bootstrap';
import imgbanner from "../img/banner-us.png"
import logo from "../img/logo.png"
import { FaShoppingCart } from 'react-icons/fa';
function Us() {


  useEffect(() => {

    Aos.init({ duration: 2000 })
  }, []);
  return (
    <div>

<div class="container">
        <img src="https://images.unsplash.com/photo-1625559903883-e05f17c4b638?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="Imagen" className='image-left'/>
        <div class="texto-superpuesto">
            <p>Año 2006:   Dos parejas de esposos, inician un proyecto que consistía en suplir a los clientes de empresas transformadoras de acero inox y que necesitan productos complementarios para elaborar sus proyectos.
                  Iniciamos en el garaje de una casa con el apoyo de un distribuidor de abrasivos quien confió en nosotros y nos guio para emprender este lindo camino.<br />

                  Año 2008: Nos trasladamos al barrio San Nicolás y en un local muy pequeño fuimos creciendo nuestro punto de venta y nuestros vendedores externos fueron creando fidelidad y fortaleciendo nuestros clientes de la industria.<br />

                  Año 2014: Nos trasladamos al punto actual, ubicado en la Cl 24 # 1 – 10, al lado de Colombina y que ha sido un lugar que nos ha permitido ir creciendo y fortaleciendo el comercio en el sector, hemos adquirido distribuciones de productos muy posicionados a nivel mundial..<br />

                  Año 2020: En plena pandemia iniciamos un cambio muy importante y favorecedor, a raíz de la salida de dos de los socios de la empresa.  Nos fortalecimos como compañía y día a día seguimos fidelizando clientes.<br />

                  Año 2022:  Iniciamos nuestras importaciones de accesorios en acero inoxidable y a la fecha estamos alcanzando un posicionamiento a la par de grandes empresas que llevan muchos años en este ramo.<br />

                  Año 2023: Iniciamos importación de soldaduras especiales y esperamos poder ayudar a la industria a conseguir productos de calidad y a un precio justo.<br />
                </p>
        </div>


    </div>
    

      <div class="row">


        <div class="col-md-6 " data-aos="fade-up">
      
          <div className='pad'>
            
            <div className='center'>
              <h2 class="news">Visión</h2>

              <span >Ser la empresa número uno en la distribución de productos para quienes trabajen metalmecánica y especialmente acero inoxidable. Convertirnos en grandes importadores de productos de excelente calidad.</span>
            </div>
          </div>
          
        </div>
        <div class="col-md-6 " data-aos="fade-up">
          <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" id="noticia1" alt="Apple Computer" />
        </div>


      </div>
      <br /><br />
      <div class="row">



        <div class="col-md-6 " data-aos="fade-up">
          <img src="https://images.unsplash.com/photo-1516216628859-9bccecab13ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80 " id="noticia1" alt="Apple Computer" />
        </div>
        <div class="col-md-6 " data-aos="fade-up">
        <br/> <br/> <br/> <br/>
          <div className='pad'>
           
            <div className='center'>
              <h2 class="news">Misión</h2>

              <span >Ser un aliado estratégico para la pequeña, mediana empresa y gran industria, en toda Colombia, que trabaje los metales y especialmente el acero inoxidable. Ayudar a quienes inician en su proceso como empresa metalmecánica y fortalecernos en conjunto.</span>
            </div>
          </div>
        </div>

      </div>



      <br />


    </div>
  );
}

export default Us;
