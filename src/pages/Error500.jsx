import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { HomeButton } from '../components/HomeButton';

const NotFoundPage_500 = () => {
    return (
        <Container sx={{ textAlign: 'center', marginTop: 5 }}>
            <Typography variant="h3" color="error">
                500 - Error en el servidor.
            </Typography>
            <HomeButton></HomeButton>
        </Container>
    );
};

export default NotFoundPage_500;
