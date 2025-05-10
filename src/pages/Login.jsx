import {
    Avatar,
    Container,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    Alert,
} from '@mui/material';
import API_URLS from '../lib/apiUrls.js';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Login = () => {
    const [backendErrors, setBackendErrors] = useState([]);
    const navigate = useNavigate();

    const sendLogin = async (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;

        try {
            const response = await fetch(API_URLS.GET_JWT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: username, password: password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setBackendErrors(data.errors || [data.message]);
                return;
            }

            setBackendErrors([]);

            localStorage.setItem('jwt', data.jwt);
            navigate('/');
        } catch (error) {
            console.error('Error during the login', error);
            setBackendErrors(['Error connecting to the server']);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper
                elevation={10}
                sx={{ marginTop: 8, padding: 2, textAlign: 'center' }}
            >
                <Avatar sx={{ mx: 'auto', bgcolor: 'red', mb: 1 }} />
                <Typography component="h1" variant="h4">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={sendLogin}
                    autoComplete="off"
                    sx={{ mt: 1 }}
                >
                    {backendErrors.length > 0 && (
                        <Alert severity="error">
                            {backendErrors.map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </Alert>
                    )}
                    <TextField
                        name="username"
                        placeholder="Username"
                        fullWidth
                        required
                        autoFocus
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="password"
                        placeholder="Password"
                        fullWidth
                        required
                        type="password"
                        sx={{ mb: 2 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 1 }}
                    >
                        <strong>Sign in</strong>
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
