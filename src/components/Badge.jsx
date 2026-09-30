// PackWise AI — Badge Component
const BADGE_STYLES = {
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
  teal: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  slate: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

export default function Badge({ children, color = 'green', icon: Icon, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${BADGE_STYLES[color] || BADGE_STYLES.slate} ${className}`}
    >
      {Icon && <Icon size={10} />}
      {children}
    </span>
  );
}
