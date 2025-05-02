import API_URLS from '../lib/apiUrls.js';
//Formato compatible con la base de datos
const formatDate = (date) => {
    return date.split('.')[0] + '+00:00';
};

//Función para generar temperaturas aleatorias basadas en el setpoint
function getRandomTemperature(max, temperature) {
    const a = Math.random();
    const increaseOrDecrease = a < 0.5 ? -1 : 1;
    return parseFloat(
        (temperature + Math.random() * max * increaseOrDecrease).toFixed(1),
    );
}

//Función para obtener sensores desde el backend
const fetchSensors = async () => {
    try {
        const response = await fetch(API_URLS.GET_ALL_SENSORS);
        if (!response.ok) throw new Error('Error obteniendo sensores');
        const sensors = await response.json();
        return sensors;
    } catch (error) {
        console.error('Error al cargar sensores:', error);
        return [];
    }
};

//Función para generar datos de los sensores
const generateSensorData = (sensors) => {
    return sensors.map((sensor) => ({
        address: sensor.address,
        temperature: getRandomTemperature(2, sensor.setpoint),
        date: formatDate(new Date().toISOString()),
    }));
};

// Función para enviar datos al backend
const sendDataToBackend = async (data) => {
    try {
        const response = await fetch(API_URLS.ADD_RECORDS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Error enviando datos');
        console.log('Datos enviados correctamente.');
    } catch (error) {
        console.error(' Error al enviar datos:', error);
    }
};

export const startSimulator = async () => {
    setInterval(async () => {
        const sensors = await fetchSensors();
        const newData = generateSensorData(sensors);
        sendDataToBackend(newData);
    }, 60000);
};
