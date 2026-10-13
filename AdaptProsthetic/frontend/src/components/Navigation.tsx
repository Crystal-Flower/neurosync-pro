'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Settings, BarChart2, User, Mic } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { name: 'Dashboard', href: '/', icon: Activity },
    { name: 'Calibration', href: '/calibration', icon: Mic },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export function Navigation() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 glass-panel border-y-0 border-l-0 border-r rounded-none flex flex-col z-20">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
                    AdaptProsthetic
                </h1>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">AI Medical System</p>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-8">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                isActive
                                    ? "bg-slate-800/80 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.1)] border border-slate-700/50"
                                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/30"
                            )}
                        >
                            <Icon size={20} className={isActive ? "animate-pulse" : ""} />
                            <span className="font-medium text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6">
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-ring" />
                        <span className="text-xs font-semibold text-slate-300">ESP32 Connected</span>
                    </div>
                    <p className="text-[10px] text-slate-500">Latency: ~ 120ms</p>
                </div>
            </div>
        </aside>
    );
}
