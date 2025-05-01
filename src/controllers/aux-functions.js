export const isSensorInAlarm = (sensor) => {
    return (
        sensor.temperature <= sensor.alarm_range_min ||
        sensor.temperature >= sensor.alarm_range_max
    );
};

export const color = (sensor) => {
    const nullTemperature = '#d3d3d3';
    const temperatureCorrect = '#ccffcc';
    const alarm = '#ffcccc';

    if (sensor.temperature === null) return nullTemperature;
    return isSensorInAlarm(sensor) ? alarm : temperatureCorrect;
};
