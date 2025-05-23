import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { HomeButton } from '../components/HomeButton';

const NotFoundPage_404 = () => {
    return (
        <Container sx={{ textAlign: 'center', marginTop: 5 }}>
            <Typography variant="h3" color="error">
                404 - Esta página no existe
            </Typography>
            <HomeButton></HomeButton>
        </Container>
    );
};

export default NotFoundPage_404;
