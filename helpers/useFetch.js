import { useState, useEffect } from "react";
import fetch from "isomorphic-fetch";
import jsCookie from "js-cookie";

function useFetch(url, method) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = jsCookie.get("token");
  const user = jsCookie.get("user");
  const params = {
    mode: "cors",
    method,
    headers: {
      Authorization: token
    }
  };

  async function fetchUrl() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    const response = await fetch(url, params);
    const json = await response.json();

    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    fetchUrl();
  }, []);

  return [data, loading];
}

export default useFetch;
