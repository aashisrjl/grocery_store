import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Cookies from 'js-cookie'; // npm install js-cookie

function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 5,
    totalOrders: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch orders from API
  const fetchOrders = async (page = 1) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(
        `http://localhost:3000/order/paging?page=${page}&perPage=${pagination.perPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.orders);
      setPagination(data.pagination);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle order cancellation
  const handleCancel = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      const token = Cookies.get('token');
      const response = await fetch(`http://localhost:3000/order-cancel/${orderId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        alert('Order canceled successfully');
        fetchOrders(pagination.currentPage);
      } else {
        const errorData = await response.json();
        alert(`Failed to cancel order: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error canceling order:', error);
      alert('Error canceling order. Please try again.');
    }
  };

  // Handle order status change (admin only)
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`http://localhost:3000/order-status/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      if (response.ok) {
        alert('Order status updated successfully');
        fetchOrders(pagination.currentPage);
      } else {
        const errorData = await response.json();
        alert(`Failed to update status: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status. Please try again.');
    }
  };

  // Handle payment status change (admin only)
  const handlePaymentStatusChange = async (orderId, newStatus) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`http://localhost:3000/order-payment/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentStatus: newStatus }),
      });
      if (response.ok) {
        alert('Payment status updated successfully');
        fetchOrders(pagination.currentPage);
      } else {
        const errorData = await response.json();
        alert(`Failed to update payment status: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Error updating payment status. Please try again.');
    }
  };

  // Handle order deletion (admin only)
  const handleDelete = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      const token = Cookies.get('token');
      const response = await fetch(`http://localhost:3000/order/${orderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        alert('Order deleted successfully');
        fetchOrders(pagination.currentPage);
      } else {
        const errorData = await response.json();
        alert(`Failed to delete order: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Error deleting order. Please try again.');
    }
  };

  // Fetch orders on mount and page change
  useEffect(() => {
    fetchOrders(pagination.currentPage);
  }, [pagination.currentPage]);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Orders</h2>
        <p className="text-sm text-gray-500 mt-1">Track and manage customer orders</p>
      </div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Orders Table */}
      <div className="p-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 bg-gray-50">
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Address</th>
                    <th className="px-6 py-3">Total</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Payment Method</th>
                    <th className="px-6 py-3">Payment Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm">{order.id}</td>
                      <td className="px-6 py-4 text-sm">{order.user.username}</td>
                      <td className="px-6 py-4 text-sm">{order.phoneNumber}</td>
                      <td className="px-6 py-4 text-sm">{order.shippingAddress}</td>
                      <td className="px-6 py-4 text-sm">${order.totalAmount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="preparation">Preparation</option>
                          <option value="ontheway">On the Way</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm">{order.payment.paymentMethod}</td>
                      <td className="px-6 py-4">
                        <select
                          value={order.payment.paymentStatus}
                          onChange={(e) =>
                            handlePaymentStatusChange(order.id, e.target.value)
                          }
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option value="paid">Paid</option>
                          <option value="unpaid">Unpaid</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {order.orderStatus === 'pending' && (
                          <button
                            onClick={() => handleCancel(order.id)}
                            className="text-orange-600 hover:underline mr-2"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {filteredOrders.length} of {pagination.totalOrders} orders
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => fetchOrders(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className={`px-3 py-1 rounded ${
                    pagination.hasPrevPage
                      ? 'bg-gray-200 hover:bg-gray-300'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Previous
                </button>
                <span className="px-3 py-1">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => fetchOrders(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className={`px-3 py-1 rounded ${
                    pagination.hasNextPage
                      ? 'bg-gray-200 hover:bg-gray-300'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Orders;