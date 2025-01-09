import React from "react";

const OrderDetail = () => {
  // Dummy order data
  const order = {
    id: "ORD-2023-001",
    datePlaced: "11/20/2023",
    status: "Delivered",
    items: [
      {
        name: "Organic Bananas",
        quantity: 2,
        price: 3.99,
        image: "https://via.placeholder.com/100?text=Bananas",
      },
      {
        name: "Fresh Milk",
        quantity: 1,
        price: 4.49,
        image: "https://via.placeholder.com/100?text=Milk",
      },
    ],
    total: 45.94,
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-green-500 mb-6">
        Order Details
      </h1>
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-black">
            Order ID: <span className="text-blue-500">{order.id}</span>
          </h2>
          <p className="text-black">Placed on: {order.datePlaced}</p>
          <p
            className={`font-semibold mt-2 ${
              order.status === "Delivered" ? "text-green-500" : "text-red-500"
            }`}
          >
            Status: {order.status}
          </p>
        </div>
        <table className="table-auto w-full bg-gray-100 rounded-lg shadow-md">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="px-4 py-2 text-left">Item</th>
              <th className="px-4 py-2 text-center">Image</th>
              <th className="px-4 py-2 text-center">Quantity</th>
              <th className="px-4 py-2 text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 hover:bg-blue-50"
              >
                <td className="px-4 py-2 text-black">{item.name}</td>
                <td className="px-4 py-2 text-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg mx-auto"
                  />
                </td>
                <td className="px-4 py-2 text-center text-black">
                  {item.quantity}
                </td>
                <td className="px-4 py-2 text-center text-black">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <h3 className="text-lg font-bold text-black">Total:</h3>
          <p className="text-xl font-bold text-green-500">
            ${order.total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
