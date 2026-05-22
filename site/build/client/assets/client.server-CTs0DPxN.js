import { createCookieSessionStorage } from "react-router";
import * as uuid from "uuid";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import "zod";
const clientStorage = createCookieSessionStorage({
  cookie: {
    name: "KCD_client_id",
    secure: true,
    secrets: [getEnv().SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    httpOnly: true
  }
});
async function getClientSession(request, user) {
  const session = await clientStorage.getSession(request.headers.get("Cookie"));
  const expires = /* @__PURE__ */ new Date("2088-10-18");
  const initialValue = user ? null : await clientStorage.commitSession(session, { expires });
  async function commit() {
    if (user) {
      if (initialValue) {
        const value = await clientStorage.destroySession(session);
        return value;
      } else {
        return null;
      }
    } else {
      const currentValue = await clientStorage.commitSession(session, {
        expires
      });
      return currentValue === initialValue ? null : currentValue;
    }
  }
  function getClientId() {
    if (user) return null;
    let clientId = session.get("clientId");
    if (typeof clientId === "string") return clientId;
    clientId = uuid.v4();
    session.set("clientId", clientId);
    return clientId;
  }
  getClientId();
  return {
    getClientId,
    commit,
    setUser(usr) {
      user = usr;
    },
    /**
     * This will initialize a Headers object if one is not provided.
     * It will set the 'Set-Cookie' header value on that headers object.
     * It will then return that Headers object.
     */
    getHeaders: async (headers = new Headers()) => {
      const value = await commit();
      if (!value) return headers;
      if (headers instanceof Headers) {
        headers.append("Set-Cookie", value);
      } else if (Array.isArray(headers)) {
        headers.push(["Set-Cookie", value]);
      } else {
        headers["Set-Cookie"] = value;
      }
      return headers;
    }
  };
}
export {
  getClientSession
};
//# sourceMappingURL=client.server-CTs0DPxN.js.map
