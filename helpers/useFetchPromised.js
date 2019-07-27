import { useState, useEffect } from "react";
import fetch from "isomorphic-fetch";
import jsCookie from "js-cookie";

async function useFetch(url, method, body) {
  const SERVER = process.env.NOVOCORE_SERVER_LOCAL;

  /* Parámetros de fetch */
  const token = jsCookie.get("token");
  const user = jsCookie.get("user");
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Authorization", token);

  let params = {
    method: method,
    headers: headers
  };

  if (body && method != "GET") params.body = JSON.stringify(body);

  return await fetch(SERVER + url, params);
}

export default useFetch;
