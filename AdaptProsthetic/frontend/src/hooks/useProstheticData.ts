'use client';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export type SensorData = {
    timestamp: number;
    sensors: {
        flex: number;
        emg: number;
        gyroX: number;
        gyroY: number;
        accelZ: number;
    };
    mlPrediction: {
        optimalAngle: number;
        adjustmentRequired: boolean;
        confidenceScore: number;
    };
    analytics: {
        balanceScore: number;
        stepSymmetry: number;
        postureCorrectionPercent: number;
    };
    alerts: Array<{
        type: string;
        message: string;
    }>;
};

export function useProstheticData(url: string = 'http://localhost:5000') {
    const [data, setData] = useState<SensorData | null>(null);
    const [history, setHistory] = useState<SensorData[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(url);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            setIsConnected(true);
        });

        newSocket.on('disconnect', () => {
            setIsConnected(false);
        });

        newSocket.on('sensor_data', (incomingData: SensorData) => {
            setData(incomingData);
            setHistory(prev => {
                const next = [...prev, incomingData];
                if (next.length > 50) return next.slice(next.length - 50); // Keep last 50 states for charts
                return next;
            });
        });

        return () => {
            newSocket.disconnect();
        };
    }, [url]);

    const startCalibration = () => {
        if (socket) {
            socket.emit('start_calibration', {});
        }
    };

    return { socket, data, history, isConnected, startCalibration };
}
