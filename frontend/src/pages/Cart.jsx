import React from "react";

const Cart = () => {
  // Dummy data for cart items
  const cartItems = [
    { id: 1, name: "Green T-shirt", price: 20, quantity: 2 },
    { id: 2, name: "Blue Jeans", price: 50, quantity: 1 },
    { id: 3, name: "Black Sneakers", price: 80, quantity: 1 },
  ];

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemove = (id) => {
    alert(`Removed item with ID: ${id}`); // Example remove action
  };

  return (
    <>
    {/* <div className="min-h-screen bg-black text-white flex flex-col items-center py-10"> */}
      <h1 className="text-3xl text-center font-bold text-green-500 mb-6">Your Cart</h1>
      <div className="overflow-x-auto w-[50rem]">
        <table className="table-auto w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-blue-50"
              >
                <td className="px-4 py-2 text-black">{item.name}</td>
                <td className="px-4 py-2 text-center text-black">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-center text-black">
                  {item.quantity}
                </td>
                <td className="px-4 py-2 text-center text-black">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100">
              <td
                colSpan="3"
                className="px-4 py-2 font-semibold text-right text-black"
              >
                Total:
              </td>
              <td className="px-4 py-2 text-center text-green-500 font-bold">
                ${calculateTotal().toFixed(2)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Cart;
