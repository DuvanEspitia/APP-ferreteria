import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css'
import { useParams,useNavigate } from 'react-router-dom';
import Global from '../../varibleBackend/Global';
function Editarinvetario() {
    const [Nom_prodct, setNom_prodct] = useState('');
    const [Cant_prodct, setCant_prodct] = useState('');
    const [Marca_prodct, setMarca_prodct] = useState('');
    const [Dimensiones_prodct, setDimensiones_prodct] = useState('');
    const [PrecioUni_prodct, setPrecioUni_prodct] = useState('');
    const [image, setImage] = useState(null);
    const params = useParams()
    const [dataselect, setDataSelect] = useState('');
    const [tamañosYPrecios, setTamañosYPrecios] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);

    const navigate = useNavigate();
    const deleteCaracter = async (id) => {
        try {
            const response = await axios.delete( Global.url +`/api/caracteristicas/eliminarunacarac/${id}`);
            if (response.status === 200 || response.status === 204) {
                const successMessage = document.getElementById("successMessage");
                if (successMessage) {
                    successMessage.innerText = "Eliminado con éxito";
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get( Global.url +`/api/caracteristicas/consultarcaracteristicas/${params.id}`);
                setDataSelect(response.data);
            } catch (error) {
                console.error("Error al obtener categorías:", error);
            }
        };
        fetchCategories();
    }, []);
    <div className="center">
        <select
            className="title-new1"

        >
            {dataselect &&
                dataselect.map((dataselect) => (
                    <option key={dataselect.idcategoria} value={dataselect.precio}>
                        {dataselect.nombre}
                    </option>
                ))}
        </select>
    </div>

    const eliminarTamañoYPrecio = (index) => {
        const nuevosTamañosYPrecios = [...tamañosYPrecios];
        nuevosTamañosYPrecios.splice(index, 1);
        setTamañosYPrecios(nuevosTamañosYPrecios);
    }
    const AddDesplegable = () => {
        const nombre = document.getElementById("tamaño").value;
        const precio = document.getElementById("precio").value;
        const codigo = document.getElementById("codigo").value;

        if (nombre && precio) {
            const nuevoTamañoYPrecio = { nombre, precio, codigo };
            setTamañosYPrecios([...tamañosYPrecios, nuevoTamañoYPrecio]);
            document.getElementById("tamaño").value = '';
            document.getElementById("precio").value = '';
            document.getElementById("codigo").value = '';
        }

    }
    useEffect(() => {
        const fetchData = async () => {
            try {


                const response = await axios.post( Global.url +"/api/inventario/obtenerdataproducto", { idinventarios: params.id });
                const dataInvetario = response.data
                setNom_prodct(dataInvetario.Nom_prodct)
                setCant_prodct(dataInvetario.Cant_prodct)
                setMarca_prodct(dataInvetario.Marca_prodct)
                setDimensiones_prodct(dataInvetario.Dimensiones_prodct)
                setPrecioUni_prodct(dataInvetario.PrecioUni_prodct)
                setImage(dataInvetario.image)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);



    const createCaracteristicas = async (idinventarios) => {
        const caracteristicasIds = [];
        console.log(caracteristicasIds)
        for (let i = 0; i < tamañosYPrecios.length; i++) {
            const nombre = tamañosYPrecios[i].nombre;
            const precio = tamañosYPrecios[i].precio;
            const codigo = tamañosYPrecios[i].codigo;
            try {
                const caracteristicasResponse = await axios.post( Global.url +'/api/caracteristicas/agregarcaracteristicas', {
                    nombre,
                    precio,
                    codigo,
                    idinventarios, // Agregar el idinventario en la solicitud
                });
                caracteristicasIds.push(caracteristicasResponse.data.id);

            } catch (error) {
                console.error("Error al crear características:", error);
                throw error;
            }
        }
        return caracteristicasIds;
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);

        // Previsualización de la imagen
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedImage) {
            reader.readAsDataURL(selectedImage);
        }
    };
    const ActualizarProducto = async () => {
        
        // Generamos un nuevo objeto para actualizar
        const actualizarProducto = {
            idinventarios: params.id,
            Nom_prodct: Nom_prodct,
            Cant_prodct: Cant_prodct,
            Marca_prodct: Marca_prodct,
            Dimensiones_prodct: Dimensiones_prodct,
            PrecioUni_prodct: PrecioUni_prodct,
            image: image
        };

        // Creamos un FormData para enviar los datos
        const formData = new FormData();
        for (const key in actualizarProducto) {
            formData.append(key, actualizarProducto[key]);
        }

        // Realizamos la petición a la API
        try {
            const resp = await axios.post( Global.url +"/api/inventario/actualizarproducto", formData, {

            });
            window.alert('Producto actualizado');
            const idinventarios = resp.data.idinventarios;

            const caracteristicasId = await createCaracteristicas(idinventarios);

            navigate("/gestion-inventario");    

            // Hacer algo con la respuesta si es necesario
        } catch (e) {
            console.log(e.response);
            window.alert('Ha ocurrido un error al actualizar el producto');
        }
    };
    console.log(dataselect)
    return (

        <div className='blog-c-admin'>
            <div className='row'>
                <div className='centrar'><h2 class="title">EDITAR PRODUCTO</h2></div>
                <div className='col-md-6'>
                    <br />
                    <div class="center">

                        <h5>Nombre producto</h5>
                        <input
                            disabled
                            className='title-new'
                            type="text"
                            placeholder="Nombre producto"
                            value={Nom_prodct}
                            onChange={(e) => {
                                setNom_prodct(e.target.value)
                            }}
                        />
                        <h5>Marca producto</h5>
                        <input
                            className='title-new'
                            type="text"
                            placeholder="Marca producto"
                            value={Marca_prodct}
                            onChange={(e) => {
                                setMarca_prodct(e.target.value)
                            }}
                        />
                        <h5>Cantidad producto</h5>
                        <input
                            className='title-new'
                            type="number"
                            placeholder="Cantidad producto"
                            value={Cant_prodct}
                            onChange={(e) => {
                                setCant_prodct(e.target.value)
                            }}
                        />
                        <h5>Descripción</h5>
                        <textarea
                            className='textarea'
                            type="text"
                            placeholder="Tamaño/características"
                            value={Dimensiones_prodct}
                            onChange={(e) => {
                                setDimensiones_prodct(e.target.value)
                            }}
                        />
                        <br />
                        <div className="center">

                            <h5>¿Cuáles deseas eliminar?</h5>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Tamaños</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Código</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope='col'>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataselect && dataselect.map((tamPrecio, index) => (
                                        <tr key={index}>

                                            <td>{tamPrecio.nombre}</td>
                                            <td>{tamPrecio.precio}</td>
                                            <td>{tamPrecio.codigo}</td>
                                            <td>{tamPrecio.cantidad}</td>
                                            <td>
                                                <button className='btn btn-success' onClick={() => deleteCaracter(tamPrecio.idcaracteristicas)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="center">
                            <h5>¿Deseas añadir?</h5>
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
                                    <option value="1/4 x 1,1/2">1/4 x 1,1/2"</option>
                                    <option value="1/4 x 1/4">1/4 x 1/4"</option>
                                    <option value="5/16 x 5/16">5/16 x 5/16"</option>
                                    <option value="1/4 x 1 MT">1/4 x 1 MT</option>
                                    <option value="5/16 x 1 MT">5/16 x 1 MT</option>
                                    <option value="5/16 x 1.65 MT">5/16 x 1.65 MT</option>
                                    <option value="3/8 x 1 MT">3/8" x 1 MT</option>
                                    <option value="3 x 4">3" x 4"</option>
                                    <option value="5/16">5/16"</option>
                                    <option value="3/8">3/8"</option>
                                    <option value="5/8">5/8"</option>
                                    <option value="74 X 41 MM">74 X 41 MM</option>
                                </select >
                                <input className='title-new' id='precio' type='number' min="0" placeholder='precio'></input>
                                <input className='title-new' id='codigo' type='number' min="0" placeholder='código'></input>
                            </div >
                            <div className='centrar'>
                                <button className='btn btn-success' onClick={AddDesplegable}>Añadir</button>
                                <br></br>
                                <p id='successMessage'></p>
                            </div>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Tamaños</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Código</th>
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
                                            <td>
                                                <button className='btn btn-success' onClick={() => eliminarTamañoYPrecio(index)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <br />
                    <div className='edi-img-conta'>
                        <span> Imagen del producto</span>
                        {image && (
                            <img
                                className='img2'
                                src={`data:image/jpeg;base64,${image}`}
                                alt="Nueva imagen"
                            />
                        )}
                         {imagePreview && (
                        <img
                            className='img2'
                            src={imagePreview}
                            alt="Nueva imagen"
                        />
                    )}
                        <input
                            className='title-new'
                            placeholder='Imagen'
                            type="file" // Campo de tipo archivo para la imagen
                            onChange={handleImageChange} 
                        />
                    </div>
                </div>
                <div className='centrar'><button className='button-32' id='button' onClick={ActualizarProducto} >Actualizar</button></div>
            </div>
        </div>
    );
}

export default Editarinvetario;
