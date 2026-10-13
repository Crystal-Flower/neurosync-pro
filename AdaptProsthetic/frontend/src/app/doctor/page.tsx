'use client';
import Link from 'next/link';
import { Users, AlertTriangle, ArrowRight, Activity, Battery, Search } from 'lucide-react';
import { motion } from 'framer-motion';

import { useState, useEffect } from 'react';

export default function DoctorDashboard() {
    const [patients, setPatients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/patients')
            .then(res => res.json())
            .then(data => {
                setPatients(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load roster", err);
                setLoading(false);
            });
    }, []);
    return (
        <main className="p-10 w-full min-h-screen text-slate-100">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center gap-3">
                        Patient Roster
                    </h2>
                    <p className="text-slate-400 mt-2">Manage registered prosthetic patients, review critical alerts, and initiate telemetry.</p>
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search patients..."
                            className="bg-slate-900 border border-slate-700/50 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500/50 text-sm w-64"
                        />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="glass-panel p-6 border border-slate-700/50 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-slate-400 font-medium">Total Registered</h3>
                        <Users className="text-blue-400" size={20} />
                    </div>
                    <p className="text-4xl font-bold">142</p>
                </div>
                <div className="glass-panel p-6 border border-slate-700/50 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <h3 className="text-slate-400 font-medium">Active Telemetry Syncs</h3>
                        <Activity className="text-blue-400 animate-pulse" size={20} />
                    </div>
                    <p className="text-4xl font-bold text-blue-400 relative z-10">18</p>
                </div>
                <div className="glass-panel p-6 border border-rose-500/20 bg-rose-500/5 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <h3 className="text-rose-400 font-medium">Action Required</h3>
                        <AlertTriangle className="text-rose-400" size={20} />
                    </div>
                    <p className="text-4xl font-bold text-rose-400 relative z-10">2</p>
                </div>
            </div>

            <div className="glass-panel border-slate-700/50 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-900/50">
                    <h3 className="font-semibold text-slate-200">Recent Patients</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-slate-500 text-sm border-b border-slate-800">
                                <th className="px-6 py-4 font-medium">Patient Name</th>
                                <th className="px-6 py-4 font-medium">Condition & Type</th>
                                <th className="px-6 py-4 font-medium">Device Status</th>
                                <th className="px-6 py-4 font-medium">Battery</th>
                                <th className="px-6 py-4 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading Medical Roster Network...</td></tr>
                            ) : patients.map((patient) => (
                                <tr key={patient.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-200">{patient.name}</div>
                                        <div className="text-xs text-slate-500">Age: {patient.age}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-300">
                                        {patient.type}
                                    </td>
                                    <td className="px-6 py-4">
                                        {patient.condition === 'attention' ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                                <AlertTriangle size={12} /> {patient.status}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-ring" />
                                                {patient.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Battery size={14} className={patient.battery < 20 ? 'text-rose-400' : 'text-slate-400'} />
                                            <span className={`text-sm ${patient.battery < 20 ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>{patient.battery}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/doctor/monitoring/${patient.id}`}
                                            className="inline-flex items-center justify-center p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all group-hover:scale-105"
                                        >
                                            <ArrowRight size={18} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
