// PackWise AI — Analysis Loading Screen
// Shows sequential analysis stages during the demo analysis process
import { useState, useEffect } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import Logo from './Logo';

const STAGES = [
  'Food properties analysed',
  'Risk profile generated',
  'Packaging constraints evaluated',
  'Material candidates filtered',
  'Cost / sustainability trade-offs calculated',
  'Recommendation configurations generated',
  'Explainability report prepared',
];

export default function AnalysisLoadingScreen({ completedStages = 0 }) {
  return (
    <div className="fixed inset-0 bg-[#0a0c12] flex flex-col items-center justify-center z-50 px-4">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(34,197,94,0.06), transparent)' }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="md" />
        </div>

        {/* Animated spinner */}
        <div className="flex justify-center mb-8">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-white/5" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-green-500 animate-spin" />
            <div className="absolute inset-2 rounded-full border border-transparent border-t-green-500/30 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <p className="text-white font-semibold text-base">Generating Packaging Recommendations</p>
          <p className="text-slate-500 text-xs mt-1">Demo analysis in progress…</p>
        </div>

        {/* Stage list */}
        <div className="bg-[#151922] border border-white/5 rounded-xl p-5 space-y-3">
          {STAGES.map((stage, idx) => {
            const stageNum = idx + 1;
            const isCompleted = stageNum <= completedStages;
            const isActive = stageNum === completedStages + 1;

            return (
              <div key={stage} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                  {isCompleted ? (
                    <CheckCircle size={14} className="text-green-400" />
                  ) : isActive ? (
                    <Loader2 size={14} className="text-green-400 animate-spin" />
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-white/15" />
                  )}
                </div>
                <span
                  className={`text-xs transition-all duration-300 ${
                    isCompleted
                      ? 'text-green-400 line-through opacity-70'
                      : isActive
                      ? 'text-white font-medium'
                      : 'text-slate-600'
                  }`}
                >
                  {stage}
                </span>
              </div>
            );
          })}
        </div>

        {/* Demo label */}
        <div className="text-center mt-4">
          <span className="text-xs text-amber-500/70">
            Demo simulation — no real model is running
          </span>
        </div>
      </div>
    </div>
  );
}
