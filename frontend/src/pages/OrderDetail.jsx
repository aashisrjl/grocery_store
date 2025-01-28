import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetail = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = Cookies.get("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/order/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderData(response.data.orderDetailsData[0]);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>{error}</p>
      </div>
    );
  }

  if (!orderData) return null;

  const { order, product } = orderData;
  const { payment, user } = order;

  return (
    <div className="min-h-screen text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-green-500 mb-6">Order Details</h1>
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-black">
            Order ID: <span className="text-blue-500">{order.id}</span>
          </h2>
          <p className="text-black">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p className="text-black">Shipping Address: {order.shippingAddress}</p>
          <p className={`font-semibold mt-2 ${order.orderStatus === "Delivered" ? "text-green-500" : "text-red-500"}`}>
            Status: {order.orderStatus}
          </p>
        </div>

        <table className="table-auto w-full bg-gray-100 rounded-lg shadow-md">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="px-4 py-2 text-left">Payment Method</th>
              <th className="px-4 py-2 text-center">Payment Status</th>
              <th className="px-4 py-2 text-center">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300 hover:bg-blue-50">
              <td className="px-4 py-2 text-black">{payment.paymentMethod}</td>
              <td className={`px-4 py-2 text-center ${payment.paymentStatus === "unpaid" ? "text-red-500" : "text-green-500"}`}>
                {payment.paymentStatus}
              </td>
              <td className="px-4 py-2 text-center text-black">
                ${order.totalAmount.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <h3 className="text-lg font-bold text-black">Customer Details:</h3>
          <p className="text-black">
            {user.username} ({user.email})
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-black">Product Details:</h3>
          <p className="text-black">Name: {product.name}</p>
          <p className="text-black">Description: {product.description}</p>
          <p className="text-black">Unit: {product.unit}</p>
          <p className="text-black">Price: ${parseFloat(product.price).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
