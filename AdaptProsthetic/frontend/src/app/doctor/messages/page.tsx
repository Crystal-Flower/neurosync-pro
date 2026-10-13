'use client';
import { Send, User, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function DoctorMessagesPage() {
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
                sender: 'doctor', // We are in the doctor portal
                text: input
            })
        });

        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <main className="p-0 w-full min-h-screen text-slate-100 flex h-screen">

            {/* Sidebar thread list */}
            <div className="w-80 border-r border-slate-700/50 bg-slate-900/50 flex flex-col h-full">
                <div className="p-6 border-b border-slate-700/50 bg-slate-950/50">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 mb-4">Direct Messaging</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input type="text" placeholder="Search patients" className="w-full bg-slate-800/80 rounded-lg pl-9 pr-3 py-2 text-sm outline-none border border-slate-700 focus:border-blue-500/50 transition-colors" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {['John Doe', 'Sarah Connor', 'Robert Vance', 'Mia Wong'].map((name, i) => (
                        <div key={name} className={`px-6 py-4 border-b border-slate-800/50 cursor-pointer transition-colors ${i === 0 ? 'bg-blue-500/10 border-l-2 border-l-blue-400' : 'hover:bg-slate-800/30'}`}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400">
                                    {name[0]}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-slate-200 text-sm">{name}</span>
                                        <span className="text-[10px] text-slate-500">{i === 0 ? 'Now' : '1h'}</span>
                                    </div>
                                    <p className="text-xs text-slate-400 truncate w-40">{i === 0 ? 'Active Thread' : 'Offline'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main chat view */}
            <div className="flex-1 flex flex-col h-full bg-slate-950/50 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="p-6 border-b border-slate-700/50 flex justify-between items-center bg-slate-900/30 z-10 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                            <User size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-100">John Doe</h3>
                            <p className="text-sm text-emerald-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block animate-pulse"></span>Online</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-4 z-10 w-full max-w-4xl mx-auto flex flex-col">
                    {loading && <div className="text-center text-slate-500">Decrypting medical channel...</div>}

                    {!loading && messages.map((msg, i) => (
                        <div key={msg.id || i} className={`${msg.sender === 'doctor' ? 'bg-blue-600 self-end text-white shadow-[0_5px_20px_rgba(37,99,235,0.2)] rounded-2xl rounded-tr-sm' : 'bg-slate-800/50 self-start text-slate-300 border border-slate-700/50 rounded-2xl rounded-tl-sm'} p-4 text-sm max-w-md`}>
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-6 border-t border-slate-700/50 bg-slate-900/50 z-10 w-full">
                    <div className="max-w-4xl mx-auto relative flex items-center gap-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message or Clinical Note..."
                            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600 disabled:bg-slate-700 text-white rounded-xl p-3 h-full flex items-center justify-center transition-colors"
                        >
                            <Send size={20} className="mr-0.5 ml-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
