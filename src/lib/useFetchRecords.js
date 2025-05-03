import { useState } from 'react';
import API_URLS from './apiUrls.js';

const useFetchRecords = () => {
    const [records, setRecords] = useState([]);
    const [sensorInfo, setSensorInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchRecords = async (sensor_id, date_from, date_to) => {
        setLoading(true);
        try {
            const response = await fetch(API_URLS.GET_RECORDS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sensor_id, date_from, date_to }),
            });

            const data = await response.json();
            if (data.records) {
                setRecords(data.records); //El cambio de estado lo usamos en la generación de los gráficos.
                setSensorInfo(data.sensor);
                return data; // El return lo usamos en la generación del CSV.
            }
        } catch (error) {
            console.error('Error al obtener registros:', error);
        } finally {
            setLoading(false);
        }
    };

    return { records, sensorInfo, loading, fetchRecords };
};

export default useFetchRecords;
