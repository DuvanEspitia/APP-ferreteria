import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";
export const CartItem = ({data}) => {

    const { cartItems, addToCart, removeFromCart } = useContext(ShopContext)

    const countItemInCart = (codigo) => {
        let count = 0;
        for (const key in cartItems) {
            if (cartItems[key].codigo === codigo) {
               count= cartItems[key].quantity
            }
        }
        return count;
    };
    console.log(data)
    return (
        <div className="cartItem">
            <div className="img">
            {data.product && (<img  src={`data:image/jpeg;base64,${data.product.image}`} alt="Imagen de blog" />)}
            </div>
            <div className="description">

                <p>
                {data.product && <b className="p-name" >{data.product.Nom_prodct}</b>}
                <p>Codigo {data.codigo && <b className="p-name" >{data.codigo}</b>}</p> 
                <p>Tamaño {data.nombre && <b className="p-name" >{data.nombre}</b>}</p> 
                </p>
                <p>${data.price}</p>
                <div className="countHandler">
                   
                    <button className="addbutton" onClick={() => removeFromCart(data)}> -</button>
                    <input
                        className="counter-p"
                        readOnly
                        value={countItemInCart(data.codigo)}
                    />                    
                    <button className="addbutton" onClick={() => addToCart(data)}>+ </button>

                </div>
            </div>

        </div>)
}