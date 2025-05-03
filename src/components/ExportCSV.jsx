import React from 'react';
import Button from '@mui/material/Button';

const ExportCSV = ({ data, sensor }) => {
    const downloadCSV = () => {
        // Convert the data array into a CSV string

        console.log(Date.now().toString());

        const example = {
            sensor: {
                setpoint: 4,
                alarm_range_min: 1,
                alarm_range_max: 7,
            },
            records: [],
        };

        const rows = example.records.map((record) => [
            sensor.sensor_id,
            sensor.address,
            sensor.name,
            sensor.alarm_range_min,
            sensor.alarm_range_max,
            sensor.setpoint,
            record.temperature,
            record.date,
        ]);
        const csvString = [
            Object.keys(sensor), //encabezados
            ...rows, // Filas
        ]
            .map((row) => row.join(','))
            .join('\n');

        // Create a Blob from the CSV string
        const blob = new Blob([csvString], { type: 'text/csv' });

        // Generate a download link and initiate the download
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'temp_logger_download.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Button variant="contained" color="primary" onClick={downloadCSV}>
            Export CSV
        </Button>
    );
};

export default ExportCSV;
