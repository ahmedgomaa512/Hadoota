export default function QuantityStepper({ value, onChange, min = 1 }) {
  return (
    <div className="grid h-10 w-28 grid-cols-3 overflow-hidden rounded-full border border-light-gray bg-white">
      <button className="text-lg font-semibold text-gray" type="button" onClick={() => onChange(Math.max(min, value - 1))}>
        -
      </button>
      <div className="flex items-center justify-center text-sm font-semibold text-ink">{value}</div>
      <button className="text-lg font-semibold text-gray" type="button" onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
}
