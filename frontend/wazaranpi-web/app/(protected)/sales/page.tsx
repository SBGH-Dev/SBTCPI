// import Link from "next/link";
// import ProfileButton from "../components/ProfileButton";

// const salesReports = [
//   {
//     icon: "📊",
//     title: "Sales Summary",
//     desc: "View sales by date, customer, channel, and product group.",
//     href: "/sales/sales-summary",
//   },
//   {
//     icon: "🎯",
//     title: "Salesman Performance",
//     desc: "Track targets, achievements, progress, and monthly performance.",
//     href: "/sales/salesman-performance",
//   },
//   {
//     icon: "👥",
//     title: "Customer Sales",
//     desc: "Analyze customer sales, balances, invoices, and activity.",
//     href: "/sales/customer-sales",
//   },
// ];

// export default function SalesPage() {
//   return (
//     <section className="min-h-[calc(100vh-8rem)] overflow-hidden rounded-[2rem] bg-white/70 p-10 shadow-[0_20px_60px_rgba(15,118,110,0.12)]">
//       {/* Header */}
//       <div className="mb-8 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-5 text-white shadow-[0_10px_30px_rgba(20,184,166,0.25)]">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold">Sales Reports</h1>
//             <p className="mt-1 text-sm text-white/80">
//               Select a sales report to continue.
//             </p>
//           </div>

//           <ProfileButton />
//         </div>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//         {salesReports.map((report) => (
//           <Link
//             key={report.href}
//             href={report.href}
//             className="group relative col-span-1 overflow-hidden rounded-2xl border border-teal-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-[0_20px_45px_rgba(20,184,166,0.18)]"
//           >
//             <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal-100 transition group-hover:bg-cyan-100"></div>

//             <div className="relative">
//               <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-2xl text-white shadow-[0_10px_25px_rgba(20,184,166,0.25)]">
//                 {report.icon}
//               </div>

//               <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700">
//                 {report.title}
//               </h3>

//               <p className="mt-3 min-h-16 text-sm leading-6 text-slate-500">
//                 {report.desc}
//               </p>

//               <div className="mt-6 inline-flex items-center rounded-full bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700 transition group-hover:bg-teal-500 group-hover:text-white">
//                 Open Page →
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProfileButton from "../components/ProfileButton";
import Loader from "../components/Loader";
import { BarChart3, Target, Users, FileText } from "lucide-react";
import { getSalesSubMenus } from "../services/salesSubMenuService";
import { SalesSubMenu } from "../types/salessubmenu";

const iconMap = {
  BarChart3,
  Target,
  Users,
  FileText,
};

export default function SalesPage() {
  const [reports, setReports] = useState<SalesSubMenu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userText = sessionStorage.getItem("user");

    if (!userText) {
      setLoading(false);
      return;
    }

    const user = JSON.parse(userText);

    console.log("USER:", user);

    const empCd = user.empCd || user.EmpCd;

    console.log("EMP CD:", empCd);

    getSalesSubMenus(empCd)
      .then(setReports)
      .catch(() => setReports([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader text="Loading sales reports..." fullScreen={false} />;
  }

  return (
    <section className="min-h-[calc(100vh-8rem)] overflow-hidden rounded-[2rem] bg-white/70 p-10 shadow-[0_20px_60px_rgba(15,118,110,0.12)]">
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-5 text-white shadow-[0_10px_30px_rgba(20,184,166,0.25)]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Sales Reports</h1>
            <p className="mt-1 text-sm text-white/80">
              Select a sales report to continue.
            </p>
          </div>

          <ProfileButton />
        </div>
      </div>

      {reports.length === 0 && (
        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6 text-orange-700">
          You have no access to any sales reports at the moment.
        </div>
      )}

      {reports.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reports.map((report) => {
            const Icon =
              iconMap[report.icon as keyof typeof iconMap] || FileText;

            return (
              <Link
                key={report.id}
                href={report.href}
                className="group relative col-span-1 overflow-hidden rounded-2xl border border-teal-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-[0_20px_45px_rgba(20,184,166,0.18)]"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal-100 transition group-hover:bg-cyan-100"></div>

                <div className="relative">
                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-[0_10px_25px_rgba(20,184,166,0.25)]">
                    <Icon size={26} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700">
                    {report.title}
                  </h3>

                  <p className="mt-3 min-h-16 text-sm leading-6 text-slate-500">
                    {report.desc}
                  </p>

                  <div className="mt-6 inline-flex items-center rounded-full bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700 transition group-hover:bg-teal-500 group-hover:text-white">
                    Open Page →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
