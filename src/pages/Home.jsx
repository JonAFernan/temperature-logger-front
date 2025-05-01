import React, { useEffect, useState } from 'react';
import SensorCard from '../components/SensorCard';
import {
    Container,
    Grid,
    Typography,
    Alert,
    CircularProgress,
} from '@mui/material';

const Home = () => {
    const [sensors, setSensors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/sensors/all')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al conectar con el servidor');
                }
                return response.json();
            })
            .then((data) => {
                setSensors(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Sensores de Temperatura
            </Typography>
            {loading && <CircularProgress />}{' '}
            {/* Mostramos carga mientras esperamos datos */}
            {error && <Alert severity="error">{error}</Alert>}{' '}
            {/* Mostramos error si falla la API */}
            {!loading && !error && (
                <Grid container spacing={2}>
                    {sensors.length > 0 ? (
                        sensors.map((sensor) => (
                            <Grid
                                item
                                key={sensor.sensor_id}
                                xs={12}
                                sm={6}
                                md={4}
                            >
                                <SensorCard sensor={sensor} />
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body1">
                            No hay sensores disponibles.
                        </Typography>
                    )}
                </Grid>
            )}
        </Container>
    );
};

export default Home;
