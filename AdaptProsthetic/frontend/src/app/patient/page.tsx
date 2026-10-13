'use client';
import { useProstheticData } from '@/hooks/useProstheticData';
import { HeartPulse, CheckCircle, BatteryCharging, AlertCircle, Play, ChevronRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PatientDashboard() {
    const { data, isConnected } = useProstheticData();

    const balanceScore = data?.analytics?.balanceScore ? Math.round(data.analytics.balanceScore) : 85;
    const stepsTaken = 4320;
    const goalSteps = 6000;
    const progressPercent = Math.round((stepsTaken / goalSteps) * 100);

    return (
        <main className="p-8 md:p-12 w-full min-h-screen text-slate-100 flex flex-col gap-8">

            <header className="flex justify-between items-start">
                <div>
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">
                        Good Morning, John
                    </h2>
                    <p className="text-slate-400 text-lg">Your device is running smoothly today.</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${isConnected ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800/80 border-slate-700/50 text-slate-400'}`}>
                        <span className="relative flex h-3 w-3">
                            {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnected ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
                        </span>
                        <span className="font-semibold">{isConnected ? 'Device Connected' : 'Searching for Device...'}</span>
                    </div>
                    {isConnected && (
                        <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900/50 px-4 py-1.5 rounded-full border border-slate-800">
                            <BatteryCharging size={16} className="text-emerald-400" />
                            <span>Battery: 84%</span>
                        </div>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Main Score Card */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="md:col-span-2 glass-panel p-8 border border-emerald-500/30 bg-emerald-500/5 flex flex-col justify-center relative overflow-hidden"
                >
                    <div className="absolute right-[-10%] bottom-[-20%] w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                    <h3 className="text-slate-400 font-medium mb-4 flex items-center gap-2">
                        <HeartPulse className="text-emerald-400" size={20} />
                        Today's Movement Score
                    </h3>
                    <div className="flex items-end gap-4 mb-4">
                        <span className="text-7xl font-extrabold text-emerald-400 tracking-tighter">92</span>
                        <span className="text-xl text-slate-400 font-medium mb-2">/ 100</span>
                    </div>
                    <p className="text-slate-300">
                        Great job! You're walking with <strong className="text-emerald-300">excellent symmetry</strong> today. Keep maintaining this pace to reach your daily goal.
                    </p>
                </motion.div>

                {/* Small metric cards */}
                <div className="flex flex-col gap-6">
                    <motion.div whileHover={{ y: -5 }} className="glass-panel p-6 border-slate-700/50 flex-1 flex flex-col justify-between">
                        <h3 className="text-slate-400 font-medium text-sm mb-2 text-center">Stability & Balance</h3>
                        <div className="mt-auto flex flex-col items-center justify-center">
                            <span className={`text-5xl font-bold mb-2 ${balanceScore >= 80 ? 'text-blue-400' : 'text-amber-400'}`}>
                                {balanceScore}%
                            </span>
                            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                                {balanceScore >= 80 ? 'Optimal Posture' : 'Adjust Posture'}
                            </span>
                        </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} className="glass-panel p-6 border-slate-700/50 flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-slate-400 font-medium text-sm">Walking Goal</h3>
                            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded-md">{progressPercent}%</span>
                        </div>
                        <div className="mt-auto">
                            <div className="flex items-end justify-between mb-2">
                                <span className="text-2xl font-bold text-slate-200">{stepsTaken.toLocaleString()}</span>
                                <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">Steps</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2">
                                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>

            <h3 className="text-xl font-bold text-slate-200 mt-4">Required Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Link href="/patient/movement">
                    <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-6 border border-blue-500/30 bg-blue-500/5 flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <Activity size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-slate-200 group-hover:text-blue-300 transition-colors">View Live Posture Map</h4>
                                <p className="text-slate-400 text-sm">Check your walking alignment in real-time.</p>
                            </div>
                        </div>
                        <ChevronRight className="text-slate-500 group-hover:text-blue-400 transition-colors" />
                    </motion.div>
                </Link>

                <Link href="/patient/calibration">
                    <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-6 border border-indigo-500/30 bg-indigo-500/5 flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                <Play size={24} fill="currentColor" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-slate-200 group-hover:text-indigo-300 transition-colors">Start Daily Calibration</h4>
                                <p className="text-slate-400 text-sm">Takes 30 seconds to adjust AI parameters.</p>
                            </div>
                        </div>
                        <ChevronRight className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    </motion.div>
                </Link>

            </div>

        </main>
    );
}
