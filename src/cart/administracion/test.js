import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Global from '../../varibleBackend/Global';
function ProductList({ dataInventario }) {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const fetchCaracteristicas = async (id) => {
    try {
      const response = await axios.get(Global.url+`/api/caracteristicas/consultarcaracteristicas/${id}`);
      setCaracteristicas(response.data);
    } catch (error) {
      console.error("Error al obtener características:", error);
    }
  };

  useEffect(() => {
    if (dataInventario && dataInventario.length > 0) {
      fetchCaracteristicas(dataInventario[0].id);
    }
  }, [dataInventario]);

  const deleteCaracter = async (id) => {
    try {
      const response = await axios.delete(Global.url+`/api/caracteristicas/eliminarcarac/${id}`);
      console.log(response.data); // Aquí podrías mostrar un mensaje o manejar la respuesta según tu necesidad
    } catch (error) {
      console.log(error);
    }
  };

  const borrar = async (id) => {
    try {
      await deleteCaracter(id);
      const response = await axios.delete(Global.url+`/api/inventario/eliminarproducto/${id}`);
      alert(response.data.message + " Actualiza para ver cambios");
    } catch (error) {
      console.log(error);
    }
  };

  if (!dataInventario || dataInventario.length === 0) {
    return <div>No hay productos disponibles</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Marca</th>
          <th scope="col">Precio</th>
          <th scope="col">Características</th>
          <th scope="col" className='col-w'></th>
        </tr>
      </thead>
      <tbody>
        {dataInventario.map((product, index) => (
          <tr key={index}>
            <th scope="row">{index + 1 || ''}</th>
            <td>{product.Nom_prodct}</td>
            <td>{product.Cant_prodct}</td>
            <td>{product.Marca_prodct}</td>
            <td>{product.PrecioUni_prodct}</td>
            <td>
              {caracteristicas.map((caracteristica, idx) => (
                <div key={idx}>{caracteristica.nombre}: {caracteristica.valor}</div>
              ))}
            </td>

            <div className='centrar'>
              <Link to={`/editarInventario/${product.id}`}>
                <li className='btn btn-success'>Editar</li>
              </Link>

              <button className="btn btn-success" onClick={() => borrar(product.id)}>Eliminar</button>
            </div>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductList;
