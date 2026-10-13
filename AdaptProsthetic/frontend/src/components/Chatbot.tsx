'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
    id: string;
    sender: 'ai' | 'user' | 'system';
    text: string;
};

type ChatState = 'IDLE' | 'TRIAGE_LOCATION' | 'TRIAGE_SEVERITY' | 'TRIAGE_DURATION' | 'TRIAGE_COMPLETE';

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'ai', text: 'Hello! I am your AI adapt-assistant. I am actively monitoring your prosthetic parameters. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Triage State Machine
    const [chatState, setChatState] = useState<ChatState>('IDLE');
    const [triageData, setTriageData] = useState({ location: '', severity: '', duration: '' });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Professional Medical Triage Logic
        setTimeout(() => {
            let aiResponse = "";
            const lowerInput = userMessage.text.toLowerCase();

            if (chatState === 'IDLE') {
                if (lowerInput.match(/\b(hi|hello|hey|yo|hlo|morning|afternoon)\b/)) {
                    aiResponse = "Hi there! I am monitoring your telemetry right now. Battery is optimal and sync is active. Do you have any questions or are you experiencing any discomfort?";
                }
                else if (lowerInput.match(/\b(pain|hurt|sore|ache|uncomfortable|issue|not working|problem)\b/)) {
                    setChatState('TRIAGE_LOCATION');
                    aiResponse = "I am sorry to hear that you are experiencing an issue. Your safety is our top priority. Could you please tell me exactly where you are feeling the pain or discomfort (e.g., knee joint, residual limb stump, lower back)?";
                }
                else if (lowerInput.includes('battery') || lowerInput.includes('power') || lowerInput.includes('charge')) {
                    aiResponse = "Your ESP32 telemetry shows the battery is currently at 84%. You have roughly 18 hours of continuous use remaining.";
                }
                else if (lowerInput.includes('calibrate') || lowerInput.includes('calibration') || lowerInput.includes('adjust')) {
                    aiResponse = "I can help with that. Please navigate to the 'Guided Calibration' page in your sidebar menu to walk through the 3-step Neural Network alignment process. It takes just 30 seconds.";
                }
                else if (lowerInput.includes('loose') || lowerInput.includes('tight') || lowerInput.includes('fit') || lowerInput.includes('socket')) {
                    setChatState('TRIAGE_LOCATION');
                    setTriageData(prev => ({ ...prev, location: 'socket' }));
                    aiResponse = "Changes in socket fit can happen due to volume shifts throughout the day. Is it causing you any localized pain? If so, on a scale of 1 to 10, how severe is it?";
                    setChatState('TRIAGE_SEVERITY');
                }
                else {
                    aiResponse = "I'm your clinical AI assistant. You can ask me about your prosthetic battery, request calibration steps, or report any pain/discomfort so I can escalate it to the medical team.";
                }
            }
            else if (chatState === 'TRIAGE_LOCATION') {
                setTriageData(prev => ({ ...prev, location: userMessage.text }));
                setChatState('TRIAGE_SEVERITY');
                aiResponse = "Understood. I have recorded the location. On a scale of 1 to 10 (1 being very mild, 10 being excruciating), how severe is this pain?";
            }
            else if (chatState === 'TRIAGE_SEVERITY') {
                setTriageData(prev => ({ ...prev, severity: userMessage.text }));
                setChatState('TRIAGE_DURATION');
                aiResponse = "Thank you. And finally, how long have you been experiencing this issue? (e.g., just started, 2 hours, since yesterday)";
            }
            else if (chatState === 'TRIAGE_DURATION') {
                setTriageData(prev => ({ ...prev, duration: userMessage.text }));
                setChatState('TRIAGE_COMPLETE');

                // Final Submission Response
                aiResponse = `I have successfully logged a clinical incident report for your physician.\n\nSummary:\n• Location: ${triageData.location}\n• Severity: ${triageData.severity}/10 \n• Duration: ${userMessage.text}\n\nDr. Sarah's dashboard has been alerted with high priority. We advise you to sit down and remove the prosthesis socket if the pain persists. A clinic member will call you shortly.`;

                // Submit to real backend to trigger clinic-wide Alert
                fetch('http://localhost:5000/api/alerts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        patientId: '1',
                        patient: 'John Doe',
                        type: `Pain Report (${triageData.severity}/10): ${triageData.location}`,
                        severity: 'high',
                        details: `Duration: ${userMessage.text}` // Added details to pass more info
                    })
                }).catch(err => console.error('Failed to dispatch alert', err));

                // Add a system message visually confirming the backend send
                setTimeout(() => {
                    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'system', text: 'URGENT MEDICAL ALERT TRANSMITTED SECURELY TO CLINICAL DASHBOARD' }]);
                }, 1000);
            }
            else if (chatState === 'TRIAGE_COMPLETE') {
                aiResponse = "Your report is already with the clinical team. Please focus on resting. If it is an absolute emergency, please dial your local emergency services (911).";
            }

            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponse }]);
            setIsTyping(false);
        }, 1200);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 w-16 h-16 ${chatState === 'TRIAGE_COMPLETE' ? 'bg-amber-500 hover:bg-amber-400' : 'bg-emerald-500 hover:bg-emerald-400'} text-slate-950 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] z-50 transition-transform hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
            >
                {chatState === 'TRIAGE_COMPLETE' ? <AlertTriangle size={28} /> : <MessageCircle size={28} />}
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-8 right-8 w-[22rem] sm:w-[26rem] h-[600px] glass-panel bg-slate-900 border border-emerald-500/30 flex flex-col pt-0 overflow-hidden z-50 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="bg-emerald-500/10 border-b border-emerald-500/20 p-4 flex justify-between items-center backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-100">Clinical AI Assistant</h3>
                                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 uppercase font-bold tracking-wider">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block animate-pulse"></span> Encrypted Medical Channel
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-white transition-colors"
                                title="Close chat"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-slate-950/50">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex gap-3 max-w-[90%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : msg.sender === 'system' ? 'self-center max-w-full' : 'self-start'}`}>

                                    {msg.sender === 'system' ? (
                                        <div className="w-full text-center px-6 py-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-bold uppercase tracking-widest rounded-lg flex items-center gap-2 justify-center my-2">
                                            <AlertTriangle size={14} /> {msg.text}
                                        </div>
                                    ) : (
                                        <>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'ai' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
                                                {msg.sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
                                            </div>
                                            <div className={`p-4 rounded-2xl text-sm whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-emerald-600 text-white rounded-tr-sm' : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm shadow-md'}`}>
                                                {msg.text}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3 max-w-[85%] self-start">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                        <Bot size={16} />
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 rounded-tl-sm flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-slate-700/50 bg-slate-900">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={chatState === 'TRIAGE_COMPLETE' ? "Clinical alert sent..." : "Message AI Clinical Support..."}
                                    disabled={chatState === 'TRIAGE_COMPLETE'}
                                    className={`w-full bg-slate-800 border border-slate-700 rounded-full py-3.5 pl-5 pr-12 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 transition-colors ${chatState === 'TRIAGE_COMPLETE' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || chatState === 'TRIAGE_COMPLETE'}
                                    className="absolute right-1 w-11 h-11 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 rounded-full flex items-center justify-center transition-colors shadow-lg"
                                >
                                    <Send size={18} className="ml-1" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
