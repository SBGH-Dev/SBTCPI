"use client";

import { useEffect, useState } from "react";
import ProfileButton from "./(protected)/components/ProfileButton";
import Link from "next/link";

import { User } from "@/app/(protected)/types/auth";
import { getSavedUser } from "@/app/(protected)/utils/authStorage";

const reportCards = [
  {
    icon: "📈",
    title: "Sales Reports",
    desc: "Track sales targets, achievements, commitments, and monthly performance.",
  },
  {
    icon: "👥",
    title: "Employee Reports",
    desc: "Review employee activity, vacation requests, approvals, and HR records.",
  },
  {
    icon: "📦",
    title: "Inventory Reports",
    desc: "Monitor product movement, stock status, import plans, and availability.",
  },
  {
    icon: "💰",
    title: "Finance Reports",
    desc: "Analyze invoices, claims, payments, balances, and account summaries.",
  },
];

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const u = getSavedUser();
    setUser(u);
  }, []);

  return (
    <section className="min-h-[calc(100vh-8rem)] overflow-hidden rounded-[2rem] bg-white/70 p-10 shadow-[0_20px_60px_rgba(15,118,110,0.12)]">
      <div className="mb-6">
        <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-4 text-white shadow-[0_10px_30px_rgba(20,184,166,0.25)]">
          <div>
            <h1 className="text-2xl font-bold leading-tight">
              {user
                ? `Welcome back, ${user.fullName.split(" ")[0]} 👋`
                : "Welcome 👋"}
            </h1>

            <p className="mt-1 text-sm text-white/80">
              Get ready to explore your reports today
            </p>
          </div>

          <ProfileButton />
        </div>
      </div>

      <div className="grid min-h-[520px] items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="mb-4 inline-flex rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700">
            SBTC Reporting Platform
          </span>

          <h1 className="mb-5 text-5xl font-extrabold leading-tight text-slate-900">
            View all company reports from one powerful dashboard.
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-8 text-slate-600">
            WazaranPI helps to track sales, employees, finance, inventory,
            approvals, and business performance in one organized reporting
            system.
          </p>

          {!user && (
            <Link
              href="/login"
              className="mt-6 inline-block rounded-full bg-teal-500 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-teal-600"
            >
              Get Started →
            </Link>
          )}
        </div>

        <div className="relative flex justify-center">
          <div className="absolute -right-6 top-6 h-48 w-48 rounded-full bg-teal-300/30 blur-2xl"></div>
          <div className="absolute -left-6 bottom-6 h-48 w-48 rounded-full bg-cyan-300/30 blur-2xl"></div>

          <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-500 p-4 text-white shadow-[0_20px_50px_rgba(20,184,166,0.3)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-white/70">Reports Center</p>
                <h2 className="text-lg font-bold">WazaranPI</h2>
              </div>

              <div className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-lg">
                📊
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {reportCards.map((card) => (
                <div
                  key={card.title}
                  className="group h-36 cursor-pointer [perspective:1000px]"
                >
                  <div className="relative h-full w-full rounded-xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    <div className="absolute inset-0 rounded-xl bg-white/20 p-3 [backface-visibility:hidden]">
                      <div className="mb-2 text-xl">{card.icon}</div>
                      <h3 className="text-sm font-semibold">{card.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-white/75 line-clamp-2">
                        {card.desc}
                      </p>
                    </div>

                    <div className="absolute inset-0 rounded-xl bg-white/30 p-3 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <div className="flex h-full flex-col items-center justify-center text-center">
                        <p className="text-sm font-bold">{card.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="group mt-4 h-16 cursor-pointer [perspective:1000px]">
              <div className="relative h-full w-full rounded-xl bg-white/20 p-3 transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 flex items-center justify-around">
                  <span className="text-xl">📊</span>
                  <span className="text-xl">👤</span>
                  <span className="text-xl">⚙️</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/30 text-sm font-semibold [transform:rotateY(180deg)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
