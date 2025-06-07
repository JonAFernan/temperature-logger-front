import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress, Box } from '@mui/material';
import SensorCardDetailed from '../components/SensorCardDetailed';
import API_URLS from '../lib/apiUrls.js';
import { useNavigate } from 'react-router-dom';

const SensorDetail = () => {
    const { id } = useParams();
    const [sensor, setSensor] = useState(null);
    const [isUpdate, setUpdate] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isUpdate) {
            fetch(`${API_URLS.GET_SENSOR}${id}`)
                .then((response) => {
                    if (response.status === 500) {
                        navigate('/500');
                        return;
                    }
                    return response.json();
                })
                .then((data) => setSensor(data))
                .catch((error) => {
                    console.error('Error fetching sensor:', error);
                });
        }
        setUpdate(false);
    }, [isUpdate]);

    if (!sensor)
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                }}
            >
                <CircularProgress />
            </Box>
        );

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
                    <SensorCardDetailed
                        sensor={sensor}
                        setUpdate={setUpdate}
                        sx={{
                            mt: 5,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    />
                </Box>
            </Container>
        </>
    );
};

export default SensorDetail;
