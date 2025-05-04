import React, { useState } from 'react';
import API_URLS from '../lib/apiUrls.js';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
} from '@mui/material';

const AddSensor = ({ setUpdate }) => {
    const [open, setOpen] = useState(false);
    const [sensorData, setSensorData] = useState({
        address: '',
        name: '',
        alarm_range_min: '',
        alarm_range_max: '',
        setpoint: '',
    });
    const [errors, setErrors] = useState([]); // store the errors send from the backend

    const openModal = () => setOpen(true);
    const closeModal = () => {
        setSensorData({
            address: '',
            name: '',
            alarm_range_min: '',
            alarm_range_max: '',
            setpoint: '',
        }); //Clean de values when we close the modal
        setErrors([]); // clean errors array
        setOpen(false);
    };

    // This function captures form input events and updates the sensor data state.
    const captureForms = (event) => {
        const { name, value } = event.target;

        const numericFields = [
            'alarm_range_min',
            'alarm_range_max',
            'setpoint',
        ];
        setSensorData({
            ...sensorData,
            [name]: numericFields.includes(name) ? Number(value) : value, // it converts the value to a number before updating the state.
        });
    };

    const sendData = () => {
        const token = localStorage.getItem('jwt');
        fetch(API_URLS.ADD_SENSOR, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(sensorData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setUpdate(true);
                    closeModal();
                }
            })
            .catch((err) => {
                console.error('Error in the request', err);
                setErrors([
                    err.message || 'Error in the connection to the server',
                ]);
            });
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={openModal}>
                Agregar Sensor
            </Button>

            <Dialog open={open} onClose={closeModal}>
                <DialogTitle>Nuevo Sensor</DialogTitle>
                <DialogContent>
                    {errors.length > 0 && (
                        <Alert severity="error">
                            {errors.map((error, index) => (
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
                    />
                    <TextField
                        label="Nombre"
                        name="name"
                        fullWidth
                        margin="dense"
                        onChange={captureForms}
                    />
                    <TextField
                        label="Rango mínimo de alarma (°C)"
                        name="alarm_range_min"
                        type="number"
                        fullWidth
                        margin="dense"
                        onChange={captureForms}
                    />
                    <TextField
                        label="Rango máximo de alarma (°C)"
                        name="alarm_range_max"
                        type="number"
                        fullWidth
                        margin="dense"
                        onChange={captureForms}
                    />
                    <TextField
                        label="Setpoint (°C)"
                        name="setpoint"
                        type="number"
                        fullWidth
                        margin="dense"
                        onChange={captureForms}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Cancelar</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={sendData}
                    >
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddSensor;
