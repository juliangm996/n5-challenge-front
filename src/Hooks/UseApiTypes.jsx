// useApi.js
import { useState } from 'react';
import axios from 'axios';

const UseApiTypes = () => {
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

    return { data, loading, error, get };
};

export default UseApiTypes;
