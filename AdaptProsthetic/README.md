# AdaptProsthetic

AI-enabled adaptive prosthetic system platform for real-time monitoring and calibration.
This application reads sensor telemetry (simulated for now), predicts optimal joint alignment using a Neural Network mock, and displays it on a Medical UI dashboard.

## Project Structure
- `frontend/`: Next.js 15, Tailwind CSS, Recharts for realtime graphs, Lucide React (Icons).
- `backend/`: Node.js, Express, Socket.io for WebSocket communication, Mongoose for DB connection.

## Key Features
- **Live Biomechanics Dashboard**: Real-time graphs comparing current joint angle with the ML predicting optimal angle.
- **Voice-Guided Calibration**: Step-by-step multi-language audio instructions.
- **Device Communication**: High-speed bidirectional sync using WebSockets to emulate ESP32 hardware interactions.
- **Safety**: Error reporting and misalignment warning alerts mapped to CSS visual states.
- **Accessible Design**: Premium medical dark mode UI with high contrast and legible modern typography.

## Setup Instructions

### 1. Backend Setup
1. Open a terminal.
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Create a `.env` file (already instantiated with defaults).
5. Start the backend server: `npm start`
   *(It runs on `http://localhost:5000`)*

### 2. Frontend Setup
1. Open a new terminal.
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
   *(It runs on `http://localhost:3000`)*

### 3. Usage
Navigate to `http://localhost:3000`. You should see the dashboard displaying the live stream from the simulator.
Go to the **Calibration** page using the sidebar to experience the Voice-guided AI calibration flow.

## Demo Simulation
We have provided `backend/ml/simulator.js` which accurately mimics:
- The walking cycle phase.
- Sensor data (flex angle, muscle EMG bursts, accelerometers).
- The AI inference output calculating adjustments required for safe posture.
- Network latency matching typical BLE -> ESP32 -> Web Socket transmission.
