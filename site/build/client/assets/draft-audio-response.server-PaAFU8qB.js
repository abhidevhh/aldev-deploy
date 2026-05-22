import { Readable } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { getAudioBuffer, parseHttpByteRangeHeader, getAudioStream } from "./abhi-call-audio-storage.server-BBLgNzCx.js";
async function createDraftAudioResponse({
  request,
  key,
  contentType,
  size,
  defaultContentType
}) {
  const rangeHeader = request.headers.get("range");
  const resolvedContentType = contentType ?? defaultContentType;
  if (typeof size !== "number" || !Number.isFinite(size) || size <= 0) {
    const buffer = await getAudioBuffer({ key });
    const totalSize = buffer.byteLength;
    const range2 = rangeHeader ? parseHttpByteRangeHeader(rangeHeader, totalSize) : null;
    const body2 = range2 ? buffer.subarray(range2.start, range2.end + 1) : buffer;
    const stream = Readable.from(body2);
    return new Response(createReadableStreamFromReadable(stream), {
      status: range2 ? 206 : 200,
      headers: {
        "Content-Type": resolvedContentType,
        "Accept-Ranges": "bytes",
        ...range2 ? {
          "Content-Range": `bytes ${range2.start}-${range2.end}/${totalSize}`,
          "Content-Length": String(range2.end - range2.start + 1)
        } : { "Content-Length": String(totalSize) },
        "Cache-Control": "private, max-age=3600"
      }
    });
  }
  const range = rangeHeader ? parseHttpByteRangeHeader(rangeHeader, size) : null;
  const { body } = await getAudioStream({
    key,
    range: range ?? void 0
  });
  return new Response(createReadableStreamFromReadable(body), {
    status: range ? 206 : 200,
    headers: {
      "Content-Type": resolvedContentType,
      "Accept-Ranges": "bytes",
      ...range ? {
        "Content-Range": `bytes ${range.start}-${range.end}/${size}`,
        "Content-Length": String(range.end - range.start + 1)
      } : { "Content-Length": String(size) },
      "Cache-Control": "private, max-age=3600"
    }
  });
}
export {
  createDraftAudioResponse as c
};
//# sourceMappingURL=draft-audio-response.server-PaAFU8qB.js.map
