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
        fetch(`${API_URLS.DELETE_SENSOR}${sensor.sensor_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sensor_id: sensor.sensor_id }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.errors) {
                    console.log('Sensor eliminado:', data);
                    onClose();
                    navigate('/');
                }
            })
            .catch((error) =>
                console.error('Error al eliminar sensor:', error),
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
