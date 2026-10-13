const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    patientProfile: {
        height: Number, // cm
        weight: Number, // kg
        limbType: { type: String, enum: ['AK', 'BK', 'HD'] }, // Above-Knee, Below-Knee, Hip-Disarticulation
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
