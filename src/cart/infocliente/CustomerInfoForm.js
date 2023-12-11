import React, { useState, useContext, useEffect } from 'react';
import './CustomerInfoForm.css'; // Importa tu archivo CSS
import axios from 'axios';
import logop from '../../img/mercapa.png';
import { ShopContext } from '../../context/shop-context';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import Global from '../../varibleBackend/Global';
const CustomerInfoForm = () => {
  const { cartItems } = useContext(ShopContext);
  const [data, setData] = useState([]);
  const [flete,setFlete]=useState(false)
  const [cities, setCities] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
  const [facturaElectronica, setFacturaElectronica] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    departamento:'',
    ciudad: '',
    facturaElectronica:'No',
    identificacion:''
  });
  useEffect(() => {
    let newTotalAmount = 0;
    for (const cartItem of cartItems) {
       if (typeof cartItem.price != "") {
          const itemTotal = cartItem.price * cartItem.quantity;
          newTotalAmount += itemTotal;
       }
    }
    setTotalAmount(newTotalAmount);
      console.log(newTotalAmount)
    
 }, [cartItems]);
  
 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://api-colombia.com/api/v1/Department');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
}, []);

useEffect(() => {
  const fetchCities = async () => {
    try {
      if (selectedDepartmentId) {
        const response = await fetch(`https://api-colombia.com/api/v1/Department/${selectedDepartmentId}/cities`);
        const result = await response.json();
        const filteredData = result.map((item) => item.name);
        setCities(filteredData);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  fetchCities();
}, [selectedDepartmentId]);

  useEffect(() => {
    // Observar cambios en selectedDepartment y actualizar customerInfo
    if (selectedDepartment) {
      setCustomerInfo((prevCustomerInfo) => ({...prevCustomerInfo,departamento: selectedDepartment.departamento,}));
    }
    console.log(cartItems)
  }, [selectedDepartment]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    console.log(event.target)
    // Si el nombre es 'departamento', actualiza también las ciudades y la ID del departamento seleccionado
    if (name === 'departamento') {
      const selectedNombre = event.target.options[event.target.selectedIndex].dataset.nombre;

      
      const selectedDepartmentData = data.find((item) => item.id === value);
      console.log(selectedDepartmentData);
      setCities([]); // Limpiar las ciudades al cambiar el departamento
      setSelectedDepartmentId(value);
      setSelectedDepartment(selectedDepartmentData);

      setCustomerInfo((prevCustomerInfo) => ({
        ...prevCustomerInfo,
        departamento: selectedNombre ,
      }));
     
    }else if (type === 'checkbox' && name === 'facturaElectronica') {
      setFacturaElectronica(checked);
      setCustomerInfo((prevCustomerInfo) => ({
        ...prevCustomerInfo,
        facturaElectronica: checked ? 'Sí' : 'No',
      }));
    }
       else {
      setCustomerInfo((prevCustomerInfo) => ({
        ...prevCustomerInfo,
        [name]: value,
      }));
    }
  };
  useEffect(() => {
    // Logic that depends on the updated state
    console.log(customerInfo.ciudad);
  
    if (totalAmount >= 400000 && customerInfo.ciudad === 'Cali') {
      setFlete(true);
    } else {
      setFlete(false);
    }
  }, [customerInfo, totalAmount]);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar acciones con los datos del cliente, como enviarlos al servidor o realizar validaciones.
    console.log('Datos del cliente:', customerInfo);
  };

  const generateProductsArray = () => {

    const productsArray = cartItems.map((item) => {
      const productName = item.product && item.product.Nom_prodct ? item.product.Nom_prodct : 'Unknown Product';

      
      return {
        name: productName,
        precio: item.price,
        cantidad: item.quantity,
        referencia:item.nombre

      };
    });
  
    return productsArray;
  };
  

  const FuncionComprar = async () => {

    const productsArra = generateProductsArray();
    console.log(productsArra)
    initMercadoPago('APP_USR-84d96ddf-cebf-4a40-82f7-fb2055b414b1')
    try {
      const response = await axios.post( Global.url +'/api/pagos/', {
        products:productsArra,
        customerInfo: customerInfo,
      });
        console.log(response)
      // Assuming the response.data is a URL
      window.location.href = response.data;
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  return (
    <div className="customer-info-container">
      <h2 className="center">Información </h2>

      <form onSubmit={handleSubmit}>
        <label>
          Nombre o razón social:
          <input
            className="input-shop"
            type="text"
            name="name"
            value={customerInfo.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Identificación:
          <input
            className="input-shop"
            type="number"
            min='0'
            name="identificacion"
            value={customerInfo.identificacion}
            onChange={handleInputChange}
           
          />
        </label>

        <label>
          Correo Electrónico:
          <input
            className="input-shop"
            type="email"
            name="email"
            value={customerInfo.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Departamento:
          <select
            className="input-shop"
            name="departamento"
            value={selectedDepartmentId}
            onChange={(event) => handleInputChange(event)}
           
          >
            <option value="">Seleccione un departamento</option>
            {data.map((item) => (
              <option key={item.id} value={item.id} data-nombre={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ciudad:
          <select
            className="input-shop"
            name="ciudad"
            value={customerInfo.ciudad}
            onChange={handleInputChange}
          >
            <option value="">Seleccione una ciudad</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label>
          Dirección:
          <input
            className="input-shop"
            type="text"
            name="address"
            value={customerInfo.address}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Número de Teléfono:
          <input
            className="input-shop"
            type="number"
            name="phoneNumber"
            value={customerInfo.phoneNumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
              <div className='centrar'>
          <p>  Factura Electrónica: </p>
          <div>
          
            <label>
              <div className='centrar-slec'>
              <b>Sí</b>
              <input
                type="checkbox"
                name="facturaElectronica"
                checked={facturaElectronica}
                onChange={handleInputChange}
              />
               </div>
            </label>
            </div>
            </div>
           
       
        </label>
        </form>
        <p>{flete ? ("Envio gratis"):("AVISO: El cliente debe asumir el costo de envio contraentrega.")}</p>
        <p>Valor: { totalAmount}</p>
        <button className="btndata" onClick={FuncionComprar}>
          <img className="img2" src={logop} alt="Mercado Pago" />
          Pagar con Mercado Pago
        </button>
    </div>
  );
};

export default CustomerInfoForm;
