import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { color, getUserRole, isNotConnected } from '../lib/aux-functions.js';
import { useState } from 'react';
import UpdateSensor from './UpdateSensor.jsx';
import DeleteSensor from './DeleteSensor.jsx';
import Charts from './Charts.jsx';
import ExportCSV from './ExportCSV';

const SensorCardDetailed = ({ sensor, setUpdate }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const role = getUserRole();

    if (isNotConnected(sensor)) sensor.temperature = null;

    return (
        <>
            <Card
                sx={{
                    minWidth: 300,
                    padding: 2,
                    bgcolor: color(sensor),
                    boxShadow: 3,
                }}
            >
                <CardContent>
                    <Typography variant="h3">{sensor.name}</Typography>
                    <Typography variant="body1">
                        Dirección: {sensor.address}
                    </Typography>
                    <Typography variant="body1">
                        Temperatura: {sensor.temperature ?? 'N/A'}°C
                    </Typography>
                    <Typography variant="body1">
                        Setpoint: {sensor.setpoint}°C
                    </Typography>
                    <Typography variant="body1">
                        Alarma baja temperatura: {sensor.alarm_range_min}
                    </Typography>
                    <Typography variant="body1">
                        Alarma alta temperatura: {sensor.alarm_range_max}°C
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                        {role === 'admin' && (
                            <IconButton
                                color="primary"
                                onClick={() => setIsUpdating(true)}
                            >
                                <EditIcon />
                            </IconButton>
                        )}

                        {role === 'admin' && (
                            <IconButton
                                color="error"
                                onClick={() => setIsDeleting(true)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Box>
                </CardContent>
            </Card>
            <ExportCSV sensor={sensor} />
            <Charts sensor_id={sensor.sensor_id} />
            <DeleteSensor
                open={isDeleting}
                sensor={sensor}
                onClose={() => setIsDeleting(false)}
            />
            <UpdateSensor
                setUpdate={setUpdate}
                open={isUpdating}
                sensor={sensor}
                onClose={() => setIsUpdating(false)}
            />
        </>
    );
};

export default SensorCardDetailed;
