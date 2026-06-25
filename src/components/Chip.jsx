export default function Chip({ children, selected = false, className = '', ...props }) {
  return (
    <button
      className={`h-10 flex-none rounded-full border px-4 text-sm font-semibold ${
        selected ? 'border-lantern-amber bg-lantern-amber text-ink' : 'border-light-gray bg-white text-gray'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
