import React, { useState } from 'react';
import { Brain, Filter, Download, Maximize2, Play, Pause } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const bandPowerData = [
  { name: 'Delta (0.5-4Hz)', value: 45, color: '#3b82f6' },
  { name: 'Theta (4-8Hz)', value: 25, color: '#8b5cf6' },
  { name: 'Alpha (8-13Hz)', value: 60, color: '#10b981' },
  { name: 'Beta (13-30Hz)', value: 30, color: '#f59e0b' },
  { name: 'Gamma (>30Hz)', value: 15, color: '#ef4444' },
];

export function EEGAnalysis() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeFilter, setActiveFilter] = useState('bandpass');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-100 tracking-tight">EEG Signal Manipulation</h1>
          <p className="text-sm text-neutral-400 mt-1">Advanced brainwave analysis and filtering</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-sm font-medium transition-colors">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <h3 className="font-medium text-neutral-200 mb-4 flex items-center gap-2">
              <Filter size={16} className="text-neutral-400" />
              Signal Processing
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2 block">Active Filters</label>
                <div className="space-y-2">
                  {['Bandpass (0.5-50Hz)', 'Notch (50/60Hz)', 'Artifact Removal (ICA)'].map((filter, i) => (
                    <label key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800 cursor-pointer transition-colors border border-transparent hover:border-neutral-700">
                      <input type="checkbox" defaultChecked={i < 2} className="w-4 h-4 rounded border-neutral-600 text-emerald-500 focus:ring-emerald-500/20 bg-neutral-900" />
                      <span className="text-sm text-neutral-300">{filter}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3 block">Gain Adjustment</label>
                <input type="range" min="1" max="100" defaultValue="50" className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                <div className="flex justify-between text-xs text-neutral-500 mt-2">
                  <span>1x</span>
                  <span>50x</span>
                  <span>100x</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <h3 className="font-medium text-neutral-200 mb-4 flex items-center gap-2">
              <Brain size={16} className="text-indigo-400" />
              AI Classification
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                <span className="text-sm text-neutral-400">Cognitive State</span>
                <span className="text-sm font-medium text-emerald-400">Focused</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                <span className="text-sm text-neutral-400">Stress Level</span>
                <span className="text-sm font-medium text-emerald-400">Low (12%)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                <span className="text-sm text-neutral-400">Fatigue Index</span>
                <span className="text-sm font-medium text-amber-400">Moderate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 h-80 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-neutral-200">Band Power Analysis (FFT)</h3>
              <div className="flex gap-2">
                <button className="p-1.5 bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-400 transition-colors">
                  <Maximize2 size={14} />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bandPowerData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                  <XAxis dataKey="name" stroke="#525252" tick={{ fill: '#737373', fontSize: 11 }} />
                  <YAxis stroke="#525252" tick={{ fill: '#737373', fontSize: 11 }} />
                  <Tooltip 
                    cursor={{ fill: '#262626' }}
                    contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', color: '#e5e5e5' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {bandPowerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
             <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-neutral-200">Topographic Map (Simulated)</h3>
              <span className="text-xs text-neutral-500">Alpha Asymmetry</span>
            </div>
            <div className="h-48 flex items-center justify-center bg-neutral-950 rounded-lg border border-neutral-800 relative overflow-hidden">
               {/* Placeholder for actual 3D/Topographic rendering */}
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-neutral-950 to-neutral-950"></div>
               <Brain size={64} className="text-neutral-700 relative z-10" />
               <p className="absolute bottom-4 text-xs text-neutral-500 font-mono">Requires WebGL context for live rendering</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
