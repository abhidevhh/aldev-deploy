import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { getAudioBuffer } from "./abhi-call-audio-storage.server-BBLgNzCx.js";
import { n as normalizeCallerTranscriptForEpisode, t as transcribeMp3WithWorkersAi, f as formatAbhiCallTranscriptWithWorkersAi } from "./abhi-call-caller-transcript.server-DKIal2t-.js";
import { g as getWorkersAiRunUrl, u as unwrapWorkersAiText } from "./cloudflare-ai-utils.server-D2ZFqcMo.js";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import { e as getErrorMessage } from "./misc-DM3BUXHg.js";
import { prisma } from "./prisma.server-MnXt9BdG.js";
import "node:stream";
import "@aws-sdk/client-s3";
import "node:buffer";
import "date-fns";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-BOCNblj8.js";
import "litefs-js";
import "litefs-js/remix";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
const abhiCallIntroTranscript = `
You're listening to the call AbhiDev Podcast where AbhiDev answers questions and gives insights to software engineers like you.

Now let's hear the call.
`.trim();
const abhiCallInterludeTranscript = `
That was the call.

Here is what I built.
`.trim();
const abhiCallOutroTranscript = `
This has been the call AbhiDev Podcast.

Learn more about me at abhidev.com and get your own questions answered at abhidev.com/calls.
`.trim();
function assembleAbhiCallTranscript({
  callerTranscript,
  abhiTranscript,
  callerName
}) {
  return `
Announcer: ${abhiCallIntroTranscript}

---

${callerName ?? "Caller"}: ${callerTranscript.trim()}

---

Announcer: ${abhiCallInterludeTranscript}

---

Kent: ${abhiTranscript.trim()}

---

Announcer: ${abhiCallOutroTranscript}
`.trim();
}
function extractJsonObjectFromText(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < 0 || end <= start) {
    throw new Error("Workers AI did not return JSON");
  }
  const jsonText = text.slice(start, end + 1);
  return JSON.parse(jsonText);
}
function normalizeKeywords(value) {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) {
    return value.filter((v) => typeof v === "string").map((v) => v.trim()).filter(Boolean).join(", ");
  }
  return "";
}
function clampTitle(title) {
  const cleaned = title.trim().replace(/\s+/g, " ");
  return cleaned.length > 80 ? `${cleaned.slice(0, 77).trimEnd()}...` : cleaned;
}
async function generateAbhiCallEpisodeMetadataWithWorkersAi({
  transcript,
  callerTranscript,
  responderTranscript,
  callTitle,
  callerNotes,
  model
}) {
  const env = getEnv();
  const apiToken = env.CLOUDFLARE_API_TOKEN;
  const modelToUse = model ?? env.CLOUDFLARE_AI_ABHI_CALL_METADATA_MODEL;
  const canonicalSiteUrl = "https://abhidev.com";
  const canonicalCallsUrl = `${canonicalSiteUrl}/calls`;
  const system = `
You write metadata for the "call AbhiDev Podcast", hosted by AbhiDev.
Only use information that is explicitly present in the provided transcripts and/or caller notes.
Do NOT invent details (names, companies, sponsors, products, locations, links).
If you are unsure about a detail, omit it rather than guessing.
Canonical references (use these exactly; do not make up lookalike domains):
- AbhiDev website: ${canonicalSiteUrl}
- Leave a call / listen to episodes: ${canonicalCallsUrl}
If you include a URL/domain in the description, it must be copied verbatim from the transcript/caller notes OR be one of the canonical references above.
You will usually receive two transcript sections:
- Caller transcript (question / context)
- Responder transcript (Kent's answer)
Use both sections to craft accurate, specific metadata.
Given the transcripts, produce:
- title: <= 80 characters
- description: 2-6 sentences, markdown is allowed; focus on what was asked + what Kent answered; avoid generic filler
- description may optionally end with a single call-to-action sentence using the canonical references above
- keywords: 1-5 items, comma-separated
Output ONLY valid JSON with keys: title, description, keywords.
`.trim();
  const hasSegmentTranscripts = Boolean(
    callerTranscript?.trim() && responderTranscript?.trim()
  );
  const transcriptBlock = hasSegmentTranscripts ? `
# Transcripts:

## Caller transcript:

${callerTranscript.trim()}

## Responder transcript (Kent's answer):

${responderTranscript.trim()}
`.trim() : transcript?.trim() ? `
# Transcript:

${transcript.trim()}
`.trim() : "";
  if (!transcriptBlock) {
    throw new Error(
      "Missing transcript input: provide `callerTranscript` + `responderTranscript` or `transcript`."
    );
  }
  const user = `
${callTitle ? `Caller-provided title: ${callTitle}

` : ""}${callerNotes?.trim() ? `Caller notes: ${callerNotes.trim()}

` : ""}${transcriptBlock}
`.trim();
  const url = getWorkersAiRunUrl({ model: modelToUse });
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
      max_tokens: 800
    })
  });
  if (!res.ok) {
    const bodyText = await res.text().catch(() => "");
    throw new Error(
      `Cloudflare Workers AI metadata generation failed: ${res.status} ${res.statusText}${bodyText ? `
${bodyText}` : ""}`
    );
  }
  const json = await res.json();
  const result = json?.result ?? json;
  const text = unwrapWorkersAiText(result);
  if (!text) {
    throw new Error("Unexpected metadata response shape from Workers AI");
  }
  const obj = extractJsonObjectFromText(text);
  const titleRaw = typeof obj?.title === "string" ? obj.title : "";
  const descriptionRaw = typeof obj?.description === "string" ? obj.description : "";
  const keywordsRaw = normalizeKeywords(obj?.keywords);
  const title = clampTitle(titleRaw);
  const description = descriptionRaw.trim();
  const keywords = keywordsRaw.trim();
  if (!title) throw new Error("Workers AI metadata JSON missing `title`");
  if (!description)
    throw new Error("Workers AI metadata JSON missing `description`");
  if (!keywords) throw new Error("Workers AI metadata JSON missing `keywords`");
  return { title, description, keywords };
}
async function startAbhiCallEpisodeDraftProcessing(draftId) {
  try {
    const draft = await prisma.abhiCallEpisodeDraft.findUnique({
      where: { id: draftId },
      include: {
        call: {
          select: {
            id: true,
            title: true,
            notes: true,
            isAnonymous: true,
            callerTranscript: true,
            user: { select: { firstName: true } }
          }
        }
      }
    });
    if (!draft) return;
    if (draft.status !== "PROCESSING") return;
    let episodeMp3;
    let segmentMp3s = null;
    if (draft.episodeAudioKey) {
      episodeMp3 = await getAudioBuffer({ key: draft.episodeAudioKey });
    } else {
      throw new Error(
        "Episode audio is missing. Audio generation must complete before draft processing can continue."
      );
    }
    let transcript = draft.transcript;
    let transcriptForMetadata = null;
    let callerTranscriptForMetadata = null;
    let responderTranscriptForMetadata = null;
    if (!transcript) {
      const stepTranscribe = await prisma.abhiCallEpisodeDraft.updateMany({
        where: { id: draftId, status: "PROCESSING" },
        data: { step: "TRANSCRIBING", errorMessage: null }
      });
      if (stepTranscribe.count !== 1) return;
      const callerName = draft.call.isAnonymous ? void 0 : draft.call.user.firstName;
      const callTitle = draft.call.title;
      const callerNotes = draft.call.notes ?? void 0;
      const savedCallerTranscript = normalizeCallerTranscriptForEpisode({
        callerTranscript: draft.call.callerTranscript,
        callerName
      });
      if (!segmentMp3s && draft.callerSegmentAudioKey && draft.responseSegmentAudioKey) {
        const [callerMp3, responseMp3] = await Promise.all([
          getAudioBuffer({ key: draft.callerSegmentAudioKey }),
          getAudioBuffer({ key: draft.responseSegmentAudioKey })
        ]);
        segmentMp3s = { callerMp3, responseMp3 };
      }
      if (segmentMp3s) {
        const callerTranscriptPromise = savedCallerTranscript ? Promise.resolve(savedCallerTranscript) : transcribeMp3WithWorkersAi({
          mp3: segmentMp3s.callerMp3,
          callerName,
          callTitle,
          callerNotes
        });
        const [callerTranscript, abhiTranscript] = await Promise.all([
          callerTranscriptPromise,
          transcribeMp3WithWorkersAi({
            mp3: segmentMp3s.responseMp3,
            callerName,
            callTitle,
            callerNotes
          })
        ]);
        callerTranscriptForMetadata = callerTranscript;
        responderTranscriptForMetadata = abhiTranscript;
        transcript = assembleAbhiCallTranscript({
          callerName,
          callerTranscript,
          abhiTranscript
        });
      } else {
        transcript = await transcribeMp3WithWorkersAi({
          mp3: episodeMp3,
          callerName,
          callTitle,
          callerNotes
        });
      }
      const rawTranscript = transcript.trim();
      if (!rawTranscript) {
        throw new Error(
          "Workers AI transcription returned an empty transcript."
        );
      }
      transcriptForMetadata = rawTranscript;
      transcript = await formatAbhiCallTranscriptWithWorkersAi({
        transcript: rawTranscript,
        callTitle,
        callerNotes,
        callerName
      }).catch((error) => {
        console.error(
          "call AbhiDev transcript formatting failed; using unformatted transcript.",
          { draftId, error: getErrorMessage(error) }
        );
        return rawTranscript;
      });
      transcript = transcript.trim();
      if (!transcript) {
        throw new Error("Transcript formatting returned an empty transcript.");
      }
      const step3 = await prisma.abhiCallEpisodeDraft.updateMany({
        where: { id: draftId, status: "PROCESSING" },
        data: { transcript, step: "GENERATING_METADATA" }
      });
      if (step3.count !== 1) return;
    }
    if (!transcript) {
      throw new Error("Transcript is missing after transcription/formatting.");
    }
    if (!draft.title || !draft.description || !draft.keywords) {
      const stepMetadata = await prisma.abhiCallEpisodeDraft.updateMany({
        where: { id: draftId, status: "PROCESSING" },
        data: { step: "GENERATING_METADATA", errorMessage: null }
      });
      if (stepMetadata.count !== 1) return;
      const metadata = await generateAbhiCallEpisodeMetadataWithWorkersAi({
        // Prefer segment transcripts (caller + Kent) for metadata when available.
        ...callerTranscriptForMetadata && responderTranscriptForMetadata ? {
          callerTranscript: callerTranscriptForMetadata,
          responderTranscript: responderTranscriptForMetadata
        } : { transcript: transcriptForMetadata ?? transcript },
        callTitle: draft.call.title,
        callerNotes: draft.call.notes
      });
      const existingTitle = draft.title?.trim();
      const existingDescription = draft.description?.trim();
      const existingKeywords = draft.keywords?.trim();
      const nextTitle = existingTitle || metadata.title.trim();
      const nextDescription = existingDescription || metadata.description.trim();
      const nextKeywords = existingKeywords || metadata.keywords.trim();
      await prisma.abhiCallEpisodeDraft.updateMany({
        where: { id: draftId, status: "PROCESSING" },
        data: {
          title: nextTitle,
          description: nextDescription,
          keywords: nextKeywords,
          status: "READY",
          step: "DONE"
        }
      });
    } else {
      await prisma.abhiCallEpisodeDraft.updateMany({
        where: { id: draftId, status: "PROCESSING" },
        data: { status: "READY", step: "DONE" }
      });
    }
  } catch (error) {
    const message = getErrorMessage(error);
    await prisma.abhiCallEpisodeDraft.updateMany({
      where: { id: draftId, status: "PROCESSING" },
      data: { status: "ERROR", errorMessage: message, step: "DONE" }
    });
  }
}
const audioGenerationStartedEventSchema = z.object({
  type: z.literal("audio_generation_started"),
  draftId: z.string().trim().min(1),
  attempt: z.number().int().positive().optional()
});
const audioGenerationCompletedEventSchema = z.object({
  type: z.literal("audio_generation_completed"),
  draftId: z.string().trim().min(1),
  episodeAudioKey: z.string().trim().min(1),
  episodeAudioContentType: z.string().trim().min(1),
  episodeAudioSize: z.number().int().positive(),
  callerSegmentAudioKey: z.string().trim().min(1).optional().nullable(),
  responseSegmentAudioKey: z.string().trim().min(1).optional().nullable(),
  attempt: z.number().int().positive().optional()
});
const audioGenerationFailedEventSchema = z.object({
  type: z.literal("audio_generation_failed"),
  draftId: z.string().trim().min(1),
  errorMessage: z.string().trim().min(1),
  attempt: z.number().int().positive().optional()
});
const abhiCallAudioProcessorEventSchema = z.discriminatedUnion("type", [
  audioGenerationStartedEventSchema,
  audioGenerationCompletedEventSchema,
  audioGenerationFailedEventSchema
]);
function createAbhiCallAudioProcessorSignature({
  secret,
  timestamp,
  rawBody
}) {
  return createHmac("sha256", secret).update(`${timestamp}.${rawBody}`, "utf8").digest("hex");
}
function safeEqualHex(a, b) {
  if (a.length % 2 !== 0 || b.length % 2 !== 0) return false;
  const aBuffer = Buffer.from(a, "hex");
  const bBuffer = Buffer.from(b, "hex");
  if (aBuffer.length !== bBuffer.length) return false;
  return timingSafeEqual(aBuffer, bBuffer);
}
function parseAbhiCallAudioProcessorEvent(payload) {
  return abhiCallAudioProcessorEventSchema.parse(payload);
}
function verifyAbhiCallAudioProcessorCallbackSignature({
  timestamp,
  signature,
  rawBody,
  now = Date.now(),
  maxSkewSeconds = 300
}) {
  const secret = getEnv().ABHI_CALL_AUDIO_PROCESSOR_CALLBACK_SECRET;
  if (!secret) {
    throw new Error("ABHI_CALL_AUDIO_PROCESSOR_CALLBACK_SECRET is required.");
  }
  const timestampNumber = Number(timestamp);
  if (!Number.isFinite(timestampNumber)) return false;
  if (Math.abs(now - timestampNumber * 1e3) > maxSkewSeconds * 1e3) {
    return false;
  }
  const expected = createAbhiCallAudioProcessorSignature({
    secret,
    timestamp,
    rawBody
  });
  if (!/^[\da-f]+$/i.test(signature) || signature.length % 2 !== 0) return false;
  return safeEqualHex(expected, signature);
}
async function handleAbhiCallAudioProcessorEvent(event) {
  switch (event.type) {
    case "audio_generation_started": {
      await prisma.abhiCallEpisodeDraft.updateMany({
        where: {
          id: event.draftId,
          status: "PROCESSING",
          step: { in: ["STARTED", "GENERATING_AUDIO"] }
        },
        data: { step: "GENERATING_AUDIO", errorMessage: null }
      });
      return;
    }
    case "audio_generation_completed": {
      const updated = await prisma.abhiCallEpisodeDraft.updateMany({
        where: {
          id: event.draftId,
          status: "PROCESSING",
          step: { in: ["STARTED", "GENERATING_AUDIO"] }
        },
        data: {
          episodeAudioKey: event.episodeAudioKey,
          episodeAudioContentType: event.episodeAudioContentType,
          episodeAudioSize: event.episodeAudioSize,
          callerSegmentAudioKey: event.callerSegmentAudioKey ?? null,
          responseSegmentAudioKey: event.responseSegmentAudioKey ?? null,
          step: "TRANSCRIBING",
          errorMessage: null
        }
      });
      if (updated.count !== 1) return;
      void startAbhiCallEpisodeDraftProcessing(event.draftId);
      return;
    }
    case "audio_generation_failed": {
      await prisma.abhiCallEpisodeDraft.updateMany({
        where: { id: event.draftId, status: "PROCESSING" },
        data: {
          status: "ERROR",
          step: "DONE",
          errorMessage: event.errorMessage
        }
      });
      return;
    }
  }
}
const callbackTimestampHeader = "x-abhi-call-audio-timestamp";
const callbackSignatureHeader = "x-abhi-call-audio-signature";
async function action({
  request
}) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405
    });
  }
  const rawBody = await request.text();
  const timestamp = request.headers.get(callbackTimestampHeader);
  const signature = request.headers.get(callbackSignatureHeader);
  if (!timestamp || !signature) {
    return new Response("Missing callback signature", {
      status: 401
    });
  }
  const isValid = verifyAbhiCallAudioProcessorCallbackSignature({
    timestamp,
    signature,
    rawBody
  });
  if (!isValid) {
    return new Response("Invalid callback signature", {
      status: 401
    });
  }
  let payload;
  try {
    payload = rawBody ? JSON.parse(rawBody) : null;
  } catch {
    return new Response("Invalid JSON body", {
      status: 400
    });
  }
  let event;
  try {
    event = parseAbhiCallAudioProcessorEvent(payload);
  } catch {
    return new Response("Invalid callback payload", {
      status: 400
    });
  }
  await handleAbhiCallAudioProcessorEvent(event);
  return Response.json({
    ok: true
  });
}
export {
  action
};
//# sourceMappingURL=episode-audio-callback-Bl4xpR_S.js.map
