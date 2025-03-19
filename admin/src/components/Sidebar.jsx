import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Box, ShoppingCart, Users, CreditCard } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: BarChart3, path: '/' },
  { name: 'Products', icon: Box, path: '/products' },
  { name: 'Orders', icon: ShoppingCart, path: '/orders' },
  { name: 'Customers', icon: Users, path: '/customers' },
  { name: 'Credits', icon: CreditCard, path: '/credits' },
];

function Sidebar() {
  return (
    <div className="fixed inset-y-0 left-0 w-[15%] bg-white shadow-lg m">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-green-600">Fresh Market</h1>
        <p className="text-sm text-gray-500">Admin Dashboard</p>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 ${
                isActive ? 'bg-green-50 text-green-600' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;