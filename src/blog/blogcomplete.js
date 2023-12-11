import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function Blogcomplete() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [resume, setResume] =useState('');
    const [image, setImage] = useState(null);
    const params = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("https://blog.abccomercializadoraindustrial.com/api/blog/obtenerdatablog", { idblog: params.id });
               
                const dataInvetario = response.data
                setTitle(dataInvetario.title)
                setResume(dataInvetario.resume)
                setContent(dataInvetario.content)
                setImage(dataInvetario.image)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);
    }

    return (

        <div className='blog-c-admin'>
            <div className='row'>

                <div className='centrar'><h2 class="title"> {title}</h2></div>
                <div className='col-md-6'>

                    <div className='edi-img-conta'>
                        {image && (
                            <img
                                className='img01'
                                src={`data:image/jpeg;base64,${arrayBufferToBase64(image.data)}`}
                                alt="Imagen de blog"
                            />
                        )}

                    </div>
                </div>
                <div className='col-md-6'>
                    <br /> <span className='t-contentsub'>{resume}</span><br/>
                    <div class="p-contentb">

                       
                        <span className='t-content'>{content}</span>
                    </div>
                   
                </div>


            </div>
        </div>
    );
}

export default Blogcomplete;
