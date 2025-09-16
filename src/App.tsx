import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState } from './store';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { onAuthStateChange } from './services/authService';
import { loginSuccess, logout } from './store/authSlice';
import './index.css';

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector((state: RootState) => state.ui);

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
      </main>
      {isCartOpen && <Cart />}
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