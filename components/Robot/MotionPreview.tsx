'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const GAIT_POSES = [
  { name: 'Stand', fl: 90, fr: 90, rl: 90, rr: 90 },
  { name: 'Step 1', fl: 60, fr: 90, rl: 90, rr: 60 },
  { name: 'Step 2', fl: 90, fr: 90, rl: 90, rr: 90 },
  { name: 'Step 3', fl: 90, fr: 60, rl: 60, rr: 90 },
  { name: 'Step 4', fl: 90, fr: 90, rl: 90, rr: 90 },
];

function ServoGauge({ angle, label, active }: { angle: number; label: string; active: boolean }) {
  const pct = angle / 180;
  const r = 22;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ * 0.75;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={60} height={60} viewBox="0 0 60 60">
        {/* Track */}
        <circle cx={30} cy={30} r={r} fill="none" stroke="#1e293b" strokeWidth={5}
          strokeDasharray={`${circ * 0.75} ${circ}`}
          strokeDashoffset={circ * 0.125}
          strokeLinecap="round"
          transform="rotate(135 30 30)"
        />
        {/* Value arc */}
        <motion.circle
          cx={30} cy={30} r={r}
          fill="none"
          stroke={active ? '#00d4ff' : '#334155'}
          strokeWidth={5}
          strokeDasharray={`${dash} ${circ}`}
          strokeDashoffset={circ * 0.125}
          strokeLinecap="round"
          transform="rotate(135 30 30)"
          animate={{ strokeDasharray: `${dash} ${circ}`, stroke: active ? '#00d4ff' : '#334155' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ filter: active ? 'drop-shadow(0 0 4px #00d4ff)' : 'none' }}
        />
        {/* Angle text */}
        <text x={30} y={34} textAnchor="middle" fontSize={11} fontWeight="bold"
          fill={active ? '#00d4ff' : '#475569'} fontFamily="JetBrains Mono, monospace">
          {angle}°
        </text>
      </svg>
      <span className={`text-xs font-medium transition-colors duration-300 ${active ? 'text-cyan-400' : 'text-slate-500'}`}>
        {label}
      </span>
    </div>
  );
}

export default function MotionPreview() {
  const [poseIdx, setPoseIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setPoseIdx(i => (i + 1) % GAIT_POSES.length);
    }, 700);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const pose = GAIT_POSES[poseIdx];

  // Determine which legs are "active" (not at 90°)
  const flActive = pose.fl !== 90;
  const frActive = pose.fr !== 90;
  const rlActive = pose.rl !== 90;
  const rrActive = pose.rr !== 90;

  return (
    <div className="flex flex-col h-full gap-6 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Motion Preview</h3>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-green-400"
            animate={isPlaying ? { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <button
            onClick={() => setIsPlaying(v => !v)}
            className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition-colors"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>

      {/* Gait name */}
      <div className="text-center">
        <motion.p
          key={pose.name}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-cyan-400 font-medium uppercase tracking-wider"
        >
          {pose.name}
        </motion.p>
      </div>

      {/* Side-view walking robot */}
      <div className="flex justify-center">
        <svg viewBox="0 0 280 140" className="w-full max-w-sm">
          {/* Ground */}
          <line x1={20} y1={110} x2={260} y2={110} stroke="#1e293b" strokeWidth={2} strokeDasharray="4 4" />

          {/* Body */}
          <motion.rect x={90} y={50} width={100} height={35} rx={8}
            fill="rgba(30,40,60,0.9)" stroke="#334155" strokeWidth={1.5}
          />

          {/* Head */}
          <motion.rect x={178} y={55} width={28} height={24} rx={6}
            fill="rgba(30,40,60,0.9)" stroke="#334155" strokeWidth={1.5}
          />
          {/* Eye */}
          <motion.circle cx={198} cy={67} r={4} fill="#00d4ff"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ filter: 'drop-shadow(0 0 4px #00d4ff)' }}
          />

          {/* Front legs (right side of screen) */}
          <motion.g
            animate={{ rotate: frActive ? [-12, 12] : 0 }}
            transition={{ duration: 0.35, repeat: frActive ? Infinity : 0, repeatType: 'reverse' }}
            style={{ transformOrigin: '165px 68px' }}
          >
            <line x1={165} y1={68} x2={165} y2={90} stroke={frActive ? '#00d4ff' : '#334155'} strokeWidth={3} strokeLinecap="round" />
            <line x1={165} y1={90} x2={155} y2={110} stroke={frActive ? '#00d4ff' : '#334155'} strokeWidth={3} strokeLinecap="round" />
            <circle cx={155} cy={110} r={4} fill={frActive ? '#00d4ff' : '#475569'} />
          </motion.g>

          {/* Front-right (2nd front leg, slightly behind) */}
          <motion.g
            animate={{ rotate: flActive ? [12, -12] : 0 }}
            transition={{ duration: 0.35, repeat: flActive ? Infinity : 0, repeatType: 'reverse', delay: 0.175 }}
            style={{ transformOrigin: '158px 68px' }}
          >
            <line x1={158} y1={68} x2={158} y2={88} stroke={flActive ? '#00ff88' : '#293548'} strokeWidth={2.5} strokeLinecap="round" strokeOpacity={0.7} />
            <line x1={158} y1={88} x2={148} y2={110} stroke={flActive ? '#00ff88' : '#293548'} strokeWidth={2.5} strokeLinecap="round" strokeOpacity={0.7} />
            <circle cx={148} cy={110} r={3} fill={flActive ? '#00ff88' : '#374151'} />
          </motion.g>

          {/* Rear legs (left side of screen) */}
          <motion.g
            animate={{ rotate: rrActive ? [12, -12] : 0 }}
            transition={{ duration: 0.35, repeat: rrActive ? Infinity : 0, repeatType: 'reverse' }}
            style={{ transformOrigin: '118px 68px' }}
          >
            <line x1={118} y1={68} x2={118} y2={90} stroke={rrActive ? '#f59e0b' : '#334155'} strokeWidth={3} strokeLinecap="round" />
            <line x1={118} y1={90} x2={128} y2={110} stroke={rrActive ? '#f59e0b' : '#334155'} strokeWidth={3} strokeLinecap="round" />
            <circle cx={128} cy={110} r={4} fill={rrActive ? '#f59e0b' : '#475569'} />
          </motion.g>

          <motion.g
            animate={{ rotate: rlActive ? [-12, 12] : 0 }}
            transition={{ duration: 0.35, repeat: rlActive ? Infinity : 0, repeatType: 'reverse', delay: 0.175 }}
            style={{ transformOrigin: '125px 68px' }}
          >
            <line x1={125} y1={68} x2={125} y2={88} stroke={rlActive ? '#8b5cf6' : '#293548'} strokeWidth={2.5} strokeLinecap="round" strokeOpacity={0.7} />
            <line x1={125} y1={88} x2={135} y2={110} stroke={rlActive ? '#8b5cf6' : '#293548'} strokeWidth={2.5} strokeLinecap="round" strokeOpacity={0.7} />
            <circle cx={135} cy={110} r={3} fill={rlActive ? '#8b5cf6' : '#374151'} />
          </motion.g>
        </svg>
      </div>

      {/* Servo angle gauges */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-xs text-slate-600 text-center font-medium">Front</p>
          <div className="flex gap-3 justify-center">
            <ServoGauge angle={pose.fl} label="FL" active={flActive} />
            <ServoGauge angle={pose.fr} label="FR" active={frActive} />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-slate-600 text-center font-medium">Rear</p>
          <div className="flex gap-3 justify-center">
            <ServoGauge angle={pose.rl} label="RL" active={rlActive} />
            <ServoGauge angle={pose.rr} label="RR" active={rrActive} />
          </div>
        </div>
      </div>

      {/* Gait step progress */}
      <div className="flex gap-1 justify-center">
        {GAIT_POSES.map((_, i) => (
          <motion.div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${i === poseIdx ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700'}`}
          />
        ))}
      </div>
    </div>
  );
}
