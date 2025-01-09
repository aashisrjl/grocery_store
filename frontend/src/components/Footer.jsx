// Footer.js
import React from 'react';
import { Leaf } from 'lucide-react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';


const Footer = () => {
  return (
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
  );
};

export default Footer;
