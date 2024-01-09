
import '../home/home.css';
import "bootstrap/dist/css/bootstrap.css"
import React, { useEffect, useRef } from 'react';
import "aos/dist/aos.css"
import Aos from 'aos';

import 'bootstrap';
import homeim1 from "../img/b1.png";
import homeim2 from "../img/b2.png";
import homeim3 from "../img/b3.png"

//importaciones logos
import logo1 from "../img/logo-marca-dewall.png"
import logo2 from "../img/logo-marca-einhell.png"
import logo3 from "../img/logo-marca-metabo.jpg"
import logo4 from "../img/logo-marca-milwanke.jpg"
import logo5 from "../img/logo-marca-staley.png"
//importacion cateogiras
import c1 from "../img/soldauira22.png"
import c2 from "../img/acero.png"
import c3 from "../img/abrasivos.jpg"
import c4 from "../img/productos.png"

//en acero inoxidable carrousel
import a2 from "../img/1.jpg"
import a3 from "../img/2.jpg"
import a4 from "../img/3.jpg"
import a5 from "../img/4.jpg"
import a6 from "../img/5.jpg"
import a7 from "../img/6.jpg"
import a8 from "../img/7.jpg"
//de importacion
import i1 from "../img/8.jpg"
import i2 from "../img/9.jpg"
import i3 from "../img/10.png"
import i4 from "../img/11.jpg"
import i5 from "../img/12.jpg"
import i6 from "../img/13.jpg"
import i7 from "../img/144.jpg"
import i8 from "../img/acero.png"
import i9 from "../img/productos/2.jpg"


import { Link, useNavigate } from "react-router-dom";
function Home() {

  let navigate = useNavigate();
  const routeShop = (categoryId) => {
    navigate(`/tienda?category=${categoryId}`);
  };

  useEffect(() => {

    Aos.init({ duration: 2000 })
  }, []);
  return (
    <div>

      <br />

      <div id="carouselExampleControls22" class="carousel slide" data-bs-ride="carousel" data-aos="fade-up">
        <div class="carousel-inner how-img">
          <div class="carousel-item active">
            <div className="content">
              <img src={homeim1} className='pro' alt="..." />
            </div>
          </div>
          <div class="carousel-item">
            <div className="content">
              <img src={homeim2} className='pro' alt="..." />
            </div>
          </div>
          <div class="carousel-item">
            <div className="content">
              <img src={homeim3} className='pro' alt="..." />
            </div>
          </div>


        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls22" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls22" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <br /><br /><br /><br /><br />

      <div id="carouselExampleControls01" class="carousel slide" data-bs-ride="carousel" data-aos="fade-up">
        <div class="carousel-inner how-img">
          <div class="carousel-item active">
            <div className="products1">

              <img class="d-block w-50" src={logo1} className='marca0' alt="..." />


              <img class="d-block w-50" src={logo2} className='marca1' alt="..." />

              <img class="d-block w-50" src={logo3} className='marca' alt="..." />


              <img class="d-block w-50" src={logo4} className='marca2' alt="..." />

              <img class="d-block w-50" src={logo5} className='marca3' alt="..." />



            </div>
          </div>
          <div class="carousel-item">
            <div className="products1">

              <img class="d-block w-50" src={logo1} className='marca0' alt="..." />


              <img class="d-block w-50" src={logo2} className='marca1' alt="..." />

              <img class="d-block w-50" src={logo3} className='marca' alt="..." />


              <img class="d-block w-50" src={logo4} className='marca2' alt="..." />

              <img class="d-block w-50" src={logo5} className='marca3' alt="..." />



            </div>
          </div>

        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls01" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls01" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <br /><br /><br />
      <div class="col-md-12 " >
        <div class="row">


          <div className='products12' >
            <div className='announcemnts' >
              <div className='center'>
                <img src={c2}
                  className='img-target2' alt='Accesorios inoxidables<' />
              </div>
              <div class="centrar">
                <Link to="/tienda?category=1">
                  <button className='b-yellow' >

                    <h5 class="titulo-anuncio">Accesorios inoxidables</h5>
                  </button>
                </Link>
              </div>

            </div>



            <div className='announcemnts' >
              <div className='center'>
                <img src={c1}
                  className='img-target2' alt='Soldadura' />
              </div>
              <div class="centrar">
                <Link to="/tienda?category=2">
                  <button className='b-yellow' >
                    <h5 class="titulo-anuncio">Soldadura</h5>
                  </button>
                </Link>
              </div>

            </div>
            <div className='announcemnts' >
              <div className='center'>
                <img src={c3}
                  className='img-target2' alt='Abrasivos' />
              </div>
              <div class="centrar">
                <Link to="/tienda?category=3">
                  <button className='b-yellow'>
                    <h5 class="titulo-anuncio">Abrasivos</h5>
                  </button>
                </Link>
              </div>

            </div>
            <div className='announcemnts' >
              <div className='center'>

                <img src={c4}
                  className='img-target2' alt='Herramienta especializada' />
              </div>
              <div class="centrar">
                <Link to="/tienda?category=3">
                  <button className='b-yellow'>
                    <h5 class="titulo-anuncio">Herramienta especializada</h5>
                  </button>
                </Link>
              </div>

            </div>

          </div>






        </div>
      </div>

      <span className='pc'>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" data-aos="fade-up ">
          <div class="carousel-inner">
            <div class="carousel-item active">

              <div className='products1' >
                <div className='product1' >
                  <div className='center'>
                    <img src={a2} className='img-target2' alt='Codo soldar inox' />
                  </div>
                  <div class="centrar">
                    <Link to="/tienda?category=1">
                      <button className='b-yellow'>
                        <h5 class="titulo-anuncio">Codo soldar inox</h5>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className='product1' >
                  <div className='center'>
                    <img src={a3} className='img-target'alt='Codos inox' />
                  </div>
                  <div class="centrar">
                    <Link to="/tienda?category=1">
                      <button className='b-yellow'>
                        <h5 class="titulo-anuncio">Codos inox</h5>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className='product1' >
                  <div className='center'>
                    <img src={a4} className='img-target' alt='Soporte inox' />
                  </div>
                  <div class="centrar">
                    <Link to="/tienda?category=1">
                      <button className='b-yellow'>
                        <h5 class="titulo-anuncio">Soporte inox</h5>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className='product1' >
                  <div className='center'>
                    <img src={a5} className='img-target' alt='Tapones inox' />
                  </div>
                  <div class="centrar">
                    <Link to="/tienda?category=1">
                      <button className='b-yellow'>
                        <h5 class="titulo-anuncio">Tapones inox</h5>
                      </button>
                    </Link>
                  </div>
                </div>






              </div>
            </div>
            <div class="carousel-item" >
              <div className="content"  >
                <div className='products1'  >
                  <div className='product1' >
                    <div className='center'>
                      <img src={a6} className='img-target' alt='Uniones inox' />
                    </div>
                    <div class="centrar" >
                      <Link to="/tienda?category=1">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio" >Uniones inox</h5>
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className='product1' >
                    <div className='center'>

                      <img src={a7} className='img-target' alt='Soporte vidrio inox' />

                    </div>
                    <div class="centrar">
                      <Link to="/tienda?category=1">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio">Soporte vidrio inox</h5>
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className='product1' >
                    <div className='center'>

                      <img src={a8} className='img-target'alt='Pasador inox' />

                    </div>
                    <div class="centrar">
                      <Link to="/tienda?category=1">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio">Pasador inox</h5>
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className='product1' >
                    <div className='center'>

                      <img src={i1} className='img-target' alt='Bisagras inox' />
                    </div>
                    <div class="centrar">
                      <Link to="/tienda?category=1">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio">Bisagras inox</h5>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button id='next' class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </span>
     
      <span className='pc'>
      <div id="carouselExampleControls1" class="carousel slide" data-bs-ride="carousel" data-aos="fade-up">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div className='products1' >
                <div className='product1' >
                  <div className='center'>
                    <img src={i2} className='img-target' alt='Bridas inox' />
                  </div>
                  <div class="centrar">
                    <Link to="/tienda?category=1">
                      <button className='b-yellow'>
                        <h5 class="titulo-anuncio">Bridas inox</h5>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className='product1' >
                  <div className='center'>

                    <img src={i3} className='img-target' alt='Te inox' />
                  </div>
                  <div class="centrar">
                    <Link to="/tienda?category=1">
                      <button className='b-yellow'>
                        <h5 class="titulo-anuncio">Te inox</h5>
                      </button>
                    </Link>
                  </div>
                </div>
             
                <div className='product1' >
                  <div className='center'>
                    <img src={i4} className='img-target' alt='Electrodo'/>
                  </div>
                  <div class="centrar">
                    <Link to="/tienda?category=2">
                      <button className='b-yellow'>
                        <h5 class="titulo-anuncio">Electrodo</h5>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className='product1' >
                  <div className='center'>
                    <img src={i5} className='img-target' alt='Tornillo' />
                  </div>
                  <div class="centrar">
                    <Link to="/tienda?category=9">
                      <button className='b-yellow'>
                        <h5 class="titulo-anuncio">Tornillo
                        </h5>

                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div class="carousel-item">
              <div className="content">
                <div className='products1' >
                  <div className='product1' >
                    <div className='center'>
                      <img src={i8} className='img-target' alt='Kit de baños' />
                    </div>
                    <div class="centrar">
                      <Link to="/tienda?category=1">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio">Kit de baños</h5>
                        </button>  </Link>   </div>
                  </div>
                  <div className='product1' >
                    <div className='center'>
                      <img src={i6} className='img-target' alt='Satinadoras' />
                    </div>
                    <div class="centrar">
                      <Link to="/tienda?category=3">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio">Satinadoras </h5>
                        </button>  </Link>   </div>
                  </div>
                
                  <div className='product1' >
                    <div className='center'>
                      <img src={i7} className='img-target' alt='Sabrá' />
                    </div>
                    <div class="centrar">
                      <Link to="/tienda?category=3">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio">Sabrá</h5>
                        </button>   </Link>  </div>
                  </div>
                  <div className='product1' >
                    <div className='center'>
                      <img src={i9} className='img-target' alt='Planta eléctricas' />
                    </div>
                    <div class="centrar">
                      <Link to="/tienda?category=10">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio">Planta eléctricas </h5>
                        </button>  </Link>   </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls1" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls1" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </span>
      <span className='cell'>
        <div id="carouselExampleControls2" class="carousel slide" data-bs-ride="carousel" data-aos="fade-up ">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div className='products1' >
                <div className='product1' >
                  <div className='center'>
                    <img src={a2} className='img-target2' />
                  </div>
                  <div class="centrar">
                    <Link to="/tienda?category=1">
                      <button className='b-yellow'>
                        <h5 class="titulo-anuncio">Codo soldar inox</h5>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className='product1' >
                  <div className='center'>
                    <img src={a3} className='img-target' />
                  </div>
                  <div class="centrar">
                    <Link to="/tienda?category=1">
                      <button className='b-yellow'>
                        <h5 class="titulo-anuncio">Codos inox</h5>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item" >
              <div className="content"  >
                <div className='products1' >
                  <div className='product1' >
                    <div className='center'>
                      <img src={a4} className='img-target' />
                    </div>
                    <div class="centrar">
                      <Link to="/tienda?category=1">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio">Soporte inox</h5>
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className='product1' >
                    <div className='center'>
                      <img src={a5} className='img-target' />
                    </div>
                    <div class="centrar">
                      <Link to="/tienda?category=1">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio">Tapones inox</h5>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="carousel-item" >
              <div className="content"  >
                <div className='products1'  >
                  <div className='product1' >
                    <div className='center'>
                      <img src={a6} className='img-target' />
                    </div>
                    <div class="centrar" >
                      <Link to="/tienda?category=1">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio" >Uniones inox</h5>
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className='product1' >
                    <div className='center'>

                      <img src={a7} className='img-target' />

                    </div>
                    <div class="centrar">
                      <Link to="/tienda?category=1">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio">Soporte vidrio inox</h5>
                        </button>
                      </Link>
                    </div>
                  </div>
                  </div>
                  </div>
                  </div>
             <div class="carousel-item" >
              <div className="content"  >
                <div className='products1'  >
                  <div className='product1' >
                    <div className='center'>

                      <img src={a8} className='img-target' />

                    </div>
                    <div class="centrar">
                      <Link to="/tienda?category=1">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio">Pasador inox</h5>
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className='product1' >
                    <div className='center'>

                      <img src={i1} className='img-target' />
                    </div>
                    <div class="centrar">
                      <Link to="/tienda?category=1">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio">Bisagras inox</h5>
                        </button>
                      </Link>
                    </div>
                  </div>   
                  </div> 
                  
                </div>
              </div>
           
          </div>
          <button id='next' class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls2" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls2" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </span>
      <span className='cell'>
        <div id="carouselExampleControls122" class="carousel slide" data-bs-ride="carousel" data-aos="fade-up">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div className='products1' >
                <div className='product1' >
                  <div className='center'>
                    <img src={i2} className='img-target' alt='Bridas inox' />
                  </div>
                  <div class="centrar">
                    <Link to="/tienda?category=1">
                      <button className='b-yellow'>
                        <h5 class="titulo-anuncio">Bridas inox</h5>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className='product1' >
                  <div className='center'>

                    <img src={i3} className='img-target' alt='Te inox' />
                  </div>
                  <div class="centrar">
                    <Link to="/tienda?category=1">
                      <button className='b-yellow'>
                        <h5 class="titulo-anuncio">Te inox</h5>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div className='products1' >
                <div className='product1' >
                  <div className='center'>
                    <img src={i4} className='img-target'alt='Electrodo' />
                  </div>
                  <div class="centrar">
                    <Link to="/tienda?category=2">
                      <button className='b-yellow'>
                        <h5 class="titulo-anuncio">Electrodo</h5>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className='product1' >
                  <div className='center'>
                    <img src={i5} className='img-target' alt='Tornillo' />
                  </div>
                  <div class="centrar">
                    <Link to="/tienda?category=9">
                      <button className='b-yellow'>
                        <h5 class="titulo-anuncio">Tornillo
                        </h5>

                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div class="carousel-item">
              <div className="content">
                <div className='products1' >
                  <div className='product1' >
                    <div className='center'>
                      <img src={i8} className='img-target' alt='Kit de baños' />
                    </div>
                    <div class="centrar">
                      <Link to="/tienda?category=1">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio">Kit de baños</h5>
                        </button>  </Link>   </div>
                  </div>
                  <div className='product1' >
                    <div className='center'>
                      <img src={i6} className='img-target' alt='Satinadoras' />
                    </div>
                    <div class="centrar">
                      <Link to="/tienda?category=3">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio">Satinadoras </h5>
                        </button>  </Link>   </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div className="content">
                <div className='products1' >
                  <div className='product1' >
                    <div className='center'>
                      <img src={i7} className='img-target' alt='Sabrá' />
                    </div>
                    <div class="centrar">
                      <Link to="/tienda?category=3">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio">Sabrá</h5>
                        </button>   </Link>  </div>
                  </div>
                  <div className='product1' >
                    <div className='center'>
                      <img src={i9} className='img-target' alt='Planta eléctricas'/>
                    </div>
                    <div class="centrar">
                      <Link to="/tienda?category=10">
                        <button className='b-yellow'>
                          <h5 class="titulo-anuncio">Planta eléctricas </h5>
                        </button>  </Link>   </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls122" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls122" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </span>
      <br />

      <br />
      




    </div>
  );
}

export default Home;
