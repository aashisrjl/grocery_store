import React, { useState, useEffect } from "react";
import { Package, ArrowRight, Clock, CheckCircle, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const getStatusIcon = (status) => {
  switch (status) {
    case "pending":
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case "shipped":
      return <Truck className="h-5 w-5 text-blue-500" />;
    case "delivered":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    default:
      return <Clock className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "pending":
      return "Pending";
    case "shipped":
      return "Shipped";
    case "delivered":
      return "Delivered";
    default:
      return "Unknown Status";
  }
};

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Retrieve token from cookies
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1]; // Extract token from cookie
        
        // If no token, handle authentication error (e.g., redirect to login)
        if (!token) {
          alert('No token found. Please log in.');
          return; // Optionally, redirect to login page
        }

        // Send token with request in Authorization header
        const response = await fetch("http://localhost:3000/order", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.orders) {
          setOrders(data.orders);
        } else {
          alert("Error fetching orders: " + data.message || 'Unknown error');
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <Package className="h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-medium text-gray-900 mb-2">Loading Orders...</h2>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <Package className="h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-500 text-center max-w-sm">
          Start shopping to see your orders here.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-medium text-gray-900 mb-6">My Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.orderStatus)}
                  <span className="text-sm font-medium">{getStatusText(order.orderStatus)}</span>
                </div>
              </div>
              <div className="space-y-4">
                {order.user ? (
                  <div>
                    <p className="text-sm text-gray-500">
                      User: {order.user.username} ({order.user.email})
                    </p>
                  </div>
                ) : null}
                <div>
                  <p className="text-sm text-gray-500">Shipping Address: {order.shippingAddress}</p>
                  <p className="text-sm text-gray-500">Phone Number: {order.phoneNumber}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t">
                <p className="font-medium">Total: ${order.totalAmount.toFixed(2)}</p>
                <Link to="/orderdetail">
                <button className="flex items-center space-x-2 text-green-700 hover:text-green-800 font-medium">
                  <span>Order Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
