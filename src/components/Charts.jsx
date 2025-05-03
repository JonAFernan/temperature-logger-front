import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { CircularProgress, Box, Typography } from '@mui/material';
import useFetchRecords from '../lib/useFetchRecords';
import { formatDate } from '../lib/aux-functions.js';

const Charts = ({ sensor_id }) => {
    const dateTo = formatDate(new Date().toISOString());
    const dateFrom = formatDate(
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    );

    // Uso del custom hook en el componente
    const { records, sensorInfo, loading } = useFetchRecords(
        sensor_id,
        dateFrom,
        dateTo,
    );

    // Genera un array para mostrar las filas de valores fijos
    const singleValueArray = (value, length) => Array(length).fill(value);

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
                            data: singleValueArray(
                                sensorInfo.setpoint,
                                formattedData.length,
                            ),
                            showMark: false,
                            label: 'Setpoint',
                            color: 'green',
                        },
                        {
                            data: singleValueArray(
                                sensorInfo.alarm_range_min,
                                formattedData.length,
                            ),
                            showMark: false,
                            label: 'Alarma Mínima',
                            color: 'red',
                        },
                        {
                            data: singleValueArray(
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
