"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  Building2,
  Crown,
  Filter,
  MapPin,
  Phone,
  Receipt,
  RefreshCcw,
  Search,
  ShoppingBag,
  User,
  Wallet,
} from "lucide-react";
import SingleSelectFilter from "../components/SingleSelectFilter";
import Loader from "../components/Loader";
import ProfileButton from "../components/ProfileButton";

type FilterOption = {
  value: string;
  label: string;
};

type CustomerDashBoardFilters = {
  branches: FilterOption[];
  channels: FilterOption[];
  customers: FilterOption[];
  products: FilterOption[];
};

type CustomerDetails = {
  customerNumber: string;
  customerName: string;
  customerChannel: string;
  customerGroup: string;
  customerAddress: string;
  customerPhone: string;
  customerMobile: string;
  customerLatitude: number;
  customerLongitude: number;
  salesmanNumber: string;
  salesmanName: string;
  salesmanPhone: string;
  customerVatNumber: string;
  pendingPayment: number;
  latestPaymentDt: string | null;
  totalSales: number;
  totalSalesThisYear: number;
  totalSalesThisMonth: number;
  totalSalesToday: number;
  currentYear: number;
  currentMonth: string;
};

type TopPayingData = {
  thisYear: {
    topPayingCustomerThisYear: string;
    topPayingCustomerThisYearAmount: number;
    currentYear: string;
  } | null;
  thisMonth: {
    topPayingCustomerThisMonth: string;
    topPayingCustomerThisMonthAmount: number;
    currentMonth: string;
  } | null;
};

export default function CustomerDashboard() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false);
  const [pageLoaderText, setPageLoaderText] = useState("");

  const [branches, setBranches] = useState<FilterOption[]>([]);
  const [channels, setChannels] = useState<FilterOption[]>([]);
  const [customers, setCustomers] = useState<FilterOption[]>([]);
  const [products, setProducts] = useState<FilterOption[]>([]);

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const router = useRouter();

  const [customerDetails, setCustomerDetails] =
    useState<CustomerDetails | null>(null);

  const [topPaying, setTopPaying] = useState<TopPayingData | null>(null);

  const [filterResetKey, setFilterResetKey] = useState(0);

  const formatNumber = (value: number) => {
    return Number(value || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const hasLocation = () => {
    if (!customerDetails) return false;

    return (
      Number(customerDetails.customerLatitude || 0) !== 0 &&
      Number(customerDetails.customerLongitude || 0) !== 0
    );
  };

  const openGoogleMap = () => {
    if (!customerDetails || !hasLocation()) {
      Swal.fire({
        title: "Location Not Found",
        text: "Customer latitude and longitude are not available.",
        icon: "warning",
        confirmButtonColor: "#14b8a6",
        background: "#F3FFFC",
        color: "#1e293b",
      });

      return;
    }

    const url = `https://www.google.com/maps?q=${customerDetails.customerLatitude},${customerDetails.customerLongitude}`;

    window.open(url, "_blank");
  };

  const openStreetView = () => {
    if (!customerDetails || !hasLocation()) {
      Swal.fire({
        title: "Picture Not Found",
        text: "Customer location is not available, so Google Street View cannot be opened.",
        icon: "warning",
        confirmButtonColor: "#14b8a6",
        background: "#F3FFFC",
        color: "#1e293b",
      });

      return;
    }

    const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${customerDetails.customerLatitude},${customerDetails.customerLongitude}`;

    window.open(url, "_blank");
  };

  const loadInitialFilters = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${apiBaseUrl}/dashboards/customer-dashboard/filters`,
      );

      if (!response.ok) {
        throw new Error("Failed to load filters.");
      }

      const data: CustomerDashBoardFilters = await response.json();

      setBranches(data.branches);
      setProducts(data.products);
      setChannels([]);
      setCustomers([]);
    } catch {
      await Swal.fire({
        title: "Error",
        text: "Could not load customer dashboard filters.",
        icon: "error",
        confirmButtonColor: "#14b8a6",
        background: "#F3FFFC",
        color: "#1e293b",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadChannels = async () => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/dashboards/customer-dashboard/channels`,
      );

      if (!response.ok) {
        throw new Error("Failed to load channels.");
      }

      const data: FilterOption[] = await response.json();

      setChannels(data);
    } catch {
      await Swal.fire({
        title: "Error",
        text: "Could not load channels.",
        icon: "error",
        confirmButtonColor: "#14b8a6",
        background: "#F3FFFC",
        color: "#1e293b",
      });
    }
  };

  const loadCustomers = async (branchCode: string, channelCode: string) => {
    try {
      const params = new URLSearchParams();

      params.append("salespointcd", branchCode);
      params.append("otldcd", channelCode);

      const response = await fetch(
        `${apiBaseUrl}/dashboards/customer-dashboard/customers?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load customers.");
      }

      const data: FilterOption[] = await response.json();

      setCustomers(data);
    } catch {
      await Swal.fire({
        title: "Error",
        text: "Could not load customers.",
        icon: "error",
        confirmButtonColor: "#14b8a6",
        background: "#F3FFFC",
        color: "#1e293b",
      });
    }
  };

  const loadTopPayingCustomers = async (branchCode: string) => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/dashboards/customer-dashboard/top-paying?salespointcd=${branchCode}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load top paying customer.");
      }

      const data: TopPayingData = await response.json();

      setTopPaying(data);
    } catch {
      setTopPaying(null);
    }
  };

  const handleBranchChange = async (branchCode: string) => {
    setSelectedBranch(branchCode);
    setSelectedChannel("");
    setSelectedCustomer("");

    setCustomerDetails(null);
    setChannels([]);
    setCustomers([]);
    setTopPaying(null);

    if (branchCode) {
      await loadChannels();
      await loadTopPayingCustomers(branchCode);
    }
  };

  const handleChannelChange = async (channelCode: string) => {
    setSelectedChannel(channelCode);
    setSelectedCustomer("");

    setCustomerDetails(null);
    setCustomers([]);

    if (selectedBranch && channelCode) {
      await loadCustomers(selectedBranch, channelCode);
    }
  };

  const applyFilters = async () => {
    if (
      !selectedBranch ||
      !selectedChannel ||
      !selectedCustomer ||
      !selectedProduct
    ) {
      await Swal.fire({
        title: "Missing Filters",
        text: "Please select branch, channel, customer, and product.",
        icon: "warning",
        confirmButtonColor: "#14b8a6",
        background: "#F3FFFC",
        color: "#1e293b",
      });

      return;
    }

    try {
      setPageLoaderText("Loading customer dashboard...");

      const params = new URLSearchParams();

      params.append("salespointcd", selectedBranch);
      params.append("cust_cd", selectedCustomer);
      params.append("prod_cd", selectedProduct);

      const response = await fetch(
        `${apiBaseUrl}/dashboards/customer-dashboard/details?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("No data found.");
      }

      const data: CustomerDetails = await response.json();

      setCustomerDetails(data);
    } catch {
      setCustomerDetails(null);

      await Swal.fire({
        title: "No Data",
        text: "No customer data found for the selected filters.",
        icon: "info",
        confirmButtonColor: "#14b8a6",
        background: "#F3FFFC",
        color: "#1e293b",
      });
    } finally {
      setPageLoaderText("");
    }
  };

  const resetFilters = async () => {
    setSelectedBranch("");
    setSelectedChannel("");
    setSelectedCustomer("");
    setSelectedProduct("");

    setChannels([]);
    setCustomers([]);

    setCustomerDetails(null);
    setTopPaying(null);

    setFilterResetKey((x) => x + 1);

    await loadInitialFilters();
  };

  useEffect(() => {
    loadInitialFilters();
  }, []);

  return (
    <section className="min-h-[calc(100vh-8rem)] rounded-[2rem] bg-white/70 p-10 shadow-[0_20px_60px_rgba(15,118,110,0.12)]">
      {pageLoaderText && <Loader text={pageLoaderText} fullScreen={true} />}

      <div className="mb-8 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-5 text-white shadow-[0_10px_30px_rgba(20,184,166,0.25)]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Customer Dashboard</h1>

            <p className="mt-1 text-sm text-white/80">
              View customer sales, pending payment, salesman details, and
              location.
            </p>
          </div>

          <ProfileButton />
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-teal-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-full bg-teal-100 p-2 text-teal-600">
            <Filter size={14} />
          </div>

          <h2 className="text-lg font-bold text-slate-800">Filters</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <SingleSelectFilter
            title="Branch"
            options={branches}
            resetKey={filterResetKey}
            value={selectedBranch}
            onChange={handleBranchChange}
          />

          <SingleSelectFilter
            title="Channel"
            options={channels}
            value={selectedChannel}
            resetKey={filterResetKey}
            onChange={handleChannelChange}
            disabled={!selectedBranch}
          />

          <SingleSelectFilter
            title="Customer"
            options={customers}
            value={selectedCustomer}
            resetKey={filterResetKey}
            onChange={setSelectedCustomer}
            disabled={!selectedBranch || !selectedChannel}
          />

          <SingleSelectFilter
            title="Product"
            options={products}
            value={selectedProduct}
            resetKey={filterResetKey}
            onChange={setSelectedProduct}
          />
        </div>

        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <button
            onClick={applyFilters}
            disabled={loading || !!pageLoaderText}
            className="cursor-pointer rounded-full bg-teal-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Apply
          </button>

          <button
            onClick={resetFilters}
            disabled={loading || !!pageLoaderText}
            className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reset
          </button>
        </div>
      </div>

      {selectedBranch && topPaying && (
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-100 p-5 shadow-sm">
            <p className="text-sm font-bold text-amber-700">
              👑 Top Paying Customer This Year
            </p>

            <h3 className="mt-2 text-xl font-extrabold text-slate-800">
              {topPaying.thisYear?.topPayingCustomerThisYear || "N/A"}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Among all products - {topPaying.thisYear?.currentYear || "N/A"}
            </p>

            <p className="mt-3 text-2xl font-black text-amber-700">
              {formatNumber(
                topPaying.thisYear?.topPayingCustomerThisYearAmount || 0,
              )}{" "}
              SAR
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-100 p-5 shadow-sm">
            <p className="text-sm font-bold text-amber-700">
              👑 Top Paying Customer This Month
            </p>

            <h3 className="mt-2 text-xl font-extrabold text-slate-800">
              {topPaying.thisMonth?.topPayingCustomerThisMonth || "N/A"}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Among all products - {topPaying.thisMonth?.currentMonth || "N/A"}
            </p>

            <p className="mt-3 text-2xl font-black text-amber-700">
              {formatNumber(
                topPaying.thisMonth?.topPayingCustomerThisMonthAmount || 0,
              )}{" "}
              SAR
            </p>
          </div>
        </div>
      )}

      {!customerDetails && (
        <div className="rounded-2xl border border-dashed border-teal-200 bg-white p-10 text-center text-slate-500">
          Select filters and click Apply to view customer dashboard.
        </div>
      )}

      {customerDetails && (
        <>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <SummaryCard
              title="Total Sales"
              value={`${formatNumber(customerDetails.totalSales)} SAR`}
              icon={ShoppingBag}
            />

            <SummaryCard
              title={`Sales ${customerDetails.currentYear}`}
              value={`${formatNumber(customerDetails.totalSalesThisYear)} SAR`}
              icon={Receipt}
            />

            <SummaryCard
              title={`Sales ${customerDetails.currentMonth}`}
              value={`${formatNumber(customerDetails.totalSalesThisMonth)} SAR`}
              icon={Receipt}
            />

            <SummaryCard
              title="Pending Payment"
              value={`${formatNumber(customerDetails.pendingPayment)} SAR`}
              icon={Wallet}
              danger={customerDetails.pendingPayment > 0}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <User className="text-teal-600" size={20} />
                <h2 className="text-lg font-bold text-slate-800">
                  Customer Information
                </h2>
              </div>

              <InfoRow
                label="Customer No"
                value={customerDetails.customerNumber}
              />
              <InfoRow
                label="Customer Name"
                value={customerDetails.customerName}
              />
              <InfoRow
                label="Channel"
                value={customerDetails.customerChannel}
              />
              <InfoRow label="Group" value={customerDetails.customerGroup} />
              <InfoRow
                label="VAT Number"
                value={customerDetails.customerVatNumber}
              />
              <InfoRow
                label="Address"
                value={customerDetails.customerAddress}
              />
              <InfoRow
                label="Latest Payment Date"
                value={
                  customerDetails.latestPaymentDt
                    ? new Date(
                        customerDetails.latestPaymentDt,
                      ).toLocaleDateString()
                    : "N/A"
                }
              />

              <InfoRow label="Phone" value={customerDetails.customerPhone} />
              <InfoRow label="Mobile" value={customerDetails.customerMobile} />
            </div>

            <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <Building2 className="text-teal-600" size={20} />
                <h2 className="text-lg font-bold text-slate-800">
                  Salesman & Location
                </h2>
              </div>

              <InfoRow
                label="Salesman No"
                value={customerDetails.salesmanNumber}
              />
              <InfoRow
                label="Salesman Name"
                value={customerDetails.salesmanName}
              />
              <InfoRow
                label="Salesman Phone"
                value={customerDetails.salesmanPhone}
              />
              {/* <InfoRow
                label="Latest Payment Date"
                value={
                  customerDetails.latestPaymentDt
                    ? new Date(
                        customerDetails.latestPaymentDt,
                      ).toLocaleDateString()
                    : "N/A"
                }
              /> */}

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={openGoogleMap}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-teal-500 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-teal-600"
                >
                  <MapPin size={17} />
                  Open Google Map
                </button>

                <button
                  onClick={openStreetView}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-cyan-600"
                >
                  <Building2 size={17} />
                  View Customer Picture
                </button>
              </div>

              {!hasLocation() && (
                <div className="mt-4 flex justify-center">
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-500">
                    Customer location is not found.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <div className="mt-10 flex items-center justify-center gap-3">
        <button
          onClick={() => router.push("/")}
          className="group flex cursor-pointer items-center gap-2 rounded-full border border-teal-200 bg-white px-5 py-3 text-sm font-bold text-teal-600 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:bg-teal-50 hover:shadow-md"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">
            ←
          </span>
          <span>Back</span>
        </button>

        <button
          onClick={resetFilters}
          disabled={loading || !!pageLoaderText}
          className="group flex cursor-pointer items-center gap-2 rounded-full border border-teal-200 bg-white px-5 py-3 text-sm font-bold text-teal-600 shadow-sm transition-all duration-300 hover:bg-teal-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
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
    </section>
  );
}

function SummaryCard({
  title,
  value,
  icon: Icon,
  danger = false,
}: {
  title: string;
  value: string;
  icon: any;
  danger?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-500">{title}</p>

        <div className="grid h-10 w-10 place-items-center rounded-full bg-teal-50 text-teal-600">
          <Icon size={20} />
        </div>
      </div>

      <p
        className={`text-2xl font-bold ${
          danger ? "text-red-500" : "text-teal-600"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3 flex justify-between gap-4 border-b border-slate-100 pb-3">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="text-right text-sm font-bold text-slate-800">
        {value || "N/A"}
      </p>
    </div>
  );
}
