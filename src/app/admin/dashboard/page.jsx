"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AdminDashboard() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedRole = Cookies.get("role");
    if (!storedRole) router.push("/auth"); // not logged in
    else if (storedRole !== "admin") router.push("/"); // redirect non-admin
    else setRole(storedRole);
  }, []);

  if (!role) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-700">
        Welcome, Admin! You can manage accounts, assignments, and song lineups here.
      </p>
    </div>
  );
}
