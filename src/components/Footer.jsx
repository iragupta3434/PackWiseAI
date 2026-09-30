// PackWise AI — Footer
import { Link } from 'react-router-dom';
import Logo from './Logo';

const FOOTER_LINKS = {
  Platform: [
    { to: '/analyze', label: 'Start Analysis' },
    { to: '/results', label: 'View Results' },
    { to: '/what-if', label: 'What-If Simulator' },
    { to: '/knowledge-base', label: 'Knowledge Base' },
  ],
  'Learn More': [
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/about', label: 'About PackWise AI' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a0c12] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Logo size="sm" />
            <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-xs">
              Evidence-based food packaging decision support for farmers, FPOs, MSMEs and food businesses across India.
            </p>
            <div className="mt-4 flex flex-col gap-1">
              <span className="text-xs text-slate-600">Smart India Hackathon 2026</span>
              <span className="text-xs text-slate-600">Team LogicalNova</span>
            </div>
            {/* Demo notice */}
            <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-xs text-amber-400 font-medium">Demo — All data is placeholder</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm text-slate-500 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © 2026 PackWise AI — Team LogicalNova. SIH Demo Platform.
          </p>
          <p className="text-xs text-slate-700">
            All values are demo data. Not for commercial or regulatory use.
          </p>
        </div>
      </div>
    </footer>
  );
}
