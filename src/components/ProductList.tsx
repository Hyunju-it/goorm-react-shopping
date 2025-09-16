import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchProducts } from '../store/productSlice';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div id="products" className="container">
      <h2 style={{textAlign: 'center', margin: '2rem 0'}}>Our Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;