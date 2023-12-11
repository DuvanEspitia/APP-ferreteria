import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './shop.css'
import { useParams } from 'react-router-dom';
import Global from '../varibleBackend/Global';
import { ShopContext } from '../context/shop-context';
function ProductComplete() {
    const [Nom_prodct, setNom_prodct] = useState('');
    const [codigo,setCodigo] =useState()
    const [dataselect, setDataSelect] = useState('');
    const [Marca_prodct, setMarca_prodct] = useState('');
    const [Dimensiones_prodct, setDimensiones_prodct] = useState('');
    const [image, setImage] = useState(null);
    const [id, setId] = useState('')
    const [price,setPrice] = useState('')
    const [nombre,setNombre] = useState();
    const params = useParams()
 
    const [dataInventarios,setDataInventario] = useState('')
    const { addToCart2,cartItems } = useContext(ShopContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post( Global.url +"/api/inventario/obtenerdataproducto", { idinventarios: params.id });
                console.log(response)
                 const dataInvetario = response.data
                 setDataInventario(dataInvetario)
                setNom_prodct(dataInvetario.Nom_prodct)
                setMarca_prodct(dataInvetario.Marca_prodct)
                setDimensiones_prodct(dataInvetario.Dimensiones_prodct)
                setImage(dataInvetario.image)
                setId(dataInvetario.idinventarios);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    console.log(dataInventarios)
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get( Global.url +`/api/caracteristicas/consultarcaracteristicas/${dataInventarios.idinventarios}`);
            setDataSelect(response.data);
            
            // Configuramos el precio inicial al cargar los datos
            if (response.data.length > 0) {
              setPrice(response.data[0].precio);
              setCodigo(response.data[0].codigo);
            }
          } catch (error) {
            console.error("Error al obtener categorías:", error);
          }
        };
        fetchCategories();
      }, [dataInventarios.idinventarios]);
    const handleSelectChange = (e) => {
        const selectedPrice = e.target.value;
        const selectedCodigo = e.target.options[e.target.selectedIndex].dataset.codigo;
        const selectednombre = e.target.options[e.target.selectedIndex].dataset.nombre;
        setPrice(selectedPrice);
        setNombre(selectednombre)
        setCodigo(selectedCodigo);
      };
    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;

        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);
    }
     // Función para contar la cantidad de veces que aparece un id en el carrito
  const countItemInCart = (itemId) => {
    let count = 0;
    for (const key in cartItems) {
        if (cartItems[key].product.idinventarios  === itemId) {
           count= cartItems[key].quantity
        }
    }
    return count;
};

  let itemId = dataInventarios.idinventarios
  const cartItemAmount = countItemInCart(itemId);
  console.log(cartItemAmount)
    return (

        <div className='blog-c-admin'>
            <div className='row'>

                <div className='centrar'><h2 class="title"> {Nom_prodct}</h2></div>
                <div className='col-md-6'>

                    <div className='edi-img-conta'>
                        {image && (
                            <img
                                className='img-p-c'
                                src={`data:image/jpeg;base64,${image}`}
                                alt="Imagen de blog"
                            />
                        )}

                    </div>
                </div>
                <div className='col-md-6'>
                    <br />
                    <div class="p-content">

                        <h5 className='title'>Nombre producto</h5>
                        <span className='t-content'>{Nom_prodct}</span>
                        <h5 className='title'>Marca producto</h5>
                        <span className='t-content'>{Marca_prodct}</span>
                        <h5 className='title'>Características</h5>
                        <span className='t-content'>{Dimensiones_prodct}</span>

                        <h5 className='title'> Precio $</h5>
                        <span className='t-content'>{price}</span>




                    </div>
                    <div className="description1">
                    <h5 className='title'>
            Tamaños
        </h5>
        <div >
          <select
            className="title-new1"
            onChange={(e) => handleSelectChange(e)}
          >
            {dataselect &&
              dataselect.map((dataselect) => (
                <option key={dataselect.idcategoria} value={dataselect.precio} data-codigo={dataselect.codigo} data-nombre={dataselect.nombre}>
                  {dataselect.nombre}
                </option>
              ))}
          </select>  </div>
       
      </div>
      <div>
        <button className="addToCartBttn" onClick={() => addToCart2(dataInventarios,price,codigo,nombre)}>
          Añadir al carro{cartItemAmount > 0 && <> ({cartItemAmount})</>}
        </button>
                </div>


          
        </div>
        </div>
        </div>
    );
}

export default ProductComplete;
