import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Alert,
} from '@mui/material';
import API_URLS from '../lib/apiUrls.js';

const UpdateSensor = ({ open, sensor, onClose, setUpdate }) => {
    const [formData, setFormData] = useState({
        id: '',
        address: '',
        name: '',
        alarm_range_min: '',
        alarm_range_max: '',
        setpoint: '',
    });

    const [backendErrors, setBackendErrors] = useState([]);

    // Load data when we open the modal
    useEffect(() => {
        setFormData(sensor);
    }, []);

    // we store the form values and convert the numeric values to Number.
    const captureForms = (event) => {
        const { name, value } = event.target;
        const numericFields = [
            'alarm_range_min',
            'alarm_range_max',
            'setpoint',
        ];

        setFormData({
            ...formData,
            [name]: numericFields.includes(name) ? Number(value) : value,
        });
    };

    const sendData = () => {
        const token = localStorage.getItem('jwt');
        const { date, temperature, ...response } = formData;
        fetch(`${API_URLS.UPDATE_SENSOR}${response.sensor_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(response),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.errors) {
                    setBackendErrors(data.errors);
                } else {
                    setUpdate(true);
                    onClose();
                }
            })
            .catch((error) => {
                console.error('Error updating the sensor', error);
                setBackendErrors(['Error in the server connection']);
            });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Actualizar Sensor</DialogTitle>
            <DialogContent>
                {backendErrors.length > 0 && (
                    <Alert severity="error">
                        {backendErrors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </Alert>
                )}
                <TextField
                    label="Dirección"
                    name="address"
                    fullWidth
                    margin="dense"
                    onChange={captureForms}
                    value={formData.address}
                />
                <TextField
                    label="Nombre"
                    name="name"
                    fullWidth
                    margin="dense"
                    onChange={captureForms}
                    value={formData.name}
                />
                <TextField
                    label="Rango mínimo de alarma (°C)"
                    name="alarm_range_min"
                    type="number"
                    fullWidth
                    margin="dense"
                    onChange={captureForms}
                    value={formData.alarm_range_min}
                />
                <TextField
                    label="Rango máximo de alarma (°C)"
                    name="alarm_range_max"
                    type="number"
                    fullWidth
                    margin="dense"
                    onChange={captureForms}
                    value={formData.alarm_range_max}
                />
                <TextField
                    label="Setpoint (°C)"
                    name="setpoint"
                    type="number"
                    fullWidth
                    margin="dense"
                    onChange={captureForms}
                    value={formData.setpoint}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={sendData}>
                    Actualizar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateSensor;
