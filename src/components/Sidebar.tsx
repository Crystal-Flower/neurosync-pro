import React from 'react';
import { Activity, Brain, Wind, Gamepad2, FileText, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { id: 'dashboard', label: 'Monitoring', icon: Activity },
  { id: 'eeg', label: 'EEG Analysis', icon: Brain },
  { id: 'gas', label: 'Gas Sensing', icon: Wind },
  { id: 'rehab', label: 'Rehabilitation', icon: Gamepad2 },
  { id: 'docs', label: 'Architecture & Docs', icon: FileText },
];

export function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: any) {
  return (
    <aside className={cn("bg-neutral-900 border-r border-neutral-800 transition-all duration-300 flex flex-col", isOpen ? "w-64" : "w-16")}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-800">
        {isOpen && <span className="font-bold text-lg text-emerald-400 tracking-tight">NeuroSync Pro</span>}
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-neutral-800 rounded-md text-neutral-400">
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
              activeTab === item.id ? "bg-emerald-500/10 text-emerald-400" : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200",
              !isOpen && "justify-center px-0"
            )}
            title={!isOpen ? item.label : undefined}
          >
            <item.icon size={20} className={cn(activeTab === item.id ? "text-emerald-400" : "text-neutral-500")} />
            {isOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-neutral-800">
        <div className={cn("flex items-center gap-3", !isOpen && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-emerald-400">
            <User size={16} />
          </div>
          {isOpen && (
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-neutral-200">Dr. Sarah Chen</span>
              <span className="text-xs text-neutral-500">Neurologist</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
