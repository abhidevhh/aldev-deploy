import { getAudioBuffer } from "./abhi-call-audio-storage.server-BBLgNzCx.js";
import { g as getWorkersAiRunUrl, u as unwrapWorkersAiText } from "./cloudflare-ai-utils.server-D2ZFqcMo.js";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import { Buffer } from "node:buffer";
import { e as getErrorMessage } from "./misc-DM3BUXHg.js";
import { prisma } from "./prisma.server-MnXt9BdG.js";
function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function normalizeForComparison(text) {
  return text.trim().replace(/\s+/g, " ");
}
function countWords(text) {
  const normalized = normalizeForComparison(text);
  if (!normalized) return 0;
  return normalized.split(" ").length;
}
function estimateMaxTokensForTranscriptFormatting(transcript) {
  const normalized = normalizeForComparison(transcript);
  const approxTokens = Math.ceil(normalized.length / 4);
  return clampNumber(Math.ceil(approxTokens * 1.2) + 128, 512, 8192);
}
function stripSingleMarkdownCodeFence(text) {
  const trimmed = text.trim();
  const match = /^```(?:text|markdown)?\s*\n([\s\S]*?)\n```$/i.exec(trimmed);
  return match?.[1] ? match[1].trim() : text;
}
function extractBetweenMarkers({
  text,
  startMarker,
  endMarker
}) {
  const start = text.indexOf(startMarker);
  if (start === -1) return null;
  const end = text.indexOf(endMarker, start + startMarker.length);
  if (end === -1) return null;
  return text.slice(start + startMarker.length, end).trim();
}
function countSeparatorLines(text) {
  return (text.match(/^---$/gm) ?? []).length;
}
async function formatAbhiCallTranscriptWithWorkersAi({
  transcript,
  callTitle,
  callerNotes,
  callerName,
  model,
  maxTokens
}) {
  const env = getEnv();
  const apiToken = env.CLOUDFLARE_API_TOKEN;
  const modelToUse = model ?? env.CLOUDFLARE_AI_ABHI_CALL_TRANSCRIPT_FORMAT_MODEL;
  const input = transcript.trim();
  if (!input) {
    throw new Error("Missing transcript input for transcript formatting.");
  }
  const startMarker = "<<<TRANSCRIPT>>>";
  const endMarker = "<<<END TRANSCRIPT>>>";
  const maxTokensToUse = typeof maxTokens === "number" && Number.isFinite(maxTokens) && maxTokens > 0 ? clampNumber(Math.floor(maxTokens), 256, 8192) : estimateMaxTokensForTranscriptFormatting(input);
  const system = `
You format transcripts for the "call AbhiDev Podcast", hosted by AbhiDev.

Your job is to improve readability by inserting paragraph breaks (blank lines) and normalizing whitespace.
Do NOT add, remove, or reorder any words. Do NOT change speaker labels.
Keep speaker turns in the same order and never merge one speaker's turn into another.
For long single-speaker sections, insert paragraph breaks every few sentences or at clear topic shifts.

If the transcript includes separator lines containing only "---", keep those lines exactly as-is and on their own line.

Output only the final formatted transcript as plain text.
Do not include commentary, headings, JSON, or Markdown code fences.
`.trim();
  const contextLines = [
    callTitle?.trim() ? `Episode title: ${callTitle.trim()}` : null,
    callerNotes?.trim() ? `Caller notes: ${callerNotes.trim()}` : null,
    callerName?.trim() ? `Caller first name: ${callerName.trim()}` : null
  ].filter(Boolean);
  const user = `
${contextLines.length ? `${contextLines.join("\n")}

` : ""}Format this transcript into readable paragraphs.

${startMarker}
${input}
${endMarker}
`.trim();
  const url = getWorkersAiRunUrl(modelToUse);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "cf-aig-authorization": `Bearer ${env.CLOUDFLARE_AI_GATEWAY_AUTH_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      max_tokens: maxTokensToUse
    })
  });
  if (!res.ok) {
    const bodyText = await res.text().catch(() => "");
    throw new Error(
      `Cloudflare Workers AI transcript formatting failed: ${res.status} ${res.statusText}${bodyText ? `
${bodyText}` : ""}`
    );
  }
  const json = await res.json();
  const result = json?.result ?? json;
  const text = unwrapWorkersAiText(result);
  if (!text) {
    throw new Error(
      "Unexpected transcript formatting response shape from Workers AI"
    );
  }
  let formatted = stripSingleMarkdownCodeFence(text).trim();
  const extracted = extractBetweenMarkers({
    text: formatted,
    startMarker,
    endMarker
  });
  if (extracted) formatted = extracted;
  if (formatted.startsWith("{") && /"title"\s*:/.test(formatted) && /"description"\s*:/.test(formatted) && /"keywords"\s*:/.test(formatted)) {
    throw new Error("Transcript formatter returned metadata JSON unexpectedly.");
  }
  if (!formatted) {
    throw new Error("Transcript formatter returned an empty transcript.");
  }
  const originalSepCount = countSeparatorLines(input);
  if (originalSepCount > 0) {
    const formattedSepCount = countSeparatorLines(formatted);
    if (formattedSepCount !== originalSepCount) {
      throw new Error(
        `Transcript formatter changed separator count (${originalSepCount} -> ${formattedSepCount}).`
      );
    }
  }
  const inputNormalized = normalizeForComparison(input);
  const formattedNormalized = normalizeForComparison(formatted);
  const minLengthForTruncationCheck = 1e3;
  if (inputNormalized.length >= minLengthForTruncationCheck) {
    const lengthRatio = formattedNormalized.length / inputNormalized.length;
    const inputWords = countWords(inputNormalized);
    const formattedWords = countWords(formattedNormalized);
    const wordRatio = inputWords ? formattedWords / inputWords : 1;
    if (lengthRatio < 0.95 || wordRatio < 0.95) {
      throw new Error(
        `Transcript formatter output appears truncated (max_tokens=${maxTokensToUse}, lengthRatio=${lengthRatio.toFixed(
          2
        )}, wordRatio=${wordRatio.toFixed(2)}).`
      );
    }
  }
  return formatted;
}
async function transcribeMp3WithWorkersAi({
  mp3,
  callerName,
  callTitle,
  callerNotes,
  model = getEnv().CLOUDFLARE_AI_TRANSCRIPTION_MODEL
}) {
  const env = getEnv();
  const apiToken = env.CLOUDFLARE_API_TOKEN;
  const url = getWorkersAiRunUrl(model);
  const mp3Body = mp3.buffer instanceof ArrayBuffer ? new Uint8Array(mp3.buffer, mp3.byteOffset, mp3.byteLength) : Uint8Array.from(mp3);
  const isWhisperLargeV3Turbo = model.includes("whisper-large-v3-turbo");
  const body = isWhisperLargeV3Turbo ? JSON.stringify({
    // `whisper-large-v3-turbo` expects base64 in the JSON payload.
    // Docs: https://developers.cloudflare.com/workers-ai/models/whisper-large-v3-turbo/
    audio: Buffer.from(mp3Body).toString("base64"),
    language: "en",
    vad_filter: true,
    // Add a little context for proper nouns/domains we care about.
    initial_prompt: `
This is the Call Kent Podcast hosted by AbhiDev. It starts with an intro from an "announcer" and then leads into the caller's call which is a question or discussion topic. Then there is a short interlude from the announcer. Then Kent gives his response. Then there is an outro from the announcer.
Canonical website domain: kentcdodds.com
Canonical calls page: kentcdodds.com/calls
${callTitle?.trim() ? `Episode title: ${callTitle.trim()}` : ""}
${callerNotes?.trim() ? `Caller notes: ${callerNotes.trim()}` : ""}
Proper nouns:
- AbhiDev
${callerName ? `- ${callerName}` : ""}
`.trim()
  }) : mp3Body;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "cf-aig-authorization": `Bearer ${env.CLOUDFLARE_AI_GATEWAY_AUTH_TOKEN}`,
      "Content-Type": isWhisperLargeV3Turbo ? "application/json" : "audio/mpeg"
    },
    body
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Cloudflare Workers AI transcription failed: ${res.status} ${res.statusText}${text ? `
${text}` : ""}`
    );
  }
  const json = await res.json();
  const result = json?.result ?? json;
  if (!result?.text || typeof result.text !== "string") {
    throw new Error(`Unexpected transcription response shape from Workers AI`);
  }
  return result.text;
}
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function normalizeCallerTranscriptForEpisode({
  callerTranscript,
  callerName
}) {
  const trimmed = callerTranscript?.trim();
  if (!trimmed) return null;
  const labels = [callerName?.trim(), "Caller"].filter(
    (label) => Boolean(label)
  );
  for (const label of labels) {
    const labelRegex = new RegExp(`^${escapeRegExp(label)}:\\s*`, "i");
    if (labelRegex.test(trimmed)) {
      return trimmed.replace(labelRegex, "").trim();
    }
  }
  return trimmed;
}
async function startAbhiCallCallerTranscriptProcessing(callId, { force = false } = {}) {
  try {
    const started = await prisma.call.updateMany({
      where: {
        id: callId,
        ...force ? {} : { callerTranscriptStatus: { not: "PROCESSING" } }
      },
      data: {
        callerTranscriptStatus: "PROCESSING",
        callerTranscriptErrorMessage: null
      }
    });
    if (started.count !== 1) return;
    const call = await prisma.call.findUnique({
      where: { id: callId },
      select: {
        audioKey: true,
        title: true,
        notes: true,
        isAnonymous: true,
        user: { select: { firstName: true } }
      }
    });
    if (!call) {
      throw new Error("Call not found.");
    }
    if (!call.audioKey) {
      throw new Error("Caller audio is missing (audioKey is null).");
    }
    const callerAudio = await getAudioBuffer({ key: call.audioKey });
    const callerName = call.isAnonymous ? void 0 : call.user.firstName;
    const rawTranscript = (await transcribeMp3WithWorkersAi({
      mp3: callerAudio,
      callerName,
      callTitle: call.title,
      callerNotes: call.notes ?? void 0
    })).trim();
    if (!rawTranscript) {
      throw new Error("Workers AI transcription returned an empty transcript.");
    }
    const transcript = (await formatAbhiCallTranscriptWithWorkersAi({
      transcript: `${callerName ?? "Caller"}: ${rawTranscript}`,
      callTitle: call.title,
      callerNotes: call.notes,
      callerName
    }).catch((error) => {
      console.error(
        "Caller transcript formatting failed; using unformatted transcript.",
        { callId, error: getErrorMessage(error) }
      );
      return `${callerName ?? "Caller"}: ${rawTranscript}`;
    })).trim();
    if (!transcript) {
      throw new Error(
        "Caller transcript formatting returned an empty transcript."
      );
    }
    await prisma.call.updateMany({
      where: { id: callId, callerTranscriptStatus: "PROCESSING" },
      data: {
        callerTranscript: transcript,
        callerTranscriptStatus: "READY",
        callerTranscriptErrorMessage: null
      }
    });
  } catch (error) {
    await prisma.call.updateMany({
      where: { id: callId, callerTranscriptStatus: "PROCESSING" },
      data: {
        callerTranscriptStatus: "ERROR",
        callerTranscriptErrorMessage: getErrorMessage(error)
      }
    });
  }
}
export {
  formatAbhiCallTranscriptWithWorkersAi as f,
  normalizeCallerTranscriptForEpisode as n,
  startAbhiCallCallerTranscriptProcessing as s,
  transcribeMp3WithWorkersAi as t
};
//# sourceMappingURL=abhi-call-caller-transcript.server-DKIal2t-.js.map
