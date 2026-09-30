// PackWise AI — What-If Simulator Page
import { useState } from 'react';
import { AlertTriangle, FlaskConical, TrendingDown, TrendingUp, Minus, RefreshCw } from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import { Input, Select } from '../components/FormFields';
import LoadingScreen from '../components/LoadingScreen';
import Badge from '../components/Badge';
import { useToast } from '../context/ToastContext';
import { runWhatIfSimulation } from '../services/api';
import { DEMO_WHATIF_SCENARIOS } from '../data/mockData';

const FILM_OPTIONS = [
  { value: 'pet-al-pe', label: 'PET/Al Foil/PE Laminate' },
  { value: 'metallised-bopp', label: 'Metallised BOPP' },
  { value: 'pet-lldpe', label: 'PET/LLDPE Laminate' },
  { value: 'evoh-multilayer', label: 'EVOH-Based Multilayer' },
  { value: 'bopp-bopp', label: 'BOPP/BOPP Seal Grade' },
  { value: 'pla-compostable', label: 'PLA Compostable Film' },
];

function DiffIndicator({ baseline, modified, higherIsBetter = false, unit = '' }) {
  const diff = modified - baseline;
  const improved = higherIsBetter ? diff > 0 : diff < 0;
  const Icon = diff === 0 ? Minus : improved ? TrendingUp : TrendingDown;
  const color = diff === 0 ? 'slate' : improved ? 'green' : 'red';

  return (
    <div className={`flex items-center gap-1 text-xs text-${color}-400`}>
      <Icon size={12} />
      <span>
        {diff > 0 ? '+' : ''}{diff.toFixed(1)}{unit}
      </span>
    </div>
  );
}

function ScenarioPanel({ data, label, color }) {
  return (
    <div className={`p-5 bg-[#0f1117] border border-${color}-500/20 rounded-xl`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-bold text-${color}-400 uppercase tracking-wide`}>{label}</span>
        <Badge color={color}>Scenario</Badge>
      </div>
      <div className="space-y-3">
        {[
          { label: 'Temperature', value: `${data.temperature}°C` },
          { label: 'Humidity', value: `${data.humidity}% RH` },
          { label: 'Film', value: data.film },
          { label: 'Thickness', value: `${data.thicknessMicron} µm` },
          { label: 'OTR (demo)', value: `${data.otr} cc/m²/d/atm` },
          { label: 'WVTR (demo)', value: `${data.wvtr} g/m²/d` },
          { label: 'Shelf Life Est.', value: data.shelfLifeEstimate },
          { label: 'Quality Index', value: `${data.qualityIndex}/100` },
          { label: 'Oxidation Risk', value: data.oxidationRisk },
          { label: 'Est. Cost', value: data.estimatedCost },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-start gap-3">
            <span className="text-xs text-slate-500">{label}</span>
            <span className="text-xs font-medium text-slate-300 text-right">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-white/5">
        <p className="text-xs text-amber-400">{data.note}</p>
      </div>
    </div>
  );
}

export default function WhatIfPage() {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [simResults, setSimResults] = useState(DEMO_WHATIF_SCENARIOS);

  const [params, setParams] = useState({
    temperature: 8,
    humidity: 85,
    film: 'pet-lldpe',
    thicknessMicron: 72,
    otr: 65,
    wvtr: 6,
  });

  const updateParam = (k, v) => setParams((p) => ({ ...p, [k]: v }));

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const results = await runWhatIfSimulation(params);
      setSimResults(results);
      addToast('Simulation complete. Demo estimates shown.', 'success');
    } catch (e) {
      addToast('Simulation error. Please retry.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Chart data
  const radarData = [
    { subject: 'Barrier', baseline: 95, modified: Math.max(20, 95 - params.otr / 3) },
    { subject: 'Moisture', baseline: 94, modified: Math.max(30, 94 - params.wvtr * 5) },
    { subject: 'Quality', baseline: simResults.baseline.qualityIndex, modified: simResults.modified.qualityIndex },
    { subject: 'Cost Efficiency', baseline: 45, modified: 78 },
    { subject: 'Sustainability', baseline: 30, modified: 55 },
  ];

  const barData = [
    { name: 'Quality Index', baseline: simResults.baseline.qualityIndex, modified: simResults.modified.qualityIndex },
    { name: 'OTR Score', baseline: 98, modified: Math.max(20, 98 - params.otr / 2) },
    { name: 'WVTR Score', baseline: 97, modified: Math.max(30, 97 - params.wvtr * 8) },
  ];

  return (
    <div className="page-wrapper">
      {loading && <LoadingScreen message="Running simulation…" submessage="Generating demo model estimates" />}
      <Navbar />

      <div className="container-wide pt-24 pb-16">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
            <FlaskConical size={10} className="text-amber-400" />
            <span className="text-xs text-amber-400 font-medium uppercase tracking-wider">What-If Simulator</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Scenario Simulation</h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Adjust parameters and simulate how they affect packaging performance estimates. All outputs are model estimates — not laboratory-validated results.
          </p>
        </div>

        {/* Demo notice */}
        <div className="mb-6 flex items-start gap-2 p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl">
          <AlertTriangle size={12} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-400 leading-relaxed">
            <strong>DEMO / MODEL-ESTIMATE —</strong> Values shown are structural demo outputs. They are not validated by laboratory testing and should not be used for commercial packaging decisions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1">
            <Card padding="md">
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/5">
                <FlaskConical size={14} className="text-amber-400" />
                <span className="text-sm font-semibold text-white">Modified Scenario</span>
              </div>
              <div className="space-y-4">
                <Input
                  id="temperature"
                  label="Storage Temperature (°C)"
                  type="number"
                  min="-10"
                  max="40"
                  value={params.temperature}
                  onChange={(e) => updateParam('temperature', Number(e.target.value))}
                  suffix="°C"
                />
                <Input
                  id="humidity"
                  label="Relative Humidity (%)"
                  type="number"
                  min="0"
                  max="100"
                  value={params.humidity}
                  onChange={(e) => updateParam('humidity', Number(e.target.value))}
                  suffix="% RH"
                />
                <Select
                  id="film"
                  label="Film / Material"
                  value={params.film}
                  onChange={(e) => updateParam('film', e.target.value)}
                  options={FILM_OPTIONS}
                />
                <Input
                  id="thicknessMicron"
                  label="Thickness (µm)"
                  type="number"
                  min="10"
                  max="200"
                  value={params.thicknessMicron}
                  onChange={(e) => updateParam('thicknessMicron', Number(e.target.value))}
                  suffix="µm"
                />
                <Input
                  id="otr"
                  label="OTR (cc/m²/day/atm)"
                  type="number"
                  min="0"
                  step="0.01"
                  value={params.otr}
                  onChange={(e) => updateParam('otr', Number(e.target.value))}
                  hint="Higher OTR = less oxygen barrier"
                />
                <Input
                  id="wvtr"
                  label="WVTR (g/m²/day)"
                  type="number"
                  min="0"
                  step="0.01"
                  value={params.wvtr}
                  onChange={(e) => updateParam('wvtr', Number(e.target.value))}
                  hint="Higher WVTR = less moisture barrier"
                />
                <Button
                  variant="primary"
                  className="w-full"
                  icon={FlaskConical}
                  onClick={handleSimulate}
                  isLoading={loading}
                >
                  Run Simulation
                </Button>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-5">
            {/* Comparison panels */}
            <div className="grid sm:grid-cols-2 gap-4">
              <ScenarioPanel data={simResults.baseline} label="Baseline" color="green" />
              <ScenarioPanel data={simResults.modified} label="Modified" color="amber" />
            </div>

            {/* Difference summary */}
            <Card padding="md">
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw size={14} className="text-blue-400" />
                <span className="text-sm font-semibold text-white">Difference Summary</span>
                <Badge color="amber" className="ml-auto">Demo estimate</Badge>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-[#0f1117] border border-white/5">
                  <p className="text-xs text-slate-500 mb-1">Quality Index</p>
                  <DiffIndicator
                    baseline={simResults.baseline.qualityIndex}
                    modified={simResults.modified.qualityIndex}
                    higherIsBetter={true}
                    unit=" pts"
                  />
                  <p className="text-lg font-bold font-mono text-white mt-1">
                    {simResults.modified.qualityIndex}
                    <span className="text-xs text-slate-500 ml-1">/ 100</span>
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[#0f1117] border border-white/5">
                  <p className="text-xs text-slate-500 mb-1">Estimated Cost</p>
                  <p className="text-xs text-green-400 flex items-center gap-1"><TrendingDown size={10} /> Lower cost</p>
                  <p className="text-lg font-bold font-mono text-white mt-1">{simResults.modified.estimatedCost}</p>
                </div>
                <div className="p-3 rounded-lg bg-[#0f1117] border border-white/5">
                  <p className="text-xs text-slate-500 mb-1">Shelf Life Est.</p>
                  <p className="text-xs text-red-400 flex items-center gap-1"><TrendingDown size={10} /> Reduced</p>
                  <p className="text-sm font-bold text-white mt-1">{simResults.modified.shelfLifeEstimate}</p>
                </div>
              </div>
            </Card>

            {/* Radar chart */}
            <Card padding="md">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-semibold text-white">Performance Comparison</span>
                <Badge color="amber" className="ml-auto">Demo estimate</Badge>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Radar name="Baseline" dataKey="baseline" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} />
                    <Radar name="Modified" dataKey="modified" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
                    <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Bar chart */}
            <Card padding="md">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-semibold text-white">Score Comparison</span>
                <Badge color="amber" className="ml-auto">Demo estimate</Badge>
              </div>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#151922', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f1f5f9', fontSize: 12 }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
                    <Bar dataKey="baseline" name="Baseline" fill="#22c55e" opacity={0.8} radius={[3, 3, 0, 0]} />
                    <Bar dataKey="modified" name="Modified" fill="#f59e0b" opacity={0.8} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
