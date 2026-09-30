// PackWise AI — Landing Page
import { Link } from 'react-router-dom';
import {
  ChevronRight, ArrowRight, Package, Leaf, Zap, Brain, Sliders,
  FlaskConical, FileCheck, Recycle, ShieldOff, Droplets, Flame, Wind,
  IndianRupee, Repeat, TrendingDown, Target, Calendar, Users,
  CheckCircle, Database, Activity, BookOpen, Layers, Award,
  Thermometer, AlertTriangle, Info
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PROBLEM_CARDS, FEATURE_CARDS, IMPACT_CARDS, WORKFLOW_STEPS } from '../data/mockData';

// ---- Hero Visualization ----
function HeroVisualization() {
  return (
    <div className="relative w-full max-w-lg mx-auto h-72 md:h-80">
      {/* Center packaging symbol */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="w-48 h-48 rounded-full border border-green-500/10 animate-spin" style={{ animationDuration: '20s' }}>
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <div
                key={deg}
                className="absolute w-1.5 h-1.5 rounded-full bg-green-500/40"
                style={{
                  top: `${50 - 50 * Math.cos((deg * Math.PI) / 180)}%`,
                  left: `${50 + 50 * Math.sin((deg * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>

          {/* Middle ring */}
          <div className="absolute inset-6 rounded-full border border-green-500/20 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />

          {/* Center hexagon package */}
          <div className="absolute inset-12 flex items-center justify-center">
            <div className="w-24 h-24 flex items-center justify-center">
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M40 5L72 22.5V57.5L40 75L8 57.5V22.5L40 5Z" stroke="#22c55e" strokeWidth="1" fill="rgba(34,197,94,0.05)" />
                <path d="M40 18L60 29V51L40 62L20 51V29L40 18Z" stroke="#22c55e" strokeWidth="0.8" fill="rgba(34,197,94,0.08)" />
                <circle cx="40" cy="40" r="6" fill="#22c55e" opacity="0.9" />
                <circle cx="40" cy="40" r="2.5" fill="#0a0c12" />
              </svg>
            </div>
          </div>

          {/* Glow */}
          <div className="absolute inset-12 rounded-full blur-2xl bg-green-500/10 animate-pulse-slow" />
        </div>
      </div>

      {/* Floating property tags */}
      {[
        { label: 'OTR', value: '0.03', unit: 'cc/m²/d', x: '-left-8', y: 'top-6', color: 'green', delay: '0s' },
        { label: 'WVTR', value: '0.05', unit: 'g/m²/d', x: '-right-4', y: 'top-10', color: 'blue', delay: '1.5s' },
        { label: 'Fat', value: 'High', unit: 'content', x: '-left-6', y: 'bottom-12', color: 'amber', delay: '0.8s' },
        { label: 'pH', value: '6.2', unit: 'neutral', x: '-right-6', y: 'bottom-8', color: 'purple', delay: '2s' },
      ].map(({ label, value, unit, x, y, color, delay }) => (
        <div
          key={label}
          className={`absolute ${x} ${y} animate-float`}
          style={{ animationDelay: delay }}
        >
          <div className={`bg-[#151922] border border-${color}-500/20 rounded-lg px-2.5 py-2 shadow-lg`}>
            <div className="text-xs text-slate-500">{label}</div>
            <div className={`text-sm font-bold font-mono text-${color}-400`}>{value}</div>
            <div className="text-xs text-slate-600">{unit}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---- Trust Indicators ----
function TrustIndicator({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
        <Icon size={10} className="text-green-400" />
      </div>
      <span className="text-xs text-slate-400">{label}</span>
    </div>
  );
}

// ---- Problem Card ----
const PROBLEM_ICON_MAP = {
  'shield-off': ShieldOff,
  droplets: Droplets,
  flame: Flame,
  wind: Wind,
  'indian-rupee': IndianRupee,
  repeat: Repeat,
};

const SEVERITY_STYLES = {
  high: 'border-red-500/20 hover:border-red-500/30',
  medium: 'border-amber-500/15 hover:border-amber-500/25',
};

function ProblemCard({ card }) {
  const Icon = PROBLEM_ICON_MAP[card.icon] || Package;
  return (
    <div className={`bg-[#151922] border ${SEVERITY_STYLES[card.severity]} rounded-xl p-5 transition-all duration-300`}>
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${card.severity === 'high' ? 'bg-red-500/10' : 'bg-amber-500/10'}`}>
          <Icon size={14} className={card.severity === 'high' ? 'text-red-400' : 'text-amber-400'} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">{card.title}</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{card.description}</p>
        </div>
      </div>
    </div>
  );
}

// ---- Feature Card ----
const FEATURE_ICON_MAP = {
  'file-check': FileCheck,
  brain: Brain,
  sliders: Sliders,
  leaf: Leaf,
  'flask-conical': FlaskConical,
  recycle: Recycle,
};

const FEAT_COLOR_MAP = {
  green: 'bg-green-500/10 text-green-400',
  blue: 'bg-blue-500/10 text-blue-400',
  purple: 'bg-purple-500/10 text-purple-400',
  emerald: 'bg-emerald-500/10 text-emerald-400',
  amber: 'bg-amber-500/10 text-amber-400',
  teal: 'bg-teal-500/10 text-teal-400',
};

function FeatureCard({ card }) {
  const Icon = FEATURE_ICON_MAP[card.icon] || Package;
  const colorClass = FEAT_COLOR_MAP[card.color] || FEAT_COLOR_MAP.green;
  return (
    <div className="bg-[#151922] border border-white/5 rounded-xl p-5 hover:border-green-500/15 transition-all duration-300 group">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${colorClass}`}>
        <Icon size={16} />
      </div>
      <h3 className="text-sm font-semibold text-white mb-1.5">{card.title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{card.description}</p>
    </div>
  );
}

// ---- Workflow Step ----
const WORKFLOW_ICON_MAP = {
  database: Database,
  activity: Activity,
  'book-open': BookOpen,
  layers: Layers,
  sliders: Sliders,
  package: Package,
  'flask-conical': FlaskConical,
};

function WorkflowStep({ step, isLast }) {
  const Icon = WORKFLOW_ICON_MAP[step.icon] || Database;
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          <Icon size={16} className="text-green-400" />
        </div>
        {!isLast && <div className="w-px h-6 bg-green-500/15 mt-1" />}
      </div>
      <div className={isLast ? '' : 'mb-7'}>
        <p className="text-sm font-semibold text-white">{step.label}</p>
        <p className="text-xs text-slate-500">{step.description}</p>
      </div>
    </div>
  );
}

// ---- Impact Card ----
const IMPACT_ICON_MAP = {
  'trending-down': TrendingDown,
  target: Target,
  calendar: Calendar,
  users: Users,
  leaf: Leaf,
};

function ImpactCard({ card }) {
  const Icon = IMPACT_ICON_MAP[card.icon] || CheckCircle;
  return (
    <div className="flex items-start gap-3 p-4 bg-[#151922] border border-white/5 rounded-xl hover:border-green-500/15 transition-all duration-300">
      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="text-green-400" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white">{card.title}</h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{card.description}</p>
      </div>
    </div>
  );
}

// ---- Explainability Mini Chain ----
function MiniExplainChain() {
  const steps = [
    { icon: Droplets, label: 'High Fat Content', color: 'red', arrow: true },
    { icon: Zap, label: 'Oxidation Risk', color: 'amber', arrow: true },
    { icon: ShieldOff, label: 'High O₂ Barrier Required', color: 'blue', arrow: true },
    { icon: Layers, label: 'Candidate Filtering', color: 'purple', arrow: true },
    { icon: Package, label: 'Packaging Configuration', color: 'green', arrow: false },
  ];

  return (
    <div className="flex flex-col gap-1.5">
      {steps.map(({ icon: Icon, label, color, arrow }) => (
        <div key={label} className="flex flex-col items-start">
          <div className={`flex items-center gap-2.5 px-3 py-2 bg-[#0f1117] border border-${color}-500/15 rounded-lg w-full`}>
            <Icon size={12} className={`text-${color}-400 flex-shrink-0`} />
            <span className="text-xs text-slate-300 font-medium">{label}</span>
          </div>
          {arrow && (
            <div className="ml-5 w-px h-2 bg-white/10" />
          )}
        </div>
      ))}
    </div>
  );
}

// ---- MAP Flow Visual ----
function MAPFlowVisual() {
  const nodes = [
    { label: 'Respiration', sub: 'O₂ consumed', color: 'green' },
    { label: 'CO₂ Release', sub: 'Metabolic waste', color: 'blue' },
    { label: 'Film OTR', sub: 'Matched to rate', color: 'purple' },
    { label: 'Package Atmosphere', sub: 'Modified gas balance', color: 'emerald' },
  ];

  return (
    <div className="flex items-center flex-wrap gap-2">
      {nodes.map(({ label, sub, color }, idx) => (
        <div key={label} className="flex items-center gap-2">
          <div className={`px-3 py-2.5 bg-[#0f1117] border border-${color}-500/20 rounded-lg text-center`}>
            <p className="text-xs font-semibold text-white">{label}</p>
            <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
          </div>
          {idx < nodes.length - 1 && (
            <ArrowRight size={12} className="text-slate-600 flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}

// ---- Main Landing Page ----
export default function LandingPage() {
  return (
    <div className="page-wrapper">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden hero-glow">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid opacity-60" />
        {/* Radial accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/5 rounded-full blur-3xl" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400 font-medium uppercase tracking-wider">
                  Smart India Hackathon 2026 · Team LogicalNova
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-white mb-5">
                Smarter Packaging for{' '}
                <span className="text-gradient-green">Better Food Preservation</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base text-slate-400 leading-relaxed max-w-lg mb-8">
                PackWise AI converts food properties, storage conditions and business requirements into evidence-backed packaging configurations — helping farmers, FPOs and MSMEs select the right packaging without guesswork.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  to="/analyze"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold text-sm rounded-lg transition-all duration-200 shadow-xl shadow-green-500/20"
                >
                  Start Packaging Analysis
                  <ChevronRight size={16} />
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium text-sm rounded-lg transition-all duration-200"
                >
                  Explore How It Works
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-4">
                <TrustIndicator icon={FileCheck} label="Scientific Rules" />
                <TrustIndicator icon={Brain} label="Explainable AI" />
                <TrustIndicator icon={Leaf} label="MAP Intelligence" />
                <TrustIndicator icon={FlaskConical} label="What-If Simulation" />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <HeroVisualization />
            </div>
          </div>
        </div>
      </section>

      {/* ══ DEMO NOTICE ═══════════════════════════════════════ */}
      <div className="border-y border-amber-500/15 bg-amber-500/5 py-2.5">
        <div className="container-wide flex items-center justify-center gap-2 flex-wrap">
          <AlertTriangle size={12} className="text-amber-400 flex-shrink-0" />
          <span className="text-xs text-amber-400 font-medium">Demo Platform</span>
          <span className="text-xs text-slate-500">
            All values, materials and recommendations shown are demo data only — not scientifically validated or commercially certified.
          </span>
        </div>
      </div>

      {/* ══ PROBLEM SECTION ════════════════════════════════════ */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container-wide relative z-10">
          <div className="max-w-2xl mb-12">
            <div className="section-label mb-4">
              <AlertTriangle size={10} />
              The Problem
            </div>
            <h2 className="section-title">
              Packaging Decisions Are Still Too Complex
            </h2>
            <p className="text-slate-400 text-base mt-3 leading-relaxed">
              Small food businesses, farmers and FPOs lack a structured, accessible framework for selecting appropriate packaging — resulting in costly trial-and-error, avoidable losses and missed market opportunities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROBLEM_CARDS.map((card) => (
              <ProblemCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ SOLUTION WORKFLOW ══════════════════════════════════ */}
      <section className="py-20 bg-[#0f1117]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="section-label mb-4">
                <Zap size={10} />
                The Solution
              </div>
              <h2 className="section-title mb-4">One Intelligent Workflow</h2>
              <p className="text-slate-400 text-base leading-relaxed mb-8">
                PackWise AI systematically transforms your food product data and business requirements into three trade-off packaging configurations — with full reasoning, evidence status and simulation capability.
              </p>

              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                View detailed architecture
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-0">
              {WORKFLOW_STEPS.map((step, idx) => (
                <WorkflowStep
                  key={step.id}
                  step={step}
                  isLast={idx === WORKFLOW_STEPS.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ═══════════════════════════════════════════ */}
      <section className="py-20">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="section-label mb-4 mx-auto w-fit">
              <Sliders size={10} />
              Capabilities
            </div>
            <h2 className="section-title">Built for Evidence-Backed Decisions</h2>
            <p className="text-slate-400 mt-3 text-base">
              Six integrated modules that work together to give you packaging recommendations you can explain, simulate and improve.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURE_CARDS.map((card) => (
              <FeatureCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ THREE MODES ════════════════════════════════════════ */}
      <section className="py-20 bg-[#0f1117]">
        <div className="container-wide">
          <div className="max-w-2xl mb-12">
            <div className="section-label mb-4">
              <Sliders size={10} />
              Recommendation Modes
            </div>
            <h2 className="section-title">Three Trade-Off Configurations</h2>
            <p className="text-slate-400 mt-3 text-base leading-relaxed">
              There is no single "best" packaging. PackWise AI generates three configurations across the performance–cost–sustainability trade-off space so you can choose what fits your situation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: ShieldOff,
                title: 'Performance Priority',
                description: 'Maximum barrier configuration. Prioritises oxidation and moisture protection above cost and recyclability.',
                highlight: 'Low OTR · Low WVTR',
                color: 'green',
                border: 'border-green-500/25',
              },
              {
                icon: Sliders,
                title: 'Balanced Configuration',
                description: 'Practical trade-off between technical performance, cost and environmental considerations.',
                highlight: 'Balanced across all criteria',
                color: 'blue',
                border: 'border-blue-500/20',
              },
              {
                icon: Leaf,
                title: 'Cost & Sustainability Priority',
                description: 'Lower material cost and improved recyclability profile, accepting a reduced barrier where technically feasible.',
                highlight: 'Higher OTR · Recyclable material',
                color: 'amber',
                border: 'border-amber-500/20',
              },
            ].map(({ icon: Icon, title, description, highlight, color, border }) => (
              <div
                key={title}
                className={`bg-[#151922] border ${border} rounded-xl p-6 transition-all duration-300`}
              >
                <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 flex items-center justify-center mb-4`}>
                  <Icon size={18} className={`text-${color}-400`} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{description}</p>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-${color}-500/10 border border-${color}-500/20 rounded-full`}>
                  <span className={`text-xs text-${color}-400 font-medium`}>{highlight}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-[#151922] border border-white/5 rounded-xl flex items-start gap-3">
            <Info size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-300">Trade-off, not ranking: </strong>
              These configurations are not ranked by quality. Each represents a different optimisation priority. The appropriate choice depends on your product, supply chain, regulatory context and business model.
            </p>
          </div>
        </div>
      </section>

      {/* ══ FRESH PRODUCE / MAP ════════════════════════════════ */}
      <section className="py-20">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-4">
                <Leaf size={10} />
                Fresh Produce Intelligence
              </div>
              <h2 className="section-title mb-4">Fresh Produce Needs Different Logic</h2>
              <p className="text-slate-400 text-base leading-relaxed mb-4">
                Standard packaging optimisation minimises OTR. For fresh produce, this is wrong. A living product respires — consuming O₂ and producing CO₂. The packaging must match the respiration rate, not eliminate gas exchange.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Excessive O₂ restriction causes anaerobic respiration, fermentation, off-flavours and safety risk. PackWise AI's MAP module applies a fundamentally different constraint: <strong className="text-white">target atmosphere matching</strong>, not barrier minimisation.
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'High respiration rate (leafy greens)', note: 'Requires high-permeability film or micro-perforation' },
                  { label: 'Low respiration (root vegetables)', note: 'Moderate OTR may be sufficient' },
                  { label: 'Temperature affects rate significantly', note: 'Design temperature must be specified' },
                ].map(({ label, note }) => (
                  <div key={label} className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-medium text-white">{label} — </span>
                      <span className="text-xs text-slate-500">{note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#151922] border border-white/5 rounded-xl p-5">
                <p className="text-xs font-medium text-slate-400 mb-3 uppercase tracking-wider">
                  Gas Exchange Flow (MAP)
                </p>
                <MAPFlowVisual />
              </div>

              <div className="bg-[#151922] border border-emerald-500/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={12} className="text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400">MAP Design Note</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Target O₂ of 3–8% and CO₂ of 5–15% is typical for leafy greens in MAP — but exact targets depend on produce type, temperature and target shelf life. PackWise AI generates estimates, not certified specifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHAT-IF SECTION ════════════════════════════════════ */}
      <section className="py-20 bg-[#0f1117]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Preview UI */}
            <div className="order-2 lg:order-1">
              <div className="bg-[#151922] border border-white/5 rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
                  <FlaskConical size={14} className="text-amber-400" />
                  <span className="text-xs font-semibold text-white">What-If Simulator</span>
                  <span className="ml-auto text-xs text-amber-400 font-medium">DEMO · MODEL ESTIMATES</span>
                </div>

                <div className="p-5 space-y-4">
                  {/* Scenario comparison */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Baseline', temp: '4°C', film: 'PET/Al Foil/PE', quality: 92, risk: 'Very Low', cost: '₹85/m²', color: 'green' },
                      { label: 'Modified', temp: '8°C', film: 'PET/LLDPE', quality: 71, risk: 'Moderate', cost: '₹43/m²', color: 'amber' },
                    ].map(({ label, temp, film, quality, risk, cost, color }) => (
                      <div key={label} className={`p-3 rounded-lg bg-[#0f1117] border border-${color}-500/15`}>
                        <p className={`text-xs font-semibold text-${color}-400 mb-2`}>{label}</p>
                        <div className="space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Temp</span>
                            <span className="text-xs font-mono text-slate-300">{temp}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Film</span>
                            <span className="text-xs text-slate-400 text-right">{film}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Quality Index</span>
                            <span className={`text-xs font-mono font-bold text-${color}-400`}>{quality}/100</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Risk</span>
                            <span className="text-xs text-slate-300">{risk}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Cost</span>
                            <span className="text-xs text-slate-300">{cost}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/15">
                    <p className="text-xs text-amber-400 font-medium">
                      Model estimate — not lab-validated output
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="section-label mb-4">
                <FlaskConical size={10} />
                What-If Simulation
              </div>
              <h2 className="section-title mb-4">Explore Trade-Offs Before Committing</h2>
              <p className="text-slate-400 text-base leading-relaxed mb-4">
                Once you have a recommendation, test how it changes under different conditions — higher storage temperature, alternative film, different thickness.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                The simulator provides <strong className="text-white">structured model estimates</strong>, not laboratory results. It is designed to support decision-making, not replace validation.
              </p>
              <Link
                to="/what-if"
                className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                Try the What-If Simulator
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ EXPLAINABILITY SECTION ═════════════════════════════ */}
      <section className="py-20">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="section-label mb-4">
                <Brain size={10} />
                Explainable AI
              </div>
              <h2 className="section-title mb-4">You Should Know Why</h2>
              <p className="text-slate-400 text-base leading-relaxed mb-4">
                PackWise AI is not a black box. Every recommendation includes a step-by-step reasoning chain that links your food properties to the final packaging configuration.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Each step shows the input, the risk identified, the constraint applied, and the evidence status — so you can verify, challenge and learn from the output.
              </p>
            </div>

            <div className="bg-[#151922] border border-white/5 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Brain size={14} className="text-blue-400" />
                <span className="text-xs font-semibold text-white">Sample Reasoning Chain</span>
                <span className="ml-auto text-xs text-amber-400">DEMO</span>
              </div>
              <MiniExplainChain />
            </div>
          </div>
        </div>
      </section>

      {/* ══ IMPACT SECTION ═════════════════════════════════════ */}
      <section className="py-20 bg-[#0f1117]">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="section-label mb-4 mx-auto w-fit">
              <TrendingDown size={10} />
              Potential Impact
            </div>
            <h2 className="section-title">Designed to Help Food Businesses Improve</h2>
            <p className="text-slate-400 mt-3 text-sm leading-relaxed">
              Impact depends on implementation context. These are intended outcomes, not guaranteed results.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {IMPACT_CARDS.map((card) => (
              <ImpactCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 hero-glow" />
        <div className="container-wide relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="section-label mb-6 mx-auto w-fit">
              <Package size={10} />
              Get Started
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to find a smarter packaging configuration?
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Enter your food product data and let PackWise AI generate three evidence-anchored packaging configurations with full reasoning and simulation capability.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/analyze"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-all duration-200 shadow-xl shadow-green-500/20 text-base"
              >
                Start Analysis
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/knowledge-base"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium rounded-lg transition-all duration-200 text-base"
              >
                Browse Material Database
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
