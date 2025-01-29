import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderComponent from "../components/OrderComponent";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        setProduct(response.data.data);
      } catch (err) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async (productId) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        alert("Please log in to add items to the cart.");
        return;
      }

      await axios.post(
        `http://localhost:3000/cart`,
        { productId, quantity: 1 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Item added to cart!");
    } catch (err) {
      alert("Failed to add item to cart.");
    }
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto my-8">
      {product && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={`http://localhost:3000/${product.image}`}
            alt={product.name}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-green-600 text-xl font-bold">
                ${product.price}/{product.unit}
              </p>
                <p className="text-gray-600 mt-1">
                  Category: {product.CategoryDetails.categoryName}
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="flex gap-4">
              <button
                className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
                onClick={() => handleAddToCart(product.id)}
              >
                Add to Cart
              </button>
              < OrderComponent productId={product.id} totalAmount={product.price} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
