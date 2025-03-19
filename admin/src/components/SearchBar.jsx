import React from 'react';
import { Search, Filter } from 'lucide-react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
        <Filter className="h-5 w-5" />
        Filter
      </button>
    </div>
  );
}

export default SearchBar;