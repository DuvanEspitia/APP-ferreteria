import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'
import { useParams } from 'react-router-dom';
function Editar() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [resume, setResume] = useState('');
    const [image, setImage] = useState(null);
    const params = useParams()

    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;

        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);
    }



    useEffect(() => {
        const fetchData = async () => {
            try {


                const response = await axios.post("https://blog.abccomercializadoraindustrial.com/api/blog/obtenerdatablog", { idblog: params.id });
                const dataInvetario = response.data
                setTitle(dataInvetario.title)
                setContent(dataInvetario.content)
                setResume(dataInvetario.resume)
                setImage(dataInvetario.image)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);




    const ActualizarProducto = async () => {
        // Generamos un nuevo objeto para actualizar
        const actualizarProducto = {
            idblog: params.id,
            title: title,
            content: content,
            resume: resume,
            image: image
        };
        // Creamos un FormData para enviar los datos
        const formData = new FormData();
        for (const key in actualizarProducto) {
            formData.append(key, actualizarProducto[key]);
        }
        // Realizamos la petición a la API
        try {
            const resp = await axios.post("https://blog.abccomercializadoraindustrial.com/api/blog/actualizarproducto", formData, {
            });
            window.alert('Blog actualizado');
            
        
        } catch (e) {
            console.log(e.response);
            window.alert('Ha ocurrido un error al actualizar el producto');
        }
    };
    return (

        <div className='blog-c-admin'>
            <div className='row'>
                <div className='centrar'><h2 class="title">EDITAR BLOG</h2></div>
                <div className='col-md-6'>
                    <br />
                    <div class="center">

                        <h5>Titulo</h5>
                        <input
                            className='title-new'
                            type="text"
                            placeholder="Nombre producto"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                        />
                        <h5>Resumen</h5>
                        <input
                            className='title-new'
                            type="text"
                            placeholder="Marca producto"
                            value={resume}
                            onChange={(e) => {
                                setResume(e.target.value)
                            }}
                        />
                      
                        <h5>Descripción</h5>
                        <textarea
                            className='textarea'
                            type="text"
                            placeholder="Tamaño/características"
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value)
                            }}
                        />
                        <br />
                 
                      
                     
                    </div>
                </div>
                <div className='col-md-6'>
                    <br />
                    <div className='edi-img-conta'>
                        <span> Imagen del producto</span>
                        {image && (
                            <img
                                className='img2'
                                src={`data:image/jpeg;base64,${arrayBufferToBase64(image.data)}`}
                                alt="Imagen de blog"
                            />
                        )}
                        <input
                            className='title-new'
                            placeholder='Imagen'
                            type="file" // Campo de tipo archivo para la imagen
                            onChange={(e) => {
                                setImage(e.target.files[0]); // Captura la imagen seleccionada
                            }}
                        />
                    </div>
                </div>
                <div className='centrar'><button className='button-32' id='button' onClick={ActualizarProducto} >Actulizar</button></div>
            </div>
        </div>
    );
}

export default Editar;
