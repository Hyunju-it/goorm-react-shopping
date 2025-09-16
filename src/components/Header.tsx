import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/authSlice';
import { toggleCart } from '../store/uiSlice';
import LoginModal from './LoginModal';
import { logout as authLogout } from '../services/authService';

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogout = async () => {
    try {
      await authLogout();
      dispatch(logout());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="logo">Shop</div>
          <div className="nav-icons">
            <button className="icon-btn" onClick={() => dispatch(toggleCart())} title="Cart">
              🛒
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </button>
            {user ? (
              <>
                <button className="icon-btn" title="User">👤</button>
                <button className="icon-btn" onClick={handleLogout} title="Logout">🚪</button>
              </>
            ) : (
              <button className="icon-btn" onClick={() => setShowLoginModal(true)} title="Login">👤</button>
            )}
          </div>
        </nav>
      </div>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </header>
  );
};

export default Header;