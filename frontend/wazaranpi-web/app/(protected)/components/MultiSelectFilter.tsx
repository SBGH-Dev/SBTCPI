"use client";

// import { useState } from "react";
import { useEffect, useState } from "react";

type FilterOption = {
  value: string;
  label: string;
};

export default function MultiSelectFilter({
  title,
  options,
  selectedValues,
  onChange,
  resetKey,
}: {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  resetKey: number;
  onChange: (values: string[]) => void | Promise<void>;
}) {
  const [searchText, setSearchText] = useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase()),
  );

  const toggleValue = async (value: string) => {
    if (selectedValues.includes(value)) {
      await onChange(selectedValues.filter((x) => x !== value));
    } else {
      await onChange([...selectedValues, value]);
    }
  };

  useEffect(() => {
    setSearchText("");
  }, [resetKey]);

  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {title}
      </label>

      <div className="max-h-44 overflow-y-auto rounded-xl border border-slate-200 bg-white p-3">
        <input
          type="text"
          placeholder={`Search ${title}...`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="mb-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-black placeholder:text-slate-500 outline-none focus:border-teal-400"
        />

        <label className="mb-2 flex cursor-pointer items-center gap-2 text-sm font-semibold text-teal-700">
          <input
            type="checkbox"
            checked={selectedValues.length === 0}
            onChange={async () => await onChange([])}
          />
          All
        </label>

        {filteredOptions.map((option) => (
          <label
            key={option.value}
            className="mb-2 flex cursor-pointer items-center gap-2 text-sm text-slate-600"
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={() => toggleValue(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
