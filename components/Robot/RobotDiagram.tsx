'use client';

import { motion } from 'framer-motion';
import { RobotPart } from '../../hooks/useRobotHighlight';

interface RobotDiagramProps {
  highlightedPart: RobotPart;
}

const partColors = {
  'front-left': '#00d4ff',
  'front-right': '#00ff88',
  'rear-left': '#8b5cf6',
  'rear-right': '#f59e0b',
  'all-legs': '#00d4ff',
  'body': '#64748b',
  'esp32': '#3b82f6',
  'pca9685': '#a855f7',
  'servo': '#f97316',
};

interface LegProps {
  x: number;
  y: number;
  angle: number;
  label: string;
  part: RobotPart;
  highlightedPart: RobotPart;
}

function Leg({ x, y, angle, label, part, highlightedPart }: LegProps) {
  const isHighlighted =
    highlightedPart === part ||
    highlightedPart === 'all-legs' ||
    highlightedPart === 'servo';

  const color = isHighlighted
    ? (highlightedPart === 'all-legs' || highlightedPart === 'servo'
        ? '#00d4ff'
        : partColors[part as keyof typeof partColors] || '#00d4ff')
    : '#334155';

  const footX = x + Math.cos((angle * Math.PI) / 180) * 32;
  const footY = y + Math.sin((angle * Math.PI) / 180) * 32;
  const kneeX = x + Math.cos((angle * Math.PI) / 180) * 18;
  const kneeY = y + Math.sin((angle * Math.PI) / 180) * 18;

  return (
    <g>
      {/* Upper leg */}
      <motion.line
        x1={x} y1={y} x2={kneeX} y2={kneeY}
        stroke={color}
        strokeWidth={isHighlighted ? 3 : 2}
        strokeLinecap="round"
        animate={{ stroke: color, strokeWidth: isHighlighted ? 3 : 2 }}
        transition={{ duration: 0.3 }}
      />
      {/* Knee joint */}
      <motion.circle
        cx={kneeX} cy={kneeY} r={4}
        fill={color}
        animate={{ fill: color, r: isHighlighted ? 5 : 4 }}
        transition={{ duration: 0.3 }}
      />
      {/* Lower leg */}
      <motion.line
        x1={kneeX} y1={kneeY} x2={footX} y2={footY}
        stroke={color}
        strokeWidth={isHighlighted ? 3 : 2}
        strokeLinecap="round"
        animate={{ stroke: color, strokeWidth: isHighlighted ? 3 : 2 }}
        transition={{ duration: 0.3 }}
      />
      {/* Foot */}
      <motion.circle
        cx={footX} cy={footY} r={3}
        fill={color}
        animate={{ fill: color, r: isHighlighted ? 5 : 3 }}
        transition={{ duration: 0.3 }}
      />
      {/* Glow effect when highlighted */}
      {isHighlighted && (
        <motion.circle
          cx={footX} cy={footY} r={8}
          fill={color}
          opacity={0.3}
          animate={{
            r: [8, 14, 8],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {/* Label */}
      <text
        x={footX + (angle > 90 ? -10 : 4)}
        y={footY + (angle > 0 ? 14 : -8)}
        fontSize={9}
        fill={isHighlighted ? color : '#475569'}
        fontFamily="JetBrains Mono, monospace"
        className="transition-colors duration-300"
      >
        {label}
      </text>
    </g>
  );
}

export default function RobotDiagram({ highlightedPart }: RobotDiagramProps) {
  const bodyHighlighted = highlightedPart === 'body' || highlightedPart === 'esp32' || highlightedPart === 'pca9685';

  return (
    <div className="flex flex-col items-center gap-4 h-full">
      <div className="text-xs text-slate-500 font-medium uppercase tracking-widest">Robot Diagram</div>

      <svg viewBox="0 0 200 200" className="w-full max-w-[220px]" style={{ filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.15))' }}>
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#grid)" rx="8" />

        {/* Body */}
        <motion.rect
          x={70} y={72} width={60} height={56} rx={8}
          fill={bodyHighlighted ? 'rgba(59,130,246,0.25)' : 'rgba(30,40,60,0.8)'}
          stroke={bodyHighlighted ? '#3b82f6' : '#334155'}
          strokeWidth={bodyHighlighted ? 2 : 1.5}
          animate={{
            fill: bodyHighlighted ? 'rgba(59,130,246,0.25)' : 'rgba(30,40,60,0.8)',
            stroke: bodyHighlighted ? '#3b82f6' : '#334155',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* ESP32 chip indicator */}
        <motion.rect
          x={83} y={85} width={34} height={20} rx={4}
          fill={highlightedPart === 'esp32' ? 'rgba(59,130,246,0.5)' : 'rgba(59,130,246,0.15)'}
          stroke={highlightedPart === 'esp32' ? '#3b82f6' : '#1d4ed8'}
          strokeWidth={1}
          animate={{ fill: highlightedPart === 'esp32' ? 'rgba(59,130,246,0.5)' : 'rgba(59,130,246,0.15)' }}
        />
        <text x={100} y={98} textAnchor="middle" fontSize={7} fill="#60a5fa" fontFamily="monospace">ESP32</text>

        {/* PCA9685 indicator */}
        <motion.rect
          x={83} y={110} width={34} height={12} rx={3}
          fill={highlightedPart === 'pca9685' ? 'rgba(168,85,247,0.5)' : 'rgba(168,85,247,0.15)'}
          stroke={highlightedPart === 'pca9685' ? '#a855f7' : '#6d28d9'}
          strokeWidth={1}
          animate={{ fill: highlightedPart === 'pca9685' ? 'rgba(168,85,247,0.5)' : 'rgba(168,85,247,0.15)' }}
        />
        <text x={100} y={119} textAnchor="middle" fontSize={6} fill="#c084fc" fontFamily="monospace">PCA9685</text>

        {/* Front-Left Leg */}
        <Leg x={70} y={80} angle={210} label="FL" part="front-left" highlightedPart={highlightedPart} />
        {/* Front-Right Leg */}
        <Leg x={130} y={80} angle={330} label="FR" part="front-right" highlightedPart={highlightedPart} />
        {/* Rear-Left Leg */}
        <Leg x={70} y={120} angle={150} label="RL" part="rear-left" highlightedPart={highlightedPart} />
        {/* Rear-Right Leg */}
        <Leg x={130} y={120} angle={30} label="RR" part="rear-right" highlightedPart={highlightedPart} />

        {/* Body glow when all legs active */}
        {highlightedPart === 'all-legs' && (
          <motion.rect
            x={68} y={70} width={64} height={60} rx={9}
            fill="none"
            stroke="#00d4ff"
            strokeWidth={2}
            animate={{
              opacity: [0.4, 0.9, 0.4],
              strokeWidth: [1.5, 2.5, 1.5],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Direction arrows */}
        <text x={100} y={30} textAnchor="middle" fontSize={10} fill="#334155">▲</text>
        <text x={100} y={26} textAnchor="middle" fontSize={7} fill="#334155" fontFamily="monospace">FRONT</text>
        <text x={100} y={178} textAnchor="middle" fontSize={10} fill="#334155">▼</text>
        <text x={100} y={190} textAnchor="middle" fontSize={7} fill="#334155" fontFamily="monospace">REAR</text>
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-1.5 w-full max-w-[220px]">
        {[
          { part: 'front-left', label: 'Front Left', color: partColors['front-left'] },
          { part: 'front-right', label: 'Front Right', color: partColors['front-right'] },
          { part: 'rear-left', label: 'Rear Left', color: partColors['rear-left'] },
          { part: 'rear-right', label: 'Rear Right', color: partColors['rear-right'] },
        ].map(({ part, label, color }) => (
          <div key={part} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  highlightedPart === part || highlightedPart === 'all-legs' || highlightedPart === 'servo'
                    ? color
                    : '#334155',
                boxShadow:
                  highlightedPart === part || highlightedPart === 'all-legs'
                    ? `0 0 6px ${color}`
                    : 'none',
              }}
            />
            <span className="text-xs text-slate-500">{label}</span>
          </div>
        ))}
      </div>

      {/* Active part indicator */}
      {highlightedPart && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium"
        >
          Active: {highlightedPart.replace(/-/g, ' ').toUpperCase()}
        </motion.div>
      )}
    </div>
  );
}
