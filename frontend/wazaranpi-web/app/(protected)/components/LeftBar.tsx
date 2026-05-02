"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Home,
  Wallet,
  DollarSign,
  BarChart3,
  Settings,
  FileText,
  type LucideIcon,
} from "lucide-react";

import { User } from "@/app/(protected)/types/auth";
import { Menu } from "@/app/(protected)/types/menu";
import { getSavedUser } from "@/app/(protected)/utils/authStorage";
import { getMyMenus } from "@/app/(protected)/services/menuService";

const iconMap: Record<string, LucideIcon> = {
  Home,
  Wallet,
  DollarSign,
  BarChart3,
  Settings,
  FileText,
};

const getIcon = (iconName?: string): LucideIcon => {
  const cleanIconName = iconName?.trim() || "FileText";
  return iconMap[cleanIconName] || FileText;
};

export default function LeftBar() {
  const [user, setUser] = useState<User | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);

  const loadData = async () => {
    try {
      const u = getSavedUser();

      if (!u) {
        setUser(null);
        setMenus([]);
        return;
      }

      setUser(u);

      const m = await getMyMenus(u.empCd, u.roleName);
      setMenus(m);
    } catch (err) {
      console.error(err);
      setMenus([]);
    }
  };

  useEffect(() => {
    loadData();

    window.addEventListener("auth-change", loadData);

    return () => {
      window.removeEventListener("auth-change", loadData);
    };
  }, []);

  return (
    <aside className="group sticky top-0 flex h-screen w-20 flex-col border-r border-cyan-100 bg-[#DDFBF3]/80 shadow-[10px_0_40px_rgba(20,184,166,0.08)] backdrop-blur-xl transition-all duration-300 hover:w-64">
      <Link href="/" className="flex items-center gap-3 p-5 hover:bg-white/60">
        <Image
          src="/wazaranPILogo.png"
          alt="WazaranPI Logo"
          width={38}
          height={38}
          className="rounded-full"
        />

        <span className="hidden whitespace-nowrap text-lg font-bold text-teal-700 group-hover:inline">
          WazaranPI
        </span>
      </Link>

      <nav className="mt-6 space-y-3 px-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-2xl p-3 text-slate-600 hover:bg-white hover:text-teal-700"
        >
          <Home size={20} className="shrink-0" />

          <span className="hidden whitespace-nowrap font-semibold group-hover:inline">
            Home
          </span>
        </Link>

        {menus.map((menu) => {
          const Icon = getIcon(menu.icon);

          return (
            <Link
              key={menu.id}
              href={menu.url}
              className="flex items-center gap-3 rounded-2xl p-3 text-slate-600 hover:bg-white hover:text-teal-700 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Icon size={20} className="shrink-0" />

              <span className="hidden whitespace-nowrap font-semibold group-hover:inline">
                {menu.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="mt-auto p-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-teal-500 text-lg font-bold text-white shadow-md">
                {user.fullName?.charAt(0) ?? "U"}
              </div>

              <span className="absolute -right-0.5 -bottom-0.5 grid h-5 w-5 place-items-center rounded-full border-2 border-[#DDFBF3] bg-green-500 text-[11px] font-bold text-white">
                ✓
              </span>
            </div>

            <div className="hidden min-w-0 flex-1 group-hover:block">
              <p className="truncate text-sm font-bold text-slate-800">
                {user.fullName}
              </p>

              <p className="truncate text-xs font-semibold text-teal-700">
                {user.roleName}
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
