export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export interface CartState {
  items: CartItem[];
  total: number;
}