// PackWise AI — Loading Screen
import Logo from './Logo';

export default function LoadingScreen({ message = 'Processing…', submessage }) {
  return (
    <div className="fixed inset-0 bg-[#0a0c12]/95 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      {/* Animated ring */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full border-2 border-white/5 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-green-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border border-transparent border-t-green-500/30 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
          {/* Center logo mark */}
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M16 2L29 9.5V22.5L16 30L3 22.5V9.5L16 2Z" stroke="#22c55e" strokeWidth="1.5" fill="none" opacity="0.4" />
            <circle cx="16" cy="16" r="3.5" fill="#22c55e" />
          </svg>
        </div>
      </div>

      <Logo size="md" />

      <div className="mt-6 text-center">
        <p className="text-white font-medium text-sm">{message}</p>
        {submessage && (
          <p className="text-slate-500 text-xs mt-1">{submessage}</p>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-green-500/40 animate-pulse"
            style={{ animationDelay: `${i * 300}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

// Inline loading spinner for buttons/sections
export function LoadingSpinner({ size = 16, className = '' }) {
  return (
    <div
      className={`rounded-full border-2 border-white/10 border-t-green-500 animate-spin ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
