"use client";

import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [email, setEmail] = useState("");

  // ✅ Access localStorage ONLY on client
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const admins = [
    {
      name: "Owner",
      email: email || "Loading...",
      role: "Owner",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Users</h1>
        <p className="text-slate-500">
          Manage administrators who can access this dashboard
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Role</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((admin, index) => (
              <tr key={index} className="border-t">
                <td className="p-4 font-medium">{admin.name}</td>
                <td className="p-4">{admin.email}</td>
                <td className="p-4 text-center">
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                    {admin.role}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                    {admin.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info box */}
      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
        <p className="text-orange-700 text-sm">
          Only admins can view this page. Admin onboarding can be added here in
          the future.
        </p>
      </div>
    </div>
  );
}
