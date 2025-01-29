import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
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
  LogIn,
  LucideLogIn,
  LogOut,
  CreditCard,
  ShoppingCart,
  MailIcon,
  HelpCircle,
  ContactIcon,
  SubscriptIcon,
  MailCheckIcon,
} from "lucide-react";
import { Favorites } from "./Favorites";
import { Orders } from "./Orders";
import SettingPage from "./Setting";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Cart from "./Cart";
import OrderDetail from "./OrderDetail";
import ProductDetail from "./ProductDetail";
import Banner from "../components/Banner";
import axios from "axios";
import Credit from "./Credit";
import Footer from "../components/Footer";
import Contact from "./Contact";
import FAQ from "./faq";
import HelpSupport from "./Help";
import AddProduct from "./AddProduct";

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [categories,setCategories] = useState([])
  const [products,setProducts] = useState([])
  console.log(products)

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.CategoryDetails.categoryName === selectedCategory);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/logout`,{
        withCredentials: true
      });
      console.log(response)
  
      if (response.status === 200) {
        // Assuming successful logout redirects to login
        window.location.href='/login';
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  
  const getCategory = async () => {
    try {
      const response = await axios.get('http://localhost:3000/category');
      if (response.status === 200) {
        setCategories(response.data.categories); // Access the categories array correctly
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getProduct = async()=>{
    try {
      const response = await axios.get(`http://localhost:3000/product`);
      if(response.status === 200){
        setProducts(response.data.data)
      }
    } catch (error) {
      console.log('error fetching product', error)
      
    }
  }
  useEffect(()=>{
    getCategory();
    getProduct();
  },[]);

  //add to cart
  const handleAddToCart = async (productId) => {
    try {
      const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1]; 
  
  if (!token) {
    window.location.href='/login';
    return; 
  }

      const response = await axios.post("http://localhost:3000/cart", {
        productId: productId,
        quantity: 1,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      
      });
      window.location.href='/cart';
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  
  

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside
  className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r transform ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  } lg:translate-x-0 transition-transform duration-200 ease-in-out`}
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
        <Link
          to="/"
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>
           {/* Dropdown for Category */}
           <div className="mt-10 p-3">
          <label htmlFor="category" className="block text-gray-700">
            Category
          </label>
          <select
            id="category"
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <Link
          to="/favorites"
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
        >
          <Heart className="h-5 w-5" />
          <span>Favorites</span>
        </Link>
        <Link
          to="/orders"
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
        >
          <ShoppingBasket className="h-5 w-5" />
          <span>My Orders</span>
        </Link>

        <Link
          to="/credits"
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
        >
          <CreditCard className="h-5 w-5" />
          <span>Credits</span>
        </Link>
        <Link
          to="/cart"
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Cart Item</span>
        </Link>
        <Link
          to="/help"
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
        >
          <MailIcon className="h-5 w-5" />
          <span>Help & Support</span>
        </Link>

        <Link
          to="/faq"
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
        >
          <HelpCircle className="h-5 w-5" />
          <span>FAQs</span>
        </Link>

        <Link
          to="/contact"
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
        >
          <ContactIcon className="h-5 w-5" />
          <span>Contact</span>
        </Link>

        <Link
          to="/subscribe"
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
        >
          <MailCheckIcon className="h-5 w-5" />
          <span>Subscribe</span>
        </Link>

        {/* Check if token exists */}
        {document.cookie.includes("token") ? (
          <>
            <button
              className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
            <Link
              to="/settings"
              className="w-full border-t-2 flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
            <Link
              to="/register"
              className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <LucideLogIn className="h-5 w-5" />
              <span>Register Now</span>
            </Link>
          </>
        )}

     
      </div>
    </nav>
  
  </div>
</aside>
        {/* Main Content */}
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
                  <Link
                    to="/cart"
                    className="p-2 hover:bg-green-50 rounded-full relative"
                  >
                    <ShoppingBag className="h-6 w-6 text-green-700" />
                  </Link>
                </div>
              </div>
            </div>
          </header>
          <Banner content="You'd get 50% off in upto Rs 2000 purchase" />
        

          {/* Routes */}
          <main className="flex-1  px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow relative group"
                      >
                        <Link to={`productdetail/${product.id}`}>
                        <div className="aspect-w-1 aspect-h-1 relative">
                          <img
                            src={`http://localhost:3000/${product.image}`}
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
                              className={`h-5 w-5 transition-colors duration-200 ${
                                favorites.includes(product.id)
                                  ? "fill-red-500 stroke-red-500"
                                  : "stroke-gray-400 group-hover:stroke-gray-600"
                              }`}
                            />
                          </button>
                        </div>
                        </Link>
                        <div className="p-4">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-500">
                            {product.CategoryDetails.categoryName}
                          </p>
                          <div className="mt-2 flex justify-between items-center">
                            <p className="font-medium">
                              ${product.price}/{product.unit}
                            </p>
                            <button className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200" 
                             onClick={() => handleAddToCart(product.id)}>
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                }
              />
                
              <Route path="/favorites" element={<Favorites products={products} favorites={favorites} toggleFavorite={toggleFavorite}  />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/settings" element={<SettingPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/credits" element={< Credit />} />
              <Route path="/contact" element={< Contact />} />
              <Route path="/faq" element={< FAQ />} />
              <Route path="/help" element={< HelpSupport />} />
              <Route path="/addproduct" element={< AddProduct />} />
              <Route path="/orderdetail/:id" element={<OrderDetail />} />
              <Route path="/productdetail/:id" element={<ProductDetail />} />
            </Routes>
          </main>
          < Footer />
        </div>
      </div>
    </Router>
  );
}

export default HomePage;
