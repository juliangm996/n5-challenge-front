// useApi.js
import { useState } from 'react';
import axios from 'axios';

const useApi = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    const get = async (endpoint) => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}${endpoint}`);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };



    const post = async (endpoint, data) => {
        try {
            setLoading(true);
            await axios.post(`${apiUrl}${endpoint}`, data);
            setLoading(false);
            // Puedes agregar lógica adicional si lo necesitas
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const put = async (endpoint, data) => {
        try {
            setLoading(true);
            await axios.put(`${apiUrl}${endpoint}`, data);
            setLoading(false);
            // Puedes agregar lógica adicional si lo necesitas
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return { data, loading, error, get, post, put };
};

export default useApi;
