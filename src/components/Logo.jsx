// PackWise AI — Logo Component (CSS/SVG, no external image)
export default function Logo({ size = 'md', showTagline = false }) {
  const sizes = {
    sm: { icon: 20, text: 'text-base', dot: 4 },
    md: { icon: 28, text: 'text-xl', dot: 5 },
    lg: { icon: 40, text: 'text-3xl', dot: 7 },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2.5">
        {/* Hexagonal packaging mark */}
        <svg
          width={s.icon}
          height={s.icon}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M16 2L29 9.5V22.5L16 30L3 22.5V9.5L16 2Z"
            stroke="#22c55e"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M16 7L25 12V22L16 27L7 22V12L16 7Z"
            fill="rgba(34,197,94,0.12)"
          />
          <circle cx="16" cy="16" r="3.5" fill="#22c55e" />
          <circle cx="16" cy="16" r="1.5" fill="#0a0c12" />
        </svg>

        <div className="flex items-baseline gap-0.5">
          <span className={`font-bold tracking-tight text-white ${s.text}`}>
            Pack
          </span>
          <span className={`font-bold tracking-tight text-green-400 ${s.text}`}>
            Wise
          </span>
          <span className={`font-light tracking-tight text-slate-400 ${s.text} ml-1`}>
            AI
          </span>
        </div>
      </div>
      {showTagline && (
        <p className="text-xs text-slate-500 mt-0.5 ml-9 leading-none">
          Evidence-Based Packaging Decisions
        </p>
      )}
    </div>
  );
}
