'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  color: string;
  icon: string;
}

const NODES: Node[] = [
  { id: 'esp32', label: 'ESP32', sublabel: 'Microcontroller', x: 60, y: 100, color: '#3b82f6', icon: '🧠' },
  { id: 'i2c', label: 'I2C Bus', sublabel: 'SDA + SCL', x: 200, y: 100, color: '#00d4ff', icon: '⚡' },
  { id: 'pca9685', label: 'PCA9685', sublabel: 'PWM Controller', x: 340, y: 100, color: '#a855f7', icon: '🎛️' },
  { id: 'servo', label: 'Servo ×8', sublabel: '0°–180°', x: 480, y: 100, color: '#f97316', icon: '⚙️' },
];

function PulseParticle({ fromX, toX, y, color, delay }: {
  fromX: number; toX: number; y: number; color: string; delay: number;
}) {
  return (
    <motion.circle
      r={4}
      fill={color}
      cx={fromX}
      cy={y}
      style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      animate={{ cx: [fromX, toX] }}
      transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.5, delay, ease: 'easeInOut' }}
    />
  );
}

interface NodeCardProps {
  node: Node;
  isActive: boolean;
}

function NodeCard({ node, isActive }: NodeCardProps) {
  return (
    <motion.g
      animate={{
        filter: isActive ? `drop-shadow(0 0 12px ${node.color})` : 'none',
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.rect
        x={node.x - 42} y={node.y - 34}
        width={84} height={68} rx={10}
        fill={isActive ? `${node.color}22` : 'rgba(15,23,42,0.9)'}
        stroke={isActive ? node.color : '#1e293b'}
        strokeWidth={isActive ? 2 : 1}
        animate={{
          fill: isActive ? `${node.color}22` : 'rgba(15,23,42,0.9)',
          stroke: isActive ? node.color : '#1e293b',
        }}
        transition={{ duration: 0.3 }}
      />
      <text x={node.x} y={node.y - 14} textAnchor="middle" fontSize={18}>{node.icon}</text>
      <text x={node.x} y={node.y + 8} textAnchor="middle" fontSize={11} fontWeight="bold"
        fill={isActive ? node.color : '#e2e8f0'} fontFamily="Inter, sans-serif">{node.label}</text>
      <text x={node.x} y={node.y + 22} textAnchor="middle" fontSize={8}
        fill={isActive ? `${node.color}cc` : '#475569'} fontFamily="Inter, sans-serif">{node.sublabel}</text>
    </motion.g>
  );
}

export default function SignalFlowDiagram() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(s => (s + 1) % (NODES.length + 1));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full gap-4 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Zap size={14} className="text-cyan-400" />
          Signal Flow
        </h3>
        <span className="text-xs text-slate-500">Live animation</span>
      </div>

      <div className="rounded-xl border border-white/5 bg-black/20 p-2 overflow-x-auto">
        <svg viewBox="0 0 560 200" className="w-full min-w-[400px]" height={200}>
          {/* Connection lines */}
          {NODES.slice(0, -1).map((node, i) => {
            const next = NODES[i + 1];
            const isLinkActive = activeStep > i;
            return (
              <g key={`link-${i}`}>
                <motion.line
                  x1={node.x + 42} y1={node.y}
                  x2={next.x - 42} y2={next.y}
                  stroke={isLinkActive ? next.color : '#1e293b'}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  animate={{ stroke: isLinkActive ? next.color : '#1e293b' }}
                  transition={{ duration: 0.3 }}
                />
                {isLinkActive && (
                  <PulseParticle
                    fromX={node.x + 42}
                    toX={next.x - 42}
                    y={node.y}
                    color={next.color}
                    delay={i * 0.3}
                  />
                )}
              </g>
            );
          })}

          {/* Node cards */}
          {NODES.map((node, i) => (
            <NodeCard key={node.id} node={node} isActive={activeStep > i} />
          ))}
        </svg>
      </div>

      {/* Step explanation */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        {[
          {
            title: 'ESP32 Brain',
            desc: 'Runs your Arduino code and sends I2C commands with servo angles',
            color: '#3b82f6',
          },
          {
            title: 'I2C Protocol',
            desc: '2 wires (SDA data, SCL clock) carry digital messages at up to 400kHz',
            color: '#00d4ff',
          },
          {
            title: 'PCA9685 Chip',
            desc: 'Receives I2C commands and generates precise PWM pulses for each servo',
            color: '#a855f7',
          },
          {
            title: 'Servo Motors',
            desc: 'Pulse width (1000–2000μs) at 50Hz tells each servo its target angle',
            color: '#f97316',
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="rounded-lg border p-3 transition-colors duration-300"
            animate={{
              borderColor: activeStep > i ? `${item.color}40` : 'rgba(255,255,255,0.05)',
              backgroundColor: activeStep > i ? `${item.color}0a` : 'rgba(0,0,0,0.2)',
            }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <motion.div
                className="w-2 h-2 rounded-full"
                animate={{ backgroundColor: activeStep > i ? item.color : '#334155' }}
              />
              <p className="text-xs font-semibold text-white">{item.title}</p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Step indicator */}
      <div className="flex justify-center gap-1.5">
        {Array.from({ length: NODES.length + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeStep ? 'w-6 bg-cyan-400' : 'w-1.5 bg-slate-700 hover:bg-slate-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
