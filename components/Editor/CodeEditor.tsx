'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor';
import { useExplanation } from '@/hooks/useExplanation';
import HoverTooltip from '@/components/Editor/HoverTooltip';
import explanations from '@/data/explanations';
import RONNIE_CODE from '@/data/ronnieCode';

interface CodeEditorProps {
  onLineHover?: (lineNumber: number | null) => void;
}

export default function CodeEditor({ onLineHover }: CodeEditorProps) {
  const [code, setCode] = useState(RONNIE_CODE);
  const { state, getExplanation, clearExplanation } = useExplanation();
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const decorationsRef = useRef<string[]>([]);

  const handleMount: OnMount = useCallback((editor) => {
    editorRef.current = editor;

    // Add decorations for prewritten explanation lines
    const highlighted = Object.keys(explanations).map(Number);
    const newDecorations = editor.deltaDecorations([], highlighted.map(lineNum => ({
      range: new (window as any).monaco.Range(lineNum, 1, lineNum, 1),
      options: {
        isWholeLine: true,
        className: 'ronnie-highlighted-line',
        glyphMarginClassName: 'ronnie-glyph',
        overviewRuler: {
          color: '#00d4ff30',
          position: (window as any).monaco.editor.OverviewRulerLane.Right,
        },
      },
    })));
    decorationsRef.current = newDecorations;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!editorRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const editorPos = editorRef.current.getTargetAtClientPoint(e.clientX, e.clientY);

    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

    if (editorPos?.position) {
      const lineNumber = editorPos.position.lineNumber;
      const lines = code.split('\n');
      const lineContent = lines[lineNumber - 1] || '';

      hoverTimeoutRef.current = setTimeout(() => {
        setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        getExplanation(lineNumber, lineContent);
        onLineHover?.(lineNumber);
      }, 300);
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        clearExplanation();
        setTooltipPos(null);
        onLineHover?.(null);
      }, 500);
    }
  }, [code, getExplanation, clearExplanation, onLineHover]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      clearExplanation();
      setTooltipPos(null);
      onLineHover?.(null);
    }, 300);
  }, [clearExplanation, onLineHover]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Editor header bar */}
      <div className="flex items-center gap-2 px-4 h-10 bg-[#1e1e2e] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-2 ml-3">
          <div className="px-3 py-0.5 rounded-t bg-[#252533] border-t border-x border-white/10 text-xs text-slate-300 font-mono">
            ronnie_main.ino
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-slate-500">Arduino C++</span>
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs text-cyan-400">Hover lines to explore</span>
        </div>
      </div>

      <style>{`
        .ronnie-highlighted-line {
          background: linear-gradient(90deg, rgba(0,212,255,0.06) 0%, transparent 100%);
          border-left: 2px solid rgba(0,212,255,0.4);
        }
        .ronnie-glyph::before {
          content: '◆';
          color: rgba(0,212,255,0.6);
          font-size: 8px;
        }
        .monaco-editor .margin { background: #1e1e2e !important; }
        .monaco-editor, .monaco-editor-background, .monaco-editor .inputarea.ime-input {
          background: #1e1e2e !important;
        }
      `}</style>

      <Editor
        height="calc(100% - 40px)"
        defaultLanguage="cpp"
        value={code}
        onChange={(val) => val !== undefined && setCode(val)}
        onMount={handleMount}
        theme="vs-dark"
        options={{
          fontSize: 13,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontLigatures: true,
          lineNumbers: 'on',
          minimap: { enabled: true, scale: 0.8 },
          scrollBeyondLastLine: false,
          wordWrap: 'off',
          padding: { top: 16, bottom: 16 },
          renderLineHighlight: 'line',
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          lineDecorationsWidth: 4,
          glyphMargin: true,
          folding: true,
          showFoldingControls: 'always',
          bracketPairColorization: { enabled: true },
          contextmenu: false,
          quickSuggestions: false,
          hover: { enabled: false }, // We handle hover ourselves
        }}
      />

      <HoverTooltip state={state} position={tooltipPos} />
    </div>
  );
}
