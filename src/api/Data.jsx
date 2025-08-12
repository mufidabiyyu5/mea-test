import axios from "axios";

const API_URL = "https://staging.skilskul.co.id/api";
const setAxios = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true,
});

export const fetchData = async (endpoint) => {
    try {
        const response = await setAxios.get(endpoint);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}