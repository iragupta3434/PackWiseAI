// PackWise AI — How It Works / Architecture Page
import {
  Database, Activity, BookOpen, Layers, Sliders, Package,
  FlaskConical, ChevronRight, Brain, Shield, CheckCircle, Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Badge from '../components/Badge';

const ARCHITECTURE_STEPS = [
  {
    id: 1,
    icon: Database,
    title: 'User Input',
    subtitle: 'Food Profile + Storage + Business Requirements',
    description: 'The user provides food product properties (moisture, fat, pH, water activity, oxidation sensitivity), storage conditions (temperature, humidity, shelf life) and business requirements (budget, sustainability, packaging format).',
    color: 'green',
    output: 'Structured input data object',
  },
  {
    id: 2,
    icon: Activity,
    title: 'Food Risk Profiling',
    subtitle: 'Identify primary degradation pathways',
    description: 'The system analyses the food profile to identify the primary quality degradation risks — oxidation, moisture uptake, microbial activity, gas exchange (for fresh produce) — and ranks them by severity.',
    color: 'blue',
    output: 'Risk priority vector',
  },
  {
    id: 3,
    icon: BookOpen,
    title: 'Scientific Rule Engine',
    subtitle: 'Apply food-packaging compatibility rules',
    description: 'A rule-based system maps each identified risk to packaging requirements: high fat → high O₂ barrier; high moisture sensitivity → low WVTR; fresh produce → MAP logic. Rules are documented with evidence status.',
    color: 'purple',
    output: 'Packaging constraint set (OTR range, WVTR range, barrier class)',
  },
  {
    id: 4,
    icon: Layers,
    title: 'Packaging Knowledge Base',
    subtitle: 'Filter candidate materials',
    description: 'The constraint set is applied to filter the material database. Materials with OTR or WVTR outside the required range are eliminated. Remaining candidates form the feasibility set.',
    color: 'emerald',
    output: 'Feasibility-filtered candidate set',
  },
  {
    id: 5,
    icon: Sliders,
    title: 'Multi-Objective Optimisation',
    subtitle: 'Score and rank across performance, cost and sustainability',
    description: 'Filtered candidates are scored across three objectives simultaneously: barrier performance index, cost index and sustainability score. Three Pareto-optimal trade-off configurations are selected.',
    color: 'amber',
    output: 'Three trade-off configurations',
  },
  {
    id: 6,
    icon: Package,
    title: 'Recommendations',
    subtitle: 'Performance / Balanced / Cost-Sustainability',
    description: 'Three configurations are presented — one optimised for maximum barrier performance, one balanced, one prioritising cost and sustainability. Each is accompanied by a full reasoning chain and evidence status.',
    color: 'green',
    output: 'Recommendation set + metadata',
  },
  {
    id: 7,
    icon: Brain,
    title: 'Explainable AI',
    subtitle: 'Step-by-step reasoning chain',
    description: 'For each recommendation, the system generates a human-readable reasoning chain: input → risk → constraint → filtering → selection. Every step shows its evidence status and underlying assumption.',
    color: 'blue',
    output: 'Explainability chain per recommendation',
  },
  {
    id: 8,
    icon: FlaskConical,
    title: 'What-If Simulation',
    subtitle: 'Explore alternative scenarios',
    description: 'The user can modify parameters (temperature, film, thickness) and see how projected performance changes. Simulation outputs are clearly labelled as model estimates — not laboratory results.',
    color: 'purple',
    output: 'Scenario comparison (baseline vs modified)',
  },
];

const DESIGN_PRINCIPLES = [
  {
    title: 'Validated Design Space',
    text: 'PackWise AI recommends within a validated design space rather than inventing packaging specifications. Every recommendation is anchored to a material record and a documented rule.',
    icon: Shield,
  },
  {
    title: 'Explainability First',
    text: 'No black boxes. Every output includes a reasoning chain so users can verify, challenge and learn from the recommendation.',
    icon: Brain,
  },
  {
    title: 'Trade-Off Transparency',
    text: 'The system generates three trade-off configurations, not one "answer". Users understand that packaging is always a set of trade-offs, not an absolute optimum.',
    icon: Sliders,
  },
  {
    title: 'Evidence Status Labelling',
    text: 'All material properties and rule outputs are labelled with their evidence status — demo record, validated record, or peer-reviewed — so users know the confidence level of each value.',
    icon: CheckCircle,
  },
];

function ArchStep({ step, isLast }) {
  const Icon = step.icon;
  const colorMap = {
    green: 'border-green-500/20 bg-green-500/5',
    blue: 'border-blue-500/20 bg-blue-500/5',
    purple: 'border-purple-500/20 bg-purple-500/5',
    emerald: 'border-emerald-500/20 bg-emerald-500/5',
    amber: 'border-amber-500/20 bg-amber-500/5',
  };
  const iconColorMap = {
    green: 'text-green-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
  };

  return (
    <div className="flex gap-4">
      {/* Step indicator */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${colorMap[step.color]}`}>
          <Icon size={16} className={iconColorMap[step.color]} />
        </div>
        {!isLast && <div className="w-px flex-1 bg-white/5 mt-2 mb-2" />}
      </div>

      {/* Content */}
      <div className={`${isLast ? 'pb-0' : 'pb-8'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-slate-600">STEP {step.id}</span>
        </div>
        <h3 className="text-base font-bold text-white">{step.title}</h3>
        <p className="text-xs text-slate-500 mb-2">{step.subtitle}</p>
        <p className="text-sm text-slate-400 leading-relaxed mb-3">{step.description}</p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0f1117] border border-white/5 rounded-full">
          <ChevronRight size={10} className="text-green-400" />
          <span className="text-xs text-slate-500">Output: </span>
          <span className="text-xs text-slate-300">{step.output}</span>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="container-wide pt-24 pb-16">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
            <Brain size={10} className="text-purple-400" />
            <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">System Architecture</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">How PackWise AI Works</h1>
          <p className="text-slate-400 text-base leading-relaxed">
            PackWise AI is a hybrid decision-support system combining scientific rules, a packaging knowledge base, multi-objective optimisation and explainable AI. Here is the complete pipeline.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Architecture steps */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-green-500" />
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                8-Step Processing Pipeline
              </h2>
            </div>
            <div>
              {ARCHITECTURE_STEPS.map((step, idx) => (
                <ArchStep
                  key={step.id}
                  step={step}
                  isLast={idx === ARCHITECTURE_STEPS.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Design principles + sidebar */}
          <div className="space-y-5">
            <div className="bg-[#151922] border border-green-500/15 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={14} className="text-green-400" />
                <h3 className="text-sm font-semibold text-white">Scientific Design Principle</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-medium mb-3">
                "PackWise AI recommends within a validated design space rather than inventing packaging specifications."
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every recommendation is anchored to a real material record with documented test conditions and evidence status. The system does not generate arbitrary values — it selects from and explains a curated knowledge base.
              </p>
            </div>

            {DESIGN_PRINCIPLES.map(({ title, text, icon: Icon }) => (
              <div key={title} className="bg-[#151922] border border-white/5 rounded-xl p-4 hover:border-green-500/10 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={13} className="text-green-400" />
                  <h4 className="text-xs font-semibold text-white">{title}</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{text}</p>
              </div>
            ))}

            {/* Tech stack */}
            <div className="bg-[#151922] border border-white/5 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-300 mb-3">Planned Technology Stack</p>
              <div className="space-y-1.5">
                {[
                  { layer: 'Frontend', tech: 'React + Vite + Tailwind CSS' },
                  { layer: 'Backend', tech: 'FastAPI (Python) — planned' },
                  { layer: 'Rule Engine', tech: 'Python rule library — planned' },
                  { layer: 'Knowledge Base', tech: 'PostgreSQL + material records' },
                  { layer: 'Optimisation', tech: 'SciPy / custom — planned' },
                  { layer: 'Explainability', tech: 'Custom chain generator' },
                ].map(({ layer, tech }) => (
                  <div key={layer} className="flex items-start gap-2">
                    <span className="text-xs text-slate-600 w-24 flex-shrink-0">{layer}</span>
                    <span className="text-xs text-slate-400">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-amber-500/5 border border-amber-500/15 rounded-xl">
              <div className="flex items-center gap-1.5 mb-1">
                <Info size={11} className="text-amber-400" />
                <span className="text-xs font-semibold text-amber-400">Current Status</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                This is the frontend foundation phase. The backend, rule engine, knowledge base and optimisation modules are planned for future development. All data shown is demo/placeholder.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold text-sm rounded-lg transition-all shadow-xl shadow-green-500/20"
          >
            Try the Analysis Wizard
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
