import { useState, useEffect } from "react";

const useApiRequest = (url, method = "GET", body = null, headers = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body: body ? JSON.stringify(body) : null,
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || "Something went wrong!");
        }

        setData(responseData);
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url, method, body, headers]);

  return { isLoading, error, data };
};

export default useApiRequest;
