import * as React from "react";
import { Link } from "react-router-dom";
import "./ShoppingList.css"

export default function ShoppingList({ cart, setCart }) {
    const [totalPrice, setTotalPrice] = React.useState(0);
  
    React.useEffect(() => {
      setTotalPrice(
        cart
          ? cart.reduce((total, item) => total + item.price * item.quantity, 0)
          : 0
      );
    }, [cart]);
  
    function decrementQuantity(productId) {
      let updatedCart = cart.map((item) => {
        if (item.id === productId && item.quantity >= 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
      updatedCart = updatedCart?.filter((item) => item.quantity > 0);
      setCart(updatedCart);
    }
  
    return (
      <div className="shopping-list">
        {cart?.map(
          (item) =>
            item.quantity > 0 && (
                <div key={item.id} className="shopping-list-item">
                <button onClick={() => decrementQuantity(item.id)}>-</button>
                <Link className="cart-link" to={"products/" + item.id}>
                  <span className="item-name">{item.name}</span>
                </Link>
                <span className="item-quantity">Qty: {item.quantity}</span>
                <span className="item-price">
                  Price: ${item.price.toFixed(2)}
                </span>
              </div>
            )
        )}
        {totalPrice > 0 ? (
          <>
            <div className="total-price">Subtotal: ${totalPrice.toFixed(2)}</div>
            <div className="total-price">
              Taxes: ${(totalPrice * 0.0875).toFixed(2)}
            </div>
            <div className="total-price">
              Total: ${(totalPrice + totalPrice * 0.0875).toFixed(2)}
            </div>
          </>
        ) : (
          <div>No Items in Shopping List</div>
        )}
      </div>
    );
  }
  
