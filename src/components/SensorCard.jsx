import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { color, isNotConnected } from '../lib/aux-functions.js';

const SensorCard = ({ sensor }) => {
    if (isNotConnected(sensor)) sensor.temperature = null;
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
                    <Typography variant="h5">{sensor.name}</Typography>
                    <Typography variant="body1">
                        Temperatura: {sensor.temperature ?? 'N/A'}°C
                    </Typography>
                    <Typography variant="body1">
                        Setpoint: {sensor.setpoint}°C
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
};

export default SensorCard;
