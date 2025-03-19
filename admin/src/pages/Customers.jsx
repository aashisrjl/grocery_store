import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Cookies from 'js-cookie'; // Ensure js-cookie is installed: npm install js-cookie

function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch customers from API
  const fetchCustomers = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:3000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data.user); // API returns { message, userCount, user: [...] }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Customers</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your customer base</p>
      </div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Customers Table */}
      <div className="p-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading customers...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : filteredCustomers.length === 0 ? (
          <p className="text-center text-gray-500">No customers found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 bg-gray-50">
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm">{customer.id}</td>
                    <td className="px-6 py-4 text-sm font-medium">{customer.username}</td>
                    <td className="px-6 py-4 text-sm">{customer.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          customer.role === 'admin'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {customer.role}
                      </span>
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

export default Customers;