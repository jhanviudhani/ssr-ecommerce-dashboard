"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ NEW

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/auth", {
      method: "PUT", // LOGIN
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", data.user.email);
    localStorage.setItem("martId", data.user.martId);

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-orange-600 mb-4">
            ManageMart
          </h1>

          <h2 className="text-3xl font-bold mb-4">
            Powerful Store Management
          </h2>

          <p className="text-slate-600 mb-6">
            Manage products, track inventory, and analyze performance —
            all in one dashboard.
          </p>

          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-2xl font-bold text-orange-600">Fast</p>
              <p className="text-sm text-slate-500">Performance</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-2xl font-bold text-orange-600">Secure</p>
              <p className="text-sm text-slate-500">Authentication</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE LOGIN CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold mb-2">Welcome Back 👋</h3>
          <p className="text-slate-500 mb-6">
            Sign in to manage your store
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />

            {/* PASSWORD WITH EYE ICON */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 pr-10"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-orange-600 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
