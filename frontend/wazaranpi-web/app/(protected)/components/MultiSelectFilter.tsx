type FilterOption = {
  value: string;
  label: string;
};

export default function MultiSelectFilter({
  title,
  options,
  selectedValues,
  onChange,
}: {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void | Promise<void>;
}) {
  const toggleValue = async (value: string) => {
    if (selectedValues.includes(value)) {
      await onChange(selectedValues.filter((x) => x !== value));
    } else {
      await onChange([...selectedValues, value]);
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {title}
      </label>

      <div className="max-h-44 overflow-y-auto rounded-xl border border-slate-200 bg-white p-3">
        <label className="mb-2 flex cursor-pointer items-center gap-2 text-sm font-semibold text-teal-700">
          <input
            type="checkbox"
            checked={selectedValues.length === 0}
            onChange={async () => await onChange([])}
          />
          All
        </label>

        {options.map((option) => (
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
