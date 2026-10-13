const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'data.json');

const defaultData = {
    patients: [
        { id: '1', name: 'John Doe', age: 45, status: 'Active Sync', battery: 84, lastUpdate: 'Just now' },
        { id: '2', name: 'Sarah Connor', age: 32, status: 'Critical Power', battery: 12, lastUpdate: '10 min ago' },
        { id: '3', name: 'Robert Vance', age: 58, status: 'Misalignment', battery: 65, lastUpdate: '1 hour ago' },
        { id: '4', name: 'Mia Wong', age: 29, status: 'Active Sync', battery: 92, lastUpdate: '2 mins ago' }
    ],
    alerts: [
        { id: 'a1', patientId: '2', patient: 'Sarah Connor', type: 'Battery Critical', time: new Date(Date.now() - 600000).toISOString(), severity: 'high' },
        { id: 'a2', patientId: '3', patient: 'Robert Vance', type: 'Misalignment Warning', time: new Date(Date.now() - 3600000).toISOString(), severity: 'medium' }
    ],
    messages: [
        { id: 'm1', threadId: '1', sender: 'doctor', text: 'Hello John, the new alignment on the telemetry looks stable. How does it feel on stairs?', time: new Date(Date.now() - 3600000).toISOString() },
        { id: 'm2', threadId: '1', sender: 'patient', text: 'It feels much better. Thank you!', time: new Date(Date.now() - 3000000).toISOString() }
    ],
    exercises: [
        { id: 'e1', patientId: '1', title: 'Seated Leg Extensions', duration: '5 min', completed: false, points: 50 },
        { id: 'e2', patientId: '1', title: 'Weight Shifting', duration: '10 min', completed: false, points: 100 }
    ]
};

// Initialize DB file
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2));
}

function readDB() {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = {
    readDB,
    writeDB,
    // Helpers
    addAlert: (alert) => {
        const db = readDB();
        db.alerts.unshift({ ...alert, id: 'a' + Date.now(), time: new Date().toISOString() });
        writeDB(db);
    },
    addMessage: (message) => {
        const db = readDB();
        db.messages.push({ ...message, id: 'm' + Date.now(), time: new Date().toISOString() });
        writeDB(db);
    }
};
