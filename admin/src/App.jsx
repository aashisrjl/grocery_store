import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Credits from './pages/Credits';
import AddProduct from './components/AddProduct';
import ProductDetail from './components/productDetail';
import EditProduct from './components/editProduct';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-row gap-2">
        <div>
        <Sidebar />
        </div>
        <div className=" p-8 ml-auto w-[85%]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/editproduct/:id" element={<EditProduct />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;