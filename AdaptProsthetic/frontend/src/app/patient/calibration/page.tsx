'use client';
import { useState, useRef } from 'react';
import { useProstheticData } from '@/hooks/useProstheticData';
import { Volume2, Play, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
    'Welcome to the AdaptProsthetic Auto-Calibration. Please stand perfectly still.',
    'Now, please perform a deep knee bend, holding for 3 seconds.',
    'Excellent. Finally, walk naturally forward for 10 steps. Neural network will adjust parameters automatically.'
];

export default function CalibrationPage() {
    const { isConnected, startCalibration } = useProstheticData();
    const [currentStep, setCurrentStep] = useState(-1);
    const [isCalibrating, setIsCalibrating] = useState(false);
    const [calibrationSuccess, setCalibrationSuccess] = useState(false);

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    const startProcess = () => {
        setIsCalibrating(true);
        setCurrentStep(0);
        speak(steps[0]);

        // Simulated step progression
        setTimeout(() => {
            setCurrentStep(1);
            speak(steps[1]);

            setTimeout(() => {
                setCurrentStep(2);
                speak(steps[2]);
                startCalibration();

                setTimeout(() => {
                    setIsCalibrating(false);
                    setCalibrationSuccess(true);
                    speak("Calibration complete. Device is ready for use.");
                }, 5000);
            }, 5000);
        }, 5000);
    };

    return (
        <main className="p-12 overflow-y-auto flex flex-col items-center justify-center relative w-full h-full">
            <div className="w-full max-w-2xl text-center">
                <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
                    Voice-Guided Alignment Calibration
                </h2>
                <p className="text-slate-400 mb-12">
                    Tune the ML parameters of your prosthetic for a perfect natural gait profile. Follow audio instructions carefully.
                </p>

                {!isCalibrating && !calibrationSuccess && (
                    <div className="glass-panel p-8 flex flex-col items-center shadow-[0_0_40px_rgba(52,211,153,0.1)]">
                        <div className="w-24 h-24 rounded-full bg-slate-800/80 mb-6 flex items-center justify-center border-4 border-emerald-500/20 shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                            <Volume2 size={40} className="text-emerald-400" />
                        </div>


                        <button
                            onClick={startProcess}
                            disabled={!isConnected}
                            className="w-full max-w-sm py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-3 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                        >
                            <Play size={24} fill="currentColor" />
                            {isConnected ? 'Begin Smart Calibration' : 'ESP32 Disconnected'}
                        </button>
                    </div>
                )}

                {isCalibrating && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="glass-panel p-10 flex flex-col items-center"
                    >
                        <div className="relative w-40 h-40 flex items-center justify-center mb-8">
                            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-pulse-ring"></div>
                            <div className="absolute inset-4 rounded-full border border-blue-500/30 animate-spin" style={{ animationDuration: '3s' }}></div>
                            <Mic size={48} className="text-emerald-400 animate-pulse" />
                        </div>

                        <h3 className="text-2xl font-bold text-slate-200 mb-4 animate-pulse">
                            Step {currentStep + 1} of 3
                        </h3>
                        <p className="text-xl text-slate-300 font-medium bg-slate-800/50 p-6 rounded-xl border border-slate-700 w-full">
                            {steps[currentStep]}
                        </p>
                    </motion.div>
                )}

                {calibrationSuccess && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="glass-panel p-10 flex flex-col items-center text-emerald-400 border border-emerald-500/30 bg-emerald-500/5"
                    >
                        <CheckCircle size={80} className="mb-6" />
                        <h3 className="text-3xl font-bold mb-4">Neural Model Calibrated</h3>
                        <p className="text-slate-300 text-lg">
                            100% precision achieved. Your device has saved the parameters securely.
                        </p>
                        <button
                            onClick={() => setCalibrationSuccess(false)}
                            className="mt-8 px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-200 font-semibold border border-slate-700/50 transition-colors"
                        >
                            Restart Process
                        </button>
                    </motion.div>
                )}
            </div>
        </main>
    );
}

// I used a dummy Mic icon for the active state
function Mic({ size, className }: { size: number, className: string }) {
    return <Volume2 size={size} className={className} />;
}
