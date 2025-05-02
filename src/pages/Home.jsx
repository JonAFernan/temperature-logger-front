import React, { useEffect, useState } from 'react';
import SensorCard from '../components/SensorCard';
import AddSensor from '../components/AddSensor';
import API_URLS from '../lib/apiUrls.js';
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
    //Este estado hace que se actualice la lista de sensores cuando añadimos uno
    const [isUpdate, setUpdate] = useState(true);
    useEffect(() => {
        if (isUpdate) {
            fetch(API_URLS.GET_ALL_SENSORS)
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
        }
        setUpdate(false);
    }, [isUpdate]);

    return (
        <>
            <Container>
                <Typography variant="h1" gutterBottom>
                    Sensores de Temperatura
                </Typography>
                {loading && <CircularProgress />}
                {error && <Alert severity="error">{error}</Alert>}
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
            <AddSensor setUpdate={setUpdate} />
        </>
    );
};

export default Home;
