'use client';
import { useProstheticData } from '@/hooks/useProstheticData';
import { CheckCircle, AlertTriangle, ShieldAlert, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function PatientMovementPage() {
    const { data, isConnected } = useProstheticData();
    const [painReported, setPainReported] = useState(false);

    const isGoodPosture = (data?.analytics?.balanceScore || 0) > 85;
    const symmetry = Math.round(data?.analytics?.stepSymmetry || 80);

    const reportPain = () => {
        setPainReported(true);
        setTimeout(() => setPainReported(false), 5000);

        fetch('http://localhost:5000/api/alerts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                patientId: '1',
                patient: 'John Doe',
                type: 'Manual UI Pain Override',
                severity: 'high'
            })
        }).catch(err => console.error(err));
    };

    return (
        <main className="p-8 md:p-12 w-full min-h-screen text-slate-100 flex flex-col items-center">

            <div className="w-full max-w-3xl text-center mb-10">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 mb-4">
                    Live Movement & Posture
                </h2>
                <p className="text-slate-400 text-lg">Watch your walking form block-by-block. Follow the posture guide.</p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">

                {/* Simple visual body alignment */}
                <div className="glass-panel p-10 flex flex-col items-center border border-slate-700/50 relative overflow-hidden h-96">
                    <div className={`absolute inset-0 opacity-20 transition-all duration-500 ${isGoodPosture ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>

                    <h3 className="font-bold text-xl text-slate-200 mb-8 relative z-10">Posture Indicator</h3>

                    <div className="relative w-32 h-48 flex flex-col items-center justify-between z-10">
                        <motion.div
                            animate={{ rotate: isGoodPosture ? 0 : 5 }}
                            transition={{ type: 'spring' }}
                            className="flex flex-col items-center gap-1 w-full"
                        >
                            {/* Head */}
                            <div className={`w-10 h-10 rounded-full border-4 ${isGoodPosture ? 'border-emerald-400 bg-emerald-500/20' : 'border-amber-400 bg-amber-500/20'}`}></div>
                            {/* Torso */}
                            <div className={`w-16 h-20 rounded-xl border-4 ${isGoodPosture ? 'border-emerald-400 bg-emerald-500/20' : 'border-amber-400 bg-amber-500/20'}`}></div>
                            {/* Legs */}
                            <div className="flex gap-4 w-16 justify-between px-1">
                                <motion.div animate={{ rotate: 10, y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className={`w-3 h-16 rounded-full ${isGoodPosture ? 'bg-emerald-400/80' : 'bg-amber-400/80'} shadow-[0_0_15px_rgba(52,211,153,0.5)]`}></motion.div>
                                <motion.div animate={{ rotate: -10, y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.75 }} className={`w-3 h-16 rounded-full bg-slate-500`}></motion.div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-8 z-10">
                        {isGoodPosture ? (
                            <span className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 font-bold px-6 py-2 rounded-full border border-emerald-500/50 backdrop-blur-md">
                                <CheckCircle size={20} /> Perfect Alignment
                            </span>
                        ) : (
                            <span className="flex items-center gap-2 bg-amber-500/20 text-amber-400 font-bold px-6 py-2 rounded-full border border-amber-500/50 backdrop-blur-md animate-pulse">
                                <AlertTriangle size={20} /> Please stand straighter
                            </span>
                        )}
                    </div>
                </div>

                {/* Symmetry and Pain */}
                <div className="flex flex-col gap-8 h-full">

                    <div className="glass-panel p-8 border border-slate-700/50 flex-1 flex flex-col justify-center">
                        <h3 className="font-bold text-xl text-slate-200 mb-6 flex items-center justify-between">
                            Walking Symmetry <span className="text-emerald-400">{symmetry}%</span>
                        </h3>
                        <p className="text-slate-400 text-sm mb-4">Balancing weight evenly between both legs prevents long term strain.</p>
                        <div className="w-full bg-slate-800 rounded-full h-4 relative overflow-hidden">
                            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-400 z-10 -translate-x-1/2"></div>
                            <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500 h-4 rounded-full transition-all duration-300" style={{ width: `${symmetry}%` }}></div>
                        </div>
                        <div className="flex justify-between w-full text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-2 px-1">
                            <span>Left Heavy</span>
                            <span>Balanced</span>
                            <span>Right Heavy</span>
                        </div>
                    </div>

                    <div className="glass-panel p-8 border border-rose-500/20 bg-rose-500/5 flex flex-col items-center justify-center relative overflow-hidden flex-1 group">
                        <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <ShieldAlert size={40} className="text-rose-400 mb-4 z-10" />
                        <h3 className="font-bold text-lg text-rose-300 mb-2 z-10">Feeling Discomfort?</h3>
                        <p className="text-rose-300/70 text-sm text-center mb-6 z-10">
                            Log pain immediately to notify your physician and stop calibration.
                        </p>
                        <button
                            onClick={reportPain}
                            className="px-8 py-3 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 rounded-xl font-bold text-white transition-all w-full z-10 flex justify-center items-center gap-2"
                        >
                            <AlertCircle /> {painReported ? 'Report Sent!' : 'Report Pain or Issue'}
                        </button>

                        <AnimatePresence>
                            {painReported && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-rose-600 flex items-center justify-center z-20 flex-col"
                                >
                                    <CheckCircle size={48} className="text-white mb-4" />
                                    <h3 className="font-bold text-lg text-white">Issue Logged</h3>
                                    <p className="text-rose-100 text-sm">Your doctor has been notified.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>

                </div>

            </div>

        </main>
    );
}
