import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    unit: '',
    image: '',
    stock: '',
    categoryId: '',
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/product', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        setMessage('Product added successfully!');
        setProductData({
          name: '',
          price: '',
          description: '',
          unit: '',
          image: '',
          stock: '',
          categoryId: '',
        });
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
            <label className="block text-sm font-medium mb-1">Image Filename</label>
            <input
              type="text"
              name="image"
              value={productData.image}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter image filename"
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
