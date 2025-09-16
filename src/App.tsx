import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { onAuthStateChange } from './services/authService';
import { loginSuccess, logout } from './store/authSlice';
import './index.css';

const AppContent: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        dispatch(loginSuccess(user));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <main>
        <ProductList />
        <Cart />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;