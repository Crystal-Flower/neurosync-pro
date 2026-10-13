import { Settings, Volume2, Globe, Bell, FileText, ChevronRight } from 'lucide-react';

export default function PatientSettingsPage() {
    return (
        <main className="p-12 w-full min-h-screen text-slate-100 flex flex-col items-center">
            <div className="w-full max-w-3xl">
                <header className="mb-10">
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">
                        Settings & Preferences
                    </h2>
                    <p className="text-slate-400 text-lg">Configure your AdaptProsthetic profile and app notifications.</p>
                </header>

                <div className="space-y-6">
                    <Section title="General">
                        <SettingsItem icon={Globe} title="Language" value="English (US)" />
                        <SettingsItem icon={Volume2} title="Voice Assistant Volume" value="80%" />
                    </Section>

                    <Section title="Notifications">
                        <SettingsItem icon={Bell} title="Calibration Reminders" value="On" />
                        <SettingsItem icon={Bell} title="Pain Logging Notifications" value="On" />
                        <SettingsItem icon={Bell} title="Doctor Messages" value="On" />
                    </Section>

                    <Section title="Support & Legal">
                        <SettingsItem icon={FileText} title="Troubleshooting Guide" value="" isLink={true} />
                        <SettingsItem icon={FileText} title="Privacy Policy" value="" isLink={true} />
                        <SettingsItem icon={FileText} title="Terms of Service" value="" isLink={true} />
                    </Section>
                </div>
            </div>
        </main>
    );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="mb-8">
            <h3 className="text-lg font-bold text-emerald-400 mb-4 px-2 uppercase tracking-wide text-sm">{title}</h3>
            <div className="glass-panel border-slate-700/50 bg-slate-900/50 rounded-2xl overflow-hidden divide-y divide-slate-800 border-x border-y border-transparent">
                {children}
            </div>
        </div>
    );
}

function SettingsItem({ icon: Icon, title, value, isLink = false }: { icon: any, title: string, value: string, isLink?: boolean }) {
    return (
        <div className="flex items-center justify-between p-5 hover:bg-slate-800/30 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
                <Icon className="text-slate-400 group-hover:text-emerald-400 transition-colors" size={24} />
                <span className="font-medium text-slate-200">{title}</span>
            </div>
            <div className="flex items-center gap-4">
                {value && <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">{value}</span>}
                <ChevronRight className="text-slate-600 group-hover:text-emerald-400 transition-colors" size={20} />
            </div>
        </div>
    );
}
