"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ef4444", "#06b6d4"];

export default function AnalyticsPage() {
  const [products, setProducts] = useState([]);
  const [mounted, setMounted] = useState(false);

  // ✅ This ensures charts render ONLY on client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const martId = localStorage.getItem("martId");
        if (!martId) return;

        const res = await fetch(`/api/products?martId=${martId}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Analytics fetch error", err);
        setProducts([]);
      }
    }

    fetchProducts();
  }, []);

  // ⛔ During build / SSR, do NOT render charts
  if (!mounted) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-slate-500">Inventory & stock insights</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Stock Levels by Product
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={products}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Stock Distribution
          </h2>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={products}
                  dataKey="stock"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {products.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
