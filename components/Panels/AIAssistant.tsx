'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, RotateCcw, Zap } from 'lucide-react';
import RONNIE_CODE from '@/data/ronnieCode';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

const SUGGESTED_QUESTIONS = [
  "Why is this servo jittering?",
  "What does Wire.begin() do?",
  "Why do we need PWM signals?",
  "How does the captive portal work?",
  "What is the PCA9685 chip?",
  "Why use cooperative delay?",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm Ronnie's AI tutor 🤖 Ask me anything about Ronnie's code, robotics, or embedded systems. I'll explain it in a beginner-friendly way!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (question: string) => {
    if (!question.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question.trim(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: assistantId,
      role: 'assistant',
      content: '',
      isStreaming: true,
    }]);

    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.trim(),
          code: RONNIE_CODE,
        }),
      });

      const data = await res.json();
      const answer = data.answer || "Sorry, I couldn't generate a response. Please try again!";

      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: answer, isStreaming: false }
            : m
        )
      );
    } catch {
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: "Sorry, I couldn't connect to the AI. Please check your setup!", isStreaming: false }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = () => {
    setMessages([{
      id: 'welcome-new',
      role: 'assistant',
      content: "Chat cleared! Ask me anything about Ronnie's robotics code 🤖",
    }]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <Bot size={14} className="text-purple-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">AI Tutor</p>
            <p className="text-xs text-slate-500">Powered by Gemini</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-colors"
          title="Clear chat"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm ${
                msg.role === 'assistant'
                  ? 'bg-purple-500/20 border border-purple-500/30'
                  : 'bg-cyan-500/20 border border-cyan-500/30'
              }`}>
                {msg.role === 'assistant' ? '🤖' : '👤'}
              </div>

              {/* Bubble */}
              <div className={`max-w-[85%] rounded-xl px-3 py-2.5 ${
                msg.role === 'user'
                  ? 'bg-cyan-500/15 border border-cyan-500/20 text-slate-200'
                  : 'bg-white/5 border border-white/8 text-slate-300'
              }`}>
                {msg.isStreaming && !msg.content ? (
                  <div className="flex gap-1 items-center h-5">
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-purple-400"
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay }}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Suggested questions */}
      {messages.length < 3 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-slate-600 mb-2 flex items-center gap-1">
            <Zap size={10} />
            Try asking:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_QUESTIONS.slice(0, 4).map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs px-2.5 py-1 rounded-full border border-white/8 bg-white/4 text-slate-400 hover:text-slate-200 hover:border-cyan-500/30 hover:bg-cyan-500/8 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 pt-2 border-t border-white/5">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about Ronnie's code..."
            disabled={isLoading}
            className="flex-1 bg-white/5 border border-white/8 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/8 transition-all disabled:opacity-50"
          />
          <motion.button
            type="submit"
            disabled={!input.trim() || isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
          >
            {isLoading ? (
              <Sparkles size={14} className="text-white animate-spin" />
            ) : (
              <Send size={14} className="text-white" />
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
