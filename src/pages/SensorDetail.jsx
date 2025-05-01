import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import SensorCardDetailed from '../components/SensorCardDetailed';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SensorDetail = () => {
    const { id } = useParams();
    const [sensor, setSensor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/sensors/${id}`)
            .then((response) => {
                if (response.status === 500) {
                    navigate('/404'); // 🔹 Redirige a la página 404 si el backend falla
                    return;
                }
                return response.json();
            })
            .then((data) => setSensor(data))
            .catch((error) => {
                console.error('Error fetching sensor:', error);
            });
    }, [id]);

    if (!sensor) return <Typography>Cargando...</Typography>;

    return (
        <>
            <Link to={`/`}>HOME</Link>
            <Container>
                <SensorCardDetailed sensor={sensor} />
            </Container>
        </>
    );
};

export default SensorDetail;
