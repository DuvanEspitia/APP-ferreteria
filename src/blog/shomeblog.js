import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './blog.css';
import Homeblog from './homeblog';

function Shomeblog() {
  const [datablog, setDatablog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://blog.abccomercializadoraindustrial.com/api/blog/consultarblog');
        setDatablog(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (datablog.length === 0) {
    return (
      <div className="centered-message">
        <div className="alert">
          <p>¡No se ha encontrado información del blog!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="noticias">
      {datablog.map((blog) => (
        <Homeblog blog={blog} key={blog.id} />
      ))}
    </div>
  );
}

export default Shomeblog;
