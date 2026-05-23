'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  Code2, Cpu, Zap, Play, Bot, BookOpen,
  GitBranch, Activity, Wifi, ChevronRight
} from 'lucide-react';
import { useRobotHighlight } from '@/hooks/useRobotHighlight';
import RobotDiagram from '@/components/Robot/RobotDiagram';
import MotionPreview from '@/components/Robot/MotionPreview';
import SignalFlowDiagram from '@/components/Panels/SignalFlowDiagram';
import AIAssistant from '@/components/Panels/AIAssistant';
import HardwareDiagram from '@/components/Panels/HardwareDiagram';

// Monaco must be dynamically imported (no SSR)
const CodeEditor = dynamic(() => import('@/components/Editor/CodeEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 rounded-xl border-2 border-cyan-500/30 border-t-cyan-400 mx-auto"
        />
        <p className="text-sm text-slate-500">Loading editor...</p>
      </div>
    </div>
  ),
});

type Tab = 'code' | 'hardware' | 'motion' | 'signal' | 'ai';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'code', label: 'Code', icon: <Code2 size={14} /> },
  { id: 'hardware', label: 'Hardware', icon: <Cpu size={14} /> },
  { id: 'motion', label: 'Motion', icon: <Play size={14} /> },
  { id: 'signal', label: 'Signal Flow', icon: <Zap size={14} /> },
  { id: 'ai', label: 'AI Tutor', icon: <Bot size={14} /> },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('code');
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const highlightedPart = useRobotHighlight(hoveredLine);

  const handleLineHover = useCallback((lineNumber: number | null) => {
    setHoveredLine(lineNumber);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#070b14] overflow-hidden">
      {/* ── Top Header ── */}
      <header className="flex items-center gap-4 px-4 h-12 bg-[#0d1117]/90 border-b border-white/5 backdrop-blur-sm flex-shrink-0 z-10">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-7 h-7">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <GitBranch size={14} className="text-white" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-lg bg-cyan-400"
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">Ronnie Learn IDE</h1>
            <p className="text-[10px] text-slate-500 -mt-0.5">Robotics Code Explorer</p>
          </div>
        </div>

        {/* Tab bar */}
        <nav className="flex items-center gap-0.5 ml-4">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-white bg-white/8'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/4'
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-lg ring-1 ring-cyan-500/30 bg-cyan-500/5"
                  transition={{ duration: 0.2 }}
                />
              )}
              {tab.id === 'ai' && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-purple-400">
                  <span className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-60" />
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Right side indicators */}
        <div className="ml-auto flex items-center gap-3">
          {hoveredLine && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20"
            >
              <Activity size={11} className="text-cyan-400" />
              <span className="text-xs text-cyan-400 font-mono">Line {hoveredLine}</span>
            </motion.div>
          )}
          <div className="flex items-center gap-1.5">
            <Wifi size={12} className="text-green-400" />
            <span className="text-xs text-slate-500">RonnieControl</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-slate-500">ESP32 Ready</span>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── Main panel (editor or tab content) ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'code' ? (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex-1 flex overflow-hidden"
            >
              {/* Editor */}
              <div className="flex-1 overflow-hidden bg-[#1e1e2e]">
                <CodeEditor onLineHover={handleLineHover} />
              </div>

              {/* Right sidebar */}
              <div className="w-72 flex-shrink-0 border-l border-white/5 flex flex-col overflow-hidden bg-[#0d1117]">
                {/* Robot diagram */}
                <div className="flex-1 p-4 overflow-y-auto border-b border-white/5">
                  <RobotDiagram highlightedPart={highlightedPart} />
                </div>

                {/* Hover hint */}
                <div className="p-3 bg-black/20">
                  <AnimatePresence mode="wait">
                    {hoveredLine ? (
                      <motion.div
                        key="hovering"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
                        <p className="text-xs text-slate-400">
                          Exploring line <span className="text-cyan-400 font-mono">{hoveredLine}</span>
                          {highlightedPart && (
                            <span className="text-slate-500"> — {highlightedPart.replace(/-/g, ' ')}</span>
                          )}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-slate-600"
                      >
                        <BookOpen size={11} />
                        <p className="text-xs">Hover any line to learn</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quick reference */}
                <div className="p-3 border-t border-white/5">
                  <p className="text-xs text-slate-600 mb-2 font-medium uppercase tracking-wider">Quick Ref</p>
                  <div className="space-y-1">
                    {[
                      { color: 'bg-blue-400', label: 'ESP32 lines' },
                      { color: 'bg-purple-400', label: 'PCA9685 control' },
                      { color: 'bg-cyan-400', label: 'I2C / servo' },
                      { color: 'bg-orange-400', label: 'WiFi / HTTP' },
                    ].map(({ color, label }) => (
                      <div key={label} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-sm ${color} opacity-60`} />
                        <span className="text-xs text-slate-600">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-hidden"
            >
              {activeTab === 'hardware' && (
                <div className="h-full overflow-y-auto bg-[#0d1117]">
                  <HardwareDiagram />
                </div>
              )}
              {activeTab === 'motion' && (
                <div className="h-full overflow-y-auto bg-[#0d1117]">
                  <MotionPreview />
                </div>
              )}
              {activeTab === 'signal' && (
                <div className="h-full overflow-y-auto bg-[#0d1117]">
                  <SignalFlowDiagram />
                </div>
              )}
              {activeTab === 'ai' && (
                <div className="h-full bg-[#0d1117]">
                  <AIAssistant />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Status Bar ── */}
      <footer className="h-6 bg-[#0a0f1a] border-t border-white/5 flex items-center px-4 gap-4 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <ChevronRight size={10} className="text-cyan-500" />
          <span className="text-xs text-slate-600 font-mono">ronnie_main.ino</span>
        </div>
        <div className="text-xs text-slate-700">Arduino C++ · ESP32</div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-slate-700">Ln {hoveredLine || '—'}, Col 1</span>
          <span className="text-xs text-slate-700">UTF-8</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-xs text-slate-600">Gemini AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
