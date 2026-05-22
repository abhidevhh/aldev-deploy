import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { data } from "react-router";
import { h as getDomainUrl, i as getErrorMessage } from "./misc-CQO4K9rH.js";
import { prisma } from "./prisma.server-Cj9LRFmw.js";
import { requireUser } from "./session.server-DZ6f3pgH.js";
import { R as RegistrationResponseSchema, p as passkeyCookie, P as PasskeyCookieSchema } from "./webauthn.server-CjNXEoOQ.js";
import "date-fns";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./favorites-Bsg0upig.js";
import "litefs-js";
import "litefs-js/remix";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
async function action({
  request
}) {
  const user = await requireUser(request);
  if (request.method !== "POST") {
    return data({
      status: "error",
      error: "Method not allowed"
    }, 405);
  }
  const body = await request.json();
  const result = RegistrationResponseSchema.safeParse(body);
  if (!result.success) {
    return data({
      status: "error",
      error: "Invalid registration response"
    }, 400);
  }
  const data$1 = result.data;
  const passkeyCookieData = await passkeyCookie.parse(request.headers.get("Cookie"));
  const parsedPasskeyCookieData = PasskeyCookieSchema.safeParse(passkeyCookieData);
  if (!parsedPasskeyCookieData.success) {
    return data({
      status: "error",
      error: "No challenge found"
    }, 400);
  }
  const {
    challenge,
    userId: webauthnUserId
  } = parsedPasskeyCookieData.data;
  const domain = new URL(getDomainUrl(request)).hostname;
  const rpID = domain;
  const origin = getDomainUrl(request);
  let verification;
  try {
    verification = await verifyRegistrationResponse({
      response: data$1,
      expectedChallenge: challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      requireUserVerification: true
    });
  } catch (error) {
    console.error(error);
    return data({
      status: "error",
      error: getErrorMessage(error)
    }, 400);
  }
  const {
    verified,
    registrationInfo
  } = verification;
  if (!verified || !registrationInfo) {
    return data({
      status: "error",
      error: "Registration verification failed"
    }, 400);
  }
  const {
    credential,
    credentialDeviceType,
    credentialBackedUp,
    aaguid
  } = registrationInfo;
  const existingPasskey = await prisma.passkey.findUnique({
    where: {
      id: credential.id
    },
    select: {
      id: true
    }
  });
  if (existingPasskey) {
    return data({
      status: "error",
      error: "This passkey has already been registered"
    }, 400);
  }
  await prisma.passkey.create({
    data: {
      id: credential.id,
      aaguid,
      publicKey: new Uint8Array(credential.publicKey),
      userId: user.id,
      webauthnUserId,
      counter: credential.counter,
      deviceType: credentialDeviceType,
      backedUp: credentialBackedUp,
      transports: credential.transports?.join(",")
    }
  });
  return data({
    status: "success"
  }, {
    headers: {
      "Set-Cookie": await passkeyCookie.serialize("", {
        maxAge: 0
      })
    }
  });
}
export {
  action
};
