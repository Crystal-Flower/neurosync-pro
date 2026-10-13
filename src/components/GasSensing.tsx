import React from 'react';
import { Wind, AlertTriangle, CloudRain } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const gasData = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  co2: 400 + Math.random() * 100 + (i > 12 && i < 18 ? 200 : 0),
  voc: 50 + Math.random() * 20 + (i === 15 ? 150 : 0),
}));

export function GasSensing() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-100 tracking-tight">Bio/Medical Gas Sensing</h1>
          <p className="text-sm text-neutral-400 mt-1">Wearable environmental and breath analysis</p>
        </div>
        <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium">
          AQI: Good (42)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GasCard title="Carbon Dioxide (CO2)" value="450" unit="ppm" status="normal" />
        <GasCard title="Volatile Organics (VOC)" value="65" unit="ppb" status="normal" />
        <GasCard title="Nitrogen Dioxide (NO2)" value="0.02" unit="ppm" status="warning" />
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium text-neutral-200 flex items-center gap-2">
            <Wind size={16} className="text-blue-400" />
            24h Exposure Trends
          </h3>
          <div className="flex gap-2">
            <span className="flex items-center gap-1.5 text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> CO2
            </span>
            <span className="flex items-center gap-1.5 text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> VOC
            </span>
          </div>
        </div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={gasData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorVoc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <XAxis dataKey="time" stroke="#525252" tick={{ fill: '#737373', fontSize: 11 }} />
              <YAxis stroke="#525252" tick={{ fill: '#737373', fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', color: '#e5e5e5' }}
              />
              <Area type="monotone" dataKey="co2" stroke="#10b981" fillOpacity={1} fill="url(#colorCo2)" />
              <Area type="monotone" dataKey="voc" stroke="#f59e0b" fillOpacity={1} fill="url(#colorVoc)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <h3 className="font-medium text-neutral-200 mb-4">AI Health Predictions</h3>
          <div className="space-y-4">
            <PredictionItem 
              risk="Low" 
              title="Respiratory Distress Risk" 
              desc="Based on current breathing patterns and ambient air quality."
              color="text-emerald-400"
              bg="bg-emerald-500/10"
            />
            <PredictionItem 
              risk="Moderate" 
              title="Asthma Trigger Probability" 
              desc="Elevated VOC levels detected in the last 2 hours."
              color="text-amber-400"
              bg="bg-amber-500/10"
            />
          </div>
        </div>
        
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <h3 className="font-medium text-neutral-200 mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 rounded-lg bg-neutral-950 border border-neutral-800">
              <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-neutral-200">Elevated VOC Exposure</p>
                <p className="text-xs text-neutral-500 mt-1">14:30 - Peak reached 200ppb. Area ventilated.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GasCard({ title, value, unit, status }: any) {
  const isWarning = status === 'warning';
  return (
    <div className={`bg-neutral-900 border rounded-xl p-5 ${isWarning ? 'border-amber-500/30' : 'border-neutral-800'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-neutral-400">{title}</span>
        {isWarning && <AlertTriangle size={16} className="text-amber-500" />}
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-3xl font-semibold tracking-tight ${isWarning ? 'text-amber-400' : 'text-neutral-100'}`}>{value}</span>
        <span className="text-sm text-neutral-500">{unit}</span>
      </div>
    </div>
  );
}

function PredictionItem({ risk, title, desc, color, bg }: any) {
  return (
    <div className="flex items-start gap-4 p-3 rounded-lg border border-neutral-800 bg-neutral-950/50">
      <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${bg} ${color} shrink-0 w-20 text-center`}>
        {risk}
      </div>
      <div>
        <h4 className="text-sm font-medium text-neutral-200">{title}</h4>
        <p className="text-xs text-neutral-500 mt-1">{desc}</p>
      </div>
    </div>
  );
}
