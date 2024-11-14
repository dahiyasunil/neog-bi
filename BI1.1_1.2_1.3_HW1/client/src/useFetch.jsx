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
          const errorData = await response.json();
          if (response.status === 500 || response.status === 204) {
            setError(errorData.msg || "An error occurred.");
            setData(null);
          }
          throw new Error("A network error occurred!");
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
