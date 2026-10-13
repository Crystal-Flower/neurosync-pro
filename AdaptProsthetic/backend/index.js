const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Removed MongoDB to rely on robust JSON db module for instant setup without user configuring mongodb strings.

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());

// basic health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'AdaptProsthetic Backend Active' });
});

const { readDB, addAlert, addMessage } = require('./database');

// --- API ENDPOINTS ---

// GET /api/patients - fetch roster
app.get('/api/patients', (req, res) => {
    const db = readDB();
    res.json(db.patients);
});

// GET /api/alerts - fetch clinical alerts
app.get('/api/alerts', (req, res) => {
    const db = readDB();
    res.json(db.alerts);
});

// POST /api/alerts - create a new alert (e.g. from chatbot triage)
app.post('/api/alerts', (req, res) => {
    const { patientId, patient, type, severity, details } = req.body;
    addAlert({ patientId, patient, type, severity, details });

    // Broadcast to all connected doctors that a new alert was created
    io.emit('new_alert', { patientId, patient, type, severity, details });

    res.status(201).json({ success: true });
});

// GET /api/messages/:threadId
app.get('/api/messages/:threadId', (req, res) => {
    const db = readDB();
    const thread = db.messages.filter(m => m.threadId === req.params.threadId);
    res.json(thread);
});

// POST /api/messages
app.post('/api/messages', (req, res) => {
    const { threadId, sender, text } = req.body;
    addMessage({ threadId, sender, text });

    // Broadcast for live chat update
    io.emit('new_message', { threadId, sender, text });

    res.status(201).json({ success: true });
});

// GET /api/exercises/:patientId
app.get('/api/exercises/:patientId', (req, res) => {
    const db = readDB();
    const ex = db.exercises.filter(e => e.patientId === req.params.patientId);
    res.json(ex);
});

// Import the simulator logic for esp32 devices
const { startDeviceSimulation } = require('./ml/simulator');

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Start sending simulated ESP32 & ML data to this client
    const simulationInterval = startDeviceSimulation(socket);

    // Endpoint to receive calibration triggers
    socket.on('start_calibration', (data) => {
        console.log('Calibration started by:', socket.id);
        // Send back a success after delay
        setTimeout(() => {
            socket.emit('calibration_complete', { success: true, baseAngle: 15 });
        }, 3000);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        clearInterval(simulationInterval);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
