'use client';

import { motion } from 'framer-motion';
import { Cpu, Zap, Wifi, Radio, Box } from 'lucide-react';

interface Component {
  id: string;
  name: string;
  desc: string;
  specs: string[];
  color: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  w: number;
  h: number;
  connections: string[];
}

const COMPONENTS: Component[] = [
  {
    id: 'esp32',
    name: 'ESP32',
    desc: 'Main microcontroller brain',
    specs: ['240MHz dual-core', 'WiFi + Bluetooth', '520KB SRAM', 'GPIO matrix'],
    color: '#3b82f6',
    icon: <Cpu size={16} />,
    x: 30, y: 80, w: 120, h: 80,
    connections: ['pca9685', 'wifi'],
  },
  {
    id: 'pca9685',
    name: 'PCA9685',
    desc: 'PWM servo controller',
    specs: ['16 channels', '12-bit resolution', 'I2C interface', '50Hz default'],
    color: '#a855f7',
    icon: <Radio size={16} />,
    x: 220, y: 80, w: 120, h: 80,
    connections: ['servo1', 'servo2', 'servo3', 'servo4'],
  },
  {
    id: 'wifi',
    name: 'WiFi AP',
    desc: 'Wireless control interface',
    specs: ['802.11 b/g/n', 'SoftAP mode', 'WPA2-PSK', 'DHCP server'],
    color: '#22c55e',
    icon: <Wifi size={16} />,
    x: 30, y: 220, w: 120, h: 80,
    connections: [],
  },
  {
    id: 'servo1',
    name: 'Front-Left',
    desc: 'Leg servo pair',
    specs: ['Hip: CH0', 'Knee: CH1', '0–180°', 'SG90/MG996'],
    color: '#00d4ff',
    icon: <Box size={16} />,
    x: 420, y: 30, w: 100, h: 70,
    connections: [],
  },
  {
    id: 'servo2',
    name: 'Front-Right',
    desc: 'Leg servo pair',
    specs: ['Hip: CH2', 'Knee: CH3', '0–180°', 'SG90/MG996'],
    color: '#00ff88',
    icon: <Box size={16} />,
    x: 420, y: 115, w: 100, h: 70,
    connections: [],
  },
  {
    id: 'servo3',
    name: 'Rear-Left',
    desc: 'Leg servo pair',
    specs: ['Hip: CH4', 'Knee: CH5', '0–180°', 'SG90/MG996'],
    color: '#a855f7',
    icon: <Box size={16} />,
    x: 420, y: 200, w: 100, h: 70,
    connections: [],
  },
  {
    id: 'servo4',
    name: 'Rear-Right',
    desc: 'Leg servo pair',
    specs: ['Hip: CH6', 'Knee: CH7', '0–180°', 'SG90/MG996'],
    color: '#f59e0b',
    icon: <Box size={16} />,
    x: 420, y: 285, w: 100, h: 70,
    connections: [],
  },
];

export default function HardwareDiagram() {
  return (
    <div className="flex flex-col h-full gap-4 p-4">
      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
        <Cpu size={14} className="text-cyan-400" />
        Hardware Architecture
      </h3>

      <div className="rounded-xl border border-white/5 bg-black/20 overflow-auto flex-1">
        <svg viewBox="0 0 560 390" className="w-full min-w-[420px]" style={{ minHeight: 300 }}>
          {/* Grid background */}
          <defs>
            <pattern id="hw-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="560" height="390" fill="url(#hw-grid)" />

          {/* Connections */}
          {/* ESP32 → PCA9685 (I2C) */}
          <path d="M 150 120 L 220 120" stroke="#00d4ff" strokeWidth={2} strokeDasharray="5 3"
            fill="none" markerEnd="url(#arrow-cyan)" />
          <text x={185} y={113} textAnchor="middle" fontSize={8} fill="#00d4ff88" fontFamily="monospace">I2C</text>

          {/* ESP32 → WiFi AP */}
          <path d="M 90 160 L 90 220" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 3"
            fill="none" markerEnd="url(#arrow-green)" />
          <text x={75} y={195} textAnchor="middle" fontSize={8} fill="#22c55e88" fontFamily="monospace" transform="rotate(-90, 75, 195)">WiFi</text>

          {/* PCA9685 → Servos */}
          {[65, 150, 235, 320].map((sy, i) => (
            <path key={i} d={`M 340 ${80 + i * 0.1 + 40} Q 380 ${30 + i * 85} 420 ${65 + i * 85}`}
              stroke={['#00d4ff', '#00ff88', '#a855f7', '#f59e0b'][i]}
              strokeWidth={1.5} strokeDasharray="4 3" fill="none" />
          ))}

          {/* Arrow markers */}
          <defs>
            <marker id="arrow-cyan" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#00d4ff" />
            </marker>
            <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#22c55e" />
            </marker>
          </defs>

          {/* Component cards */}
          {COMPONENTS.map((comp) => (
            <motion.g
              key={comp.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * COMPONENTS.indexOf(comp) }}
              className="cursor-pointer"
              whileHover={{ scale: 1.03 }}
              style={{ transformOrigin: `${comp.x + comp.w / 2}px ${comp.y + comp.h / 2}px` }}
            >
              <rect
                x={comp.x} y={comp.y}
                width={comp.w} height={comp.h} rx={8}
                fill={`${comp.color}12`}
                stroke={`${comp.color}60`}
                strokeWidth={1.5}
              />
              {/* Header bar */}
              <rect x={comp.x} y={comp.y} width={comp.w} height={24} rx={8}
                fill={`${comp.color}30`}
              />
              <rect x={comp.x} y={comp.y + 16} width={comp.w} height={8}
                fill={`${comp.color}30`}
              />

              <text x={comp.x + 10} y={comp.y + 16} fontSize={10} fontWeight="bold"
                fill={comp.color} fontFamily="Inter, sans-serif">{comp.name}</text>
              <text x={comp.x + 10} y={comp.y + 32} fontSize={8}
                fill="#64748b" fontFamily="Inter, sans-serif">{comp.desc}</text>

              {comp.specs.map((spec, i) => (
                <text key={i} x={comp.x + 10} y={comp.y + 44 + i * 10} fontSize={7.5}
                  fill="#475569" fontFamily="JetBrains Mono, monospace">• {spec}</text>
              ))}
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Component legend */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'ESP32', color: '#3b82f6' },
          { label: 'PCA9685', color: '#a855f7' },
          { label: 'WiFi AP', color: '#22c55e' },
          { label: 'Front-Left', color: '#00d4ff' },
          { label: 'Front-Right', color: '#00ff88' },
          { label: 'Rear Legs', color: '#f59e0b' },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            <span className="text-xs text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
