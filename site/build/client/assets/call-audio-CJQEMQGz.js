import { Readable } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { headAudioObject, getAudioBuffer, parseHttpByteRangeHeader, getAudioStream } from "./abhi-call-audio-storage.server-BBLgNzCx.js";
import { prisma } from "./prisma.server-Cj9LRFmw.js";
import { requireUser } from "./session.server-DZ6f3pgH.js";
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
  const user = await requireUser(request);
  const url = new URL(request.url);
  const callId = url.searchParams.get("callId");
  if (!callId) throw new Response("callId is required", {
    status: 400
  });
  const isAdmin = user.role === "ADMIN";
  const call = await prisma.call.findFirst({
    where: isAdmin ? {
      id: callId
    } : {
      id: callId,
      userId: user.id
    },
    select: {
      audioKey: true,
      audioContentType: true,
      audioSize: true
    }
  });
  if (!call) throw new Response("Not found", {
    status: 404
  });
  if (!call.audioKey) throw new Response("Not found", {
    status: 404
  });
  const audioKey = call.audioKey;
  let contentType = call.audioContentType ?? "application/octet-stream";
  let size = call.audioSize ?? null;
  const rangeHeader = request.headers.get("range");
  if (typeof size !== "number" || !Number.isFinite(size) || size <= 0) {
    try {
      const head = await headAudioObject({
        key: audioKey
      });
      size = head.size;
      if (contentType === "application/octet-stream" && head.contentType) {
        contentType = head.contentType;
      }
      console.warn(`call-audio: missing/invalid audioSize for callId=${callId} audioKey=${audioKey} resolvedSize=${size} source=head`);
    } catch {
      const buffer = await getAudioBuffer({
        key: audioKey
      });
      size = buffer.byteLength;
      console.warn(`call-audio: missing/invalid audioSize for callId=${callId} audioKey=${audioKey} resolvedSize=${size} source=buffer`);
      const range2 = rangeHeader ? parseHttpByteRangeHeader(rangeHeader, size) : null;
      const body2 = range2 ? buffer.subarray(range2.start, range2.end + 1) : buffer;
      const stream = Readable.from(body2);
      return new Response(createReadableStreamFromReadable(stream), {
        status: range2 ? 206 : 200,
        headers: {
          "Content-Type": contentType,
          "Accept-Ranges": "bytes",
          ...range2 ? {
            "Content-Range": `bytes ${range2.start}-${range2.end}/${size}`,
            "Content-Length": String(range2.end - range2.start + 1)
          } : {
            "Content-Length": String(size)
          },
          "Cache-Control": "private, max-age=3600"
        }
      });
    }
  }
  const range = rangeHeader ? parseHttpByteRangeHeader(rangeHeader, size) : null;
  const {
    body
  } = await getAudioStream({
    key: audioKey,
    range: range ?? void 0
  });
  return new Response(createReadableStreamFromReadable(body), {
    status: range ? 206 : 200,
    headers: {
      "Content-Type": contentType,
      "Accept-Ranges": "bytes",
      ...range ? {
        "Content-Range": `bytes ${range.start}-${range.end}/${size}`,
        "Content-Length": String(range.end - range.start + 1)
      } : {
        "Content-Length": String(size)
      },
      "Cache-Control": "private, max-age=3600"
    }
  });
}
export {
  loader
};
