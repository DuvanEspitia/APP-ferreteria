import React, { useState, useEffect } from "react";
import { Product } from "../shop/product";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./shop.css";
import ReactPaginate from "react-paginate";
import Global from "../varibleBackend/Global";
export const Shop = () => {
  const [dataInventario, setInventario] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const itemsPerPage = 9; // Número de productos por página
  let navigate = useNavigate();
  const location = useLocation();

  const routeChange = () => {
    let path = "/Contacto";
    navigate(path);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          axios.get( Global.url +"/api/categorias/consultarcategoria"),
          axios.get( Global.url +"/api/inventario/consultarinventario")
        ]);

        setCategories(categoriesResponse.data);
        setInventario(productsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get("category");

    if (categoryParam) {
      setSelectedCategory(categoryParam.toString());
    }
  }, [location.search]);

  const filteredProducts =
    selectedCategory === ""
      ? dataInventario
      : dataInventario.filter((product) => product.idcategoria.toString() === selectedCategory);

  // Lógica para paginación
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="shop">
      <div className="shopTitle">
        <h2 className="title-products">PRODUCTOS</h2>
        <h3 className="title-product">Herramientas y productos de construcción.</h3>
      </div>
      <div className="row">
        <div className="col-md-2">
          <h4 className="title-products">Categorias</h4>
          <div className="category-buttons">
            <button className="button" onClick={() => setSelectedCategory("")}>
              Todo
            </button>
            {categories.map((categoria) => (
              <button
                className="button"
                key={categoria.idcategoria}
                onClick={() => setSelectedCategory(categoria.idcategoria.toString())}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>
          <br />
          <div className="b-ca">
            <h4 className="title-products">Distribuidor</h4>
            <p>¿Tienes interés en un producto que no está en nuestro catálogo? ¡Queremos saberlo!</p>
            <div className="center">
              <button onClick={routeChange} href="/blog" className="buton-conocermas">
                Conocer más
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-10">
          <div className="products">
            {displayedProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>

          {pageCount > 1 && (
            <ReactPaginate
              previousLabel={"Anterior"}
              nextLabel={"Siguiente"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          )}
        </div>
      </div>
    </div>
  );
};
