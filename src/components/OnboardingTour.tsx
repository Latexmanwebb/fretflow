import React, { useState } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Music,
  Target,
  GraduationCap,
  Mic,
  CheckCircle2,
} from 'lucide-react';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TourStep {
  title: string;
  badge: string;
  icon: React.ReactNode;
  headline: string;
  description: string;
  tips: string[];
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Interactive Studio',
    badge: 'Core Engine',
    icon: <Music className="w-6 h-6 text-amber-400" />,
    headline: 'Full-Fidelity Notation & Tablature',
    description:
      'Load any Guitar Pro (GP3–GP8), MusicXML, or AlphaTex score. Enjoy smooth vector rendering, authentic SoundFont audio playback, and customizable staff themes (Paper, Sepia, Dark).',
    tips: [
      'Press Spacebar to Play/Pause, or L to toggle Repeat Looping.',
      'Switch between Standard Notation, Tablature, or Dual View anytime.',
    ],
  },
  {
    title: 'Focus & Chunking',
    badge: 'Soundslice-Style Practice',
    icon: <Target className="w-6 h-6 text-amber-400" />,
    headline: 'Isolate & Master Difficult Measures',
    description:
      'Select any range of measures in the score or click "Focus" to isolate the current measure. FretFlow dims outside sections and loops the exact chunk you need to master.',
    tips: [
      'Click and drag across bars in the score to highlight a custom section.',
      'Press Esc or click the floating "Exit Focus Mode" pill to restore full score.',
    ],
  },
  {
    title: 'Deliberate Practice',
    badge: 'Tempo Ladder',
    icon: <GraduationCap className="w-6 h-6 text-amber-400" />,
    headline: '3 Clean Repetitions Speed Progression',
    description:
      'Open Practice Mode to divide pieces into bite-sized practice chunks. Start at 50% tempo and nail 3 consecutive clean repetitions to automatically ramp your speed up to 100%.',
    tips: [
      'Customize your step size (% or BPM) in Tempo Settings.',
      'Celebratory feedback keeps your practice sessions engaging and focused.',
    ],
  },
  {
    title: 'Chromatic Tuner',
    badge: 'New in Navbar',
    icon: <Mic className="w-6 h-6 text-emerald-400" />,
    headline: 'Instant Pitch Detection & Visual Tuning',
    description:
      'Click the Tuner button right in the top navigation bar. With microtonal pitch detection and visual strobe feedback, tune your guitar directly in your browser with zero latency.',
    tips: [
      'Supports all standard and alternate tunings (Drop D, DADGAD, Open G).',
      'Runs completely offline on your local device without sending audio anywhere.',
    ],
  },
  {
    title: 'Giuliani 120 Studies & Right-Hand HUD',
    badge: 'Pedagogy & Technique',
    icon: <GraduationCap className="w-6 h-6 text-amber-400" />,
    headline: 'Master Right-Hand Classical Technique',
    description:
      'Explore all 120 Mauro Giuliani Op. 1 Part 3 arpeggio studies with a real-time p-i-m-a plucking HUD showing finger independence and string transitions.',
    tips: [
      'Look for the live plucking guide displaying exact finger assignments.',
      'Revisit this tour anytime by clicking the (?) Help icon in the navbar.',
    ],
  },
];

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStep];
  const isLast = currentStep === TOUR_STEPS.length - 1;

  const handleFinish = () => {
    try {
      localStorage.setItem('fretflow_onboarding_completed', 'true');
    } catch {}
    onClose();
  };

  const handleNext = () => {
    if (isLast) {
      handleFinish();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Bar */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-white/10 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30">
              {step.icon}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                {step.badge}
              </span>
              <h3 className="text-sm font-bold text-white mt-1">
                {step.title} ({currentStep + 1} of {TOUR_STEPS.length})
              </h3>
            </div>
          </div>
          <button
            onClick={handleFinish}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
            title="Skip tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-lg font-extrabold text-white tracking-tight">
              {step.headline}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed mt-2">
              {step.description}
            </p>
          </div>

          {/* Quick Tips Box */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Pro Tips
            </span>
            <ul className="space-y-1.5">
              {step.tips.map((tip, idx) => (
                <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 border-t border-white/10 bg-slate-950/50 flex items-center justify-between">
          {/* Step Dots */}
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStep
                    ? 'w-6 bg-amber-400'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Go to step ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-amber-500/20 transition active:scale-95 flex items-center gap-1.5"
            >
              <span>{isLast ? 'Get Started' : 'Next'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
