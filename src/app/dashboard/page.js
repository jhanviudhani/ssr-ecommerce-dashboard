"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [shopName, setShopName] = useState("");
  const [inputName, setInputName] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const martId = localStorage.getItem("martId");
    const userEmail = localStorage.getItem("userEmail");

    // 🔒 Auth check
    if (!loggedIn || !martId) {
      window.location.href = "/login";
      return;
    }

   
    if (userEmail) {
      const savedShop = localStorage.getItem(`shopName_${userEmail}`);
      if (savedShop) {
        setShopName(savedShop);
      }
    }

    // 📦 Fetch products
    async function fetchProducts() {
      try {
        const res = await fetch(`/api/products?martId=${martId}`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch products", error);
        setProducts([]);
      }
    }

    fetchProducts();
  }, []);

  // 🔢 Calculations
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, p) => sum + (p.stock || 0),
    0
  );

  const stockValue = products.reduce(
    (sum, p) => sum + (p.price || 0) * (p.stock || 0),
    0
  );

  const lowStockCount = products.filter(
    (p) => Number(p.stock) > 0 && Number(p.stock) <= 2
  ).length;

  return (
    <>
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Welcome back! Here’s your store overview.
          </p>
        </div>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("martId");
            localStorage.removeItem("userEmail");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      {/* 🌸 HERO SECTION */}
      <div className="relative mt-8 rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-16 overflow-hidden">

        {/* Soft glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200/20 to-pink-200/20 blur-3xl"></div>

        {/* Welcome / Input */}
        <div className="relative z-10 text-center">
          {shopName ? (
            <h2
              className="text-[64px] md:text-[80px] text-purple-400 opacity-90"
              style={{ fontFamily: "Pacifico" }}
            >
              Welcome to {shopName}
            </h2>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <input
                type="text"
                placeholder="Enter your shop name"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="border p-3 rounded-lg w-64 text-center"
              />
              <button
                className="bg-purple-600 text-white px-6 py-2 rounded-lg"
                onClick={() => {
                  if (!inputName.trim()) return;

                  const userEmail = localStorage.getItem("userEmail");
                  if (!userEmail) return;

                  localStorage.setItem(
                    `shopName_${userEmail}`,
                    inputName
                  );
                  setShopName(inputName);
                }}
              >
                Save Shop Name
              </button>
            </div>
          )}

          <p className="mt-4 text-gray-500">
            Manage your products, stock & analytics in one place
          </p>
        </div>

        {/* Cards */}
        <div className="relative z-10 mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Stock Value</p>
            <p className="text-3xl font-bold">
              ₹{stockValue.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Stock</p>
            <p className="text-3xl font-bold">{totalStock}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">Low Stock Alerts</p>
            <p className="text-3xl font-bold text-red-500">
              {lowStockCount}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
