'use client';
import Link from 'next/link';
import { Users, HeartPulse, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 font-sans p-8 relative overflow-hidden">

            {/* Background decoration */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

            <div className="z-10 text-center mb-16">
                <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500 mb-4 inline-flex items-center gap-4">
                    <Activity size={48} className="text-emerald-400" />
                    AdaptProsthetic
                </h1>
                <p className="text-lg text-slate-400">Next-Generation AI Adaptive Joint Intelligence</p>
            </div>

            <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                <Link href="/doctor">
                    <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="glass-panel p-10 flex flex-col items-center text-center h-full border border-blue-500/20 hover:border-blue-500/50 bg-blue-500/5 hover:bg-blue-500/10 transition-all cursor-pointer group shadow-[0_0_30px_rgba(59,130,246,0.05)] hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                            <Users size={40} className="text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-100 mb-3">Clinical Portal</h2>
                        <p className="text-slate-400 mb-6 text-sm">
                            For Medical Professionals. Access patient rosters, deep analytics, continuous telemetry monitoring, and remote neural calibrations.
                        </p>
                        <span className="mt-auto inline-flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-3 transition-all">
                            Doctor Login <span>&rarr;</span>
                        </span>
                    </motion.div>
                </Link>

                <Link href="/patient">
                    <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="glass-panel p-10 flex flex-col items-center text-center h-full border border-emerald-500/20 hover:border-emerald-500/50 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all cursor-pointer group shadow-[0_0_30px_rgba(16,185,129,0.05)] hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 transition-colors">
                            <HeartPulse size={40} className="text-emerald-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-100 mb-3">Patient Portal</h2>
                        <p className="text-slate-400 mb-6 text-sm">
                            For Prosthetic Users. Simplified daily activity dashboards, auto-calibration guidance, and rehab tracking.
                        </p>
                        <span className="mt-auto inline-flex items-center gap-2 text-emerald-400 font-semibold group-hover:gap-3 transition-all">
                            Patient Login <span>&rarr;</span>
                        </span>
                    </motion.div>
                </Link>
            </div>

        </div>
    );
}
