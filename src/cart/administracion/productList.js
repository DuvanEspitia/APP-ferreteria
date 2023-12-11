import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Global from '../../varibleBackend/Global';
function ProductList({ dataInvetario }) {
  const [caracteristicas, setCaracteristicas] = useState([])
  const deleteCaracter = async (id) => {
    try {
      const response = await axios.delete( Global.url +`/api/caracteristicas/eliminarcarac/${id}`);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get( Global.url +"/api/caracteristicas/consultarcaracteristicas");
        setCaracteristicas(response.data);
       


      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategories();
  }, []); // Agregamos product.id como dependencia

  const borrar = async (id) => {
    // Llamamos a deleteCaracter primero
    try {
      await deleteCaracter(id);

      // Después de que deleteCaracter se complete, ejecutamos la segunda petición
      const response = await axios.delete( Global.url +`/api/inventario/eliminarproducto/${id}`);
      alert(response.data.message + " Actuliza para ver cambios"); // Suponiendo que el servidor devuelve un mensaje de respuesta
    } catch (error) {
      console.log(error);
    }
  }

  if (!dataInvetario || dataInvetario.length === 0) {
    return <div>No hay productos disponibles</div>;
  }
  console.log(caracteristicas)  
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Cantidad</th>
       
         
         
          <th scope="col" className='col-w'></th>
           <th scope="col">Características</th>
           <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {dataInvetario.map((product, index) => (
          <tr key={index}>
            <th scope="row">{index + 1 || ''}</th>
           
            <td>{product.Nom_prodct}</td>
            <td>{product.Cant_prodct} </td>
            <td>{product.PrecioUni_prodct}</td>
            <td> 
            {caracteristicas.map((caracteristica, idx) => {
            
        if (caracteristica.idinventarios === product.id) {
          return (
            <span key={idx}>
              <span style={{ color: 'red' }}>Tamaño:</span> {caracteristica.nombre}<br />
              <span style={{ color: 'green' }}>Precio:</span> {caracteristica.precio}<br />
            </span>
          );
        }
        return null; 
      })}
            </td>
            <td > 
            <div className='centrart'>
              <Link to={`/editarInventario/${product.id}`}>
                <li className='btn btn-success'>Editar</li>
              </Link>

              <button className="btn btn-success" onClick={() => borrar(product.id)}>Eliminar</button>
            </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductList;
