import React, { useState } from 'react';
import { Gamepad2, Target, Zap, Trophy, PlayCircle } from 'lucide-react';

export function Rehabilitation() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-100 tracking-tight">Neuro-Rehabilitation</h1>
          <p className="text-sm text-neutral-400 mt-1">BCI-driven therapy and neurofeedback training</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-neutral-400">Session Score:</span>
          <span className="font-mono font-bold text-emerald-400 text-lg">840</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Game Area */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-1 overflow-hidden">
            <div className="aspect-video bg-neutral-950 rounded-lg relative flex items-center justify-center border border-neutral-800/50">
              {activeGame ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 mx-auto flex items-center justify-center animate-pulse">
                    <Brain size={32} className="text-emerald-400" />
                  </div>
                  <p className="text-neutral-400 font-mono text-sm">Awaiting motor imagery input...</p>
                  <div className="w-64 h-2 bg-neutral-800 rounded-full overflow-hidden mx-auto">
                    <div className="h-full bg-emerald-500 w-1/3 transition-all duration-300"></div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Gamepad2 size={48} className="text-neutral-700 mx-auto mb-4" />
                  <p className="text-neutral-500">Select a training module to begin</p>
                </div>
              )}
            </div>
          </div>

          {/* Module Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GameCard 
              title="Motor Imagery: Left/Right" 
              desc="Train motor cortex activation by imagining hand movements."
              icon={Target}
              difficulty="Medium"
              isActive={activeGame === 'motor'}
              onClick={() => setActiveGame('motor')}
            />
            <GameCard 
              title="Focus & Attention" 
              desc="Maintain Alpha/Theta ratio to keep the object afloat."
              icon={Zap}
              difficulty="Easy"
              isActive={activeGame === 'focus'}
              onClick={() => setActiveGame('focus')}
            />
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <h3 className="font-medium text-neutral-200 mb-4 flex items-center gap-2">
              <Trophy size={16} className="text-amber-400" />
              Progress Tracking
            </h3>
            
            <div className="space-y-4">
              <ProgressItem label="Motor Control Accuracy" value={78} />
              <ProgressItem label="Sustained Attention" value={92} />
              <ProgressItem label="Reaction Time" value={65} />
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <h3 className="font-medium text-neutral-200 mb-4">Recent Sessions</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center gap-3">
                    <PlayCircle size={16} className="text-neutral-500" />
                    <div>
                      <p className="text-sm font-medium text-neutral-300">Focus Training</p>
                      <p className="text-xs text-neutral-500">Oct 24, 10:00 AM</p>
                    </div>
                  </div>
                  <span className="text-sm font-mono text-emerald-400">+120 pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GameCard({ title, desc, icon: Icon, difficulty, isActive, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`text-left p-5 rounded-xl border transition-all ${
        isActive 
          ? 'bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/50' 
          : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/50'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-400'}`}>
          <Icon size={20} />
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-400">
          {difficulty}
        </span>
      </div>
      <h4 className="font-medium text-neutral-200 mb-1">{title}</h4>
      <p className="text-xs text-neutral-500 leading-relaxed">{desc}</p>
    </button>
  );
}

function ProgressItem({ label, value }: { label: string, value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-neutral-400">{label}</span>
        <span className="font-medium text-neutral-200">{value}%</span>
      </div>
      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-emerald-500 rounded-full" 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

// Simple Brain icon fallback since it's not imported in this file
function Brain(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}
