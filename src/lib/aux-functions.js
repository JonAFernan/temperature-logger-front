export const isSensorInAlarm = (sensor) => {
    return (
        sensor.temperature <= sensor.alarm_range_min ||
        sensor.temperature >= sensor.alarm_range_max
    );
};

//Modifica el color de las tarjeta para que visualmente sea más sencillo saber si un equipo funciona correctamente
export const color = (sensor) => {
    const nullTemperature = '#d3d3d3';
    const temperatureCorrect = '#ccffcc';
    const alarm = '#ffcccc';

    if (sensor.temperature === null) return nullTemperature;
    return isSensorInAlarm(sensor) ? alarm : temperatureCorrect;
};

//formatea las fechas para que pasen la validación de la API
export const formatDate = (date) => {
    return date.split('.')[0] + '+00:00';
};
