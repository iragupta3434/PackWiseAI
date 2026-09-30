// PackWise AI — Form Input Components

export function Input({
  label,
  id,
  hint,
  error,
  suffix,
  prefix,
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-xs font-medium text-slate-400 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">
            {prefix}
          </span>
        )}
        <input
          id={id}
          className={`w-full bg-[#0f1117] border border-white/10 rounded-lg py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all duration-200 ${prefix ? 'pl-8 pr-3' : 'px-3'} ${suffix ? 'pr-12' : ''} ${error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : ''}`}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-medium">
            {suffix}
          </span>
        )}
      </div>
      {hint && !error && (
        <p className="mt-1 text-xs text-slate-600">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

export function Select({ label, id, hint, error, options = [], className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-xs font-medium text-slate-400 mb-1.5">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full bg-[#0f1117] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all duration-200 appearance-none ${error ? 'border-red-500/50' : ''}`}
        {...props}
      >
        <option value="" className="bg-[#0f1117] text-slate-500">
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#0f1117] text-slate-200">
            {opt.label}
          </option>
        ))}
      </select>
      {hint && !error && <p className="mt-1 text-xs text-slate-600">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Slider({ label, id, min = 0, max = 100, value, onChange, suffix = '%', hint, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor={id} className="text-xs font-medium text-slate-400">
            {label}
          </label>
          <span className="text-xs font-mono text-green-400 font-medium">
            {value}{suffix}
          </span>
        </div>
      )}
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-green-500"
      />
      {hint && <p className="mt-1 text-xs text-slate-600">{hint}</p>}
    </div>
  );
}

export function RadioGroup({ label, options = [], value, onChange, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <p className="text-xs font-medium text-slate-400 mb-2">{label}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
              value === opt.value
                ? 'bg-green-500/10 border-green-500/40 text-green-400'
                : 'bg-transparent border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
