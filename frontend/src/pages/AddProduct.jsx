import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    unit: '',
    stock: '',
    categoryId: '',
  });
  const [image, setImage] = useState(null); // Handle image separately
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/category');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the file object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    if (!token) {
      return navigate("/login");
    }

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('description', productData.description);
    formData.append('unit', productData.unit);
    formData.append('stock', productData.stock);
    formData.append('categoryId', productData.categoryId);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:3000/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setMessage('Product added successfully!');
        setProductData({
          name: '',
          price: '',
          description: '',
          unit: '',
          stock: '',
          categoryId: '',
        });
        setImage(null);
      }
    } catch (error) {
      setMessage('Error adding product: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Add New Product</h1>
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
              type="text"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter price"
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
              required
            />
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
            Add Product
          </button>

          {message && (
            <p className="text-green-600 mt-4 text-center">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
