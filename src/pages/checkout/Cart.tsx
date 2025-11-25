import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../redux/cartSlice';
import { Link } from 'react-router-dom';

export default function Cart() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, delta) => {
    if (delta > 0) {
      dispatch(increaseQuantity(productId));
    } else {
      dispatch(decreaseQuantity(productId));
    }
  };

  if (cart.cartItems.length === 0) {
    return (
      <div className="bg-background-light p-8 max-w-[1400px] mx-auto min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white border border-border rounded-sm shadow-sm w-full max-w-2xl">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-2xl font-semibold text-text-primary mb-2">Your Cart is Empty</h2>
          <p className="text-text-secondary mb-8">Looks like you haven't added anything to your cart yet</p>
          <Link to="/products" className="px-8 py-3 bg-primary text-white font-semibold rounded-sm no-underline transition-all hover:bg-primary-dark shadow-md">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = cart.total;
  const shipping = subtotal > 500 ? 0 : 40;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-background-light p-4 md:p-8 max-w-[1400px] mx-auto min-h-[60vh]">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-text-primary">Shopping Cart ({cart.cartItems.length} {cart.cartItems.length === 1 ? 'item' : 'items'})</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
        <div className="flex flex-col gap-4">
          {cart.cartItems.map(item => (
            <div key={item.id} className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr_auto] gap-4 md:gap-6 p-4 md:p-6 bg-white border border-border rounded-sm shadow-sm transition-all hover:shadow-md">
              <div className="w-[100px] h-[100px] md:w-[140px] md:h-[140px]">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-sm border border-border bg-gray-100" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-medium text-text-primary mb-2">{item.name}</h3>
                <p className="text-sm text-text-secondary mb-3">{item.category}</p>
                <p className="text-xl md:text-2xl font-bold text-text-primary mb-4">₹{item.price.toFixed(2)}</p>
                
                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  <div className="flex items-center gap-3 border border-border rounded-sm p-1 bg-white">
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 flex items-center justify-center border-none bg-transparent text-text-primary text-xl font-semibold cursor-pointer transition-all hover:bg-background-card-hover rounded-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                    <span className="min-w-[40px] text-center font-semibold text-text-primary">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)} className="w-8 h-8 flex items-center justify-center border-none bg-transparent text-text-primary text-xl font-semibold cursor-pointer transition-all hover:bg-background-card-hover rounded-sm">+</button>
                  </div>
                  
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-transparent text-text-secondary border border-border rounded-sm cursor-pointer transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    onClick={() => handleRemove(item.id)}
                  >
                    <span>🗑️</span> <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
              
              <div className="hidden md:block text-right">
                <p className="text-sm text-text-secondary mb-1">Subtotal</p>
                <p className="text-xl font-bold text-text-primary">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 sticky top-24">
          <div className="bg-white p-6 border border-border rounded-sm shadow-sm">
            <h3 className="text-xl font-semibold text-text-primary mb-6 pb-4 border-b border-border">Price Details</h3>
            
            <div className="flex justify-between items-center mb-4 text-text-primary">
              <span>Price ({cart.cartItems.length} items)</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center mb-4 text-text-primary">
              <span>Delivery Charges</span>
              <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
              </span>
            </div>
            
            <div className="flex justify-between items-center mb-4 text-text-primary">
              <span>Tax (GST 18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            
            <div className="h-px bg-border my-4"></div>
            
            <div className="flex justify-between items-center mb-4 text-text-primary text-xl font-bold mt-4">
              <span>Total Amount</span>
              <span className="text-primary">₹{total.toFixed(2)}</span>
            </div>
            
            {shipping === 0 && (
              <div className="bg-green-50 text-green-700 p-3 rounded-sm text-center text-sm font-medium mb-6 border border-green-100">
                You saved ₹40 on delivery!
              </div>
            )}
            
            <Link to="/checkout" className="block w-full py-4 bg-primary text-white text-center font-bold text-lg rounded-sm no-underline transition-all hover:bg-primary-dark shadow-md hover:shadow-lg mb-4">
              Proceed to Checkout
            </Link>
            
            <Link to="/products" className="block text-center text-secondary font-medium no-underline hover:underline">
              ← Continue Shopping
            </Link>
          </div>
          
          <div className="bg-white p-6 border border-border rounded-sm shadow-sm">
            <h4 className="text-lg font-semibold mb-4">🎉 Benefits</h4>
            <ul className="list-none p-0 m-0 space-y-3">
              <li className="text-text-secondary text-sm flex items-center gap-2">✓ Free delivery on orders above ₹500</li>
              <li className="text-text-secondary text-sm flex items-center gap-2">✓ 7 days easy returns</li>
              <li className="text-text-secondary text-sm flex items-center gap-2">✓ Secure payments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
