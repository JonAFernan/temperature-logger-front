const PORT = '3000';
const API_BASE_URL = `http://localhost:${PORT}`;

export const API_URLS = {
    GET_ALL_SENSORS: `${API_BASE_URL}/sensors/all`,
    GET_SENSOR: `${API_BASE_URL}/sensors/`,
    ADD_SENSOR: `${API_BASE_URL}/sensors/add`,
    UPDATE_SENSOR: `${API_BASE_URL}/sensors/update`,
    DELETE_SENSOR: `${API_BASE_URL}/sensors/delete`,
    ADD_RECORDS: `${API_BASE_URL}/records/add`,
};

export default API_URLS;
