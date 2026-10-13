'use client';

import { Sidebar } from '@/components/Sidebar';
import { Chatbot } from '@/components/Chatbot';

export default function PatientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-slate-950 min-h-screen font-sans">
            <Sidebar role="patient" />
            {/* Content wrapper */}
            <div className="ml-64 flex-1 relative">
                {children}
                <Chatbot />
            </div>
        </div>
    );
}
