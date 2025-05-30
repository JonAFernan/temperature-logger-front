import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@mui/material';
import API_URLS from '../lib/apiUrls.js';

const DeleteSensor = ({ open, sensor, onClose }) => {
    const navigate = useNavigate();
    const handleDelete = () => {
        const token = localStorage.getItem('jwt');
        fetch(`${API_URLS.DELETE_SENSOR}${sensor.sensor_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ sensor_id: sensor.sensor_id }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.errors) {
                    onClose();
                    navigate('/');
                }
            })
            .catch((error) =>
                console.error('Error when deleting the sensor:', error),
            );
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Eliminar Sensor</DialogTitle>
            <DialogContent>
                <Typography>
                    ¿Seguro que quieres eliminar <strong>{sensor.name}</strong>?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                >
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteSensor;
