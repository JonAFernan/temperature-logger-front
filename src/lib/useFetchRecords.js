import { useState, useEffect } from 'react';
import API_URLS from './apiUrls.js';

const useFetchRecords = (sensor_id, date_from, date_to) => {
    const [records, setRecords] = useState([]);
    const [sensorInfo, setSensorInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(API_URLS.GET_RECORDS, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sensor_id, date_from, date_to }),
                });

                const data = await response.json();
                if (data.records) {
                    setRecords(data.records);
                    setSensorInfo(data.sensor);
                }
            } catch (error) {
                console.error('Error al obtener registros:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sensor_id, date_from, date_to]);

    return { records, sensorInfo, loading };
};

export default useFetchRecords;
