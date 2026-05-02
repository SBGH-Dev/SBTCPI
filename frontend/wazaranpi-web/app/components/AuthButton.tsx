"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { getSavedUser } from "@/app/utils/authStorage";
import { logoutUser } from "@/app/services/authService";

export default function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getSavedUser());
  }, []);

  const logout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, logout",
      background: "#F3FFFC",
      color: "#1e293b",
    });

    if (result.isConfirmed) {
      logoutUser();

      await Swal.fire({
        title: "Logged out!",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
        background: "#F3FFFC",
        color: "#1e293b",
      });

      window.location.href = "/login";
    }
  };

  if (isLoggedIn) {
    return (
      <button
        onClick={logout}
        className="cursor-pointer rounded-full bg-red-500 px-5 py-2 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-600"
      >
        Logout
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-full bg-teal-600 px-5 py-2 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-teal-700"
    >
      Login
    </Link>
  );
}
