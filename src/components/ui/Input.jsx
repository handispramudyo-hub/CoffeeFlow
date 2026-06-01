export default function Input({ label, error, icon: Icon, className = "", ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-coffee-700">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-coffee-400">
            <Icon size={16} />
          </div>
        )}
        <input
          className={`w-full rounded-xl border border-coffee-200 bg-white px-4 py-2.5 text-sm text-coffee-900 placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-500/30 focus:border-coffee-500 transition-all ${Icon ? "pl-10" : ""} ${error ? "border-danger focus:ring-danger/30" : ""} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

export function Select({ label, error, options = [], className = "", ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-coffee-700">{label}</label>}
      <select
        className={`w-full rounded-xl border border-coffee-200 bg-white px-4 py-2.5 text-sm text-coffee-900 focus:outline-none focus:ring-2 focus:ring-coffee-500/30 focus:border-coffee-500 transition-all ${error ? "border-danger" : ""} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
