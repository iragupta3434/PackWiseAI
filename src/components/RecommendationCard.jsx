// PackWise AI — Recommendation Card Component
import { Shield, Leaf, DollarSign, CheckCircle, Info, FlaskConical, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import Badge from './Badge';
import Button from './Button';
import MetricCard from './MetricCard';

const PRIORITY_META = {
  performance: {
    color: 'green',
    accentClass: 'border-green-500/30 hover:border-green-500/50',
    labelClass: 'text-green-400',
    glowClass: 'shadow-green-500/5',
    icon: Shield,
  },
  balanced: {
    color: 'blue',
    accentClass: 'border-blue-500/20 hover:border-blue-500/40',
    labelClass: 'text-blue-400',
    glowClass: 'shadow-blue-500/5',
    icon: CheckCircle,
  },
  'cost-sustainability': {
    color: 'amber',
    accentClass: 'border-amber-500/20 hover:border-amber-500/40',
    labelClass: 'text-amber-400',
    glowClass: 'shadow-amber-500/5',
    icon: Leaf,
  },
};

export default function RecommendationCard({ rec, onExplain, onWhatIf }) {
  const [expanded, setExpanded] = useState(false);
  const meta = PRIORITY_META[rec.priority] || PRIORITY_META.balanced;
  const PriorityIcon = meta.icon;

  return (
    <div
      className={`bg-[#151922] border rounded-xl transition-all duration-300 shadow-lg ${meta.accentClass} ${meta.glowClass}`}
    >
      {/* Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg bg-${meta.color}-500/10 flex items-center justify-center`}>
              <PriorityIcon size={14} className={meta.labelClass} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{rec.label}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{rec.tagline}</p>
            </div>
          </div>
          <Badge color={meta.color}>{rec.barrierClass}</Badge>
        </div>

        {/* Material */}
        <div className="mt-4 p-3 rounded-lg bg-[#0f1117] border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-slate-500">Material</span>
          </div>
          <p className="text-sm font-semibold text-white">{rec.material}</p>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">{rec.structure}</p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <MetricCard
            label="OTR (demo estimate)"
            value={rec.otr}
            note="Model"
          />
          <MetricCard
            label="WVTR (demo estimate)"
            value={rec.wvtr}
            note="Model"
          />
          <MetricCard
            label="Thickness"
            value={`${rec.thicknessMicron} µm`}
          />
          <MetricCard
            label="Est. Cost"
            value={rec.estimatedCost}
          />
        </div>
      </div>

      {/* Expandable section */}
      <button
        className="w-full flex items-center justify-between px-5 py-2.5 border-t border-white/5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <span>Details & Sustainability</span>
        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      {expanded && (
        <div className="px-5 pb-4 space-y-3 animate-fade-in">
          {/* Sustainability */}
          <div className="p-3 rounded-lg bg-[#0f1117] border border-white/5">
            <div className="flex items-center gap-1.5 mb-1">
              <Leaf size={10} className="text-green-400" />
              <span className="text-xs text-green-400 font-medium">Sustainability Profile</span>
            </div>
            <p className="text-xs text-slate-400">{rec.sustainability}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-sm ${i < rec.sustainabilityScore ? 'bg-green-500' : 'bg-white/5'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-600">{rec.sustainabilityScore}/8</span>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 gap-2">
            <div>
              <p className="text-xs text-slate-500 mb-1.5">Considerations (demo)</p>
              <ul className="space-y-1">
                {rec.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-slate-400">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">+</span>
                    {p}
                  </li>
                ))}
                {rec.cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-slate-400">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">–</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Compatibility */}
          <div className="p-2.5 rounded-lg bg-[#0f1117] border border-white/5">
            <span className="text-xs text-slate-500">Compatibility: </span>
            <span className="text-xs text-slate-300">{rec.compatibility}</span>
          </div>

          {/* Evidence */}
          <div className="p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/15">
            <div className="flex items-center gap-1.5">
              <Info size={10} className="text-amber-400" />
              <span className="text-xs text-amber-400">Evidence: </span>
              <span className="text-xs text-slate-400">{rec.evidenceStatus}</span>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-5 py-3 border-t border-white/5 flex gap-2 flex-wrap">
        <Button
          variant="ghost"
          size="sm"
          icon={Info}
          onClick={() => onExplain?.(rec)}
        >
          Explain
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={FlaskConical}
          onClick={() => onWhatIf?.(rec)}
        >
          What-If
        </Button>
      </div>
    </div>
  );
}
