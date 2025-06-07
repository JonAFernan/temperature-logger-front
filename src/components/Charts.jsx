import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { CircularProgress, Box, Typography } from '@mui/material';
import useFetchRecords from '../lib/useFetchRecords';
import { formatDate } from '../lib/aux-functions.js';

const Charts = ({ sensor_id }) => {
    const { records, sensorInfo, loading, fetchRecords } = useFetchRecords();
    const [dataLoaded, setDataLoaded] = useState(false);
    const dateTo = formatDate(
        new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    );
    const dateFrom = formatDate(
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Get data from last 24h
    );

    //fecth data from BD
    const loadData = async () => {
        await fetchRecords(sensor_id, dateFrom, dateTo);
        setDataLoaded(true);
    };

    useEffect(() => {
        loadData();
    }, []);

    // Generates an array to display the rows of fixed values
    const singleValueArray = (value, length) => Array(length).fill(value);

    // Format data for the chart. We delete the last value of the array to avoid drawining it.
    const formattedData = records.slice(0, -1).map((record) => ({
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
                height: 500,
                bgcolor: 'white',
            }}
        >
            <Typography color="Black" variant="h4" gutterBottom>
                24h
            </Typography>
            {loading || !dataLoaded ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <CircularProgress />
                </Box>
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
                    grid={{ vertical: true, horizontal: true }}
                    margin={{ bottom: 10 }}
                    height={400}
                />
            )}
        </Box>
    );
};

export default Charts;
