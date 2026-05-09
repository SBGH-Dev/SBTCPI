"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";

import { loginUser, saveUser } from "@/app/(protected)/services/authService";
import Loader from "../(protected)/components/Loader";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await loginUser(username, password);

      saveUser(user);

      window.location.href = "/";
    } catch (err: any) {
      setLoading(false);
      await Swal.fire({
        title: "Wrong Credentials",
        text: "Wrong username or password",
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: "#F3FFFC",
        color: "#1e293b",
      });

      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader text="Signing you in..." />}

      <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[0_25px_80px_rgba(15,118,110,0.16)] lg:grid-cols-2">
          {/* Left */}
          <div className="hidden bg-gradient-to-br from-teal-600 to-cyan-500 p-10 text-white lg:block">
            <div className="flex items-center gap-3">
              <Image
                src="/wazaranPILogo.png"
                alt="WazaranPI Logo"
                width={46}
                height={46}
                className="rounded-full bg-white/20 p-1"
              />
              <h2 className="text-2xl font-bold">WazaranPI</h2>
            </div>

            <div className="mt-20">
              <p className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                SBTC Reports System
              </p>

              <h1 className="text-4xl font-extrabold leading-tight">
                Access your reports securely
              </h1>

              <p className="mt-5 max-w-md text-white/75">
                Login to view company reports and dashboards.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="p-8 sm:p-12">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-semibold text-teal-600 shadow-sm hover:bg-teal-50"
            >
              ← Back Home
            </Link>

            <h1 className="text-3xl font-extrabold text-slate-900">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Enter your credentials
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              {/* Username */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-2xl border px-4 py-3 text-slate-800"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border px-4 py-3 pr-12 text-slate-800"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className=" cursor-pointer absolute right-4 top-[43px] text-slate-500 hover:text-teal-600"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {/* Error */}
              {error && <p className="text-sm text-red-500">{error}</p>}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded-2xl bg-teal-600 py-3 text-white"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-400">
              © WazaranPI
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
