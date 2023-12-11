import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Global from "../varibleBackend/Global";
export const ShopContext = createContext(null);





export const ShopContextProvider = (product) => {

  const [cartItems, setCartItems] = useState([]);
  const [dataInvetario, setInventario] = useState([]);
  const [nextItemId, setNextItemId] = useState(1);
useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await axios.get( Global.url +"/api/inventario/consultarinventario");
          setInventario(response.data)
      } catch (error) {
          console.log(error);
      }
  };

  fetchData();

}, []);
const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < dataInvetario.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};
  

const getTotalCartAmount = () => {
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      const itemInfo = dataInvetario.find((product) => product.id === Number(item));
      if (itemInfo) {
        totalAmount += cartItems[item] * itemInfo.PrecioUni_prodct;
      }
    }
  }
  return totalAmount;
};

const addToCart = (product) => {
  const existingItemIndex = cartItems.findIndex(
    (item) => item.codigo === product.codigo
  );
  console.log(existingItemIndex)

  if (existingItemIndex !== -1) {
    const updatedCartItems = [...cartItems];
    updatedCartItems[existingItemIndex].quantity += 1;
    setCartItems(updatedCartItems);
  } else {
    const newItem = {
      itemId: product.id,
      quantity: 1,
      product: product,
    };
    setCartItems([...cartItems, newItem]);
  }
};


const addToCart2 = (product, price, codigo, nombre) => {
  const existingItemIndex = cartItems.findIndex((item) => item.itemId === product.id);
  const existingItemIndexPrice = cartItems.findIndex((item) => item.codigo === codigo);

  if (existingItemIndex !== -1 && existingItemIndexPrice !== -1) {
    const updatedCartItems = [...cartItems];
    updatedCartItems[existingItemIndex].quantity += 1;
    setCartItems(updatedCartItems);
  } else {
    const newItem = {
      itemId: product.id,
      quantity: 1,
      price: parseInt(price, 10),
      codigo: codigo,
      nombre:nombre,
      product: product, // Store the entire product
    };
    setCartItems([...cartItems, newItem]);
  }
};

  
const removeFromCart = (product) => {
  const existingItemIndex =cartItems.findIndex(
    (item) => item.codigo === product.codigo
  );
  if (existingItemIndex >= 0) {
    const updatedCartItems = [...cartItems];

    if (updatedCartItems[existingItemIndex].quantity > 0) {
      updatedCartItems[existingItemIndex].quantity -= 1;
      setCartItems(updatedCartItems);
    }

    // Si el valor de la cantidad llega a 0, elimina el artículo del carrito
    if (updatedCartItems[existingItemIndex].quantity === 0) {
      updatedCartItems.splice(existingItemIndex, 1);
      setCartItems(updatedCartItems);
    }
  } else {
    // Si el artículo no existe en el carrito, no hagas nada
  }
};

  
  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };
  
  const checkout = () => {
    setCartItems(getDefaultCart());
  };
  

  const contextValue = {
    cartItems,
    addToCart,
    addToCart2,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
    
  };


  return (
    <ShopContext.Provider value={contextValue}>
      {product.children}
    </ShopContext.Provider>
  );
};