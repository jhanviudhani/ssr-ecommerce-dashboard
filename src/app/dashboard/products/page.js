"use client";

import { useEffect, useState } from "react";
import AddProductModal from "@/components/AddProductModal";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // ✅ NEW

  async function fetchProducts() {
    try {
      const martId = localStorage.getItem("martId");
      const res = await fetch(`/api/products?martId=${martId}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p?.name &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  async function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;

    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchProducts();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-slate-500">Manage your inventory</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-5 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      {/* Search */}
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/3 p-3 border rounded-lg"
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-center">Price</th>
              <th className="p-4 text-center">Stock</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product._id} className="border-t">
<td className="p-4 flex items-center gap-4">
  {product.image ? (
    <img
      src={product.image}
      alt={product.name}
      className="w-12 h-12 rounded-lg object-cover"
    />
  ) : (
    <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center text-xs">
      No Image
    </div>
  )}
  <span className="font-medium">{product.name}</span>
</td>
                  <td className="p-4 text-center">₹{product.price}</td>
                  <td className="p-4 text-center">{product.stock}</td>
                  <td className="p-4 text-center space-x-3">
                    <button
                      onClick={() => setEditingProduct(product)} // ✅ EDIT
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD */}
      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onSaved={fetchProducts}
        />
      )}

      {/* EDIT */}
      {editingProduct && (
        <AddProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSaved={fetchProducts}
        />
      )}
    </div>
  );
}
