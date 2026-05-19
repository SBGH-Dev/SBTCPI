"use client";

import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import ProfileButton from "../../../components/ProfileButton";
import Loader from "../../../components/Loader";
import { useRouter } from "next/navigation";
import MultiSelectFilter from "../../../components/MultiSelectFilter";

import {
  RefreshCcw,
  FileText,
  FileSpreadsheet,
  Users,
  TrendingUp,
  TrendingDown,
  Database,
} from "lucide-react";

export default function SalesVariancePage() {
  type FilterOption = {
    value: string;
    label: string;
  };

  type SalesVarianceFilters = {
    branches: FilterOption[];
    salesmen: FilterOption[];
    customers: FilterOption[];
    channels: FilterOption[];
  };

  const [rows, setRows] = useState<SalesVarianceRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const [pageLoaderText, setPageLoaderText] = useState("");
  const [branches, setBranches] = useState<FilterOption[]>([]);
  const [salesmen, setSalesmen] = useState<FilterOption[]>([]);
  const [customers, setCustomers] = useState<FilterOption[]>([]);
  const [channels, setChannels] = useState<FilterOption[]>([]);

  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [selectedSalesmen, setSelectedSalesmen] = useState<string[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [filterResetKey, setFilterResetKey] = useState(0);

  const router = useRouter();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const pageSize = 10;

  const handleBranchChange = async (values: string[]) => {
    setSelectedBranches(values);
    setSelectedSalesmen([]);
    setSelectedCustomers([]);

    await loadFilters(values.join(","));
  };

  const buildQuery = (
    branchesValue = selectedBranches,
    salesmenValue = selectedSalesmen,
    customersValue = selectedCustomers,
    channelsValue = selectedChannels,
  ) => {
    const params = new URLSearchParams();

    params.append("branches", branchesValue.join(","));
    params.append("salesmen", salesmenValue.join(","));
    params.append("customers", customersValue.join(","));
    params.append("channels", channelsValue.join(","));

    return params.toString();
  };

  const loadFilters = async (branchCode = "") => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/reports/sales/sales-variance/filters?salespointcd=${branchCode}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load filters.");
      }

      const data: SalesVarianceFilters = await response.json();

      setBranches(data.branches);
      setSalesmen(data.salesmen);
      setCustomers(data.customers);
      setChannels(data.channels);
    } catch {
      await Swal.fire({
        title: "Error",
        text: "Could not load filters.",
        icon: "error",
        confirmButtonColor: "#14b8a6",
        background: "#F3FFFC",
        color: "#1e293b",
      });
    }
  };

  const loadData = async (
    branchesValue = selectedBranches,
    salesmenValue = selectedSalesmen,
    customersValue = selectedCustomers,
    channelsValue = selectedChannels,
  ) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${apiBaseUrl}/reports/sales/sales-variance?${buildQuery(
          branchesValue,
          salesmenValue,
          customersValue,
          channelsValue,
        )}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load sales variance data.");
      }

      const data: SalesVarianceRow[] = await response.json();

      setRows(data);
      setCurrentPage(1);
    } catch {
      await Swal.fire({
        title: "Error",
        text: "Could not load sales variance data.",
        icon: "error",
        confirmButtonColor: "#14b8a6",
        background: "#F3FFFC",
        color: "#1e293b",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFilters();
    loadData();
  }, []);

  const downloadFile = async (
    url: string,
    fileName: string,
    loadingText: string,
  ) => {
    try {
      setPageLoaderText(loadingText);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const fileUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(fileUrl);
    } catch {
      await Swal.fire({
        title: "Error",
        text: "Could not download file.",
        icon: "error",
        confirmButtonColor: "#14b8a6",
        background: "#F3FFFC",
        color: "#1e293b",
      });
    } finally {
      setPageLoaderText("");
    }
  };

  const printPdf = () => {
    downloadFile(
      `${apiBaseUrl}/reports/sales/sales-variance/pdf?${buildQuery()}`,
      "SalesVariance.pdf",
      "Preparing PDF ( It Might Take Time If Its A Large Data Set ) ...",
    );
  };

  const exportExcel = () => {
    downloadFile(
      `${apiBaseUrl}/reports/sales/sales-variance/excel?${buildQuery()}`,
      "SalesVariance.xlsx",
      "Preparing Excel...",
    );
  };

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      if (sortDirection === "asc") {
        return a.variance - b.variance;
      }

      return b.variance - a.variance;
    });
  }, [rows, sortDirection]);

  const totalPages = Math.ceil(sortedRows.length / pageSize);

  const pagedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedRows.slice(startIndex, startIndex + pageSize);
  }, [sortedRows, currentPage]);

  const totalCurrentYear = rows.reduce(
    (sum, x) => sum + Number(x.currentYear || 0),
    0,
  );

  const totalLastYear = rows.reduce(
    (sum, x) => sum + Number(x.lastYear || 0),
    0,
  );

  const totalVariance = rows.reduce(
    (sum, x) => sum + Number(x.variance || 0),
    0,
  );

  const formatNumber = (value: number) => {
    return Number(value || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const summaryCards = [
    {
      title: "Total Rows",
      value: rows.length.toLocaleString(),
      icon: Database,
      desc: "Loaded records",
      color: "text-slate-700",
    },
    {
      title: "Current Year",
      value: formatNumber(totalCurrentYear),
      icon: TrendingUp,
      desc: "Current sales value",
      color: "text-teal-600",
    },
    {
      title: "Last Year",
      value: formatNumber(totalLastYear),
      icon: Users,
      desc: "Previous year value",
      color: "text-cyan-600",
    },
    {
      title: "Variance",
      value: formatNumber(totalVariance),
      icon: totalVariance >= 0 ? TrendingUp : TrendingDown,
      desc: "Current - last year",
      color: totalVariance >= 0 ? "text-emerald-600" : "text-red-500",
    },
  ];

  return (
    <section className="min-h-[calc(100vh-8rem)] rounded-[2rem] bg-white/70 p-10 shadow-[0_20px_60px_rgba(15,118,110,0.12)]">
      {pageLoaderText && <Loader text={pageLoaderText} fullScreen={true} />}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-5 text-white shadow-[0_10px_30px_rgba(20,184,166,0.25)]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Sales Variance</h1>
            <p className="mt-1 text-sm text-white/80">
              View customer and salesman variance between current year and last
              year.
            </p>
          </div>

          <ProfileButton />
        </div>
      </div>
      <div className="mb-6 rounded-2xl border border-teal-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Filters</h2>
            <p className="text-sm text-slate-500">
              By default, all branches, salesmen, customers, and channels are
              included.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <MultiSelectFilter
            title="Branch"
            options={branches}
            selectedValues={selectedBranches}
            onChange={handleBranchChange}
            resetKey={filterResetKey}
          />

          <MultiSelectFilter
            title="Salesman"
            options={salesmen}
            selectedValues={selectedSalesmen}
            onChange={setSelectedSalesmen}
            resetKey={filterResetKey}
          />

          <MultiSelectFilter
            title="Customer"
            options={customers}
            selectedValues={selectedCustomers}
            onChange={setSelectedCustomers}
            resetKey={filterResetKey}
          />

          <MultiSelectFilter
            title="Channel"
            options={channels}
            selectedValues={selectedChannels}
            onChange={setSelectedChannels}
            resetKey={filterResetKey}
          />
        </div>

        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <button
            onClick={() => loadData()}
            disabled={loading}
            className="cursor-pointer rounded-full bg-teal-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Apply Filters
          </button>

          <button
            onClick={async () => {
              setSelectedBranches([]);
              setSelectedSalesmen([]);
              setSelectedCustomers([]);
              setSelectedChannels([]);
              setFilterResetKey((x) => x + 1);

              await loadFilters("");
              await loadData([], [], [], []);
            }}
            disabled={loading}
            className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group h-36 cursor-pointer [perspective:1000px]"
            >
              <div className="relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 rounded-2xl border border-teal-100 bg-white p-5 shadow-sm transition-all duration-300 [backface-visibility:hidden] group-hover:shadow-[0_18px_35px_rgba(20,184,166,0.16)]">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-500">
                      {card.title}
                    </p>

                    <div className="grid h-10 w-10 place-items-center rounded-full bg-teal-50 text-teal-600 transition group-hover:bg-teal-100">
                      <Icon size={20} />
                    </div>
                  </div>

                  <p className={`text-2xl font-bold ${card.color}`}>
                    {card.value}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">{card.desc}</p>
                </div>

                <div className="absolute inset-0 rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-500 to-cyan-500 p-5 text-white shadow-[0_18px_35px_rgba(20,184,166,0.2)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <Icon size={28} className="text-white" />

                    <p className="mt-3 text-sm font-bold">{card.title}</p>

                    <p className="mt-2 text-lg font-extrabold text-white">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Sales Variance Details
            </h2>

            <p className="text-sm text-slate-500">
              Click Variance column to sort ascending or descending.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="px-4 py-3">Customer No</th>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Customer Group</th>
                <th className="px-4 py-3">Branch Code</th>
                <th className="px-4 py-3">Branch Name</th>
                <th className="px-4 py-3">Salesman No</th>
                <th className="px-4 py-3">Salesman Name</th>
                <th className="px-4 py-3">Salesman Phone</th>
                <th className="px-4 py-3 text-right">Current Year</th>
                <th className="px-4 py-3 text-right">Last Year</th>
                <th
                  onClick={() =>
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                  }
                  className="cursor-pointer px-4 py-3 text-right"
                >
                  Variance {sortDirection === "asc" ? "↑" : "↓"}
                </th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={11}>
                    <Loader
                      text="Loading sales variance..."
                      fullScreen={false}
                    />
                  </td>
                </tr>
              )}

              {!loading &&
                pagedRows.map((item, index) => (
                  <tr
                    key={`${item.customerNumber}-${item.salesmanNumber}-${index}`}
                    className="border-b border-slate-100 transition hover:bg-teal-50/60"
                  >
                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {item.customerNumber}
                    </td>

                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {item.customerName}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {item.customerGroup}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {item.branchCode}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {item.branchName}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {item.salesmanNumber}
                    </td>

                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {item.salesManName}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {item.salesmanPhone}
                    </td>

                    <td className="px-4 py-3 text-right text-slate-700">
                      {formatNumber(item.currentYear)}
                    </td>

                    <td className="px-4 py-3 text-right text-slate-700">
                      {formatNumber(item.lastYear)}
                    </td>

                    <td
                      className={`px-4 py-3 text-right font-bold ${
                        item.variance >= 0 ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {formatNumber(item.variance)}
                    </td>
                  </tr>
                ))}

              {!loading && pagedRows.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1 || totalPages === 0}
              className="cursor-pointer rounded-lg border border-teal-200 bg-white px-4 py-2 text-sm font-semibold text-teal-600 transition hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="mr-1 transition-transform duration-200 group-hover:translate-x-1">
                ←
              </span>
              Previous
            </button>

            <button
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="cursor-pointer rounded-lg border border-teal-200 bg-white px-4 py-2 text-sm font-semibold text-teal-600 transition hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 items-center gap-3 md:grid-cols-3">
        <div className="flex justify-start">
          <button
            onClick={() => router.push("/sales")}
            className="group flex cursor-pointer items-center gap-2 rounded-full border border-teal-200 bg-white px-5 py-3 text-sm font-bold text-teal-600 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:bg-teal-50 hover:shadow-md"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>
            <span>Back</span>
          </button>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={printPdf}
            disabled={!!pageLoaderText}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-teal-500 px-5 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-teal-600 hover:shadow-lg active:translate-y-0"
          >
            <FileText size={17} className="transition group-hover:scale-110" />
            Print PDF
          </button>

          <button
            onClick={exportExcel}
            disabled={!!pageLoaderText}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-600 hover:shadow-lg active:translate-y-0"
          >
            <FileSpreadsheet
              size={17}
              className="transition group-hover:scale-110"
            />
            Export Excel
          </button>
        </div>

        <div className="flex justify-end">
          <button
            // onClick={() => loadData()}
            onClick={async () => {
              setSelectedBranches([]);
              setSelectedSalesmen([]);
              setSelectedCustomers([]);
              setSelectedChannels([]);
              setFilterResetKey((x) => x + 1);

              await loadFilters("");
              await loadData([], [], [], []);
            }}
            disabled={loading}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCcw
              size={17}
              className={
                loading ? "animate-spin" : "transition group-hover:rotate-180"
              }
            />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>
    </section>
  );
}
