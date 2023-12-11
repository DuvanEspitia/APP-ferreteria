import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../src/home/home"

import Shomeblog from './blog/shomeblog';
import Us from './us/us';
import Contac from './contact/contac';
import Navbard from './navbard/navbar';
import Footer from "./navbard/footer";
import { Shop } from './shop/shop';
import { ShopContextProvider } from './context/shop-context';
import { Cart } from './cart/cart';
import Blogmanager from './blog/blogmanager';
import Inventario from './cart/administracion/inventario';
import Editarinvetario from './cart/administracion/editarinvetario';
import EditarB from './blog/editar';
import ProductComplete from './shop/productComplete';
import Blogcomplete from './blog/blogcomplete';
import CustomerInfoForm from './cart/infocliente/CustomerInfoForm';
import PagoExitoso from './cart/pagos/pagoexitoso';
import Pagoerror from './cart/pagos/pagoerror';
function App() {

  return (
    <div className="app-wrapper">
      <ShopContextProvider>
        <Router>
          <Navbard />
          <div className="content">
            <Routes>
              <Route path='/' element={<Home />} exact/>
              <Route path='/blog-m' element={<Blogmanager />} exact/>
              <Route path='/home-blog' element={<Shomeblog />} exact/>
              <Route path='/us' element={<Us />} />
              <Route path='/Contacto' element={<Contac />} exact/>
              <Route path='/tienda' element={<Shop />} exact/>
              <Route path='/cart' element={<Cart />} exact/>
              <Route path='/Gestion-inventario' element ={<Inventario/>} exact/>
              <Route path='/editarInventario/:id' element={<Editarinvetario/>} exact/>  
              <Route path='/productComplete/:id' element={<ProductComplete/>} exact/>
              <Route path='/blogcomplete/:id' element={<Blogcomplete/>} exact/>
              <Route path='/editarBlog/:id' element={<EditarB/>} exact/>
              <Route path='/compra/datos' element={<CustomerInfoForm/>} exact/>
              <Route path='/PagoExitoso' element={<PagoExitoso/>} exact/>
              <Route path='/Pagoerror' element={<Pagoerror/>} exact/>
            </Routes>
          </div>
          <Footer />
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;