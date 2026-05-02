"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { User } from "@/app/(protected)/types/auth";
import { getSavedUser } from "@/app/(protected)/utils/authStorage";

export default function ProfileButton() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const u = getSavedUser();
    setUser(u);
  }, []);

  if (!user) return null;

  const firstLetter = user.fullName?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-teal-500 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-110"
      >
        {firstLetter}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-cyan-100 bg-white p-5 shadow-xl text-black">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-teal-500 text-xl font-bold text-white">
                {firstLetter}
              </div>

              <div>
                <p className="font-bold text-black">{user.fullName}</p>
                <p className="text-sm text-black">{user.username}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="cursor-pointer rounded-full p-2 text-red-500 hover:bg-red-100 transition"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 space-y-2 text-sm text-black">
            <p>
              <span className="font-semibold">Emp Code:</span> {user.empCd}
            </p>

            <p>
              <span className="font-semibold">Role:</span> {user.roleName}
            </p>

            <p>
              <span className="font-semibold">Status:</span> Active
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
