import "isomorphic-fetch";
import jsHttpCookie from "cookie";

function getSession(req) {
  const cookieJSON = {};
  if (req) {
    const cookies = req.headers.cookie;
    if (typeof cookies === "string") {
      cookieJSON.token = jsHttpCookie.parse(cookies);
    }
  }

  return Object.keys(cookieJSON).length;
}

export default getSession;
