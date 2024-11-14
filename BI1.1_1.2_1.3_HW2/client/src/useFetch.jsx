import { useState, useEffect } from "react";

const useFetch = (url, initialData) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          setData(initialData);
          const errorData = await response.json();
          if (response.status === 500) {
            setError(errorData.msg || `Something went wrong!`);
          } else {
            setError(`Something went wrong!`);
          }
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.data) {
          setData(responseData.data);
          setError(null);
        } else {
          setData(initialData);
          setError(responseData.msg || `No Data found.`);
        }
      })
      .catch((err) => {
        setData(initialData);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
