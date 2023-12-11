import React, { useState, useEffect } from 'react';
import "./blog.css";
//import uniqid from "uniqid"
import axios from "axios"
import Shownews from "./shownews";
function AgregarBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [resume,setResume] =useState('');
    const [image, setImage] = useState(null); // Nuevo estado para la imagen
    const [datablog, setDatablog] = useState([]);
    const [message, setMessage] = useState('');
    useEffect(() => {
        fetchData(); // Llama a fetchData al cargar la página
    }, []); 
        const fetchData = async () => {
            try {
                const response = await axios.get("https://blog.abccomercializadoraindustrial.com/api/blog/consultarblog");
               
                setDatablog(response.data)
            } catch (error) {
                console.log(error);
            }
        };

    


    const connectToPost = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        var formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("resume",resume);
        formData.append("image", image); 

        try {
            const resp = await axios.post('https://blog.abccomercializadoraindustrial.com/api/blog/agregarblog', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Importante especificar el tipo de contenido
                }
            });
        
          
            setMessage('El blog ha sido agregado correctamente');
            setTitle('')
            setContent('')
            setResume('')
            setImage(null)
            window.location.reload();
        } catch (e) {
    
            setMessage('Hubo un error al agregar el blog');
        }
        
    }

    const listablog = datablog.map(blog => (
        <div className='column' key={blog.id}>
            <Shownews blog={blog} />
        </div>
    ));
    return (
        <div>
            <div className='blog-c-admin'>
                <div class="center">
                    <h2 class="title">Agregar Noticia</h2>
                    <h4><span>Titulo</span></h4>
                    <input
                        className='title-new'
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                     <h4><span>Resumen</span></h4>
                    <input
                        className='title-new'
                        type="text"
                        maxLength="45"
                        placeholder="Breve texto llamativo"
                        value={resume}
                        onChange={(e) => {
                            setResume(e.target.value)
                        }}
                    />
                 <h5><span>Selecciona una foto</span></h5>
                
                    <input
                    
                        className='title-new'
                        type="file" // Campo de tipo archivo para la imagen
                        onChange={(e) => {
                            setImage(e.target.files[0]); // Captura la imagen seleccionada
                        }}
                    />
               
                    <h4><span>Descripción</span></h4>
                    <textarea
                        className='content-news'
                        placeholder="Contenido"
                        type="text"
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value)
                        }}
                    ></textarea>
                    <button className='button-32' id='button' onClick={connectToPost}>Agregar</button>
                    <p>{message}</p>
                </div>
                <h2 class="title">--Noticias agregadas--</h2>
            </div>
            {listablog}
        </div>
    );
};

export default AgregarBlog;
