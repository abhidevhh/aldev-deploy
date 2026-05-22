import { Readable } from "node:stream";
import { DeleteObjectCommand, HeadObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import "zod";
function parseHttpByteRangeHeader(rangeHeader, size) {
  const match = rangeHeader.match(/^bytes=(?<start>\d*)-(?<end>\d*)$/);
  const startRaw = match?.groups?.start ?? null;
  const endRaw = match?.groups?.end ?? null;
  if (startRaw === null || endRaw === null) return null;
  if (!startRaw && !endRaw) return null;
  if (!startRaw) {
    const suffixLength = Number(endRaw);
    if (!Number.isFinite(suffixLength) || suffixLength <= 0) return null;
    const start2 = Math.max(0, size - suffixLength);
    const end2 = size - 1;
    return { start: start2, end: end2 };
  }
  const start = Number(startRaw);
  const end = endRaw ? Number(endRaw) : size - 1;
  if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
  if (start < 0 || end < start) return null;
  if (start >= size) return null;
  return { start, end: Math.min(end, size - 1) };
}
function parseBase64DataUrl(dataUrl) {
  const match = dataUrl.match(/^data:(?<type>.+?);base64,(?<data>.+)$/);
  const contentType = match?.groups?.type;
  const base64 = match?.groups?.data;
  if (!contentType || !base64) {
    throw new Error("Invalid base64 data URL");
  }
  return { buffer: Buffer.from(base64, "base64"), contentType };
}
function extFromContentType(contentType) {
  const ct = contentType.toLowerCase();
  if (ct.includes("audio/webm")) return ".webm";
  if (ct.includes("audio/mpeg") || ct.includes("audio/mp3")) return ".mp3";
  if (ct.includes("audio/wav")) return ".wav";
  if (ct.includes("audio/ogg")) return ".ogg";
  return "";
}
function getAbhiCallBucketName() {
  return getEnv().ABHI_CALL_R2_BUCKET;
}
function getR2ConfigFromEnv() {
  const env = getEnv();
  const endpoint = env.R2_ENDPOINT;
  const accessKeyId = env.R2_ACCESS_KEY_ID;
  const secretAccessKey = env.R2_SECRET_ACCESS_KEY;
  return { endpoint, accessKeyId, secretAccessKey };
}
function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}
let _r2Client = null;
let _r2ClientConfig = null;
function getR2Client() {
  const { endpoint, accessKeyId, secretAccessKey } = getR2ConfigFromEnv();
  if (!isNonEmptyString(endpoint)) throw new Error("R2_ENDPOINT is required");
  if (!isNonEmptyString(accessKeyId))
    throw new Error("R2_ACCESS_KEY_ID is required");
  if (!isNonEmptyString(secretAccessKey))
    throw new Error("R2_SECRET_ACCESS_KEY is required");
  if (_r2Client && _r2ClientConfig && _r2ClientConfig.endpoint === endpoint && _r2ClientConfig.accessKeyId === accessKeyId && _r2ClientConfig.secretAccessKey === secretAccessKey) {
    return _r2Client;
  }
  _r2ClientConfig = { endpoint, accessKeyId, secretAccessKey };
  _r2Client = new S3Client({
    region: "auto",
    endpoint,
    forcePathStyle: true,
    credentials: { accessKeyId, secretAccessKey }
  });
  return _r2Client;
}
function createR2Store({ bucket }) {
  const client = getR2Client();
  return {
    async put({ key, body, contentType }) {
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: body,
          ContentType: contentType
        })
      );
      return { key, contentType, size: body.byteLength };
    },
    async getStream({ key, range }) {
      const res = await client.send(
        new GetObjectCommand({
          Bucket: bucket,
          Key: key,
          Range: range ? `bytes=${range.start}-${range.end}` : void 0
        })
      );
      const body = res.Body;
      if (!(body instanceof Readable)) {
        throw new Error("Unexpected R2 response body type");
      }
      return { body };
    },
    async head({ key }) {
      const res = await client.send(
        new HeadObjectCommand({
          Bucket: bucket,
          Key: key
        })
      );
      const size = res.ContentLength;
      if (typeof size !== "number" || !Number.isFinite(size) || size <= 0) {
        throw new Error("Unexpected audio ContentLength");
      }
      const contentType = typeof res.ContentType === "string" && res.ContentType.trim() ? res.ContentType.trim() : null;
      return { size, contentType };
    },
    async delete({ key }) {
      await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
    }
  };
}
function getStore() {
  const bucket = getAbhiCallBucketName();
  return { store: createR2Store({ bucket }), bucket, source: "r2" };
}
function getCallAudioKey(callId, contentType) {
  const ext = extFromContentType(contentType);
  return `abhi-call/calls/${callId}/call${ext}`;
}
function getEpisodeDraftResponseAudioKey(draftId, contentType) {
  const ext = extFromContentType(contentType);
  return `abhi-call/drafts/${draftId}/response${ext}`;
}
async function putCallAudioFromDataUrl({
  callId,
  dataUrl
}) {
  const { buffer, contentType } = parseBase64DataUrl(dataUrl);
  const { store } = getStore();
  const key = getCallAudioKey(callId, contentType);
  return await store.put({ key, body: buffer, contentType });
}
async function putEpisodeDraftResponseAudioFromBuffer({
  draftId,
  audio,
  contentType
}) {
  const { store } = getStore();
  const key = getEpisodeDraftResponseAudioKey(draftId, contentType);
  return await store.put({ key, body: audio, contentType });
}
async function getAudioStream({
  key,
  range
}) {
  const { store } = getStore();
  return await store.getStream({ key, range });
}
async function headAudioObject({ key }) {
  const { store } = getStore();
  return await store.head({ key });
}
async function deleteAudioObject({ key }) {
  const { store } = getStore();
  await store.delete({ key });
}
async function getAudioBuffer({ key }) {
  const { body } = await getAudioStream({ key });
  const chunks = [];
  for await (const chunk of body) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}
export {
  deleteAudioObject,
  getAudioBuffer,
  getAudioStream,
  getCallAudioKey,
  getEpisodeDraftResponseAudioKey,
  headAudioObject,
  parseBase64DataUrl,
  parseHttpByteRangeHeader,
  putCallAudioFromDataUrl,
  putEpisodeDraftResponseAudioFromBuffer
};
//# sourceMappingURL=abhi-call-audio-storage.server-BBLgNzCx.js.map
