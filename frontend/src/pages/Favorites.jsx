import React from "react";
import { Heart } from "lucide-react";

export function Favorites({
  products,
  favorites,
  toggleFavorite,
}) {
  const favoritedProducts = products.filter((product) =>
    favorites.includes(product.id),
  );
  if (favoritedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <Heart className="h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-medium text-gray-900 mb-2">
          No favorites yet
        </h2>
        <p className="text-gray-500 text-center max-w-sm">
          Start adding your favorite items by clicking the heart icon on
          products you love.
        </p>
      </div>
    );
  }
  return (
    <div className="py-8">
      <h2 className="text-2xl font-medium text-gray-900 mb-6">My Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoritedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow relative group"
          >
            <div className="aspect-w-1 aspect-h-1 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(product.id);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors duration-200 group"
              >
                <Heart
                  className={`h-5 w-5 transition-colors duration-200 fill-red-500 stroke-red-500`}
                />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <div className="mt-2 flex justify-between items-center">
                <p className="font-medium">
                  ${product.price}/{product.unit}
                </p>
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
