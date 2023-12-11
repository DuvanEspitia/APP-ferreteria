import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../context/shop-context";
import { CartItem } from "./cart-item";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import logop from "../img/mercapa.png"
export const Cart = () => {
   const { cartItems } = useContext(ShopContext);
   const [hasItemsInCart, setHasItemsInCart] = useState(false);
   const [totalAmount, setTotalAmount] = useState(0);
  

   const navigate = useNavigate();

   useEffect(() => {
      let newTotalAmount = 0;
      let hasItems = false;

      for (const cartItem of cartItems) {
         if (typeof cartItem.price != "") {
            const itemTotal = cartItem.price * cartItem.quantity;
            newTotalAmount += itemTotal;
            hasItems = true;
         }
      }

      setTotalAmount(newTotalAmount);
      setHasItemsInCart(hasItems);
   }, [cartItems]);

   return (
      <div className="cart">
         <br />
         <div>
            <h1>Tus artículos seleccionados</h1>
         </div>

         <div className="cartItems">
            {Object.values(cartItems).map((item) => {
               if (item.quantity > 0) {
                  return <CartItem key={item.id} data={item} />;
               }
               return null;
            })}
         </div>

         {hasItemsInCart ? (
            <div className="checkout">
               <div className="total-m">
                  <p>Subtotal: ${totalAmount}</p>
               </div>
               <div className="centrar">
                  <button onClick={() => navigate("/tienda")}>Continuar comprando </button>
                  {cartItems.some((item) => item.price === 0) ? (
                     <button disabled>Precio no definido</button>
                  ) : (
                     <button onClick={() => navigate("/compra/datos")} >
                        Ir a pagar
                     </button>
                  )} </div>
            </div>
         ) : (
            <h1>Tu carro está vacío</h1>
         )}
      </div>
   );
};
