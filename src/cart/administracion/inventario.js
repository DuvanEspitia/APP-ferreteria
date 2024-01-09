import React, { useState, useEffect } from 'react';
import axios from "axios";
import ProductList from './productList';
import Global from '../../varibleBackend/Global';
function Inventario() {
    const [Nom_prodct, setNom_prodct] = useState('');
    const [Cant_prodct, setCant_prodct] = useState('');
    const [Marca_prodct, setMarca_prodct] = useState('');
    const [Dimensiones_prodct, setDimensiones_prodct] = useState('');
    const [image, setImage] = useState(null);
    const [dataInventario, setInventario] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [CategoriaID, setCategoriaID] = useState('');
    const [tamañosYPrecios, setTamañosYPrecios] = useState([]);
    const areFieldsFilled = Nom_prodct && Cant_prodct && Marca_prodct && Dimensiones_prodct && image;

    const [alertMessage, setAlertMessage] = useState('');

    const AddDesplegable = () => {
        const nombre = document.getElementById("tamaño").value;
        const precio = document.getElementById("precio").value;
        const codigo = document.getElementById("codigo").value;
        const cantidad = document.getElementById("cantidad").value;
        if (nombre && precio) {
            const nuevoTamañoYPrecio = { nombre, precio, codigo,cantidad };
            setTamañosYPrecios([...tamañosYPrecios, nuevoTamañoYPrecio]);
            document.getElementById("tamaño").value = '';
            document.getElementById("precio").value = '';
            document.getElementById("codigo").value = '';
            document.getElementById("cantidad").value = '';
        }

    }

    const createCaracteristicas = async (idinventarios) => {
        const caracteristicasIds = [];
        console.log(caracteristicasIds)
        for (let i = 0; i < tamañosYPrecios.length; i++) {
            const nombre = tamañosYPrecios[i].nombre;
            const precio = tamañosYPrecios[i].precio;
            const codigo = tamañosYPrecios[i].codigo;
            const cantidad = tamañosYPrecios[i].cantidad;
            try {
                const caracteristicasResponse = await axios.post( Global.url +'/api/caracteristicas/agregarcaracteristicas', {
                    nombre,
                    precio,
                    codigo,
                    idinventarios,
                    cantidad // Agregar el idinventario en la solicitud
                });
                caracteristicasIds.push(caracteristicasResponse.data.id);

            } catch (error) {
                console.error("Error al crear características:", error);
                throw error;
            }
        }
        return caracteristicasIds;
    }

    const connectToPost = async (e) => {
        e.preventDefault();

        try {
            // Primero, crear el producto
            const formDataProducto = new FormData();
            formDataProducto.append("Nom_prodct", Nom_prodct);
            formDataProducto.append("Cant_prodct", Cant_prodct);
            formDataProducto.append("Marca_prodct", Marca_prodct);
            formDataProducto.append("Dimensiones_prodct", Dimensiones_prodct);
            formDataProducto.append("image", image);
            formDataProducto.append("idcategoria", CategoriaID);
            const respProducto = await axios.post( Global.url +'/api/inventario/agregarInventario', formDataProducto);
            setNom_prodct('');
            setCant_prodct('');
            setMarca_prodct('');
            setDimensiones_prodct('');
            setImage(null);
            setCategoriaID('');
            // Obtener el ID del producto recién creado
            const idinventarios = respProducto.data.idinventarios;

            // Crear las características con el ID del producto
            const caracteristicasId = await createCaracteristicas(idinventarios);

            setTamañosYPrecios([]);
            setAlertMessage('Producto agregado correctamente');
            setInventario([...dataInventario, respProducto.data]);
        } catch (e) {
            console.log(e.response);
            setAlertMessage('Ha ocurrido un error al agregar el producto');
        }

    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get( Global.url +"/api/categorias/consultarcategoria");
                setCategoria(response.data);
            } catch (error) {
                console.error("Error al obtener categorías:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get( Global.url +"/api/inventario/consultarinventario");
                setInventario(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const eliminarTamañoYPrecio = (index) => {
        const nuevosTamañosYPrecios = [...tamañosYPrecios];
        nuevosTamañosYPrecios.splice(index, 1);
        setTamañosYPrecios(nuevosTamañosYPrecios);
    }

    return (
        <div>
            <div className='blog-c-admin'>
                <div className="center">
                    <h2 className="title">Agregar producto al inventario</h2>
                    <span>Seleccionar categoria</span>
                    <select className='title-new1' value={CategoriaID} onChange={(e) => setCategoriaID(e.target.value)}>
                        <option value="">Seleccionar</option>
                        {categoria && categoria.map((categoria) => (
                            <option key={categoria.idcategoria} value={categoria.idcategoria}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </select><br />
                    <input
                        className='title-new'
                        type="text"
                        placeholder="Nombre producto"
                        value={Nom_prodct}
                        onChange={(e) => setNom_prodct(e.target.value)}
                    /><br />
                    <input
                        className='title-new'
                        type="text"
                        placeholder="Marca producto"
                        value={Marca_prodct}
                        onChange={(e) => setMarca_prodct(e.target.value)}
                    /><br />
                    <input
                        className='title-new'
                        type="number"
                        placeholder="Cantidad total"
                        value={Cant_prodct}
                        onChange={(e) => setCant_prodct(e.target.value)}
                    /><br />
                    <textarea
                        className='textarea'
                        type="text"
                        placeholder="Características generales"
                        value={Dimensiones_prodct}
                        onChange={(e) => setDimensiones_prodct(e.target.value)}
                    /><br />

                    <p>**En el siguiente apartado es necesario: <br />
                        1) Añadir el tamaño,precio y código del producto.<br />
                        2) En caso de ser un único tamaño o de varios tamaños, igualmente se debe añadir.<br />
                        3) Lo que se agregue aquí será parte del desplegable como gestor de tamaños y precios.
                    </p>

                    <div className="centrar">
                        <select id='tamaño'>
                            <option value="">Tamaño</option>
                            <option value="3mm x 1,1/2 x 1/2">3mm x 1,1/2" x 1/2"</option>
                            <option value="3mm x 2 x 1/2">3mm x 2" x 1/2"</option>
                            <option value="3mm x 2,1/2 x 1">3mm x 2,1/2" x 1"</option>
                            <option value="3mm x 2,1/2 x 1/2">3mm x 2,1/2" x 1/2"</option>
                            <option value="3mm x 3 x 1/2">3mm x 3" x 1/2"</option>
                            <option value="3mm x 3 x 1">3mm x 3" x 1"</option>
                            <option value="3mm x 3 x 1,1/2">3mm x 3" x 1,1/2"</option>
                            <option value="3mm x 3 x 2">3mm x 3" x 2"</option>
                            <option value="3mm x 3 x 1,1/4">3mm x 3" x 1,1/4"</option>
                            <option value="3mm x 3,1/2 x 1,1/2">3mm x 3,1/2" x 1,1/2"</option>
                            <option value="3mm x 3,1/2 x 2">3mm x 3,1/2" x 2"</option>
                            <option value="3mm x 3,1/2 x 1/2">3mm x 3,1/2" x 1/2"</option>
                            <option value="3mm x 4 x 2,1/2">3mm x 4" x 2,1/2"</option>
                            <option value="3mm x 5 x 3">3mm x 5" x 3"</option>
                            <option value="4.5mm x 2 x 1/2">4.5mm x 2" x 1/2"</option>
                            <option value="4.5mm x 1,1/2 x 1/2">4.5mm x 1,1/2" x 1/2"</option>
                            <option value="4.5mm x 3 x 1,1/2">4.5mm x 3" x 1,1/2"</option>
                            <option value="4.5mm x 3 x 2">4.5mm x 3" x 2"</option>
                            <option value="4.5mm x 3 x 1">4.5mm x 3" x 1"</option>
                            <option value="4.5mm x 3,1/2 x 1,1/2">4.5mm x 3,1/2" x 1,1/2"</option>
                            <option value="4.5mm x 3,1/2 x 2">4.5mm x 3,1/2" x 2"</option>
                            <option value="3mm X 3x3 PERF. 1,1/2">3mm X 3"x3" PERF. 1,1/2"</option>
                            <option value="3mm X 4x4 PERF. 1,1/2">3mm X 4"x4" PERF. 1,1/2"</option>
                            <option value="3mm X 4x4 PERF 2">3mm X 4"x4" PERF 2"</option>
                            <option value="3mm X 1/2">3mm X 1/2"</option>
                            <option value="3mm X 5/8">3mm X 5/8"</option>
                            <option value="3mm x 3/4">3mm x 3/4"</option>
                            <option value="3mm x 7/8">3mm x 7/8"</option>
                            <option value="3mm x 1">3mm x 1"</option>
                            <option value="3mm x 1,1/4">3mm x 1,1/4"</option>
                            <option value="3mm x 1,1/2">3mm x 1,1/2"</option>
                            <option value="3mm x 2">3mm x 2"</option>
                            <option value="3mm x 2,1/4">3mm x 2,1/4"</option>
                            <option value="3mm x 2,1/2">3mm x 2,1/2"</option>
                            <option value="3mm x 3">3mm x 3"</option>
                            <option value="3mm x 3,1/2">3mm x 3,1/2"</option>
                            <option value="4.5mm x 1/2">4.5mm x 1/2"</option>
                            <option value="4.5mm x 3/4">4.5mm x 3/4"</option>
                            <option value="4.5mm x 7/8">4.5mm x 7/8"</option>
                            <option value="4.5x1,1/4">4.5x1,1/4"</option>
                            <option value="4.5mm x 1">4.5mm x 1"</option>
                            <option value="4.5mm x 1,1/2">4.5mm x 1,1/2"</option>
                            <option value="4.5mm x 2">4.5mm x 2"</option>
                            <option value="4.5x3">4.5x3"</option>
                            <option value="4.5x 3,1/2">4.5x 3,1/2"</option>
                            <option value="6mm x 1">6mm x 1"</option>
                            <option value="6mm x 2">6mm x 2"</option>
                            <option value="3mm x 2 ">3mm x 2"</option>
                            <option value="3mm x 1 x 1/2">3mm x 1" x 1/2"</option>
                            <option value="3mm x 1.1/2 x 1/2">3mm x 1.1/2" x 1/2"</option>
                            <option value="3mm  x 2 x 1/2">3mm  x 2" x 1/2"</option>
                            <option value="4.5mm X 1 X 1/2">4.5mm X 1" X 1/2" </option>
                            <option value="4.5mm x 1.1/2 x  1/2">4.5mm x 1.1/2" x  1/2" </option>
                            <option value="4.5mm X 2 X 1/2">4.5mm X 2" X 1/2"</option>
                            <option value=" 1,1/2  x  1/2"> 1,1/2"  x  1/2"</option>
                            <option value=" 2  x  1/2"> 2"  x  1/2"</option>
                            <option value="2.1/2 x 1/2"> 2.1/2" x 1/2"</option>
                            <option value=" 2.1/2 x 1"> 2.1/2" x 1"</option>
                            <option value=" 3  x  1"> 3"  x  1"  </option>
                            <option value="6mm x 1,1/2">6mm x 1,1/2"</option>
                            <option value="3  x  1/2">3"  x  1/2"</option>
                            <option value="3 x 1 1/4">3" x 1 1/4"</option>
                            <option value="3 x 1 1/2">3" x 1 1/2"</option>
                            <option value="3 x 2">3" x 2"</option>
                            <option value="3 1/2 x 1/2">3 1/2" x 1/2"</option>
                            <option value="3 1/2 x 1 1/2">3 1/2" x 1 1/2"</option>
                            <option value="3.1/2 x 2">3.1/2" x 2"</option>
                            <option value="X 4 X 2 1/2">X 4" X 2 1/2"</option>
                            <option value="X 5 X 3">X 5" X 3"</option>
                            <option value="4x4x1,1/2">4"x4"x1,1/2"</option>
                            <option value="4x4 x 2">4"x4" x 2"</option>
                            <option value="3x3x1,1/2">3"x3"x1,1/2"</option>
                            <option value="01.20 X 1">01.20 X 1"</option>
                            <option value="01.20 (C18)X 1,1/2">01.20 (C18)X 1,1/2"</option>
                            <option value="01.50 (C16) X 1,1/2">01.50 (C16) X 1,1/2"</option>
                            <option value="01.20 (C18)X 2">01.20 (C18)X 2"</option>
                            <option value="01.50 (C16)X 2">01.50 (C16)X 2"</option>
                            <option value="01.20 X 1/2">01.20 X 1/2"</option>
                            <option value="C16x1,1/2">C16x1,1/2"</option>
                            <option value="C16 x 2">C16 x 2"</option>
                            <option value="1,1/2 C,16">1,1/2" C,16"</option>
                            <option value="2 C,16">2" C,16"</option>
                            <option value="1,1/2">1,1/2"</option>
                            <option value="2">2"</option>
                            <option value="3/4">3/4"</option>
                            <option value="1,1/2 x 5/8">1,1/2 x 5/8"</option>
                            <option value="7/8">7/8"</option>
                            <option value="90 X 1,1/2">90 X 1,1/2"</option>
                            <option value="C.16 1">C.16 1"</option>
                            <option value="C.16 1,1/4">C.16 1,1/4"</option>
                            <option value="C18 x 1,1/2">C18 x 1,1/2"</option>
                            <option value="C.18 x 2">C.18 x 2"</option>
                            <option value="C16 x 2,1/2">C16 x 2,1/2"</option>
                            <option value="C16 x 3">C16 x 3"</option>
                            <option value="C.18 1,1/2">C.18 1,1/2"</option>
                            <option value="C.18 2">C.18 2"</option>
                            <option value="1/2">1/2"</option>
                            <option value="2 SUP 2">2" SUP 2"</option>
                            <option value="1,1/2 SUP 2">1,1/2 SUP 2"</option>
                            <option value="1/2 x 3,3/4">1/2 x 3,3/4"</option>
                            <option value="1/4X2">1/4X2"</option>
                            <option value="5/16X3">5/16X3"</option>
                            <option value="3/8 X 3">3/8 X 3"</option>
                            <option value="1/4 X 1">1/4 X 1"</option>
                            <option value="5/16 X 1">5/16 X 1"</option>
                            <option value="5/16 x 1 1/4">5/16 x 1 1/4</option>
                            <option value="5/16 x 1 1/2">5/16 x 1 1/2</option>
                            <option value="5/16 x 2">5/16 x 2</option>
                            <option value="5/16 x 2 1/2">5/16 x 2 1/2</option>
                            <option value="1/4 x 1,1/2">1/4 x 1,1/2"</option>
                            <option value="1/4 x 1/4">1/4 x 1/4"</option>
                            <option value="1/4 x 3/4">1/4 x 3/4</option>
                            <option value="1/4 x 1 1/4">1/4 x 1 1/4</option>
                            <option value="1/4 x 1 1/2">1/4 x 1 1/2</option>
                            <option value="1/4 x 2">1/4 x2"</option>
                            <option value="1/4 x 2 1/2">1/4 x 2 1/2</option>
                            <option value="5/16 x 5/16">5/16 x 5/16"</option>
                            <option value="5/16 x 3/4">5/16 x 3/4</option>
                            <option value="1/4 x 1 MT">1/4 x 1 MT</option>
                            <option value="5/16 x 1 MT">5/16 x 1 MT</option>
                            <option value=" 1kg"> 1kg</option>
                            <option value=" 2kg"> 2kg</option>
                            <option value=" 5kg"> 5kg</option>
                            <option value=" 7.5kg"> 7.5kg</option>
                            <option value=" 12.5kg"> 12.5kg</option>
                            <option value=" 15kg"> 15kg</option>

                            <option value="5/16 x 1.65 MT">5/16 x 1.65 MT</option>
                            <option value="3/8 x 1 MT">3/8" x 1 MT</option>
                            <option value="3 x 4">3" x 4"</option>
                            <option value="5/16">5/16"</option>
                            <option value="3/8">3/8"</option>
                            <option value="5/8">5/8"</option>
                            <option value="74 X 41 MM">74 X 41 MM</option>
                            <option value="No aplica">No aplica</option>

                            
                        </select >

                        <input className='title-new' id='precio' type='number' min="0" placeholder='precio'></input>
                        <input className='title-new' id='codigo' type='number' min="0" placeholder='codigo'></input>
                        <input className='title-new' id='cantidad' type='number' min="0" placeholder='cantidad'></input>

                    </div ><br />
                    <div className='centrar'>
                        <button className='btn btn-success' onClick={AddDesplegable}>Añadir</button>
                    </div>
                    <br />
                    <table className="table1">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tamaños</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Codigo</th>
                                <th scope='col'>Cantidad</th>
                                <th scope='col'>Acciones</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {tamañosYPrecios.map((tamPrecio, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{tamPrecio.nombre}</td>
                                    <td>{tamPrecio.precio}</td>
                                    <td>{tamPrecio.codigo}</td>
                                    <td>{tamPrecio.cantidad}</td>
                                    <td>
                                        <button className='btn btn-success' onClick={() => eliminarTamañoYPrecio(index)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <span>Imagen del producto
                        <input
                            className='title-new'
                            placeholder='Imagen'
                            type="file"
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                            }}
                        />
                    </span>
                    <button className='button-32' id='button' disabled={!areFieldsFilled} onClick={connectToPost}>Agregar</button>
                    {
                        alertMessage && (
                            <div className={alertMessage.includes('error') ? 'error-alert' : 'success-alert'}>
                                {alertMessage}
                            </div>
                        )
                    }
                </div >
                <h2 className="title">--Inventario Actual</h2>
            </div >
            <ProductList dataInvetario={dataInventario} />
        </div >
    );
}

export default Inventario;
