// PackWise AI — Metric Card
import Badge from './Badge';

export default function MetricCard({ label, value, unit, subtext, color = 'green', note }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-slate-500 mb-1">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={`text-xl font-bold font-mono text-white`}>{value}</span>
        {unit && <span className="text-xs text-slate-500">{unit}</span>}
      </div>
      {subtext && <span className="text-xs text-slate-600 mt-0.5">{subtext}</span>}
      {note && (
        <Badge color="amber" className="mt-1.5 w-fit">
          {note}
        </Badge>
      )}
    </div>
  );
}
