import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import axios from 'axios';

const categories = [
  { name: 'Vegetables', icon: '🥬', color: '#10b981' },
  { name: 'Fruits', icon: '🍎', color: '#f59e0b' },
  { name: 'Dairy', icon: '🥛', color: '#3b82f6' },
  { name: 'Bakery', icon: '🍞', color: '#a855f7' },
  { name: 'Beverages', icon: '🥤', color: '#ef4444' },
  { name: 'Staples', icon: '🌾', color: '#84cc16' },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setFeaturedProducts(res.data.slice(0, 4)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-background-light pb-8">
      <HeroBanner />

      <section className="my-8 mx-auto max-w-[1400px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl mb-6 text-text-primary font-semibold">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link 
              key={cat.name} 
              to={`/products?category=${cat.name}`}
              className="flex flex-col items-center justify-center py-8 px-6 bg-white border border-border rounded-sm no-underline transition-all shadow-sm hover:-translate-y-0.5 hover:shadow-md"
              style={{ borderColor: cat.color }}
            >
              <span className="text-5xl mb-3">{cat.icon}</span>
              <h3 className="text-text-primary text-lg font-medium">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="my-8 mx-auto max-w-[1400px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl mb-6 text-text-primary font-semibold">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map(product => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="flex flex-col bg-white border border-border rounded-sm overflow-hidden no-underline transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <img src={product.image} alt={product.name} className="w-full h-[200px] object-cover bg-gray-100" />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-sm text-text-primary mb-2 font-medium overflow-hidden text-ellipsis line-clamp-2">{product.name}</h3>
                <p className="text-xl font-bold text-text-primary">₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/products" className="block w-max mx-auto mt-8 px-8 py-3 bg-secondary text-white no-underline rounded-sm font-semibold transition-all hover:bg-secondary-dark hover:-translate-y-px hover:shadow-lg">View All Products →</Link>
      </section>
    </div>
  );
}
