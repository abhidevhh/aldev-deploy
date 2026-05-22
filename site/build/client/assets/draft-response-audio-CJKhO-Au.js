import { c as createDraftAudioResponse } from "./draft-audio-response.server-PaAFU8qB.js";
import { prisma } from "./prisma.server-Cj9LRFmw.js";
import { requireAdminUser } from "./session.server-DZ6f3pgH.js";
import "node:stream";
import "@react-router/node";
import "./abhi-call-audio-storage.server-BBLgNzCx.js";
import "@aws-sdk/client-s3";
import "./env.server-DPCBxZtL.js";
import "zod";
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
import "react-router";
async function loader({
  request
}) {
  await requireAdminUser(request);
  const url = new URL(request.url);
  const callId = url.searchParams.get("callId");
  if (!callId) throw new Response("callId is required", {
    status: 400
  });
  const draft = await prisma.abhiCallEpisodeDraft.findUnique({
    where: {
      callId
    },
    select: {
      responseAudioKey: true,
      responseAudioContentType: true,
      responseAudioSize: true
    }
  });
  if (!draft) throw new Response("Not found", {
    status: 404
  });
  if (!draft.responseAudioKey) throw new Response("Not found", {
    status: 404
  });
  return await createDraftAudioResponse({
    request,
    key: draft.responseAudioKey,
    contentType: draft.responseAudioContentType,
    size: draft.responseAudioSize,
    defaultContentType: "audio/webm"
  });
}
export {
  loader
};
