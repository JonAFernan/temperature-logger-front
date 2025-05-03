import React from 'react';
import Button from '@mui/material/Button';
import useFetchRecords from '../lib/useFetchRecords';
import { formatDate } from '../lib/aux-functions';

const ExportCSV = ({ sensor }) => {
    const dateTo = formatDate(new Date().toISOString());
    const dateFrom = formatDate(
        new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    );

    const { sensorInfo, records, loading } = useFetchRecords(
        sensor.sensor_id,
        dateFrom,
        dateTo,
    );

    const downloadCSV = () => {
        if (!records.length) {
            console.log(records.length);
            return;
        }

        const rows = records.map((record) => [
            sensorInfo.sensor_id,
            sensorInfo.address,
            sensorInfo.name,
            sensorInfo.alarm_range_min,
            sensorInfo.alarm_range_max,
            sensorInfo.setpoint,
            record.temperature,
            record.date,
        ]);

        // Construcción del CSV
        const csvString = [
            Object.keys(sensorInfo), // Encabezados
            ...rows, // Filas
        ]
            .map((row) => row.join(','))
            .join('\n');

        // Creación del Blob y descarga
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `sensor_${sensor_id}_records.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={downloadCSV}
            disabled={loading}
        >
            {loading ? 'Cargando...' : 'Exportar CSV'}
        </Button>
    );
};

export default ExportCSV;
