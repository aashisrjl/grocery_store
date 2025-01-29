import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrderComponent from "../components/OrderComponent";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('token='))
          ?.split('=')[1];

        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get("http://localhost:3000/cart", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data.data);
      } catch (error) {
        setError("Failed to load cart data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handleRemove = async (id) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      await axios.delete(`http://localhost:3000/cart/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // setCartItems(cartItems.filter((item) => item.id !== id));
      navigate("/cart");
    } catch (error) {
      alert("Failed to remove item.");
    }
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative or zero quantity

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      await axios.patch(
        `http://localhost:3000/cart/${id}`,
        { quantity: newQuantity },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setCartItems((prevItems) =>
      //   prevItems.map((item) =>
      //     item.id === id ? { ...item, quantity: newQuantity } : item
      //   )
      // );
      navigate("/cart")
    } catch (error) {
      alert("Failed to update quantity.");
    }
  };

  if (loading) {
    return <div>Loading cart data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1 className=" text-3xl text-center font-bold text-green-500 mb-6">
        Your Cart
      </h1>
      <div className=" overflow-x-auto w-[90rem]">
        <table className=" w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-green-500 text-white">
            <th className="px-4 py-2 text-left">Image</th>
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
                <td className="px-4 py-2 text-black"> <img height={24} width={24} src={`http://localhost:3000/${item.product.image}` } alt={item.product.name}  /> </td>
                <td className="px-4 py-2 text-black">{item.product.name}</td>
                <td className="px-4 py-2 text-center text-black">
                  ${parseFloat(item.product.price).toFixed(2)}
                </td>
                <td className="px-4 py-2 text-center text-black flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="px-2 py-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="px-2 py-1 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                  >
                    +
                  </button>
                </td>
                <td className="px-4 py-2 text-center text-black">
                  ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                </td>
                <td className="flex justify-center align-center gap-2">
                  <button
                    onClick={() => handleRemove(item.product.id)}
                    className="bg-red-500 text-white px-4 h-10 mt-2 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                  < OrderComponent productId={item.product.id} totalAmount={item.product.price} />
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
