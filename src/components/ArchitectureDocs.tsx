import React from 'react';
import { Database, Server, Smartphone, Cpu, Cloud, Lock } from 'lucide-react';

export function ArchitectureDocs() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-100 tracking-tight">System Architecture & Documentation</h1>
        <p className="text-sm text-neutral-400 mt-1">Technical specifications for the Biomedical Wearable System</p>
      </div>

      {/* Architecture Diagram */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <h2 className="text-lg font-medium text-neutral-200 mb-6 flex items-center gap-2">
          <Server size={20} className="text-emerald-400" />
          System Architecture
        </h2>
        <div className="font-mono text-xs sm:text-sm text-neutral-400 bg-neutral-950 p-6 rounded-lg border border-neutral-800 overflow-x-auto whitespace-pre">
{`[ Wearable Device ] (Edge AI / TinyML)
       │
       │  BLE (Bluetooth Low Energy)
       ▼
[ Mobile App / Gateway ] (Flutter/React Native)
       │  - Local buffering
       │  - Real-time visualization
       │
       │  HTTPS / WSS (Secure)
       ▼
[ Cloud Backend ] (FastAPI / Python)
       │  - Auth (JWT)
       │  - Signal Processing Pipeline (SciPy)
       │  - AI Inference (PyTorch/TensorFlow)
       │
       ├─► [ Database ] (PostgreSQL for metadata, Time-series DB for signals)
       └─► [ Web Dashboard ] (React.js - You are here)`}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Database Schema */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-lg font-medium text-neutral-200 mb-4 flex items-center gap-2">
            <Database size={20} className="text-blue-400" />
            Database Schema (Core)
          </h2>
          <div className="space-y-4 font-mono text-xs">
            <div className="bg-neutral-950 p-4 rounded border border-neutral-800">
              <span className="text-emerald-400 font-bold">Table: Patients</span>
              <br/>id UUID PK
              <br/>name VARCHAR
              <br/>dob DATE
              <br/>device_id VARCHAR FK
            </div>
            <div className="bg-neutral-950 p-4 rounded border border-neutral-800">
              <span className="text-blue-400 font-bold">Table: BioSignals (Time-Series)</span>
              <br/>time TIMESTAMP
              <br/>patient_id UUID FK
              <br/>signal_type ENUM(EEG, ECG, SpO2)
              <br/>value FLOAT[]
              <br/>fs INTEGER (Sample Rate)
            </div>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-lg font-medium text-neutral-200 mb-4 flex items-center gap-2">
            <Cloud size={20} className="text-indigo-400" />
            REST API Endpoints
          </h2>
          <div className="space-y-2 font-mono text-xs">
            <Endpoint method="POST" path="/api/v1/auth/login" desc="Doctor/Patient login" />
            <Endpoint method="GET" path="/api/v1/patients/{id}/stream" desc="WebSocket for live data" />
            <Endpoint method="POST" path="/api/v1/signals/upload" desc="Batch upload offline data" />
            <Endpoint method="GET" path="/api/v1/analysis/eeg/bands" desc="Get FFT band power" />
            <Endpoint method="POST" path="/api/v1/ml/predict-stress" desc="Run stress inference" />
          </div>
        </section>
      </div>

      {/* Code Samples */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <h2 className="text-lg font-medium text-neutral-200 mb-4 flex items-center gap-2">
          <Cpu size={20} className="text-amber-400" />
          Signal Processing Algorithms (Python)
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-neutral-300 mb-2">ECG R-Peak Detection (Pan-Tompkins simplified)</h3>
            <pre className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 text-xs font-mono text-neutral-300 overflow-x-auto">
{`import scipy.signal as signal
import numpy as np

def detect_r_peaks(ecg_signal, fs=250):
    # 1. Bandpass filter (5-15 Hz)
    nyq = 0.5 * fs
    low = 5.0 / nyq
    high = 15.0 / nyq
    b, a = signal.butter(1, [low, high], btype='band')
    filtered = signal.filtfilt(b, a, ecg_signal)
    
    # 2. Derivative
    diff = np.diff(filtered)
    
    # 3. Squaring
    squared = diff ** 2
    
    # 4. Moving window integration
    window_size = int(0.150 * fs) # 150ms
    integrated = np.convolve(squared, np.ones(window_size)/window_size, mode='same')
    
    # 5. Peak detection
    peaks, _ = signal.find_peaks(integrated, distance=fs*0.6) # Min 600ms between peaks
    return peaks`}
            </pre>
          </div>

          <div>
            <h3 className="text-sm font-medium text-neutral-300 mb-2">Gas Sensor Threshold Detection</h3>
            <pre className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 text-xs font-mono text-neutral-300 overflow-x-auto">
{`def check_gas_thresholds(gas_data):
    THRESHOLDS = {
        'co2': 1000, # ppm
        'voc': 500,  # ppb
        'no2': 0.1   # ppm
    }
    
    alerts = []
    for gas, value in gas_data.items():
        if gas in THRESHOLDS and value > THRESHOLDS[gas]:
            alerts.append({
                'type': 'CRITICAL_EXPOSURE',
                'gas': gas,
                'value': value,
                'threshold': THRESHOLDS[gas]
            })
            
    return alerts`}
            </pre>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <h2 className="text-lg font-medium text-neutral-200 mb-4 flex items-center gap-2">
          <Lock size={20} className="text-rose-400" />
          Security & HIPAA Compliance
        </h2>
        <ul className="list-disc list-inside text-sm text-neutral-400 space-y-2">
          <li>All data in transit encrypted via TLS 1.3.</li>
          <li>Data at rest encrypted using AES-256 (Database level).</li>
          <li>PHI (Protected Health Information) decoupled from telemetry data using UUIDs.</li>
          <li>BLE pairing requires secure out-of-band (OOB) authentication.</li>
          <li>Role-Based Access Control (RBAC) implemented via JWT claims.</li>
        </ul>
      </section>
    </div>
  );
}

function Endpoint({ method, path, desc }: any) {
  const methodColors: Record<string, string> = {
    GET: 'text-blue-400 bg-blue-400/10',
    POST: 'text-emerald-400 bg-emerald-400/10',
    PUT: 'text-amber-400 bg-amber-400/10',
    DELETE: 'text-rose-400 bg-rose-400/10',
  };

  return (
    <div className="flex items-center gap-3 p-2 rounded hover:bg-neutral-800 transition-colors">
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold w-12 text-center ${methodColors[method]}`}>
        {method}
      </span>
      <span className="text-neutral-300">{path}</span>
      <span className="text-neutral-500 ml-auto hidden sm:block">{desc}</span>
    </div>
  );
}
