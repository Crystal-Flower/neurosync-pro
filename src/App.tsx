import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { EEGAnalysis } from './components/EEGAnalysis';
import { GasSensing } from './components/GasSensing';
import { Rehabilitation } from './components/Rehabilitation';
import { ArchitectureDocs } from './components/ArchitectureDocs';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-100 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-neutral-950">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'eeg' && <EEGAnalysis />}
          {activeTab === 'gas' && <GasSensing />}
          {activeTab === 'rehab' && <Rehabilitation />}
          {activeTab === 'docs' && <ArchitectureDocs />}
        </main>
      </div>
    </div>
  );
}
