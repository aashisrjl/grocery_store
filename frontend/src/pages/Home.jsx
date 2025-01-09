// import React, { useState } from "react";
// import {
//   ShoppingBag,
//   Search,
//   Menu,
//   Facebook,
//   Twitter,
//   Instagram,
//   Mail,
//   Leaf,
//   Home,
//   ShoppingBasket,
//   Heart,
//   Clock,
//   Settings,
//   X,
//   LogIn,
//   LucideLogIn,
//   LogOut,
// } from "lucide-react";
// import { categories, products } from "../data";
// import { Favorites } from "./Favorites";
// import { Orders } from "./Orders";
// import SettingPage from "./Setting";
// import LoginForm from "../components/LoginForm";
// import RegisterForm from "../components/RegisterForm";
// import Cart from "./Cart";

// export function HomePage() {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [favorites, setFavorites] = useState([]);
//   const [currentView, setCurrentView] = useState("home");
//   const [showLogin, setShowLogin] = useState(true);

//   const filteredProducts =
//     selectedCategory === "All"
//       ? products
//       : products.filter((product) => product.category === selectedCategory);
//   const toggleFavorite = (productId) => {
//     setFavorites((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId],
//     );
//   };
//   const renderMainContent = () =>{
//     if (currentView === "favorites") {
//       return (
//         <Favorites
//           products={products}
//           favorites={favorites}
//           toggleFavorite={toggleFavorite}
//         />
//       );
//     }
//     if (currentView === "orders") {
//       return <Orders />;
//     }
//     if (currentView === "settings") {
//       return <SettingPage />;
//     }
//     if(currentView ==="login"){
//       return <LoginForm />;
//     }
//     if(currentView ==="register"){
//       return <RegisterForm />;
//     }
//     if(currentView === "cart"){
//       return <Cart />
//     }
//     if(currentView === "orderDetail"){
//       return <Cart />
//     }
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredProducts.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow relative group"
//           >
//             <div className="aspect-w-1 aspect-h-1 relative">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-64 object-cover"
//               />
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   toggleFavorite(product.id);
//                 }}
//                 className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors duration-200 group"
//               >
//                 <Heart
//                   className={`h-5 w-5 transition-colors duration-200 ${favorites.includes(product.id) ? "fill-red-500 stroke-red-500" : "stroke-gray-400 group-hover:stroke-gray-600"}`}
//                 />
//               </button>
//             </div>
//             <div className="p-4">
//               <h3 className="font-medium">{product.name}</h3>
//               <p className="text-sm text-gray-500">{product.category}</p>
//               <div className="mt-2 flex justify-between items-center">
//                 <p className="font-medium">
//                   ${product.price}/{product.unit}
//                 </p>
//                 <button className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200">
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };
//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       <aside
//         className={`fixed+ scroll-m-0 lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-200 ease-in-out`}
//       >
//         <div className="flex flex-col h-full">
//           <div className="p-4 border-b">
//             <div className="flex items-center justify-between lg:justify-center">
//               <h1 className="text-xl font-bold text-green-700 flex items-center">
//                 <Leaf className="h-6 w-6 mr-2" />
//                 FRESH MARKET
//               </h1>
//               <button
//                 className="lg:hidden"
//                 onClick={() => setIsSidebarOpen(false)}
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>
//           </div>
//           <nav className="flex-1 overflow-y-auto p-4">
//             <div className="space-y-1 mb-8">
            
//               <button
//                 onClick={() => setCurrentView("home")}
//                 className={`w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 ${currentView === "home" ? "bg-gray-100" : ""}`}
//               >
//                 <Home className="h-5 w-5" />
//                 <span>Home</span>
//               </button>
//               <button
//                 onClick={() => setCurrentView("favorites")}
//                 className={`w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 ${currentView === "favorites" ? "bg-gray-100" : ""}`}
//               >
//                 <Heart className="h-5 w-5" />
//                 <span>Favorites</span>
//               </button>
//               <button
//                 onClick={() => setCurrentView("orders")}
//                 className={`w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 ${currentView === "orders" ? "bg-gray-100" : ""}`}
//               >
//                 <ShoppingBasket className="h-5 w-5" />
//                 <span>My Orders</span>
//               </button>
//               <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
//                 <Clock className="h-5 w-5" />
//                 <span>Order History</span>
//               </button>
//               <button
//                 onClick={() => setCurrentView("login")}
//                 className={`w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 ${currentView === "orders" ? "bg-gray-100" : ""}`}
//               >
//                 <LogIn className="h-5 w-5" />
//                 <span>Login</span>
//               </button>
//               <button
//                 onClick={() => setCurrentView("register")}
//                 className={`w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 ${currentView === "orders" ? "bg-gray-100" : ""}`}
//               >
//                 <LucideLogIn className="h-5 w-5" />
//                 <span>Register Now</span>
//               </button>
//               <button
//                 onClick={() => alert("loggedOut")}
//                 className={`w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 ${currentView === "orders" ? "bg-gray-100" : ""}`}
//               >
//                 <LogOut className="h-5 w-5" />
//                 <span>Logout</span>
//               </button>

//             </div>
//             <div className="p-4 border-t">
//             <button
//               onClick={() => setCurrentView("settings")}
//               className={`w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 ${currentView === "settings" ? "bg-gray-100" : ""}`}
//             >
//               <Settings className="h-5 w-5" />
//               <span>Settings</span>
//             </button>
//           </div>
//             <div className="mb-4">
//               <h3 className="px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
//                 Categories
//               </h3>
//             </div>
//             <div className="space-y-1">
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => setSelectedCategory(category)}
//                   className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${selectedCategory === category ? "bg-green-100 text-green-700 font-medium" : "text-gray-700 hover:bg-gray-100"}`}
//                 >
//                   <span>{category}</span>
//                 </button>
//               ))}
//             </div>
//           </nav>
        
//         </div>
//       </aside>
//       <div className="flex-1 flex flex-col min-h-screen">
//         <header className="bg-white shadow-sm">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//             <div className="flex items-center justify-between">
//               <button
//                 className="lg:hidden"
//                 onClick={() => setIsSidebarOpen(true)}
//               >
//                 <Menu className="h-6 w-6" />
//               </button>
//               <div className="flex-1 flex items-center justify-end space-x-4">
//                 <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
//                   <Search className="h-5 w-5 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search fresh groceries..."
//                     className="bg-transparent border-none focus:outline-none ml-2"
//                   />
//                 </div>
//                 <button onClick={()=> setCurrentView('cart')} className="p-2 hover:bg-green-50 rounded-full relative">
//                   <ShoppingBag className="h-6 w-6 text-green-700" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </header>
//         <div className="bg-green-700 text-white py-2">
//           <p className="text-center text-sm">
//             +
//           </p>
//         </div>
//         <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {renderMainContent()}
//         </main>
//         <footer className="bg-white mt-auto border-t">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//               <div className="space-y-4">
//                 <h3 className="text-lg font-bold text-green-700 flex items-center">
//                   <Leaf className="h-5 w-5 mr-2" />
//                   FRESH MARKET
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Your neighborhood source for fresh, quality groceries.
//                 </p>
//                 <div className="flex space-x-4">
//                   <a href="#" className="text-green-600 hover:text-green-700">
//                     <Facebook className="h-5 w-5" />
//                   </a>
//                   <a href="#" className="text-green-600 hover:text-green-700">
//                     <Twitter className="h-5 w-5" />
//                   </a>
//                   <a href="#" className="text-green-600 hover:text-green-700">
//                     <Instagram className="h-5 w-5" />
//                   </a>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-medium mb-4">Store Info</h3>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li>
//                     <a href="#" className="hover:text-green-700">
//                       Store Locations
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#" className="hover:text-green-700">
//                       Delivery Areas
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#" className="hover:text-green-700">
//                       Weekly Specials
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#" className="hover:text-green-700">
//                       Careers
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="font-medium mb-4">Help & Support</h3>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li>
//                     <a href="#" className="hover:text-green-700">
//                       Delivery Info
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#" className="hover:text-green-700">
//                       Return Policy
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#" className="hover:text-green-700">
//                       Contact Us
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#" className="hover:text-green-700">
//                       FAQs
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="font-medium mb-4">Fresh Deals</h3>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Subscribe to receive weekly specials and fresh deals!
//                 </p>
//                 <div className="flex">
//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     className="flex-1 px-2 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-200"
//                   />
//                   <button className="px-4 py-2 bg-green-700 text-white rounded-r-lg hover:bg-green-800">
//                     <Mail className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="border-t mt-12 pt-8">
//               <p className="text-center text-sm text-gray-600">
//                 © {new Date().getFullYear()} Fresh Market. All rights reserved.
//               </p>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }
