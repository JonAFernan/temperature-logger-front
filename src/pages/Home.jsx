import React, { useEffect, useState } from 'react';
import SensorCard from '../components/SensorCard';
import AddSensor from '../components/AddSensor';
import API_URLS from '../lib/apiUrls.js';
import { getUserRole } from '../lib/aux-functions.js';
import {
    Container,
    Grid,
    Typography,
    Alert,
    CircularProgress,
    Box,
} from '@mui/material';

const Home = () => {
    const [sensors, setSensors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //refresh the page whe we add a new sensor
    const [isUpdate, setUpdate] = useState(true);
    const role = getUserRole();

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

    //Actualizar cada minuto la página

    useEffect(() => {
        const interval = setInterval(() => {
            setUpdate(true);
        }, 300000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        my: 3,
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            textAlign: 'center',
                            width: '100%',
                            paddingBottom: { xs: 1, sm: 4 },
                        }}
                    >
                        <Typography variant="h2" gutterBottom>
                            Equipos Refrigerados
                        </Typography>
                    </Box>
                    {loading && <CircularProgress />}
                    {error && <Alert severity="error">{error}</Alert>}
                    {!loading && !error && (
                        <Grid
                            container
                            spacing={2}
                            mb={2}
                            justifyContent="center"
                            sx={{
                                paddingBottom: { xs: 1, sm: 4 },
                            }}
                        >
                            {sensors.length > 0 ? (
                                sensors.map((sensor) => (
                                    <Grid item key={sensor.sensor_id}>
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

                    {role === 'admin' && <AddSensor setUpdate={setUpdate} />}
                </Box>
            </Container>
        </>
    );
};

export default Home;
