import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Box, ShoppingCart, Users, CreditCard, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: BarChart3, path: '/' },
  { name: 'Products', icon: Box, path: '/products' },
  { name: 'Orders', icon: ShoppingCart, path: '/orders' },
  { name: 'Customers', icon: Users, path: '/customers' },
  { name: 'Credits', icon: CreditCard, path: '/credits' },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar on mobile

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-green-600 text-white rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 w-64 lg:w-[15%] ${
          isOpen ? 'm-0' : 'm-0 lg:m'
        }`}
      >
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
              onClick={() => setIsOpen(false)} // Close sidebar on link click (mobile)
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

export default Sidebar;