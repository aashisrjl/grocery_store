import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const EditProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    unit: '',
    stock: '',
    categoryId: '',
  });
  const [image, setImage] = useState(null); // Handle new image upload
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch categories and product data on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/category');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to fetch categories.');
      }
    };

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        const product = response.data.data;
        setProductData({
          name: product.name || '',
          price: product.price || '',
          description: product.description || '',
          unit: product.unit || '',
          stock: product.stock || '',
          categoryId: product.categoryId || '',
        });
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProduct();
  }, [id]);

  // Handle text input changes
  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission (PATCH request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    if (!token) {
      return navigate('/login');
    }

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('description', productData.description);
    formData.append('unit', productData.unit);
    formData.append('stock', productData.stock);
    formData.append('categoryId', productData.categoryId);
    if (image) {
      formData.append('image', image); // Only append new image if provided
    }

    try {
      const response = await axios.patch(`http://localhost:3000/product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setMessage('Product updated successfully!');
        setTimeout(() => navigate('/products'), 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      setMessage('Error updating product: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Edit Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter price"
              step="0.01"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter product description"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Unit</label>
            <input
              type="text"
              name="unit"
              value={productData.unit}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter unit (e.g., pcs)"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full p-3 border rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave blank to keep the existing image.
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter stock quantity"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="categoryId"
              value={productData.categoryId}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white p-3 rounded-lg font-medium hover:bg-blue-800 transition"
          >
            Update Product
          </button>

          {message && (
            <p
              className={`text-center mt-4 ${
                message.includes('Error') ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProduct;