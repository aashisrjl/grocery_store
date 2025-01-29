import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import OrderFormModal from "./OrderFormModal";

const OrderComponent = ({ productId,totalAmount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleBuyNowClick = () => {
    setIsModalOpen(true);
  };

  const handlePlaceOrder = async (orderData) => {
    const token = Cookies.get("token");

    if (!token) {
      alert("Please login to place an order.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/order", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(response.data.message);
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order.");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-600 text-white px-4 py-2 my-2 rounded-xl"
        onClick={handleBuyNowClick}
      >
        Buy Now
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {isModalOpen && (
        <OrderFormModal
          onClose={() => setIsModalOpen(false)}
          onPlaceOrder={handlePlaceOrder}
          productId={productId}
          totalAmount={totalAmount}
        />
      )}
    </div>
  );
};

export default OrderComponent;
