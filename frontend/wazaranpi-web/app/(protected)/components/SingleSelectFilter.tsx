"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

type FilterOption = {
  value: string;
  label: string;
};

type Props = {
  title: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  resetKey?: number;
};

export default function SingleSelectFilter({
  title,
  options,
  value,
  onChange,
  disabled = false,
  resetKey = 0,
}: Props) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch("");
  }, [resetKey]);

  const selectedLabel = options.find((x) => x.value === value)?.label || "";

  const filteredOptions = useMemo(() => {
    return options.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {title}
      </label>

      <div className="rounded-xl border border-teal-100 bg-white p-2">
        <div className="mb-2 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
          <Search size={14} className="text-slate-400" />

          <input
            value={search}
            disabled={disabled}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={selectedLabel || `Search ${title}...`}
            className="w-full cursor-text bg-transparent text-sm font-semibold text-slate-700 outline-none disabled:cursor-not-allowed"
          />
        </div>

        <div className="max-h-48 overflow-y-auto">
          {filteredOptions.map((item) => (
            <button
              key={item.value}
              type="button"
              disabled={disabled}
              onClick={() => {
                onChange(item.value);
                setSearch(item.label);
              }}
              className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm font-semibold hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-50 ${
                value === item.value
                  ? "bg-teal-100 text-teal-700"
                  : "text-slate-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
