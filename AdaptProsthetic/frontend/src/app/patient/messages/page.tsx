'use client';
import { Send, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function PatientMessagesPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 1 is our mock thread ID for the prototype linking Dr to Patient John Doe
        fetch('http://localhost:5000/api/messages/1')
            .then(r => r.json())
            .then(data => {
                setMessages(data);
                setLoading(false);
            });

        const socket = io('http://localhost:5000');
        socket.on('new_message', (msg) => {
            if (msg.threadId === '1') {
                setMessages(prev => [...prev, msg]);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        // Dispatch to real endpoint
        fetch('http://localhost:5000/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                threadId: '1',
                sender: 'patient', // We are in the patient portal
                text: input
            })
        });

        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <main className="p-0 w-full min-h-screen text-slate-100 flex flex-col h-screen overflow-hidden">

            {/* Header */}
            <div className="p-6 border-b border-emerald-500/20 bg-slate-900/80 backdrop-blur-sm z-10 flex shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                        <User size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-100">Dr. Sarah Connor</h3>
                        <p className="text-sm text-emerald-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block animate-pulse"></span>Online - Clinic</p>
                    </div>
                </div>
            </div>

            {/* Main chat view */}
            <div className="flex-1 flex flex-col bg-slate-950/50 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="flex-1 p-6 overflow-y-auto space-y-4 z-10 w-full max-w-4xl mx-auto flex flex-col">
                    {loading && <div className="text-center text-slate-500 mt-10 p-6 glass-panel">Decrypting medical channel...</div>}

                    {!loading && messages.map((msg, i) => (
                        <div key={msg.id || i} className={`${msg.sender === 'patient' ? 'bg-emerald-600 self-end text-white shadow-[0_5px_20px_rgba(16,185,129,0.2)] rounded-3xl rounded-tr-md' : 'bg-slate-800/80 self-start text-slate-200 border border-slate-700/50 rounded-3xl rounded-tl-md shadow-lg'} p-4 px-5 text-[15px] max-w-md`}>
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-6 border-t border-emerald-500/20 bg-slate-950/80 backdrop-blur-md z-10 w-full shrink-0">
                    <div className="max-w-4xl mx-auto relative flex items-center gap-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Message Dr. Sarah..."
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-full py-4 px-6 text-[15px] focus:outline-none focus:border-emerald-500/50 transition-colors shadow-inner"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-600 border border-emerald-500/50 disabled:border-slate-700 text-slate-950 rounded-full w-14 h-14 flex items-center justify-center transition-all shadow-lg"
                        >
                            <Send size={22} className="mr-0.5 ml-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
