
import './nav.css';
import "bootstrap/dist/css/bootstrap.css"
import React, { useContext } from 'react';
import { ShopContext } from "../context/shop-context";
import { Link } from 'react-router-dom';
import "aos/dist/aos.css"
import 'bootstrap';
import whataspp from "../img/w.png";
import facebook from "../img/f.png";
import instagram from "../img/i.png";
import logo from "../img/logo.png"
import { FaShoppingCart } from 'react-icons/fa';

function Navbar() {
  const { cartItems } = useContext(ShopContext);

  // Calcular la cantidad total de artículos en el carrito
  const totalItemsInCart = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);


  return (

    <div>

      <nav class="navbar fixed-top navbar-expand-lg">

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <img className='logo' src={logo}></img>
          <ul class="navbar-nav  mx-auto justify-content-end">

            <li class="nav-item active">
              <Link class="nav-link" to="/">INICIO </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/tienda">PRODUCTOS</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/home-blog">BLOG</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/us">NOSOTROS</Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" to="/Contacto"> CONTACTO </Link>
            </li>
       
        
            {/* ...Otras opciones de navegación */}
            <li className="nav-item centrar">
              <Link className='deco' to="/cart">
                <FaShoppingCart className="i-shop" />
                {totalItemsInCart > 0 && (
                  <span className="item-count">{totalItemsInCart}</span>
                )}
              </Link>
            </li>
      



          </ul>

        </div>
        <div id='delegar' fill="currentColor" >
          <a href='https://instagram.com/abccomercializadoracali?igshid=MzRlODBiNWFlZA=='>
            <img className='i1' src={instagram}></img>
          </a>
        </div>

        <div id='delegar1' fill="currentColor" >
          <a href='https://www.facebook.com/profile.php?id=100064148280604'>
            <img className='i2' src={facebook}></img>
          </a>
        </div>
        <div id='delegar2' fill="currentColor" >
          <a href='https://wa.link/7r6ra8'>
            <img className='i3' src={whataspp}></img>
          </a>
        </div>
      </nav>

    </div>
  );
}

export default Navbar;
