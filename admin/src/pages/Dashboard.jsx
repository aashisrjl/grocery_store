import React from 'react';
import { DollarSign, ShoppingCart, Box, Users } from 'lucide-react';

function Dashboard() {
  const stats = [
    { title: 'Total Sales', value: '$12,426', icon: DollarSign, change: '+12%' },
    { title: 'Total Orders', value: '156', icon: ShoppingCart, change: '+8%' },
    { title: 'Total Products', value: '89', icon: Box, change: '+23%' },
    { title: 'Active Users', value: '2,345', icon: Users, change: '+18%' },
  ];

  // Dummy data for orders
  const orders = [
    {
      id: '#ORD-1234',
      customer: 'John Doe',
      total: 156.00,
      status: 'Delivered',
      date: '2024-03-15',
    },
    {
      id: '#ORD-1235',
      customer: 'Jane Smith',
      total: 89.00,
      status: 'Processing',
      date: '2024-03-17',
    },
    {
      id: '#ORD-1236',
      customer: 'Bob Wilson',
      total: 245.00,
      status: 'Pending',
      date: '2024-03-18',
    },
    {
      id: '#ORD-1237',
      customer: 'Alice Brown',
      total: 178.00,
      status: 'Delivered',
      date: '2024-03-16',
    },
  ];

  // Dummy data for products
  const products = [
    {
      id: 'PRD-001',
      name: 'Organic Bananas',
      category: 'Fruits',
      price: 4.99,
      stock: 150,
      unit: 'bunch',
      status: 'In Stock',
      sales: 234,
    },
    {
      id: 'PRD-002',
      name: 'Fresh Milk',
      category: 'Dairy',
      price: 3.99,
      stock: 80,
      unit: 'liter',
      status: 'In Stock',
      sales: 567,
    },
    {
      id: 'PRD-003',
      name: 'Whole Grain Bread',
      category: 'Bakery',
      price: 5.99,
      stock: 45,
      unit: 'loaf',
      status: 'Low Stock',
      sales: 123,
    },
    {
      id: 'PRD-004',
      name: 'Organic Eggs',
      category: 'Dairy',
      price: 6.99,
      stock: 200,
      unit: 'dozen',
      status: 'In Stock',
      sales: 345,
    },
    {
      id: 'PRD-005',
      name: 'Fresh Vegetables Bundle',
      category: 'Vegetables',
      price: 15.99,
      stock: 30,
      unit: 'bundle',
      status: 'Low Stock',
      sales: 89,
    },
  ];

  const lowStockProducts = products.filter((product) => product.status === 'Low Stock');

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <stat.icon className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4">{stat.change} from last month</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="py-3">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'Processing'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alert Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Low Stock Alert</h2>
          <div className="space-y-4">
            {lowStockProducts.map((product) => (
              <div key={product.name} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">
                    {product.stock} {product.unit}s left
                  </p>
                </div>
                <div className="h-2 w-24 rounded-full bg-yellow-200">
                  <div
                    className="h-full rounded-full bg-yellow-500"
                    style={{
                      width: `${Math.min((product.stock / 100) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;