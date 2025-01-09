// ProductCard.js
import React from 'react';
import { Heart } from 'lucide-react';

const ProductCard = ({ product, toggleFavorite, isFavorite }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow relative group">
      <div className="aspect-w-1 aspect-h-1 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-red-700 hover:bg-green-50"
        >
          <Heart className={`${isFavorite ? 'fill-current' : ''} h-6 w-6`} />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-600">{product.category}</p>
        <div className="flex items-center mt-4">
          <span className="text-xl font-bold">${product.price} </span>
          <span className="text-sm text-gray-500">/{product.unit}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
