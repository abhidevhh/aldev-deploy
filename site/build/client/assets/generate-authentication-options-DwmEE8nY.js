import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { data } from "react-router";
import { g as getWebAuthnConfig, p as passkeyCookie } from "./webauthn.server-CjNXEoOQ.js";
import "zod";
import "./env.server-DPCBxZtL.js";
import "./misc-CQO4K9rH.js";
import "date-fns";
async function action({
  request
}) {
  const config = getWebAuthnConfig(request);
  const options = await generateAuthenticationOptions({
    rpID: config.rpID,
    userVerification: config.authenticatorSelection.userVerification
  });
  const cookieHeader = await passkeyCookie.serialize({
    challenge: options.challenge
  });
  return data({
    options
  }, {
    headers: {
      "Set-Cookie": cookieHeader
    }
  });
}
export {
  action
};
