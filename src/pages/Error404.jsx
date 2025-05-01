import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Container sx={{ textAlign: 'center', marginTop: 5 }}>
            <Typography variant="h3" color="error">
                404 - Sensor no encontrado
            </Typography>
            <Typography variant="body1">
                Puede que el sensor que buscas no exista, haya sido eliminado o
                haya un error en el servidor.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                component={Link}
                to="/"
            >
                Volver a Inicio
            </Button>
        </Container>
    );
};

export default NotFoundPage;
