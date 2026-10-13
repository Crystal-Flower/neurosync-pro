/**
 * Simulates real-time telemetry from the prosthetic's ESP32.
 * Includes emulated sensor data (EMG, flex) and ML inference (optimal angles).
 * Latency is typically under 200 ms.
 */

function generateSensorData() {
    // Simulating typical walking cycle patterns
    const time = Date.now();
    // Phase of walking cycle (0 to 1) 
    const phase = (time % 2000) / 2000;

    // Sine wave properties for walking
    const baseFlex = Math.sin(phase * Math.PI * 2) * 45 + 50; // 5 to 95 degrees flex

    // EMG bursts at specific parts of the cycle
    const emgSpike = (phase > 0.1 && phase < 0.3) || (phase > 0.6 && phase < 0.8) ? Math.random() * 80 + 20 : Math.random() * 10;

    const currentAngle = baseFlex + (Math.random() * 5 - 2.5); // Add noise

    // Simulating ML prediction: smooth optimal targeted angle and calculated adjustments
    const optimalAngle = Math.max(0, currentAngle + Math.random() * 2 - 1);
    const userBalanceScore = 80 + Math.sin(phase * Math.PI) * 10 + Math.random() * 5; // 75-95 approx

    const misaligned = Math.random() > 0.98; // Rare chance of misalignment anomaly

    return {
        timestamp: time,
        sensors: {
            flex: currentAngle,
            emg: emgSpike,
            gyroX: Math.random() * 2 - 1,
            gyroY: Math.random() * 2 - 1,
            accelZ: 9.8 + (Math.random() * 2 - 1)
        },
        mlPrediction: {
            optimalAngle: optimalAngle,
            adjustmentRequired: Math.abs(currentAngle - optimalAngle) > 2,
            confidenceScore: 0.95 + Math.random() * 0.04
        },
        analytics: {
            balanceScore: userBalanceScore,
            stepSymmetry: 90 + Math.random() * 10,
            postureCorrectionPercent: 10 + Math.random() * 5
        },
        alerts: misaligned ? [{
            type: 'WARNING',
            message: 'Unsafe alignment detected. Slight correction applied.'
        }] : []
    };
}

function startDeviceSimulation(socket) {
    // Emit state at 50ms intervals (approx 200ms latency requirement, we'll send it fast to mimic 20Hz sensor reading)
    return setInterval(() => {
        const data = generateSensorData();
        socket.emit('sensor_data', data);
    }, 100);
}

module.exports = {
    startDeviceSimulation,
};
