import React, { useState } from "react";
import {
  ShoppingBag,
  Search,
  Menu,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Leaf,
  Home,
  ShoppingBasket,
  Heart,
  Clock,
  Settings,
  X,
} from "lucide-react";
const products = [
  {
    id: 1,
    name: "Organic Bananas",
    price: 3.99,
    unit: "bunch",
    category: "Fruits & Vegetables",
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Fresh Milk",
    price: 4.49,
    unit: "gallon",
    category: "Dairy & Eggs",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Whole Grain Bread",
    price: 3.99,
    unit: "loaf",
    category: "Bakery",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Fresh Chicken Breast",
    price: 8.99,
    unit: "lb",
    category: "Meat & Seafood",
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "Organic Avocados",
    price: 2.49,
    unit: "each",
    category: "Fruits & Vegetables",
    image:
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    name: "Sea Salt",
    price: 2.99,
    unit: "pack",
    category: "Kitchen Essentials",
    image:
      "https://images.unsplash.com/photo-1613478881426-daaadfc6a848?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 7,
    name: "Extra Virgin Olive Oil",
    price: 12.99,
    unit: "bottle",
    category: "Kitchen Essentials",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 8,
    name: "Black Peppercorns",
    price: 4.99,
    unit: "jar",
    category: "Kitchen Essentials",
    image:
      "https://images.unsplash.com/photo-1599789984422-b0ed5a0a2f8c?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 9,
    name: "Organic Honey",
    price: 8.99,
    unit: "jar",
    category: "Kitchen Essentials",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 10,
    name: "Ground Cinnamon",
    price: 3.49,
    unit: "jar",
    category: "Kitchen Essentials",
    image:
      "https://images.unsplash.com/photo-1608827408988-c9c0e9459d37?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 11,
    name: "Basmati Rice",
    price: 6.99,
    unit: "2lb bag",
    category: "Kitchen Essentials",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 12,
    name: "All-Purpose Flour",
    price: 4.49,
    unit: "5lb bag",
    category: "Kitchen Essentials",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
];
const categories = [
  "All",
  "Fruits & Vegetables",
  "Dairy & Eggs",
  "Meat & Seafood",
  "Bakery",
  "Kitchen Essentials",
  "Pantry",
];
const Page = ()=>{
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);
  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };
  return (
    <div className="min-h-screen bg-gray-50 flex">
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
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
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
        <div className="bg-green-700 text-white py-2">
          <p className="text-center text-sm">
            🌟 Free delivery on orders over $50 • Fresh deals every day!
          </p>
        </div>
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
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
                      className={`h-5 w-5 transition-colors duration-200 ${favorites.includes(product.id) ? "fill-red-500 stroke-red-500" : "stroke-gray-400 group-hover:stroke-gray-600"}`}
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
        </main>
        <footer className="bg-white mt-auto border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-green-700 flex items-center">
                  <Leaf className="h-5 w-5 mr-2" />
                  FRESH MARKET
                </h3>
                <p className="text-sm text-gray-600">
                  Your neighborhood source for fresh, quality groceries.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-green-600 hover:text-green-700">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-green-600 hover:text-green-700">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-green-600 hover:text-green-700">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-4">Store Info</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#" className="hover:text-green-700">
                      Store Locations
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-700">
                      Delivery Areas
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-700">
                      Weekly Specials
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-700">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Help & Support</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#" className="hover:text-green-700">
                      Delivery Info
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-700">
                      Return Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-700">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-700">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Fresh Deals</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Subscribe to receive weekly specials and fresh deals!
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-2 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-200"
                  />
                  <button className="px-4 py-2 bg-green-700 text-white rounded-r-lg hover:bg-green-800">
                    <Mail className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t mt-12 pt-8">
              <p className="text-center text-sm text-gray-600">
                © {new Date().getFullYear()} Fresh Market. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
export default Page;

