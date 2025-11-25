import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearCart } from '../../redux/cartSlice';
import client from '../../utils/ApiClient';
import { useDispatch } from 'react-redux';

export default function Checkout() {
  const cart = useSelector(state => state.cart);
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        items: cart.cartItems,
        totalAmount: cart.totalAmount + (cart.totalAmount * 0.1) + (cart.totalAmount > 100 ? 0 : 10), // Calculate total including tax/shipping
        shippingInfo: formData,
        userId: auth.user ? auth.user.id : null
      };

      await client.post('/orders', orderData);
      dispatch(clearCart());
      alert('Order placed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const tax = cart.total * 0.1;
  const shipping = cart.total > 100 ? 0 : 10;
  const grandTotal = cart.total + tax + shipping;

  if (cart.cartItems.length === 0) {
    return (
      <div className="bg-background-light p-8 max-w-[1400px] mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">Your cart is empty</h2>
        <p className="text-text-secondary">Add some products before checkout.</p>
      </div>
    );
  }

  return (
    <div className="bg-background-light p-4 md:p-8 max-w-[1400px] mx-auto min-h-[60vh]">
      <h1 className="text-3xl font-semibold text-text-primary mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
        <div className="bg-white p-6 border border-border rounded-sm shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 pb-4 border-b border-border">Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="mb-4">
                <label className="block mb-2 font-semibold text-text-primary text-sm">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-border rounded-sm text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold text-text-primary text-sm">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-border rounded-sm text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold text-text-primary text-sm">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-border rounded-sm text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold text-text-primary text-sm">Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-3 border border-border rounded-sm text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="mb-4">
                <label className="block mb-2 font-semibold text-text-primary text-sm">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-border rounded-sm text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold text-text-primary text-sm">ZIP Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-border rounded-sm text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold text-text-primary mb-6 pb-4 border-b border-border mt-8">Payment Method</h2>
            <div className="flex flex-col gap-4 mb-8">
              <label className="flex items-center gap-3 p-4 border border-border rounded-sm cursor-pointer transition-all hover:bg-background-card-hover has-[:checked]:border-primary has-[:checked]:bg-green-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                  className="accent-primary"
                />
                <span className="font-medium">💳 Credit/Debit Card</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-border rounded-sm cursor-pointer transition-all hover:bg-background-card-hover has-[:checked]:border-primary has-[:checked]:bg-green-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleChange}
                  className="accent-primary"
                />
                <span className="font-medium">📱 UPI</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-border rounded-sm cursor-pointer transition-all hover:bg-background-card-hover has-[:checked]:border-primary has-[:checked]:bg-green-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                  className="accent-primary"
                />
                <span className="font-medium">💵 Cash on Delivery</span>
              </label>
            </div>

            <button type="submit" className="w-full py-4 bg-primary text-white font-bold text-lg rounded-sm border-none cursor-pointer transition-all hover:bg-primary-dark shadow-md hover:shadow-lg">
              Place Order
            </button>
          </form>
        </div>

        <div className="bg-white p-6 border border-border rounded-sm shadow-sm sticky top-24">
          <h2 className="text-xl font-semibold text-text-primary mb-6 pb-4 border-b border-border">Order Summary</h2>
          <div className="flex flex-col gap-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
            {cart.cartItems.map(item => (
              <div key={item.id} className="flex gap-4 items-center pb-4 border-b border-border last:border-b-0">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-sm border border-border" />
                <div>
                  <p className="font-medium text-text-primary text-sm">{item.name}</p>
                  <p className="text-xs text-text-secondary">Qty: {item.quantity}</p>
                </div>
                <p className="ml-auto font-bold text-text-primary">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex justify-between text-text-secondary text-sm">
              <span>Subtotal:</span>
              <span>₹{cart.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-text-secondary text-sm">
              <span>Tax (10%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-text-secondary text-sm">
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-text-primary mt-4 pt-4 border-t border-border">
              <span>Total:</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
