import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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


  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto my-8">
      {product && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={`http://localhost:3000/${product.image}`}
            alt={product.name}
            className="w-full h-[600px] object-cover"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
