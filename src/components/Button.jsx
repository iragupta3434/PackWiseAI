// PackWise AI — Reusable Button Component
import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary: 'bg-green-500 hover:bg-green-400 text-black font-semibold shadow-lg shadow-green-500/10',
  secondary: 'bg-transparent border border-green-500/40 hover:border-green-500 text-green-400 hover:text-green-300',
  ghost: 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5',
  danger: 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20',
  outline: 'bg-transparent border border-white/10 hover:border-white/20 text-slate-300 hover:text-white',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
  xl: 'px-8 py-4 text-base gap-2.5',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  return (
    <button
      className={`${baseClasses} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={14} />
      ) : (
        Icon && <Icon size={size === 'sm' ? 12 : size === 'lg' || size === 'xl' ? 18 : 14} />
      )}
      {children}
      {IconRight && !isLoading && (
        <IconRight size={size === 'sm' ? 12 : size === 'lg' || size === 'xl' ? 18 : 14} />
      )}
    </button>
  );
}
