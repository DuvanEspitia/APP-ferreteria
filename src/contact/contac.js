
import './contac.css';
import "bootstrap/dist/css/bootstrap.css"
import React, { useEffect, useRef,useState } from 'react';
import "aos/dist/aos.css"
import Aos from 'aos';
import 'bootstrap';
import emailjs from '@emailjs/browser';
function Contac() {
  const [aceptoPoliticas, setAceptoPoliticas] = useState(false);
  const handleAceptoPoliticasChange = () => {
    setAceptoPoliticas(!aceptoPoliticas);
  };
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_cq50l78', 'template_hgbn7mi', form.current, 'tdRMMd7GoT9K23CQq')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset()
  };

  useEffect(() => {

    Aos.init({ duration: 2000 })
  }, []);
  return (
    <div>


      <br /><br />


      <blockquote class="blockquote text-center">
        <h1 class="news" id='contacto' data-aos="fade-up">Colocar información para contactarnos contigo</h1>

      </blockquote>

      <div class="contac">
        <div className='form' data-aos="fade-up">


          <div className='center'>
            <form ref={form} onSubmit={sendEmail} className='form-controller'>
              <input class="text" name='from_name' type='text' placeholder='Nombre completo' />
              <input class="text" type='text' name='correo' placeholder='Correo electronico' />
              <input class="text" type='number' name='telefono' placeholder='Numero de telefono' />
              <textarea class="textm" name='message' type="text" placeholder='Mensaje' />
              <div>

                <label>
                  <div className='centrar-managedatas'>
                    <b>
                      <input
                        type="checkbox"
                        onChange={handleAceptoPoliticasChange}
                      />
                      Acepto las políticas de manejo de datos
                    </b>
                  </div>
                  <a href="https://gobiernodigital.mintic.gov.co/portal/Secciones/Politicas-de-privacidad/">Ver más</a>
                </label>
              </div>
              <button type='submit' class="btn btn-success" disabled={!aceptoPoliticas}>Enviar</button>
            </form>
          </div>




        </div>
        <div className='map' data-aos="fade-up">


          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15930.187013940606!2d-76.5228335!3d3.4597208!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a641a080e2cd%3A0xcff2a8bf9872f50!2sABC%20Comercializadora%20Industrial%20S.A.S!5e0!3m2!1ses!2sco!4v1696960283416!5m2!1ses!2sco"
            className='mapa' style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>


        </div>


      </div>
      <br></br>
      <div className='datac'>
        <div class="row">
          <div class="col-md-3" >
            <p className='correos'>Correo:<br />ventas@abccomercializadoraindustrial.com<br />
              abccomerin@hotmail.com<br />
            </p>
          </div>
          <div class="col-md-3" >

            <p >Telefono: <br /> (+57) 316 448 49 63  <br />(+57)  316 744 47 37  <br />(+57) 316 744 47 40
            </p>
          </div>
          <div class="col-md-3" >
            Dirección: <br />  Cl. 24 #1-10, COMUNA 3, Cali, Valle del Cauca
          </div>
          <div class="col-md-3" >
            Horario:<br /> Lunes a viernes a 8:00 am a 5:00 pm  <br />sabados de 8 a 1pm
          </div>

        </div>
      </div>


    </div>
  );
}

export default Contac;
