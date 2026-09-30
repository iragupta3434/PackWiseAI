// PackWise AI — Explainability Flow Component
import {
  Droplets, Zap, Thermometer, Filter, Award,
  ChevronDown, BookOpen, AlertTriangle, CheckCircle
} from 'lucide-react';
import Badge from './Badge';
import Card from './Card';

const ICON_MAP = {
  droplets: Droplets,
  zap: Zap,
  thermometer: Thermometer,
  filter: Filter,
  award: Award,
};

const RISK_STYLES = {
  high: { badge: 'red', dot: 'bg-red-400', glow: 'shadow-red-500/10' },
  medium: { badge: 'amber', dot: 'bg-amber-400', glow: 'shadow-amber-500/10' },
  low: { badge: 'blue', dot: 'bg-blue-400', glow: 'shadow-blue-500/10' },
  none: { badge: 'green', dot: 'bg-green-400', glow: 'shadow-green-500/10' },
};

function ExplainStep({ step, isLast }) {
  const Icon = ICON_MAP[step.icon] || BookOpen;
  const risk = RISK_STYLES[step.riskLevel] || RISK_STYLES.none;

  return (
    <div className="flex flex-col items-center">
      <div className={`relative w-full bg-[#0f1117] border border-white/5 rounded-xl p-4 transition-all duration-200 hover:border-green-500/10 shadow-lg ${risk.glow}`}>
        {/* Step number */}
        <div className="absolute -top-2.5 -left-2.5 w-5 h-5 rounded-full bg-[#0a0c12] border border-white/10 flex items-center justify-center">
          <span className="text-[9px] font-bold text-slate-500">{step.step}</span>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/10 flex items-center justify-center">
            <Icon size={14} className="text-green-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-white">{step.input}</span>
              <Badge color={risk.badge}>{step.riskFlag}</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{step.reasoning}</p>
          </div>
        </div>
      </div>

      {/* Arrow connector */}
      {!isLast && (
        <div className="flex flex-col items-center my-1.5">
          <div className="w-px h-3 bg-green-500/20" />
          <ChevronDown size={12} className="text-green-500/40" />
        </div>
      )}
    </div>
  );
}

export default function ExplainabilityFlow({ chain = [], compact = false }) {
  return (
    <div className="space-y-0">
      {/* Header */}
      {!compact && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Reasoning Chain
          </span>
        </div>
      )}

      {chain.map((step, idx) => (
        <ExplainStep key={step.step} step={step} isLast={idx === chain.length - 1} />
      ))}

      {/* Evidence footnote */}
      {!compact && (
        <div className="mt-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/15">
          <div className="flex items-start gap-2">
            <AlertTriangle size={12} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-amber-400">Demo Reasoning Chain</p>
              <p className="text-xs text-slate-500 mt-0.5">
                This reasoning chain is a structural demonstration. Actual logic will be powered by the scientific rule engine and connected knowledge base.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Evidence Panel sub-component
export function EvidencePanel({ source, evidenceStatus, testCondition, modelAssumption }) {
  return (
    <Card padding="sm" className="bg-[#0f1117]">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle size={12} className="text-green-400" />
        <span className="text-xs font-medium text-slate-300">Evidence Status</span>
      </div>
      <div className="space-y-2">
        {[
          { label: 'Source', value: source || 'Material database — demo record' },
          { label: 'Evidence Status', value: evidenceStatus || 'Structural placeholder' },
          { label: 'Test Condition', value: testCondition || 'Not yet connected to real test data' },
          { label: 'Model Assumption', value: modelAssumption || 'Demo assumption — pending validation' },
        ].map(({ label, value }) => (
          <div key={label} className="flex gap-3">
            <span className="text-xs text-slate-600 w-28 flex-shrink-0">{label}</span>
            <span className="text-xs text-slate-400">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
