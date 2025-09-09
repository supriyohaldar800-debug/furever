// hooks/useApiData.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useApiData = (url, defaultValue) => {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('API fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useApiData;