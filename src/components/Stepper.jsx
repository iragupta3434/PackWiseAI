// PackWise AI — Step Progress Indicator
import { Check } from 'lucide-react';

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, idx) => {
        const stepNumber = idx + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isLast = idx === steps.length - 1;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-green-500 text-black'
                    : isCurrent
                    ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
                    : 'bg-white/5 border border-white/10 text-slate-600'
                }`}
              >
                {isCompleted ? <Check size={14} /> : stepNumber}
              </div>
              <span
                className={`mt-1.5 text-xs font-medium whitespace-nowrap hidden sm:block ${
                  isCurrent ? 'text-green-400' : isCompleted ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {!isLast && (
              <div
                className={`flex-1 h-px mx-2 min-w-[24px] transition-all duration-300 ${
                  isCompleted ? 'bg-green-500/40' : 'bg-white/5'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
