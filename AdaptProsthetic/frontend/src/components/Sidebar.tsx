'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Settings, BarChart2, Mic, Users, HeartPulse, ShieldAlert, MessageSquare, Award, BatteryCharging, LogOut } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const doctorNav = [
    { name: 'Patient Roster', href: '/doctor', icon: Users },
    { name: 'Live Monitoring', href: '/doctor/monitoring/1', icon: Activity },
    { name: 'Analytics & Reports', href: '/doctor/analytics', icon: BarChart2 },
    { name: 'Alerts & Safety', href: '/doctor/alerts', icon: ShieldAlert },
    { name: 'Messages', href: '/doctor/messages', icon: MessageSquare },
];

const patientNav = [
    { name: 'Home Summary', href: '/patient', icon: HeartPulse },
    { name: 'Live Movement', href: '/patient/movement', icon: Activity },
    { name: 'Guided Calibration', href: '/patient/calibration', icon: Mic },
    { name: 'Rehab Guidance', href: '/patient/rehab', icon: Award },
    { name: 'Messages', href: '/patient/messages', icon: MessageSquare },
    { name: 'Settings', href: '/patient/settings', icon: Settings },
];

export function Sidebar({ role }: { role: 'doctor' | 'patient' }) {
    const pathname = usePathname();
    const navItems = role === 'doctor' ? doctorNav : patientNav;

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 glass-panel border-y-0 border-l-0 border-r border-slate-700/50 rounded-none flex flex-col z-20 bg-slate-900/80">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
                    AdaptProsthetic
                </h1>
                <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                    {role === 'doctor' ? 'Clinical Portal' : 'Patient Portal'}
                </p>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => {
                    // match exact or partial routes
                    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/doctor' && item.href !== '/patient');
                    // special fix for exact root matches
                    const isExactRootMatch = (pathname === '/doctor' && item.href === '/doctor') || (pathname === '/patient' && item.href === '/patient');
                    const active = isActive || isExactRootMatch;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                active
                                    ? role === 'doctor'
                                        ? "bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] border border-blue-500/30"
                                        : "bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] border border-emerald-500/30"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
                            )}
                        >
                            <Icon size={20} className={active ? "animate-pulse" : "group-hover:scale-110 transition-transform"} />
                            <span className="font-medium text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/30"
                >
                    <LogOut size={20} />
                    <span className="font-medium text-sm">Sign Out</span>
                </Link>
            </div>

            {role === 'patient' && (
                <div className="px-6 pb-6 pt-2">
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 mt-2">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <BatteryCharging size={16} className="text-emerald-400" />
                                <span className="text-xs font-semibold text-slate-300">Battery</span>
                            </div>
                            <span className="text-xs text-emerald-400 font-bold">84%</span>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-1.5 border border-slate-700">
                            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '84%' }}></div>
                        </div>
                    </div>
                </div>
            )}

            {role === 'doctor' && (
                <div className="px-6 pb-6 pt-2">
                    <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-500/20 mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-ring" />
                            <span className="text-xs font-semibold text-blue-300">Active Sync</span>
                        </div>
                        <span className="text-[10px] text-blue-400">0ms latency</span>
                    </div>
                </div>
            )}
        </aside>
    );
}
