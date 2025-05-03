export const isSensorInAlarm = (sensor) => {
    return (
        sensor.temperature <= sensor.alarm_range_min ||
        sensor.temperature >= sensor.alarm_range_max
    );
};

//Modifies the colour of the cards to make it visually easier to tell if a device is working properly.
export const color = (sensor) => {
    const nullTemperature = '#d3d3d3';
    const temperatureCorrect = '#ccffcc';
    const alarm = '#ffcccc';

    if (sensor.temperature === null) return nullTemperature;
    return isSensorInAlarm(sensor) ? alarm : temperatureCorrect;
};

//formats dates to pass API validation
export const formatDate = (date) => {
    return date.split('.')[0] + '+00:00';
};
