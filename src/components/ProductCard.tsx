import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../types';
import { addToCart } from '../store/cartSlice';
import { RootState } from '../store';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleAddToCart = () => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '1rem'}}>
          {product.description.substring(0, 100)}...
        </p>
        <button
          className="btn btn-primary"
          onClick={handleAddToCart}
          style={{width: '100%'}}
        >
          장바구니에 담기
        </button>
      </div>
    </div>
  );
};

export default ProductCard;