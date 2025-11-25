import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { addToCart } from '../../redux/cartSlice';
import axios from 'axios';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];
    
    // Category filter
    const categoryParam = searchParams.get('category');
    const category = categoryParam || selectedCategory;
    if (category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange, sortBy, searchParams]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return <div className="product-list"><h2>Loading products...</h2></div>;
  }

  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-[1400px] mx-auto my-8 px-4 md:px-8">
      <aside className="w-full md:w-[260px] shrink-0 bg-white p-6 rounded-sm border border-border h-fit md:sticky md:top-[130px] shadow-sm">
        <h3 className="text-xl mb-6 text-text-primary font-semibold">Filters</h3>
        
        <div className="mb-6 pb-6 border-b border-border last:border-b-0">
          <label className="block mb-2 font-semibold text-text-primary text-sm">Category</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-border rounded-sm bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-6 pb-6 border-b border-border last:border-b-0">
          <label className="block mb-2 font-semibold text-text-primary text-sm">Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full"
          />
        </div>

        <div className="mb-6 pb-6 border-b border-border last:border-b-0">
          <label className="block mb-2 font-semibold text-text-primary text-sm">Sort By</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border border-border rounded-sm bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </aside>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-6 p-4 bg-white border border-border rounded-sm">
          <h2 className="text-2xl text-text-primary font-semibold">Products</h2>
          <p className="text-text-secondary text-sm">{filteredProducts.length} products found</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="flex flex-col bg-white border border-border rounded-sm overflow-hidden no-underline transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full h-[200px] object-cover bg-gray-100" />
              </Link>
              <div className="p-4 flex-1 flex flex-col">
                <Link to={`/product/${product.id}`} className="no-underline">
                  <h3 className="text-sm text-text-primary mb-2 font-medium overflow-hidden text-ellipsis line-clamp-2 hover:text-secondary transition-colors">{product.name}</h3>
                </Link>
                <p className="text-xs text-text-secondary mb-3 overflow-hidden text-ellipsis line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xl font-bold text-text-primary">₹{product.price}</span>
                  <button 
                    className="px-4 py-2 bg-primary text-white border-none rounded-sm text-sm font-semibold cursor-pointer transition-all hover:bg-primary-dark"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
