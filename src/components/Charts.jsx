import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { CircularProgress, Box, Typography } from '@mui/material';
import API_URLS from '../lib/apiUrls.js';

const formatDate = (date) => {
    return date.split('.')[0] + '+00:00';
};

//genera un arry con 60 valores para mostrar las filas de los valores fijos.
const createFixedArray = (value, length) => {
    return Array(length).fill(value);
};

const Charts = ({ sensor_id }) => {
    const [records, setRecords] = useState([]);
    const [sensorInfo, setSensorInfo] = useState({});
    const [loading, setLoading] = useState(true); // ✅ Spinner de carga

    const fetchRecords = async () => {
        setLoading(true); // ✅ Activar loading antes de hacer la solicitud

        const dateTo = formatDate(new Date().toISOString());
        const dateFrom = formatDate(
            new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        );

        try {
            const response = await fetch(API_URLS.GET_RECORDS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sensor_id,
                    date_from: dateFrom,
                    date_to: dateTo,
                }),
            });

            const data = await response.json();
            if (data.records) {
                setRecords(data.records);
                setSensorInfo(data.sensor);
            }
        } catch (error) {
            console.error('Error al obtener registros:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    // Formatear datos para el gráfico
    const formattedData = records.map((record) => ({
        time: new Date(record.date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        }),
        temperature: record.temperature,
    }));

    return (
        <Box
            sx={{
                textAlign: 'center',
                marginTop: 2,
                width: '100%',
                bgcolor: 'white',
            }}
        >
            <Typography color="Black" variant="h4" gutterBottom>
                24h
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <LineChart
                    xAxis={[
                        {
                            scaleType: 'point',
                            data: formattedData.map((record) => record.time),
                        },
                    ]}
                    series={[
                        {
                            data: formattedData.map(
                                (record) => record.temperature,
                            ),
                            showMark: false,
                            label: 'Temperature',
                            color: 'black',
                        },
                        {
                            data: createFixedArray(
                                sensorInfo.setpoint,
                                formattedData.length,
                            ),
                            showMark: false,
                            label: 'Setpoint',
                            color: 'green',
                        },
                        {
                            data: createFixedArray(
                                sensorInfo.alarm_range_min,
                                formattedData.length,
                            ),
                            showMark: false,
                            label: 'Alarma Mínima',
                            color: 'red',
                        },
                        {
                            data: createFixedArray(
                                sensorInfo.alarm_range_max,
                                formattedData.length,
                            ),
                            showMark: false,
                            label: 'Alarma Máxima',
                            color: 'orange',
                        },
                    ]}
                    height={500}
                    width={1000}
                    grid={{ vertical: true, horizontal: true }}
                    margin={{ bottom: 10 }}
                />
            )}
        </Box>
    );
};

export default Charts;
