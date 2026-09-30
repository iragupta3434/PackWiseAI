// PackWise AI — Recommended Packaging Specifications Panel (Phase 3 SIH Requirement)
// Consolidates all 10 core packaging specifications explicitly requested in the problem statement
import { useState } from 'react';
import {
  FileText, Shield, Layers, Wind, Gauge, CheckCircle,
  AlertTriangle, DollarSign, Leaf, Lock, Activity, Eye
} from 'lucide-react';
import Badge from './Badge';

export default function PackagingSpecificationPanel({ recommendations = [], selectedProduct, conditions }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!recommendations || recommendations.length === 0) return null;

  const currentRec = recommendations[activeTab] || recommendations[0];

  const PRIORITY_BADGE_COLORS = {
    performance: 'green',
    balanced: 'blue',
    'cost-sustainability': 'amber',
  };

  const currentBadgeColor = PRIORITY_BADGE_COLORS[currentRec.priority] || 'blue';

  const specs = [
    {
      id: 'material',
      label: 'Packaging Material & Structure',
      value: currentRec.material,
      subValue: currentRec.structure,
      icon: Layers,
      highlight: true,
    },
    {
      id: 'thickness',
      label: 'Film Thickness',
      value: currentRec.thicknessMicron ? `${currentRec.thicknessMicron} µm` : 'Not specified in current evidence set',
      icon: Gauge,
    },
    {
      id: 'otr',
      label: 'Oxygen Transmission Rate (OTR)',
      value: currentRec.otr || 'Not specified in current evidence set',
      subValue: currentRec.testTemperature ? `Test: ${currentRec.testTemperature}, ${currentRec.testHumidity}` : null,
      icon: Wind,
      badge: 'Demo Reference',
    },
    {
      id: 'wvtr',
      label: 'Water Vapor Transmission Rate (WVTR)',
      value: currentRec.wvtr || 'Not specified in current evidence set',
      subValue: currentRec.testHumidity ? `Test: ${currentRec.testTemperature}, ${currentRec.testHumidity}` : null,
      icon: Activity,
      badge: 'Demo Reference',
    },
    {
      id: 'gasPermeability',
      label: 'Gas Permeability',
      value: currentRec.gasPermeability || 'Not specified in current evidence set',
      subValue: currentRec.mapWarning ? 'Controlled gas exchange tuned for respiration' : null,
      icon: Wind,
    },
    {
      id: 'mechanicalStrength',
      label: 'Mechanical Strength',
      value: currentRec.mechanicalStrength || 'Not specified in current evidence set',
      subValue: currentRec.mechanicalStrengthNote || 'Mechanical requirement influenced by transportation and handling conditions.',
      icon: Shield,
    },
    {
      id: 'sealability',
      label: 'Sealability & Integrity',
      value: currentRec.sealability || 'Evidence not available',
      subValue: currentRec.sealabilityNote || 'Sealability supports package hermetic integrity during storage and distribution.',
      icon: Lock,
    },
    {
      id: 'mapSuitability',
      label: 'MAP Suitability',
      value: currentRec.mapSuitability || 'Not specified in current evidence set',
      subValue: currentRec.mapWarning ? 'Controlled respiration balance — lower OTR is NOT better' : null,
      icon: CheckCircle,
      isMap: true,
    },
    {
      id: 'cost',
      label: 'Indicative Material Cost',
      value: currentRec.estimatedCost || 'Not specified in current evidence set',
      subValue: 'Estimated per m² (converter benchmark)',
      icon: DollarSign,
    },
    {
      id: 'sustainability',
      label: 'Sustainability Profile',
      value: currentRec.sustainability || 'Not specified in current evidence set',
      subValue: currentRec.sustainabilityScore ? `Circularity Score: ${currentRec.sustainabilityScore} / 8` : null,
      icon: Leaf,
    },
  ];

  return (
    <div className="bg-[#151922] border border-white/10 rounded-2xl p-6 shadow-xl mb-8">
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full mb-2">
            <FileText size={12} className="text-green-400" />
            <span className="text-xs text-green-400 font-semibold uppercase tracking-wider">
              Technical Specification Matrix
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">RECOMMENDED PACKAGING SPECIFICATIONS</h2>
          <p className="text-xs text-slate-400 mt-1">
            Consolidated engineering specifications across 10 official parameters for <strong className="text-white">{selectedProduct || 'Selected Commodity'}</strong>
          </p>
        </div>

        {/* Configuration Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#0f1117] border border-white/5 rounded-xl">
          {recommendations.map((rec, index) => {
            const isActive = activeTab === index;
            const badgeColor = PRIORITY_BADGE_COLORS[rec.priority] || 'blue';
            return (
              <button
                key={rec.id || index}
                onClick={() => setActiveTab(index)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {rec.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Configuration Overview Banner */}
      <div className="py-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Badge color={currentBadgeColor}>{currentRec.label}</Badge>
          <span className="text-sm font-semibold text-white">{currentRec.material}</span>
          <span className="text-xs text-slate-500 font-mono hidden md:inline">({currentRec.structure})</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Barrier Class:</span>
          <span className="font-semibold text-slate-200">{currentRec.barrierClass}</span>
          <span className="text-slate-600">|</span>
          <span>Status:</span>
          <span className="text-amber-400 font-medium">{currentRec.evidenceStatus || 'Demo Reference'}</span>
        </div>
      </div>

      {/* 10 Specifications Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-5">
        {specs.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl bg-[#0f1117] border transition-all ${
                item.highlight
                  ? 'border-green-500/25 sm:col-span-2 lg:col-span-1'
                  : 'border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Icon size={13} className="text-green-400 flex-shrink-0" />
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                {item.badge && <Badge color="amber">{item.badge}</Badge>}
              </div>

              <p className="text-sm font-bold text-white leading-snug">{item.value}</p>

              {item.subValue && (
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {item.subValue}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Validation Note Footer */}
      <div className="mt-5 p-3 bg-amber-500/5 border border-amber-500/15 rounded-xl flex items-start gap-2.5">
        <AlertTriangle size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-400 leading-relaxed">
          <strong className="text-amber-300">Engineering Validation Note:</strong> All values are model benchmark records for SIH decision-support prototyping. Actual packaging performance depends on commodity respiration kinetics, barrier film quality, ambient temperature, relative humidity, package geometry, and physical seal validation testing.
        </p>
      </div>
    </div>
  );
}
