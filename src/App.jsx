// PackWise AI — Root Application with Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AnalysisProvider } from './context/AnalysisContext';

// Pages
import LandingPage from './pages/LandingPage';
import AnalyzePage from './pages/AnalyzePage';
import ResultsPage from './pages/ResultsPage';
import WhatIfPage from './pages/WhatIfPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';

// 404 page
function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0a0c12] flex flex-col items-center justify-center text-center p-8">
      <div className="text-6xl font-bold text-green-500/20 font-mono mb-4">404</div>
      <h1 className="text-xl font-bold text-white mb-2">Page Not Found</h1>
      <p className="text-slate-500 text-sm mb-6">The page you are looking for does not exist.</p>
      <a href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-semibold text-sm rounded-lg">
        Return Home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AnalysisProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/what-if" element={<WhatIfPage />} />
            <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnalysisProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
