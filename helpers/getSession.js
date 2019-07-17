import jsHttpCookie from "cookie";

export default function getSession(req) {
  const cookieJSON = {};
  if (req) {
    const cookies = req.headers.cookie;
    if (typeof cookies === "string") {
      cookieJSON.cookies = jsHttpCookie.parse(cookies);
    }
  }

  return cookieJSON.cookies;
}

export function getSessionLength(req) {
  const cookieJSON = {};
  if (req) {
    const cookies = req.headers.cookie;
    if (typeof cookies === "string") {
      cookieJSON.token = jsHttpCookie.parse(cookies);
    }
  }

  return Object.keys(cookieJSON).length;
}
