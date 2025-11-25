import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import client from '../../utils/ApiClient';

export default function Orders() {
  const { user } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      client.get(`/orders/user/${user.id}`)
        .then(res => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-[1400px] mx-auto p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Please login to view your orders</h2>
      </div>
    );
  }

  if (loading) {
    return <div className="max-w-[1400px] mx-auto p-8 text-center">Loading orders...</div>;
  }

  return (
    <div className="bg-background-light min-h-screen p-4 md:p-8">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-3xl font-semibold text-text-primary mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white p-8 rounded-sm border border-border text-center">
            <p className="text-text-secondary text-lg">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white border border-border rounded-sm shadow-sm overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-border flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <p className="text-sm text-text-secondary font-medium uppercase tracking-wider">Order ID</p>
                    <p className="font-semibold text-text-primary">#{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary font-medium uppercase tracking-wider">Date</p>
                    <p className="font-semibold text-text-primary">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary font-medium uppercase tracking-wider">Total Amount</p>
                    <p className="font-semibold text-text-primary">₹{order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">Items</h3>
                  <div className="flex flex-col gap-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center border-b border-border last:border-0 pb-2 last:pb-0">
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-sm border border-border" />
                          <div>
                            <p className="font-medium text-text-primary text-sm">{item.name}</p>
                            <p className="text-xs text-text-secondary">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium text-text-primary text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
