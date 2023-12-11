import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/shop-context";
import { Link } from "react-router-dom";
import axios from "axios";
import Global from "../varibleBackend/Global";
export const Product = ({ product }) => {
  const { addToCart2, cartItems } = useContext(ShopContext);
  const [dataselect, setDataSelect] = useState('');
  const [price, setPrice] = useState(''); // Inicializamos price como una cadena vacía
  const [codigo,setCodigo] =useState()
  const [nombre,setNombre] = useState('')
  
  // Función para contar la cantidad de veces que aparece un id en el carrito
  const countItemInCart = (itemId) => {
    let count = 0;
    for (const key in cartItems) {
      if (cartItems[key].itemId === itemId) {
        count = cartItems[key].quantity;
      }
    }
    return count;
  };
  const handleSelectChange = (e) => {
    const selectedPrice = e.target.value;
    const selectedCodigo = e.target.options[e.target.selectedIndex].dataset.codigo;
    const selectedNombre = e.target.options[e.target.selectedIndex].dataset.nombre;
    setNombre(selectedNombre);
    setPrice(selectedPrice);
    setCodigo(selectedCodigo);
  };
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get( Global.url +`/api/caracteristicas/consultarcaracteristicas/${product.id}`);
        setDataSelect(response.data);
        
        // Configuramos el precio inicial al cargar los datos
        if (response.data.length > 0) {
          setPrice(response.data[0].precio);
          setCodigo(response.data[0].codigo);
          setNombre(response.data[0].nombre);
        }
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategories();
  }, [product.id]); // Agregamos product.id como dependencia

  const cartItemAmount = countItemInCart(product.id);
  return (
    <div className="product">
      {product.image && (
        <img
          className="img"
          src={`data:image/jpeg;base64,${product.image}`}
          alt="Imagen de producto"
        />
      )}
      <div className="description1">
        <p>
          <b>{product.Nom_prodct}</b>
        </p>
        <p>${price}</p>
        <div className="center">
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
          </select>
        </div>
      </div>
      <div className="centrar">
        <button className="addToCartBttn" onClick={() => addToCart2(product,price,codigo,nombre)}>
          Añadir al carro{cartItemAmount > 0 && <> ({cartItemAmount})</>}
        </button>
        <Link className="descrep" to={`/productComplete/${product.id}`}>
          <button className="addToCartBttn">Ver más</button>
        </Link>
      </div>
    </div>
  );
};
