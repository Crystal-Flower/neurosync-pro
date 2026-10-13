'use client';
import { TrendingUp, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockGaitData = [
    { day: 'Mon', baseline: 65, optimized: 88 },
    { day: 'Tue', baseline: 68, optimized: 90 },
    { day: 'Wed', baseline: 64, optimized: 92 },
    { day: 'Thu', baseline: 70, optimized: 89 },
    { day: 'Fri', baseline: 72, optimized: 94 },
    { day: 'Sat', baseline: 75, optimized: 95 },
    { day: 'Sun', baseline: 74, optimized: 96 },
];

export default function DoctorAnalyticsPage() {
    return (
        <main className="p-12 w-full min-h-screen text-slate-100 flex flex-col">
            <header className="mb-10">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 mb-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-full block">
                    Clinical Analytics & Population Health
                </h2>
                <p className="text-slate-400 text-lg">Cross-patient analysis, ML prediction models, and long-term recovery trends.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">

                <div className="lg:col-span-2 glass-panel p-8 border border-slate-700/50 flex flex-col justify-start">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-200 mb-1">Population Gait Dataset</h3>
                            <p className="text-slate-500 text-sm">Aggregated ML inference across 142 patient neural networks.</p>
                        </div>
                        <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/30 rounded-full animate-pulse flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Live Sync
                        </span>
                    </div>

                    <div className="w-full h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockGaitData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px', zIndex: 10 }}
                                    itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="baseline" name="Baseline Gait" stroke="#64748b" fillOpacity={1} fill="url(#colorBaseline)" />
                                <Area type="monotone" dataKey="optimized" name="AI Optimized Gait" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorOptimized)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="glass-panel p-8 border border-emerald-500/20 bg-emerald-500/5 flex-1 flex flex-col justify-center items-center text-center">
                        <TrendingUp className="text-emerald-400 mb-4" size={40} />
                        <h4 className="text-xl font-bold text-slate-200 mb-2">Clinic Rehab Success</h4>
                        <span className="text-5xl font-extrabold text-emerald-400 mb-2">87%</span>
                        <p className="text-slate-400 text-sm">Of patients hit weekly mobility targets.</p>
                    </div>

                    <div className="glass-panel p-8 border border-indigo-500/20 bg-indigo-500/5 flex-1 flex flex-col justify-center items-center text-center">
                        <Users className="text-indigo-400 mb-4" size={40} />
                        <h4 className="text-xl font-bold text-slate-200 mb-2">High Risk Monitoring</h4>
                        <span className="text-5xl font-extrabold text-indigo-400 mb-2">4</span>
                        <p className="text-slate-400 text-sm">Patients flagged by ML for immediate calibration review.</p>
                    </div>
                </div>

            </div>
        </main>
    );
}
