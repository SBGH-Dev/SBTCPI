"use client";

import { useRef, useState } from "react";
//import ProfileButton from "../components/ProfileButton";
import Swal from "sweetalert2";
import ProfileButton from "../../../components/ProfileButton";
import { useRouter } from "next/navigation";

export default function SalesSummaryPage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const router = useRouter();

  const fromDateRef = useRef<HTMLInputElement>(null);
  const toDateRef = useRef<HTMLInputElement>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL; //|| "http://localhost:5100";

  const openDatePicker = (ref: React.RefObject<HTMLInputElement | null>) => {
    const input = ref.current;

    if (!input) return;

    input.focus();

    const dateInput = input as HTMLInputElement & {
      showPicker?: () => void;
    };

    dateInput.showPicker?.();
  };

  const validateDates = async () => {
    if (!fromDate || !toDate) {
      await Swal.fire({
        title: "Missing Dates",
        text: "Please select both From Date and To Date.",
        icon: "warning",
        confirmButtonColor: "#14b8a6",
        background: "#F3FFFC",
        color: "#1e293b",
      });
      return false;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      await Swal.fire({
        title: "Invalid Date Range",
        text: "From Date cannot be greater than To Date.",
        icon: "warning",
        confirmButtonColor: "#14b8a6",
        background: "#F3FFFC",
        color: "#1e293b",
      });
      return false;
    }

    return true;
  };

  const printPdf = async () => {
    if (!(await validateDates())) return;

    window.open(
      `${apiBaseUrl}/reports/dummy-sales/pdf?startDate=${fromDate}&endDate=${toDate}`,
      "_blank",
    );
  };

  const exportExcel = async () => {
    if (!(await validateDates())) return;

    window.open(
      `${apiBaseUrl}/reports/dummy-sales/excel?startDate=${fromDate}&endDate=${toDate}`,
      "_blank",
    );
  };

  return (
    <section className="min-h-[calc(100vh-8rem)] rounded-[2rem] bg-white/70 p-10 shadow-[0_20px_60px_rgba(15,118,110,0.12)]">
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-5 text-white shadow-[0_10px_30px_rgba(20,184,166,0.25)]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Sales Summary</h1>
            <p className="mt-1 text-sm text-white/80">
              Select date range and generate report.
            </p>
          </div>
          <ProfileButton />
        </div>
      </div>
      <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              From Date
            </label>

            <input
              ref={fromDateRef}
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              onClick={() => openDatePicker(fromDateRef)}
              className="w-full cursor-pointer rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition hover:border-teal-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              To Date
            </label>

            <input
              ref={toDateRef}
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              onClick={() => openDatePicker(toDateRef)}
              className="w-full cursor-pointer rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition hover:border-teal-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <div className="flex items-end gap-3">
            <button
              onClick={printPdf}
              className="cursor-pointer rounded-xl bg-teal-500 px-5 py-3 text-sm font-bold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-lg active:translate-y-0"
            >
              Download PDF
            </button>

            <button
              onClick={exportExcel}
              className="cursor-pointer rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-600 hover:shadow-lg active:translate-y-0"
            >
              Download Excel
            </button>
          </div>
        </div>
      </div>
      <div className="mt-auto ml-1 flex justify-start pt-8">
        <button
          onClick={() => router.push("/sales")}
          className="group flex cursor-pointer items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-semibold text-teal-600 shadow-sm transition-all duration-200 hover:-translate-x-1 hover:bg-teal-50 hover:shadow-md"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">
            ←
          </span>

          <span>Back</span>
        </button>
      </div>
    </section>
  );
}
