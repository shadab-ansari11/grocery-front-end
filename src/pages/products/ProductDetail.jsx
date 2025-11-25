import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import client from '../../utils/ApiClient';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    client.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setSelectedImage(0);
      })
      .catch(err => console.error(err));

    client.get('/products')
      .then(res => setRelatedProducts(res.data.slice(0, 4)))
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
      alert('Added to cart!');
    }
  };

  if (!product) return <div className="loading">Loading...</div>;

  const images = [product.image, product.image, product.image]; // Mock multiple images

  return (
    <div className="bg-background-light pb-8">
      <div className="flex flex-col md:flex-row gap-8 max-w-[1400px] mx-auto my-8 px-4 md:px-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="w-full aspect-square bg-white border border-border rounded-sm overflow-hidden flex items-center justify-center">
            <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-contain" />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${index + 1}`}
                className={`w-20 h-20 object-cover border border-border rounded-sm cursor-pointer transition-all ${selectedImage === index ? 'border-primary opacity-100 ring-2 ring-primary' : 'opacity-70 hover:opacity-100'}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
            <span className="text-text-secondary text-sm">(4.5/5)</span>
          </div>
          <p className="text-3xl font-bold text-text-primary mb-6">₹{product.price}</p>
          <p className="text-text-secondary text-base leading-relaxed mb-8">{product.description}</p>

          <div className="mb-8 border-t border-b border-border py-6">
            <div className="mb-6 last:mb-0">
              <label className="block font-semibold text-text-primary mb-3">Quantity:</label>
              <div className="flex items-center border border-border rounded-sm w-max">
                <button className="w-10 h-10 flex items-center justify-center bg-gray-50 border-none cursor-pointer hover:bg-gray-100 text-lg" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button className="w-10 h-10 flex items-center justify-center bg-gray-50 border-none cursor-pointer hover:bg-gray-100 text-lg" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button className="flex-1 py-4 bg-primary text-white text-lg font-bold rounded-sm border-none cursor-pointer transition-all hover:bg-primary-dark shadow-md hover:shadow-lg" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="flex-1 py-4 bg-secondary text-white text-lg font-bold rounded-sm border-none cursor-pointer transition-all hover:bg-secondary-dark shadow-md hover:shadow-lg">Buy Now</button>
          </div>

          <div className="text-sm text-text-secondary space-y-2">
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Stock:</strong> {product.stock} items available</p>
          </div>
        </div>
      </div>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 border-t border-border">
        <h2 className="text-2xl font-bold mb-6 text-text-primary">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedProducts.map(p => (
            <Link key={p.id} to={`/product/${p.id}`} className="flex flex-col bg-white border border-border rounded-sm overflow-hidden no-underline transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <img src={p.image} alt={p.name} className="w-full h-[200px] object-cover bg-gray-100" />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-sm text-text-primary mb-2 font-medium overflow-hidden text-ellipsis line-clamp-2">{p.name}</h3>
                <p className="text-xl font-bold text-text-primary">₹{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
