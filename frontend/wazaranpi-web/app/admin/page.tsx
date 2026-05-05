"use client";

import Link from "next/link";
import { UserPlus, UserMinus, ShieldCheck, Fingerprint } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ProfileButton from "../(protected)/components/ProfileButton";

export default function AdminPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const userText = sessionStorage.getItem("user");

    if (!userText) {
      router.replace("/unauthorized");
      return;
    }

    const user = JSON.parse(userText);

    if (user.roleName?.toLowerCase() !== "admin") {
      router.replace("/unauthorized");
      return;
    }

    setAllowed(true);
  }, [router]);

  if (!allowed) return null;

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-5 text-white shadow-[0_10px_30px_rgba(20,184,166,0.25)]">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="mt-1 text-sm text-white/80">
              Manage users, permissions, and menu access.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ProfileButton />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Card 1 */}
        <Link
          href="/admin/add-user"
          className="group rounded-3xl border border-cyan-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-teal-100 text-teal-700">
            <UserPlus size={28} />
          </div>

          <h2 className="text-xl font-bold text-slate-900">Add User</h2>
          <p className="mt-2 text-sm text-slate-500">
            Create a new system user with employee code, username, and role.
          </p>
        </Link>

        {/* Card 2 */}
        <Link
          href="/admin/delete-user"
          className="group rounded-3xl border border-red-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-red-100 text-red-600">
            <UserMinus size={28} />
          </div>

          <h2 className="text-xl font-bold text-slate-900">Delete User</h2>
          <p className="mt-2 text-sm text-slate-500">
            Remove or disable users from accessing the system.
          </p>
        </Link>

        {/* Card 3 */}

        <Link
          href="/admin/user-menu-access"
          className="group rounded-3xl border border-cyan-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-100 text-cyan-700">
            <ShieldCheck size={28} />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Add Menus To Users
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Assign menu permissions to normal users based on employee code.
          </p>
        </Link>

        {/* Card 4 */}

        <Link
          href="/admin/update-password"
          className="group rounded-3xl border border-cyan-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-100 text-cyan-700">
            <Fingerprint size={28} />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Update User Password
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Securely reset or update user passwords to maintain account their
            accounts.
          </p>
        </Link>
      </div>
    </section>
  );
}
