import React, { useState, useEffect } from 'react';
import { Mic, MicOff, X, CheckCircle, Volume2 } from 'lucide-react';
import { pitchDetector } from '../services/audio/pitchDetector';
import { PitchDetectionResult } from '../types';

interface TunerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STRINGS_REF = [
  { num: 1, name: 'E4', freq: 329.6 },
  { num: 2, name: 'B3', freq: 246.9 },
  { num: 3, name: 'G3', freq: 196.0 },
  { num: 4, name: 'D3', freq: 146.8 },
  { num: 5, name: 'A2', freq: 110.0 },
  { num: 6, name: 'E2', freq: 82.4 },
];

export const TunerModal: React.FC<TunerModalProps> = ({ isOpen, onClose }) => {
  const [pitch, setPitch] = useState<PitchDetectionResult | null>(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (isOpen) {
      startListening();
    } else {
      stopListening();
    }
    return () => {
      stopListening();
    };
  }, [isOpen]);

  const startListening = async () => {
    const ok = await pitchDetector.start((result) => {
      setPitch(result);
    });
    setIsListening(ok);
  };

  const stopListening = () => {
    pitchDetector.stop();
    setIsListening(false);
    setPitch(null);
  };

  if (!isOpen) return null;

  const cents = pitch?.cents || 0;
  // Clamped needle angle between -45 deg and +45 deg
  const needleAngle = Math.max(-45, Math.min(45, (cents / 50) * 45));

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full shadow-2xl p-6 text-center z-[101]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Chromatic Guitar Tuner</h3>
          </div>
          <button
            onClick={() => {
              stopListening();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Note Display */}
        <div className="my-6">
          <div className="text-6xl font-black text-white tracking-wider font-mono">
            {pitch ? pitch.note : '—'}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            {pitch ? `${pitch.frequency} Hz` : 'Pluck a guitar string into your mic...'}
          </p>
        </div>

        {/* Vintage Tuner Meter Gauge */}
        <div className="relative w-64 h-32 mx-auto bg-slate-950 rounded-t-full border-t-2 border-x-2 border-slate-800 overflow-hidden flex items-end justify-center shadow-inner">
          {/* Tick marks */}
          <div className="absolute top-2 w-full flex justify-between px-6 text-[9px] font-mono text-slate-500">
            <span>-50</span>
            <span>-25</span>
            <span className="text-emerald-400 font-bold">0</span>
            <span>+25</span>
            <span>+50</span>
          </div>

          {/* Needle indicator */}
          <div
            className="absolute bottom-0 w-1 h-28 origin-bottom rounded-full transition-transform duration-100"
            style={{
              transform: `rotate(${needleAngle}deg)`,
              backgroundColor: pitch?.isInTune ? '#10b981' : '#f59e0b',
              boxShadow: pitch?.isInTune ? '0 0 10px #10b981' : 'none',
            }}
          />

          <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-600 z-10 -mb-3 shadow" />
        </div>

        {/* In-Tune Status Pill */}
        <div className="mt-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              pitch?.isInTune
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {pitch?.isInTune ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                PERFECT PITCH
              </>
            ) : pitch ? (
              `${cents > 0 ? '+' : ''}${cents} cents ${cents > 0 ? 'Sharp' : 'Flat'}`
            ) : (
              'Listening...'
            )}
          </span>
        </div>

        {/* Reference 6 Guitar Strings Buttons */}
        <div className="grid grid-cols-6 gap-1.5 mt-6 pt-4 border-t border-slate-800">
          {STRINGS_REF.map((s) => (
            <div
              key={s.num}
              className={`p-2 rounded-lg border text-center font-mono ${
                pitch?.targetString === s.num
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="text-[10px] text-slate-500">#{s.num}</div>
              <div className="text-xs font-bold text-white">{s.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
