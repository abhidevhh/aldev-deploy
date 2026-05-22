import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { data } from "react-router";
import { g as getWebAuthnConfig, p as passkeyCookie } from "./webauthn.server-CU_0ehIz.js";
import "zod";
import "./env.server-DPCBxZtL.js";
import "./misc-DM3BUXHg.js";
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
//# sourceMappingURL=generate-authentication-options-CQvJ01V_.js.map
