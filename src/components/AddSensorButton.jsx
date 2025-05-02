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

const AddSensorButton = () => {
    const [open, setOpen] = useState(false);
    const [sensorData, setSensorData] = useState({
        address: '',
        name: '',
        alarm_range_min: '',
        alarm_range_max: '',
        setpoint: '',
    });
    const [errors, setErrors] = useState([]); // Estado para almacenar errores del backend

    const openModal = () => setOpen(true);
    const closeModal = () => {
        setSensorData({
            address: '',
            name: '',
            alarm_range_min: '',
            alarm_range_max: '',
            setpoint: '',
        });
        setErrors([]); // Limpiar errores al cerrar el modal
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Si el campo es numérico, convertimos a Number
        const numericFields = [
            'alarm_range_min',
            'alarm_range_max',
            'setpoint',
        ];
        setSensorData({
            ...sensorData,
            [name]: numericFields.includes(name) ? Number(value) : value, // Convierte a número si es necesario
        });
    };

    const sendData = () => {
        fetch(API_URLS.ADD_SENSOR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sensorData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.errors) {
                    setErrors(data.errors); // Guardamos los errores enviados por el backend
                } else {
                    console.log('Sensor creado:', data);
                    closeModal();
                }
            })
            .catch((err) => {
                console.error('Error en la petición:', err); // Muestra el error en la consola
                setErrors([err.message || 'Error de conexión con el servidor']); // Usa el mensaje del error
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
                        onChange={handleChange}
                    />
                    <TextField
                        label="Nombre"
                        name="name"
                        fullWidth
                        margin="dense"
                        onChange={handleChange}
                    />
                    <TextField
                        label="Rango mínimo de alarma (°C)"
                        name="alarm_range_min"
                        type="number"
                        fullWidth
                        margin="dense"
                        onChange={handleChange}
                    />
                    <TextField
                        label="Rango máximo de alarma (°C)"
                        name="alarm_range_max"
                        type="number"
                        fullWidth
                        margin="dense"
                        onChange={handleChange}
                    />
                    <TextField
                        label="Setpoint (°C)"
                        name="setpoint"
                        type="number"
                        fullWidth
                        margin="dense"
                        onChange={handleChange}
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

export default AddSensorButton;
