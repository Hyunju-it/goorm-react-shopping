import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/authSlice';
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
          <div className="logo">React Shopping</div>
          <ul className="nav-links">
            <li><a href="#products">Products</a></li>
            <li>
              <a href="#cart">Cart ({cartItemCount})</a>
            </li>
            {user ? (
              <>
                <li>Hello, {user.email}</li>
                <li>
                  <button className="btn btn-secondary" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button className="btn btn-primary" onClick={() => setShowLoginModal(true)}>
                  Login
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </header>
  );
};

export default Header;