
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Shownews({ blog }) {
 
const borrar = async (idblog) =>{
   
        try {
            const response = await axios.post('https://blog.abccomercializadoraindustrial.com/api/blog/borrarblog',{idblog: idblog})
            alert(response.data)
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };


if (!blog) {
    return <div></div>;
}
    return (

        <div className='noticia'>
            <div className="blog-post">
                <div className="blog-header">
                    <h2 className="blog-title">{blog.title}</h2>
                    <p className="blog-text">{blog.resume}</p>
                </div>
                <div className="blog-content">
                   
                    {blog.image && <img className='img' src={`data:image/jpeg;base64,${blog.image}`} alt="Imagen de blog" />}
                </div>
                <br/>
                <div className='centrar'>
                  
                <button className="button-33" onClick={()=>{borrar(blog.idblog)}}>Eliminar</button>
                <Link  className="button-33"  to={`/editarBlog/${blog.idblog}`}>
                    <button className='btn2'>Actulizar</button>
                </Link>
                
               </div>
                
            </div>
            
        </div>

    );
}

export default Shownews;