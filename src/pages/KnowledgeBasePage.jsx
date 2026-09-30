// PackWise AI — Knowledge Base / Material Database Page
import { useState, useMemo } from 'react';
import { Search, Filter, X, Info, ExternalLink, Leaf, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Badge from '../components/Badge';
import Card from '../components/Card';
import { Input, Select } from '../components/FormFields';
import { MATERIALS_DB } from '../data/mockData';

const BARRIER_OPTIONS = [
  { value: '', label: 'All Barrier Classes' },
  { value: 'ultra-high', label: 'Ultra-High Barrier' },
  { value: 'high', label: 'High Barrier' },
  { value: 'medium-high', label: 'Medium-High Barrier' },
  { value: 'medium', label: 'Medium Barrier' },
  { value: 'low', label: 'Low Barrier' },
  { value: 'permeable-controlled', label: 'Permeable / MAP' },
];

const BARRIER_BADGE_COLOR = {
  'ultra-high': 'green',
  'high': 'blue',
  'medium-high': 'purple',
  'medium': 'amber',
  'low': 'red',
  'permeable-controlled': 'emerald',
};

// ---- Material detail modal ----
function MaterialModal({ material, onClose }) {
  if (!material) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[#151922] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#151922] flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div>
            <h3 className="text-sm font-bold text-white">{material.material}</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{material.structure}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-xl leading-none">×</button>
        </div>

        <div className="p-5 space-y-4">
          {/* Key specs */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Thickness', value: `${material.thicknessMicron} µm` },
              { label: 'OTR (demo)', value: `${material.otr} cc/m²/d/atm` },
              { label: 'WVTR (demo)', value: `${material.wvtr} g/m²/d` },
              { label: 'Cost Index', value: material.costPerSqm },
              { label: 'Barrier Class', value: material.barrierClass },
              { label: 'Sustainability Score', value: `${material.sustainabilityScore}/8` },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 bg-[#0f1117] rounded-lg">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="text-xs font-semibold text-white mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          {/* Recyclability */}
          <div className="flex gap-2 flex-wrap">
            <Badge color={material.recyclable ? 'green' : 'red'}>
              {material.recyclable ? '✓ Recyclable' : '✗ Not Recyclable'}
            </Badge>
            <Badge color={material.compostable ? 'green' : 'slate'}>
              {material.compostable ? '✓ Compostable' : 'Not Compostable'}
            </Badge>
          </div>

          {/* Applications */}
          <div>
            <p className="text-xs text-slate-400 font-medium mb-2">Typical Applications (demo)</p>
            <div className="flex flex-wrap gap-1.5">
              {material.applications.map((app) => (
                <span key={app} className="px-2 py-0.5 bg-[#0f1117] border border-white/5 rounded-md text-xs text-slate-400">
                  {app}
                </span>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="p-3 bg-blue-500/5 border border-blue-500/15 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1">
              <Info size={11} className="text-blue-400" />
              <span className="text-xs font-medium text-blue-400">Technical Notes (demo)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{material.notes}</p>
          </div>

          {/* Evidence */}
          <div className="p-3 bg-amber-500/5 border border-amber-500/15 rounded-lg">
            <p className="text-xs text-amber-400 font-medium">Evidence Status: {material.evidenceStatus}</p>
            <p className="text-xs text-slate-500 mt-0.5">All values are demo data. Not laboratory-validated.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Table row ----
function MaterialRow({ material, onClick }) {
  const badgeColor = BARRIER_BADGE_COLOR[material.barrierClass] || 'slate';
  return (
    <tr
      className="border-b border-white/5 hover:bg-white/3 transition-colors cursor-pointer group"
      onClick={() => onClick(material)}
    >
      <td className="px-4 py-3">
        <div>
          <p className="text-xs font-semibold text-white group-hover:text-green-400 transition-colors">{material.material}</p>
          <p className="text-xs text-slate-600 font-mono mt-0.5 hidden sm:block">{material.structure}</p>
        </div>
      </td>
      <td className="px-4 py-3 text-xs text-slate-400">{material.thicknessMicron} µm</td>
      <td className="px-4 py-3 text-xs text-slate-400 font-mono hidden md:table-cell">{material.otr}</td>
      <td className="px-4 py-3 text-xs text-slate-400 font-mono hidden md:table-cell">{material.wvtr}</td>
      <td className="px-4 py-3 hidden lg:table-cell">
        <Badge color={badgeColor}>{material.barrierClass}</Badge>
      </td>
      <td className="px-4 py-3 text-xs text-slate-400 hidden lg:table-cell">{material.costPerSqm}</td>
      <td className="px-4 py-3 hidden xl:table-cell">
        <div className="flex gap-0.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-sm ${i < material.sustainabilityScore ? 'bg-green-500' : 'bg-white/5'}`} />
          ))}
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge color="amber" className="text-xs">{material.evidenceStatus}</Badge>
      </td>
    </tr>
  );
}

export default function KnowledgeBasePage() {
  const [search, setSearch] = useState('');
  const [barrierFilter, setBarrierFilter] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const filtered = useMemo(() => {
    let data = MATERIALS_DB;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (m) =>
          m.material.toLowerCase().includes(q) ||
          m.structure.toLowerCase().includes(q) ||
          m.applications.some((a) => a.toLowerCase().includes(q))
      );
    }
    if (barrierFilter) {
      data = data.filter((m) => m.barrierClass === barrierFilter);
    }
    return data;
  }, [search, barrierFilter]);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="container-wide pt-24 pb-16">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
            <Filter size={10} className="text-blue-400" />
            <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">Material Database</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Packaging Knowledge Base</h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Demo material records. All OTR, WVTR and cost values are placeholder data — not laboratory-validated specifications.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search materials, applications…"
              className="w-full bg-[#0f1117] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X size={12} />
              </button>
            )}
          </div>
          <select
            value={barrierFilter}
            onChange={(e) => setBarrierFilter(e.target.value)}
            className="bg-[#0f1117] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-green-500/50 transition-all"
          >
            {BARRIER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <div className="flex items-center gap-2 text-xs text-slate-500 ml-auto">
            <span>{filtered.length} records</span>
            <Badge color="amber">Demo data</Badge>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#151922] border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/5">
                  {['Material', 'Thickness', 'OTR (demo)', 'WVTR (demo)', 'Barrier Class', 'Cost/m²', 'Sustainability', 'Evidence'].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-slate-500 text-sm">
                      No materials found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((mat) => (
                    <MaterialRow key={mat.id} material={mat} onClick={setSelectedMaterial} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note */}
        <div className="mt-4 flex items-start gap-2 p-3 bg-blue-500/5 border border-blue-500/15 rounded-xl">
          <Info size={12} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            Click any row to view full material details. This database will be populated with validated material records once connected to the backend. Current data is structural only.
          </p>
        </div>
      </div>

      <Footer />
      <MaterialModal material={selectedMaterial} onClose={() => setSelectedMaterial(null)} />
    </div>
  );
}
