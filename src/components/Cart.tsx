import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { closeCart } from '../store/uiSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(closeCart());
    }
  };

  if (!user) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="cart-modal">
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <button className="close-btn" onClick={() => dispatch(closeCart())}>×</button>
          </div>
          <div className="cart-content">
            <p>Please login to view your cart.</p>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="cart-modal">
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <button className="close-btn" onClick={() => dispatch(closeCart())}>×</button>
          </div>
          <div className="cart-content">
            <p>Your cart is empty.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={() => dispatch(closeCart())}>×</button>
        </div>
        <div className="cart-content">
          <div className="cart-items">
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
                <div className="cart-item-actions">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <h3>Total: ${total.toFixed(2)}</h3>
            <div className="cart-actions">
              <button className="btn btn-primary" onClick={() => dispatch(clearCart())}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;