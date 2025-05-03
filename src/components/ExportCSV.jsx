import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import useFetchRecords from '../lib/useFetchRecords';
import { formatDate } from '../lib/aux-functions';

const ExportCSV = ({ sensor }) => {
    const { loading, fetchRecords } = useFetchRecords();
    const [open, setOpen] = useState(false);

    const dateTo = formatDate(new Date().toISOString());
    const dateFrom = formatDate(
        new Date(Date.now() - 360 * 24 * 60 * 60 * 1000).toISOString(), //un año
    );

    const generateCSV = (records, sensor) => {
        const headers = Object.keys(sensor);
        console.log(headers);
        const rows = records.map((record) => [
            sensor.sensor_id,
            sensor.address,
            sensor.name,
            sensor.alarm_range_min,
            sensor.alarm_range_max,
            sensor.setpoint,
            record.temperature,
            record.date,
        ]);

        console.log(123);
        const csvString = [headers, ...rows]
            .map((row) => row.join(','))
            .join('\n');

        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `sensor_${sensor.sensor_id}_records.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setOpen(false);
    };

    const downloadCSV = async () => {
        setOpen(true);
        const data = await fetchRecords(sensor.sensor_id, dateFrom, dateTo);
        console.log(data);
        generateCSV(data.records, sensor);
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={downloadCSV}
                disabled={loading}
            >
                {loading ? 'Cargando...' : 'Exportar CSV'}
            </Button>

            {/* Modal de "Generando CSV..." */}
            <Modal open={open}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                    }}
                >
                    <CircularProgress />
                    <p>Generando CSV...</p>
                </Box>
            </Modal>
        </>
    );
};

export default ExportCSV;
