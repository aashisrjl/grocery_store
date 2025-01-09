import React from "react";
import { Package, ArrowRight, Clock, CheckCircle, Truck } from "lucide-react";

// Sample order data
const sampleOrders = [
  {
    id: "ORD-2023-001",
    date: "2023-11-20",
    status: "delivered",
    total: 45.94,
    items: [
      {
        productId: 1,
        name: "Organic Bananas",
        price: 3.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      },
      {
        productId: 2,
        name: "Fresh Milk",
        price: 4.49,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    id: "ORD-2023-002",
    date: "2023-11-19",
    status: "shipped",
    total: 29.95,
    items: [
      {
        productId: 6,
        name: "Sea Salt",
        price: 2.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1613478881426-daaadfc6a848?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    id: "ORD-2023-003",
    date: "2023-11-18",
    status: "processing",
    total: 67.45,
    items: [
      {
        productId: 7,
        name: "Extra Virgin Olive Oil",
        price: 12.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
];
const getStatusIcon = (status) => {
  switch (status) {
    case "processing":
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case "shipped":
      return <Truck className="h-5 w-5 text-blue-500" />;
    case "delivered":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
  }
};
const getStatusText = (status) => {
  switch (status) {
    case "processing":
      return "Processing";
    case "shipped":
      return "Shipped";
    case "delivered":
      return "Delivered";
  }
};
export function Orders() {
  if (sampleOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <Package className="h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-medium text-gray-900 mb-2">
          No orders yet
        </h2>
        <p className="text-gray-500 text-center max-w-sm">
          Start shopping to see your orders here.
        </p>
      </div>
    );
  }
  return (
    <div className="py-8">
      <h2 className="text-2xl font-medium text-gray-900 mb-6">My Orders</h2>
      <div className="space-y-6">
        {sampleOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className="text-sm font-medium">
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity} × ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t">
                <p className="font-medium">Total: ${order.total.toFixed(2)}</p>
                <button className="flex items-center space-x-2 text-green-700 hover:text-green-800 font-medium">
                  <span>Order Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
