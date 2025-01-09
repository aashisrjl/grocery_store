// Sidebar.js
import React, { useState } from 'react';
import { Home, ShoppingBasket, Heart, Clock, X, Leaf, Settings } from 'lucide-react';
import { categories } from '../data'; // Assuming you store category data separately

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, selectedCategory, setSelectedCategory }) => {
  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-200 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between lg:justify-center">
            <h1 className="text-xl font-bold text-green-700 flex items-center">
              <Leaf className="h-6 w-6 mr-2" />
              FRESH MARKET
            </h1>
            <button
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1 mb-8">
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
              <ShoppingBasket className="h-5 w-5" />
              <span>My Orders</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
              <Heart className="h-5 w-5" />
              <span>Favorites</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
              <Clock className="h-5 w-5" />
              <span>Order History</span>
            </button>
          </div>
          <div className="mb-4">
            <h3 className="px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
              Categories
            </h3>
          </div>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${selectedCategory === category ? "bg-green-100 text-green-700 font-medium" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <span>{category}</span>
              </button>
            ))}
          </div>
        </nav>
        <div className="p-4 border-t">
          <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
