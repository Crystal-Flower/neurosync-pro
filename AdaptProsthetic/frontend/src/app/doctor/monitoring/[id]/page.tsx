'use client';
import { useProstheticData } from '@/hooks/useProstheticData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AlertTriangle, Activity, CheckCircle, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

import { use } from 'react';

export default function MonitoringDashboard({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { data, history, isConnected } = useProstheticData();

  const alerts = data?.alerts || [];
  const latestData = data;

  return (
    <main className="p-8 overflow-y-auto w-full">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
            Patient Telemetry: #{unwrappedParams.id}
            {isConnected ? (
              <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">
                Live Processing
              </span>
            ) : (
              <span className="bg-rose-500/10 text-rose-400 text-xs px-3 py-1 rounded-full border border-rose-500/20 animate-pulse">
                Connecting...
              </span>
            )}
          </h2>
          <p className="text-slate-400 mt-2">Real-time analytical data feed from Prosthesis ESP32 Neural Link</p>
        </div>
      </header>

      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 flex items-center gap-4 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.15)]"
        >
          <ShieldAlert className="animate-bounce" size={24} />
          <div>
            <h4 className="font-bold uppercase tracking-wide text-rose-400 text-sm">Critical Alert</h4>
            <p className="text-sm font-medium">{alerts[0].message}</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <InfoCard
          title="Joint Angle (Knee)"
          value={`${latestData?.sensors.flex?.toFixed(1) || '--'}°`}
          subtitle={`Target: ${latestData?.mlPrediction.optimalAngle?.toFixed(1) || '--'}°`}
          status={latestData?.mlPrediction.adjustmentRequired ? 'warning' : 'ok'}
        />
        <InfoCard
          title="Muscle EMG"
          value={`${Math.round(latestData?.sensors.emg || 0)} µV`}
          subtitle="Spike detected"
          status="info"
        />
        <InfoCard
          title="Balance Score"
          value={`${Math.round(latestData?.analytics?.balanceScore || 0)}%`}
          subtitle={latestData?.analytics?.balanceScore && latestData.analytics.balanceScore > 85 ? 'Excellent Stability' : 'Sub-optimal Setup'}
          status={latestData?.analytics?.balanceScore && latestData.analytics.balanceScore > 85 ? 'ok' : 'info'}
        />
        <InfoCard
          title="ML Confidence"
          value={`${Math.round((latestData?.mlPrediction.confidenceScore || 0) * 100)}%`}
          subtitle="Neural Network Accuracy"
          status="ok"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-200">Joint Angle vs ML Optimal Angle (Real-Time)</h3>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <LineChart data={history}>
                <XAxis dataKey="timestamp" hide />
                <YAxis domain={[0, 100]} stroke="#475569" tick={{ fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', background: '#0f172a', border: '1px solid #1e293b' }}
                />
                <ReferenceLine y={50} stroke="#334155" strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="sensors.flex"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={false}
                  name="Current Angle"
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="mlPrediction.optimalAngle"
                  stroke="#10b981"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={false}
                  name="ML Target"
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 shadow-2xl">
          <h3 className="text-lg font-bold text-slate-200 mb-6">AI Rehabilitation Insights</h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2 text-slate-400">
                <span>Posture Correction</span>
                <span className="text-indigo-400 font-semibold">{Math.round(latestData?.analytics.postureCorrectionPercent || 0)}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300" style={{ width: `${latestData?.analytics.postureCorrectionPercent || 0}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2 text-slate-400">
                <span>Step Symmetry</span>
                <span className="text-emerald-400 font-semibold">{Math.round(latestData?.analytics.stepSymmetry || 0)}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all duration-300" style={{ width: `${latestData?.analytics.stepSymmetry || 0}%` }}></div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
              <h4 className="font-semibold text-indigo-300 text-sm mb-2">ML Diagnostic Recommendations</h4>
              <ul className="text-sm text-slate-400 space-y-2">
                <li className="flex gap-2 items-start">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  Device latency below threshold (optimal)
                </li>
                <li className="flex gap-2 items-start">
                  <Activity size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  Increase gait speed slightly to improve heel strike momentum
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoCard({ title, value, subtitle, status }: { title: string, value: string, subtitle: string, status: 'ok' | 'warning' | 'info' }) {
  const statusColors = {
    ok: 'text-emerald-400 from-emerald-500/20 to-emerald-500/5 border-emerald-500/20',
    warning: 'text-rose-400 from-rose-500/20 to-rose-500/5 border-rose-500/20',
    info: 'text-blue-400 from-blue-500/20 to-blue-500/5 border-blue-500/20',
  };

  return (
    <div className={`p-6 rounded-2xl glass-panel relative overflow-hidden group`}>
      <div className={`absolute inset-0 bg-gradient-to-br opacity-50 ${statusColors[status]} pointer-events-none transition-opacity duration-300 group-hover:opacity-70`} />
      <div className="relative z-10">
        <h4 className="text-slate-400 font-medium text-sm mb-3">{title}</h4>
        <div className={`text-3xl font-bold tracking-tight mb-2 ${status === 'warning' ? 'text-rose-400' : 'text-slate-100'}`}>
          {value}
        </div>
        <p className={`text-xs ${status === 'warning' ? 'text-rose-300/80' : 'text-slate-500'}`}>{subtitle}</p>
      </div>
    </div>
  );
}
