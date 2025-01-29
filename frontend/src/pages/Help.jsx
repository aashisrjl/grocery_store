import React from "react";
import { Phone, Mail, LifeBuoy } from "lucide-react";

const HelpSupport = () => {
  return (
    <div className=" p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Help & Support
        </h2>
        
        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Phone Support */}
          <div className="flex flex-col items-center bg-green-100 p-6 rounded-xl shadow-md hover:shadow-lg">
            <Phone className="w-10 h-10 text-green-700 mb-3" />
            <h3 className="text-lg font-semibold">Phone Support</h3>
            <p className="text-gray-600 text-center mt-2">
              Call us for immediate assistance. Our support is available 8 AM to 8 PM.
            </p>
            <a
              href="tel:9876543210"
              className="mt-4 text-green-700 font-medium hover:underline"
            >
              +9876543210
            </a>
          </div>

          {/* Email Support */}
          <div className="flex flex-col items-center bg-green-100 p-6 rounded-xl shadow-md hover:shadow-lg">
            <Mail className="w-10 h-10 text-green-700 mb-3" />
            <h3 className="text-lg font-semibold">Email Support</h3>
            <p className="text-gray-600 text-center mt-2">
              Drop us an email and we'll get back to you within 24 hours.
            </p>
            <a
              href="mailto:support@grocerystore.com"
              className="mt-4 text-green-700 font-medium hover:underline"
            >
              support@grocerystore.com
            </a>
          </div>

          {/* Live Chat Support */}
          <div className="flex flex-col items-center bg-green-100 p-6 rounded-xl shadow-md hover:shadow-lg">
            <LifeBuoy className="w-10 h-10 text-green-700 mb-3" />
            <h3 className="text-lg font-semibold">Live Chat</h3>
            <p className="text-gray-600 text-center mt-2">
              Chat with us for real-time support. Available during business hours.
            </p>
            <button
              className="mt-4 bg-green-700 text-white px-4 py-2 rounded-2xl hover:bg-green-600"
              onClick={() => alert("Live Chat Feature Coming Soon!")}
            >
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
