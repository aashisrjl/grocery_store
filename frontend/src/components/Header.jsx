// Header.js
import React from 'react';
import { Search, Menu, ShoppingBag } from 'lucide-react';

const Header = ({ setIsSidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 flex items-center justify-end space-x-4">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search fresh groceries..."
                className="bg-transparent border-none focus:outline-none ml-2"
              />
            </div>
            <button className="p-2 hover:bg-green-50 rounded-full relative">
              <ShoppingBag className="h-6 w-6 text-green-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
