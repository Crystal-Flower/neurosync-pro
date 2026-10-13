import { Navigation } from '@/components/Navigation';

export default function ProfilePage() {
    return (
        <div className="flex bg-zinc-950 min-h-screen font-sans">
            <Navigation />
            <main className="ml-64 flex-1 p-12 overflow-y-auto">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
                    Patient Profile
                </h2>
                <p className="text-slate-400">View and update user demographic and physical parameters for the ML model.</p>
                <div className="mt-8 glass-panel p-8 h-96 flex flex-col items-center justify-center border border-slate-700/50 bg-slate-900/40">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                        <div className="w-3 h-3 rounded-full bg-blue-500/50 animate-pulse"></div>
                    </div>
                    <span className="text-slate-400 font-medium tracking-wide uppercase text-sm">Module Under Construction</span>
                </div>
            </main>
        </div>
    );
}
