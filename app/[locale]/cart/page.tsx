"use client";

import React, { useState } from "react";

// Cart item type
interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
}

const Page = () => {
  // Sample cart data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Midnight Perfume",
      brand: "Chanel",
      price: 250,
      quantity: 1,
      image: "https://via.placeholder.com/80x80/f5f5f5/000000?text=Perfume1",
    },
    {
      id: 2,
      name: "Floral Perfume",
      brand: "Dior",
      price: 180,
      quantity: 2,
      image: "https://via.placeholder.com/80x80/f5f5f5/000000?text=Perfume2",
    },
    {
      id: 3,
      name: "Ocean Perfume",
      brand: "Armani",
      price: 220,
      quantity: 1,
      image: "https://via.placeholder.com/80x80/f5f5f5/000000?text=Perfume3",
    },
  ]);

  // Format currency
  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  // Increase item quantity
  const increaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease item quantity
  const decreaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 15;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-8 gap-6 p-4 font-sans">
      {/* Order Summary */}
      <div className="sm:col-span-2 lg:col-span-3  p-6 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">
          Order Summary
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Shipping:</span>
            <span className="font-medium">{formatPrice(shipping)}</span>
          </div>

          <div className="flex justify-between pt-4 border-t border-gray-200">
            <span className="text-lg font-bold text-gray-800">Total:</span>
            <span className="text-lg font-bold text-amber-600">
              {formatPrice(total)}
            </span>
          </div>

          <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-xl font-medium mt-6 transition duration-200">
            Confirm Order
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="sm:col-span-3 lg:col-span-5 space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 p-4 rounded-2xl shadow flex flex-col sm:flex-row items-center gap-4"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-xl"
            />

            {/* Details */}
            <div className="flex-1 w-full">
              <h3 className="font-bold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.brand}</p>
              <p className="text-amber-600 font-bold mt-1">
                {formatPrice(item.price)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>

              <span className="px-3 py-1 border-x border-gray-200">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQuantity(item.id)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
