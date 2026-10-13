import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Heart, Activity, AlertCircle, Wind } from 'lucide-react';

const generateData = (points: number, offset = 0) => {
  return Array.from({ length: points }).map((_, i) => ({
    time: i,
    ecg: Math.sin((i + offset) * 0.5) * 10 + (Math.random() * 2 - 1) + (i % 20 === 0 ? 40 : 0),
    eeg: Math.sin((i + offset) * 0.2) * 5 + Math.cos((i + offset) * 0.8) * 3 + (Math.random() * 4 - 2),
  }));
};

export function Dashboard() {
  const [data, setData] = useState(generateData(100));
  
  useEffect(() => {
    let offset = 0;
    const interval = setInterval(() => {
      offset += 1;
      setData(generateData(100, offset));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-100 tracking-tight">Patient Monitoring</h1>
          <p className="text-sm text-neutral-400 mt-1">Real-time bio-signal acquisition and analysis</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Live Stream Active
        </div>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <VitalCard title="Heart Rate" value="72" unit="bpm" icon={Heart} color="text-rose-400" trend="+2 bpm" />
        <VitalCard title="SpO2" value="98" unit="%" icon={Activity} color="text-blue-400" trend="Stable" />
        <VitalCard title="Respiration" value="16" unit="/min" icon={Wind} color="text-emerald-400" trend="-1 /min" />
        <VitalCard title="Stress Level" value="Low" unit="" icon={AlertCircle} color="text-amber-400" trend="Normal" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-neutral-200 flex items-center gap-2">
              <Activity size={16} className="text-rose-400" />
              ECG Waveform (Lead II)
            </h3>
            <span className="text-xs font-mono text-neutral-500">250 Hz</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis stroke="#525252" tick={{ fill: '#737373', fontSize: 12 }} domain={[-20, 60]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', color: '#e5e5e5' }}
                  itemStyle={{ color: '#fb7185' }}
                  labelStyle={{ display: 'none' }}
                />
                <Line type="monotone" dataKey="ecg" stroke="#fb7185" strokeWidth={1.5} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-neutral-200 flex items-center gap-2">
              <Activity size={16} className="text-indigo-400" />
              EEG Waveform (Fp1-A1)
            </h3>
            <span className="text-xs font-mono text-neutral-500">250 Hz</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis stroke="#525252" tick={{ fill: '#737373', fontSize: 12 }} domain={[-15, 15]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', color: '#e5e5e5' }}
                  itemStyle={{ color: '#818cf8' }}
                  labelStyle={{ display: 'none' }}
                />
                <Line type="monotone" dataKey="eeg" stroke="#818cf8" strokeWidth={1.5} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function VitalCard({ title, value, unit, icon: Icon, color, trend }: any) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-400">{title}</span>
        <Icon size={18} className={color} />
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight text-neutral-100">{value}</span>
        <span className="text-sm text-neutral-500">{unit}</span>
      </div>
      <div className="mt-2 text-xs text-neutral-500 font-medium">
        {trend}
      </div>
    </div>
  );
}
