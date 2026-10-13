'use client';
import { useState, useEffect } from 'react';
import { AlertTriangle, Clock, BatteryWarning, Wrench, RefreshCcw, CheckCircle } from 'lucide-react';
import { io } from 'socket.io-client';

export default function DoctorAlertsPage() {
    const [alerts, setAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initial fetch from DB
        fetch('http://localhost:5000/api/alerts')
            .then(r => r.json())
            .then(data => {
                setAlerts(data);
                setLoading(false);
            });

        // Real-time socket updates for incoming triage/alerts
        const socket = io('http://localhost:5000');
        socket.on('new_alert', (newAlert) => {
            setAlerts(prev => [newAlert, ...prev]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const getIcon = (type: string) => {
        if (type.toLowerCase().includes('battery')) return BatteryWarning;
        if (type.toLowerCase().includes('pain') || type.toLowerCase().includes('critical')) return AlertTriangle;
        if (type.toLowerCase().includes('sync')) return RefreshCcw;
        return Wrench;
    };

    const formatTime = (timeStr: string) => {
        if (!timeStr) return 'Unknown';
        const d = new Date(timeStr);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <main className="p-12 w-full min-h-screen text-slate-100">
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 mb-2">
                        Safety Alerts & Triage Dashboard
                    </h2>
                    <p className="text-slate-400 text-lg">AI-detected warnings requiring clinical review or device configuration.</p>
                </div>
                {!loading && <span className="text-sm bg-slate-800 px-4 py-2 rounded-full text-slate-400 font-bold border border-slate-700 font-mono">LIVE SYNC ACTIVE</span>}
            </header>

            {loading ? (
                <div className="flex w-full h-32 items-center justify-center text-slate-400">Loading Network Telemetry...</div>
            ) : (
                <div className="space-y-4">
                    {alerts.map((alert, idx) => {
                        const Icon = getIcon(alert.type);
                        const bg = alert.severity === 'high' ? 'bg-rose-500/10 border-rose-500/40 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.1)]' :
                            alert.severity === 'medium' ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' :
                                'bg-blue-500/10 border-blue-500/40 text-blue-400';

                        return (
                            <div key={alert.id || idx} className={`glass-panel p-6 border flex items-center justify-between transition-transform hover:scale-[1.01] ${bg}`}>
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-full bg-slate-900/50 flex flex-col items-center justify-center border border-slate-800">
                                        <Icon size={28} className="drop-shadow-lg" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-3">
                                            {alert.patient}
                                            {alert.severity === 'high' && <span className="text-[10px] uppercase font-bold text-white bg-rose-500 px-2 py-0.5 rounded-full animate-pulse">Critical</span>}
                                        </h3>
                                        <div className="flex flex-col mt-1">
                                            <span className="font-semibold text-slate-300">{alert.type}</span>
                                            {alert.details && (
                                                <span className="text-sm mt-1 text-slate-400 font-medium bg-slate-900/40 p-2 rounded-md border border-slate-700/50 block">
                                                    {alert.details}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="flex items-center gap-1.5 text-slate-400 text-sm mb-2 font-medium">
                                        <Clock size={14} /> {formatTime(alert.time)}
                                    </span>
                                    <button className={`px-4 py-1.5 rounded-lg border text-sm font-bold transition-colors ${alert.severity === 'high' ? 'bg-rose-500/20 hover:bg-rose-500 hover:text-white border-rose-500/50' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-600'}`}>
                                        Review Case
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {alerts.length === 0 && (
                        <div className="p-10 border border-slate-800 rounded-2xl text-center text-slate-500 flex flex-col items-center">
                            <CheckCircle size={40} className="mb-4 text-emerald-500/50" />
                            No active clinical safety alerts at the moment.
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}
