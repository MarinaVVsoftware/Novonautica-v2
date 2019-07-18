import { useState, useEffect } from "react";
import fetch from "isomorphic-fetch";
import jsCookie from "js-cookie";

function useFetch(url, method, body) {
  const server = process.env.NOVOCORE_SERVER;
  const [response, setResponse] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  /* Parámetros de fetch */
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(server + url, params);
        const json = await response.json();

        /* Obliga a setear los valores en el orden y momento correcto.
        Sin este if se producen errores de async indeseados. */
        if (response.ok) {
          setStatusCode(response.status);
          setResponse(json);
          setLoading(false);
        } else if (response.status) {
          setStatusCode(response.status);
          if (response.status > 400) {
            console.log("su puta madre");
            setResponse("La API ha fallado. Contacte a soporte.");
          } else setResponse(json);
          setError(true);
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setResponse(error);
      }
    };

    fetchData();
  }, []);

  return { response, loading, statusCode, error };
}

export default useFetch;
