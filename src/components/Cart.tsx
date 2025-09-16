import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return (
      <div id="cart" className="container">
        <h2>Shopping Cart</h2>
        <p>Please login to view your cart.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div id="cart" className="container">
        <h2>Shopping Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div id="cart" className="container">
      <h2 style={{margin: '2rem 0'}}>Shopping Cart</h2>
      <div>
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="cart-item-info">
              <h4>{item.title}</h4>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={() => dispatch(updateQuantity({id: item.id, quantity: item.quantity - 1}))}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => dispatch(updateQuantity({id: item.id, quantity: item.quantity + 1}))}
              >
                +
              </button>
            </div>
            <div>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
              <button
                className="btn btn-danger"
                onClick={() => dispatch(removeFromCart(item.id))}
                style={{marginTop: '0.5rem'}}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop: '2rem', textAlign: 'right'}}>
        <h3>Total: ${total.toFixed(2)}</h3>
        <div style={{marginTop: '1rem'}}>
          <button className="btn btn-secondary" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
          <button className="btn btn-primary" style={{marginLeft: '1rem'}}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;