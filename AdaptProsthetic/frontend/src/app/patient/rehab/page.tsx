'use client';
import { Activity, PlayCircle, Trophy, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PatientRehabPage() {
    const [exercises, setExercises] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hardcode fetching for mock patient ID '1' since there is no auth context yet
        fetch('http://localhost:5000/api/exercises/1')
            .then(r => r.json())
            .then(data => {
                setExercises(data);
                setLoading(false);
            });
    }, []);

    return (
        <main className="p-12 w-full min-h-screen text-slate-100 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                <header className="mb-10 text-center">
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 mb-4">
                        Today's Rehab Plan
                    </h2>
                    <p className="text-slate-400 text-lg">Follow the doctor-prescribed routine to improve your gait.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="glass-panel p-6 border border-emerald-500/20 bg-emerald-500/5 text-center flex flex-col items-center">
                        <Trophy className="text-amber-400 mb-4" size={32} />
                        <h3 className="text-3xl font-bold text-slate-100 mb-2">350</h3>
                        <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Points Earned</span>
                    </div>
                    <div className="glass-panel p-6 border border-emerald-500/20 bg-emerald-500/5 text-center flex flex-col items-center">
                        <Activity className="text-emerald-400 mb-4" size={32} />
                        <h3 className="text-3xl font-bold text-slate-100 mb-2">33%</h3>
                        <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Daily Goal</span>
                    </div>
                    <div className="glass-panel p-6 border border-emerald-500/20 bg-emerald-500/5 text-center flex flex-col items-center">
                        <Calendar className="text-blue-400 mb-4" size={32} />
                        <h3 className="text-3xl font-bold text-slate-100 mb-2">12</h3>
                        <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Day Streak🔥</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-200 mb-6">Prescribed Exercises</h3>

                    {loading && <p className="text-slate-500">Loading Prescriptions...</p>}

                    {!loading && exercises.map((ex) => (
                        <div key={ex.id} className={`glass-panel p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border transition-all ${ex.completed ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-slate-700/50'}`}>
                            <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${ex.completed ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                                    <PlayCircle fill="currentColor" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-100">{ex.title}</h4>
                                    <p className="text-slate-400 text-sm">{ex.duration} • Doctor Prescribed</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-lg text-sm">+{ex.points} pts</span>
                                <button
                                    className={`flex-1 sm:flex-none px-6 py-2 rounded-xl font-bold transition-all ${ex.completed ? 'bg-slate-800 text-slate-500 cursor-default border border-slate-700' : 'bg- emerald-500 hover:bg-emerald-400 text-slate-950 border-none'}`}
                                    disabled={ex.completed}
                                >
                                    {ex.completed ? 'Completed' : 'Start Video'}
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </main>
    );
}
