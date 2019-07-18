import { useState, useEffect } from "react";
import fetch from "isomorphic-fetch";
import jsCookie from "js-cookie";

function useFetch(url, method, body) {
  const SERVER = process.env.NOVOCORE_SERVER;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = jsCookie.get("token");
  const user = jsCookie.get("user");
  const headers = new Headers();
  headers.set("Authorization", token);

  const params = {
    mode: "cors",
    method,
    headers
  };

  if (body) {
    params.body = JSON.stringify(body);
    headers.set("content-type", "application/json");
  }

  async function fetchUrl() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    const response = await fetch(SERVER + url, params);
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
