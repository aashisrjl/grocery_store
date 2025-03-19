import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Ensure js-cookie is installed: npm install js-cookie

function Products() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/product');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.data); // API returns { message, data: [...] }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle product deletion
  const handleDelete = async (id) => {
    const token = Cookies.get('token');
    if (!token) {
      return navigate('/login');
    }
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/product/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        alert('Product deleted successfully');
        fetchProducts(); // Refresh the product list
      } else {
        const errorData = await response.json();
        alert(`Failed to delete product: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/editproduct/${id}`);
  };

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Products</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your product inventory</p>
        <button
          onClick={() => navigate('/addproduct')}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Products Table */}
      <div className="p-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 bg-gray-50">
                  <th className="px-6 py-3">Product ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3">Unit</th>
                  <th className="px-6 py-3">Created By</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm">{product.id}</td>
                    <td className="px-6 py-4 text-sm font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-sm">
                      {product.CategoryDetails?.categoryName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      ${parseFloat(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">{product.stock}</td>
                    <td className="px-6 py-4 text-sm">{product.unit}</td>
                    <td className="px-6 py-4 text-sm">{product.user?.username || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleView(product.id)}
                        className="text-blue-600 hover:underline mr-2"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="text-green-600 hover:underline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;