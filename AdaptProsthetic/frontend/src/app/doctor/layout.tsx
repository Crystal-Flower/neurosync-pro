'use client';

import { Sidebar } from '@/components/Sidebar';

export default function DoctorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-slate-950 min-h-screen font-sans">
            <Sidebar role="doctor" />
            {/* Content wrapper */}
            <div className="ml-64 flex-1">
                {children}
            </div>
        </div>
    );
}
