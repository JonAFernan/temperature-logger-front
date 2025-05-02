import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { color } from '../lib/aux-functions.js';
import { useState } from 'react';
import UpdateSensor from './UpdateSensor.jsx';

const SensorCardDetailed = ({ sensor, onDeleteSensor }) => {
    const [isUpdating, setIsUpdating] = useState(false);
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
                    <Typography variant="h4">{sensor.name}</Typography>
                    <Typography variant="body2">
                        Dirección: {sensor.address}
                    </Typography>
                    <Typography variant="body2">
                        Temperatura: {sensor.temperature ?? 'N/A'}°C
                    </Typography>
                    <Typography variant="body2">
                        Setpoint: {sensor.setpoint}°C
                    </Typography>
                    <Typography variant="body2">
                        Alarma baja temperatura: {sensor.alarm_range_min}
                    </Typography>
                    <Typography variant="body2">
                        Alarma alta temperatura: {sensor.alarm_range_max}°C
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                        <IconButton
                            color="primary"
                            onClick={() => setIsUpdating(true)}
                        >
                            <EditIcon />
                        </IconButton>

                        <IconButton color="error" onClick={onDeleteSensor}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
            <UpdateSensor
                open={isUpdating}
                sensor={sensor}
                onClose={() => setIsUpdating(false)}
            />
        </>
    );
};

export default SensorCardDetailed;
