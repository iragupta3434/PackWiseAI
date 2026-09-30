// PackWise AI — Results Page
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package, ArrowLeft, AlertTriangle, Info, FlaskConical, Brain,
  Download, Share2, RefreshCw, CheckCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecommendationCard from '../components/RecommendationCard';
import ExplainabilityFlow, { EvidencePanel } from '../components/ExplainabilityFlow';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { useAnalysis } from '../context/AnalysisContext';
import { useToast } from '../context/ToastContext';
import { DEMO_RECOMMENDATIONS, DEMO_EXPLANATION_CHAIN } from '../data/mockData';

// ---- Modal wrapper ----
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#151922] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>
        <div className="p-5 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

// ---- Summary bar ----
function ConditionsSummary({ results }) {
  const conditions = results?.conditions || DEMO_RECOMMENDATIONS.conditions;
  const product = results?.product || DEMO_RECOMMENDATIONS.product;

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-[#151922] border border-white/5 rounded-xl">
      <div className="flex items-center gap-1.5">
        <Package size={12} className="text-green-400" />
        <span className="text-xs text-slate-300 font-medium">{product}</span>
      </div>
      <div className="w-px h-3 bg-white/10 hidden sm:block" />
      {Object.entries(conditions).map(([k, v]) => (
        <div key={k} className="flex items-center gap-1">
          <span className="text-xs text-slate-600 capitalize">{k.replace(/([A-Z])/g, ' $1')}: </span>
          <span className="text-xs text-slate-400">{v}</span>
        </div>
      ))}
      {results?.isDemoData && (
        <>
          <div className="w-px h-3 bg-white/10 hidden sm:block" />
          <Badge color="amber">Demo Data</Badge>
        </>
      )}
    </div>
  );
}

export default function ResultsPage() {
  const { results } = useAnalysis();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [explainModal, setExplainModal] = useState(false);
  const [selectedRec, setSelectedRec] = useState(null);

  // Use demo data if no real results yet
  const displayResults = results || DEMO_RECOMMENDATIONS;
  const recs = displayResults.recommendations || DEMO_RECOMMENDATIONS.recommendations;

  const handleExplain = (rec) => {
    setSelectedRec(rec);
    setExplainModal(true);
  };

  const handleWhatIf = (rec) => {
    addToast('Opening What-If Simulator…', 'info', 2000);
    navigate('/what-if');
  };

  const handleNewAnalysis = () => {
    navigate('/analyze');
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="container-wide pt-24 pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <Link
              to="/analyze"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors mb-3"
            >
              <ArrowLeft size={12} />
              Back to Analysis
            </Link>
            <h1 className="text-2xl font-bold text-white">Packaging Recommendations</h1>
            <p className="text-slate-400 text-sm mt-1">
              Three trade-off configurations generated from your input data.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              icon={RefreshCw}
              onClick={handleNewAnalysis}
            >
              New Analysis
            </Button>
          </div>
        </div>

        {/* Demo / conditions banner */}
        <div className="mb-6">
          <ConditionsSummary results={displayResults} />
        </div>

        {/* Demo notice */}
        <div className="mb-6 flex items-start gap-2 p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl">
          <AlertTriangle size={12} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-400">Demo Output</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              {displayResults.analysisNote || 'All recommendations shown are demo data. Material properties, OTR, WVTR and cost figures are structural placeholders — not laboratory-validated values.'}
            </p>
          </div>
        </div>

        {/* Recommendation cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {recs.map((rec) => (
            <RecommendationCard
              key={rec.id}
              rec={rec}
              onExplain={handleExplain}
              onWhatIf={handleWhatIf}
            />
          ))}
        </div>

        {/* Trade-off note */}
        <div className="mb-8 p-4 bg-[#151922] border border-white/5 rounded-xl flex items-start gap-3">
          <Info size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-white mb-1">Understanding These Recommendations</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              These three configurations represent different positions on the performance–cost–sustainability trade-off. None is inherently "best". The appropriate choice depends on your product, shelf-life requirement, supply chain, regulatory context, and business model. Click <strong>Explain</strong> on any card to see the reasoning chain.
            </p>
          </div>
        </div>

        {/* Action row */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            icon={Brain}
            onClick={() => { setSelectedRec(recs[0]); setExplainModal(true); }}
          >
            View Reasoning Chain
          </Button>
          <Button
            variant="secondary"
            icon={FlaskConical}
            onClick={() => navigate('/what-if')}
          >
            What-If Simulator
          </Button>
          <Button
            variant="ghost"
            icon={Package}
            onClick={() => navigate('/knowledge-base')}
          >
            Browse Material Database
          </Button>
        </div>

        {/* Architecture reference */}
        <div className="mt-8 p-4 bg-[#0f1117] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={12} className="text-green-400" />
            <span className="text-xs font-semibold text-slate-300">Scientific Design Principle</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            PackWise AI recommends within a validated design space rather than inventing packaging specifications. Once the backend is connected, every recommendation will be anchored to a real material record with documented test conditions and evidence status.
          </p>
        </div>
      </div>

      <Footer />

      {/* Explainability Modal */}
      <Modal
        open={explainModal}
        onClose={() => setExplainModal(false)}
        title={`Reasoning Chain — ${selectedRec?.material || 'Recommendation'}`}
      >
        <div className="space-y-4">
          <ExplainabilityFlow chain={DEMO_EXPLANATION_CHAIN} />
          <EvidencePanel
            source="Material database — demo record"
            evidenceStatus="Structural placeholder"
            testCondition="Not yet connected to real test data"
            modelAssumption="Demo assumption — pending validation"
          />
        </div>
      </Modal>
    </div>
  );
}
