import React, { useState } from "react";

const OrderFormModal = ({ onClose, onPlaceOrder, productId,totalAmount }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      phoneNumber,
      shippingAddress,
      totalAmount: parseFloat(totalAmount),
      paymentMethod,
      items: [
        {
          quantity: parseInt(quantity),
          productId: parseInt(productId),
        },
      ],
    };

    onPlaceOrder(orderData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Order Form</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Phone Number:
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </label>

          <label className="block mb-2">
            Shipping Address:
            <input
              type="text"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </label>

          {/* <label className="block mb-2">
            Total Amount:
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </label> */}

          <label className="block mb-2">
            Payment Method:
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              required
            >
              <option value="khalti">Khalti</option>
              <option value="esewa">Esewa</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </label>

          <label className="block mb-2">
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </label>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderFormModal;
