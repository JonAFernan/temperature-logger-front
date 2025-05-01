import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { color } from '../controllers/aux-functions.js';

const SensorCard = ({ sensor }) => {
    return (
        <Link to={`/sensor/${sensor.sensor_id}`}>
            <Card
                sx={{
                    minWidth: 250,
                    bgcolor: color(sensor),
                    boxShadow: 3,
                    cursor: 'pointer',
                }}
            >
                <CardContent>
                    <Typography variant="h4">{sensor.name}</Typography>
                    <Typography variant="body2">
                        Temperatura: {sensor.temperature ?? 'N/A'}°C
                    </Typography>
                    <Typography variant="body2">
                        Setpoint: {sensor.setpoint}°C
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
};

export default SensorCard;
