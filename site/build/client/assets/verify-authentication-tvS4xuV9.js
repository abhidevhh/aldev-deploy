import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { data } from "react-router";
import { z } from "zod";
import { g as getLoginInfoSession } from "./login.server-Bn92r_Ja.js";
import { prisma } from "./prisma.server-Cj9LRFmw.js";
import { getSession } from "./session.server-DZ6f3pgH.js";
import { p as passkeyCookie, g as getWebAuthnConfig } from "./webauthn.server-CjNXEoOQ.js";
import "./env.server-DPCBxZtL.js";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-Bsg0upig.js";
import "litefs-js";
import "litefs-js/remix";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "./misc-CQO4K9rH.js";
import "date-fns";
const AuthenticationResponseSchema = z.object({
  id: z.string(),
  rawId: z.string(),
  response: z.object({
    clientDataJSON: z.string(),
    authenticatorData: z.string(),
    signature: z.string(),
    userHandle: z.string().optional()
  }),
  type: z.literal("public-key"),
  clientExtensionResults: z.object({
    appid: z.boolean().optional(),
    credProps: z.object({
      rk: z.boolean().optional()
    }).optional(),
    hmacCreateSecret: z.boolean().optional()
  })
});
async function action({
  request
}) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await passkeyCookie.parse(cookieHeader);
  const deletePasskeyCookie = await passkeyCookie.serialize("", {
    maxAge: 0
  });
  try {
    if (!cookie?.challenge) {
      throw new Error("Authentication challenge not found");
    }
    const body = await request.json();
    const result = AuthenticationResponseSchema.safeParse(body);
    if (!result.success) {
      throw new Error("Invalid authentication response");
    }
    const passkey = await prisma.passkey.findUnique({
      where: {
        id: result.data.id
      },
      include: {
        user: true
      }
    });
    if (!passkey) {
      throw new Error("Passkey not found");
    }
    const config = getWebAuthnConfig(request);
    const verification = await verifyAuthenticationResponse({
      response: result.data,
      expectedChallenge: cookie.challenge,
      expectedOrigin: config.origin,
      expectedRPID: config.rpID,
      credential: {
        id: result.data.id,
        publicKey: passkey.publicKey,
        counter: Number(passkey.counter)
      }
    });
    if (!verification.verified) {
      throw new Error("Authentication verification failed");
    }
    await prisma.passkey.update({
      where: {
        id: passkey.id
      },
      data: {
        counter: BigInt(verification.authenticationInfo.newCounter)
      }
    });
    const session = await getSession(request);
    await session.signIn(passkey.user);
    const headers = new Headers({
      "Set-Cookie": deletePasskeyCookie
    });
    const loginSession = await getLoginInfoSession(request);
    loginSession.clean();
    await loginSession.getHeaders(headers);
    await session.getHeaders(headers);
    return data({
      status: "success"
    }, {
      headers
    });
  } catch (error) {
    console.error("Error during authentication verification:", error);
    return data({
      status: "error",
      error: error instanceof Error ? error.message : "Verification failed"
    }, {
      status: 400,
      headers: {
        "Set-Cookie": deletePasskeyCookie
      }
    });
  }
}
export {
  action
};
