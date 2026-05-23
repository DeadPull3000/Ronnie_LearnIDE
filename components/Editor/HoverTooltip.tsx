'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, BookOpen, ChevronDown, ChevronUp, Loader2, Sparkles, Tag } from 'lucide-react';
import { useState } from 'react';
import { LineExplanation } from '@/data/explanations';
import { AIExplanationResponse } from '@/lib/aiExplainer';
import { ExplanationState } from '@/hooks/useExplanation';

interface HoverTooltipProps {
  state: ExplanationState;
  position: { x: number; y: number } | null;
}

const hardwareColors: Record<string, string> = {
  'ESP32': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'PCA9685': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Servo Motors': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'I2C': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'WiFi': 'bg-green-500/20 text-green-300 border-green-500/30',
  'Power Supply': 'bg-red-500/20 text-red-300 border-red-500/30',
  'All Legs': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  'default': 'bg-slate-500/20 text-slate-300 border-slate-500/30',
};

function HardwareBadge({ hw }: { hw: string }) {
  const cls = hardwareColors[hw] || hardwareColors['default'];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      <Cpu size={10} />
      {hw}
    </span>
  );
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-700/60 text-slate-300 border border-slate-600/40">
      <Tag size={9} />
      {tag}
    </span>
  );
}

function SignalFlow({ flow }: { flow: string[] }) {
  return (
    <div className="mt-3 p-2 rounded-lg bg-black/30 border border-cyan-500/20">
      <p className="text-xs text-cyan-400 font-medium mb-1.5 flex items-center gap-1">
        <Zap size={10} />
        Signal Flow
      </p>
      <div className="flex flex-wrap items-center gap-1">
        {flow.map((step, i) => (
          <span key={i} className="flex items-center gap-1">
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-xs px-2 py-0.5 rounded bg-cyan-900/40 text-cyan-300 border border-cyan-700/40 whitespace-nowrap"
            >
              {step}
            </motion.span>
            {i < flow.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.05 }}
                className="text-cyan-600 text-xs"
              >
                →
              </motion.span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HoverTooltip({ state, position }: HoverTooltipProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const isVisible = state.type !== 'none' && position !== null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={state.lineNumber}
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.97 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="absolute z-50 w-96 max-w-[calc(100vw-2rem)]"
          style={{
            left: Math.max(0, (position?.x ?? 0)),
            top: (position?.y ?? 0) + 28,
            transform: `translateX(min(0px, calc(100vw - ${(position?.x ?? 0) + 400}px)))`,
          }}
        >
          <div className="rounded-xl border border-white/10 bg-[#0d1117]/95 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden">
            {/* Header gradient bar */}
            <div className="h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

            <div className="p-4">
              {state.type === 'loading' ? (
                <div className="flex items-center gap-3 py-2">
                  <div className="relative">
                    <Loader2 size={18} className="text-purple-400 animate-spin" />
                    <div className="absolute inset-0 blur-sm bg-purple-500/30 rounded-full" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">AI Analyzing...</p>
                    <p className="text-xs text-slate-400 mt-0.5">Generating explanation for this code</p>
                  </div>
                  <Sparkles size={14} className="text-purple-400 ml-auto animate-pulse" />
                </div>
              ) : state.data ? (
                <>
                  {/* Title + AI badge */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-bold text-white leading-tight">{state.data.title}</h3>
                    {state.type === 'ai' && (
                      <span className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        <Sparkles size={9} />
                        AI
                      </span>
                    )}
                  </div>

                  {/* Beginner explanation */}
                  <p className="text-sm text-slate-300 leading-relaxed">{state.data.beginnerExplanation}</p>

                  {/* Hardware badges */}
                  {state.data.relatedHardware && state.data.relatedHardware.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {state.data.relatedHardware.map(hw => (
                        <HardwareBadge key={hw} hw={hw} />
                      ))}
                    </div>
                  )}

                  {/* Signal flow (prewritten only) */}
                  {'signalFlow' in state.data && (state.data as LineExplanation).signalFlow && (
                    <SignalFlow flow={(state.data as LineExplanation).signalFlow!} />
                  )}

                  {/* Tags */}
                  {state.data.tags && state.data.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {state.data.tags.slice(0, 4).map(tag => (
                        <TagBadge key={tag} tag={tag} />
                      ))}
                    </div>
                  )}

                  {/* Advanced toggle */}
                  {state.data.advancedExplanation && (
                    <div className="mt-3 border-t border-white/5 pt-3">
                      <button
                        onClick={() => setShowAdvanced(v => !v)}
                        className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                      >
                        <BookOpen size={11} />
                        Advanced Explanation
                        {showAdvanced ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                      </button>
                      <AnimatePresence>
                        {showAdvanced && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-slate-400 leading-relaxed mt-2 font-mono"
                          >
                            {state.data.advancedExplanation}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
