import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Cookies from 'js-cookie'; // npm install js-cookie

function Credits() {
  const [searchTerm, setSearchTerm] = useState('');
  const [creditRequests, setCreditRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter credit requests based on search term
  const filteredCredits = creditRequests.filter(
    (credit) =>
      credit.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credit.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (credit.product?.name || credit.productName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch all credit requests from API
  const fetchCredits = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:3000/credit', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch credit requests');
      }
      const data = await response.json();
      setCreditRequests(data.allCredit); // API returns { message, allCredit: [...] }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle credit request status change (approve/reject)
  const handleCreditStatus = async (creditId, status) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`http://localhost:3000/credit-handle/${creditId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        alert(`Credit request ${status} successfully`);
        fetchCredits();
      } else {
        const errorData = await response.json();
        alert(`Failed to update credit status: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating credit status:', error);
      alert('Error updating credit status. Please try again.');
    }
  };

  // Handle credit deletion
  const handleDelete = async (creditId) => {
    if (!window.confirm('Are you sure you want to delete this credit request?')) return;
    try {
      const token = Cookies.get('token');
      const response = await fetch(`http://localhost:3000/credit/${creditId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        alert('Credit request deleted successfully');
        fetchCredits();
      } else {
        const errorData = await response.json();
        alert(`Failed to delete credit request: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting credit request:', error);
      alert('Error deleting credit request. Please try again.');
    }
  };

  // Fetch credits on component mount
  useEffect(() => {
    fetchCredits();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Credit Requests</h2>
        <p className="text-sm text-gray-500 mt-1">Manage customer refund and credit requests</p>
      </div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Credits Table */}
      <div className="p-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading credit requests...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : filteredCredits.length === 0 ? (
          <p className="text-center text-gray-500">No credit requests found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 bg-gray-50">
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Address</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Payment</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCredits.map((credit) => (
                  <tr
                    key={credit.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm">{credit.id}</td>
                    <td className="px-6 py-4 text-sm">{credit.username}</td>
                    <td className="px-6 py-4 text-sm">{credit.email}</td>
                    <td className="px-6 py-4 text-sm">{credit.phone || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm">{credit.address || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm">
                      {credit.product?.name || credit.productName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      ${parseFloat(credit.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          credit.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : credit.status === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {credit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          credit.isPaid === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {credit.isPaid}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {credit.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleCreditStatus(credit.id, 'approved')}
                            className="text-green-600 hover:underline mr-2"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleCreditStatus(credit.id, 'rejected')}
                            className="text-red-600 hover:underline mr-2"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(credit.id)}
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

export default Credits;