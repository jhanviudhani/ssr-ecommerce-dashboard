"use client";

import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <main className="flex-1 bg-slate-100 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
