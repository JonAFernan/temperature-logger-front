import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress } from '@mui/material';
import SensorCardDetailed from '../components/SensorCardDetailed';
import API_URLS from '../lib/apiUrls.js';
import { useNavigate } from 'react-router-dom';
import { HomeButton } from '../components/HomeButton';

const SensorDetail = () => {
    const { id } = useParams();
    const [sensor, setSensor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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
    }, [id, navigate]);

    if (!sensor)
        return (
            <Container>
                <CircularProgress />
            </Container>
        );

    return (
        <>
            <HomeButton></HomeButton>
            <Container>
                <SensorCardDetailed sensor={sensor} />
            </Container>
        </>
    );
};

export default SensorDetail;
