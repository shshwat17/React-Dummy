import { useEffect, useState } from "react";

const useFetch = ({ url = "https://fakestoreapi.com/products/1" } = {}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [url]);

  return { data };
};

export default useFetch;
