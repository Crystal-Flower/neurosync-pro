const mongoose = require('mongoose');

const CalibrationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    baseAngle: Number,
    neuralNetworkSyncState: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'] },
    metrics: {
        durationSec: Number,
        balanceScoreAfter: Number,
        gaitSymmetryAfter: Number,
    }
});

module.exports = mongoose.model('Calibration', CalibrationSchema);
