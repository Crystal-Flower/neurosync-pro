import React from 'react';
import { Bell, Search, Menu, Battery, Wifi } from 'lucide-react';

export function Topbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="h-16 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden p-2 text-neutral-400 hover:text-neutral-200">
          <Menu size={20} />
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
          <input
            type="text"
            placeholder="Search patient records..."
            className="pl-9 pr-4 py-1.5 bg-neutral-800 border border-neutral-700 rounded-full text-sm text-neutral-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 w-64 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-1.5" title="Device Battery">
            <Battery size={14} className="text-emerald-400" />
            <span>84%</span>
          </div>
          <div className="flex items-center gap-1.5" title="BLE Connection">
            <Wifi size={14} className="text-emerald-400" />
            <span>Connected</span>
          </div>
        </div>
        
        <div className="h-4 w-px bg-neutral-800"></div>
        
        <button className="relative p-2 text-neutral-400 hover:text-neutral-200 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-neutral-900"></span>
        </button>
      </div>
    </header>
  );
}
