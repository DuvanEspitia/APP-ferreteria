
import React from 'react';
import { Link } from 'react-router-dom';
function Homeblog({ blog }) {
    if (!blog) {
        return <div>No se ha encontrado información del blog.</div>;
    }
    return (

        <div className='noticia'>
            <div className="blog-post">
                <div className="blog-header">
                    <h4 className="blog-title">{blog.title}</h4>
                    <div className='center'>
                        {blog.image && <img className='img' src={`data:image/jpeg;base64,${blog.image}`} alt="Imagen de blog" />}

                    </div>
                    <div className='center'>
                    <p className="blog-text">{blog.resume}</p></div>
                </div>

                <div className='center'>
                    <Link className="descrep" to={`/blogcomplete/${blog.idblog}`}>
                        <button className="addToCartBttn">Leer mas</button>
                    </Link>
                    <br/>
                </div>
            </div>
        </div>

    );
}

export default Homeblog;