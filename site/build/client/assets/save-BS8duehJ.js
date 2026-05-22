import { randomUUID } from "node:crypto";
import { format } from "date-fns";
import { data, redirect } from "react-router";
import { putCallAudioFromDataUrl, deleteAudioObject, parseBase64DataUrl, putEpisodeDraftResponseAudioFromBuffer, getAudioBuffer } from "./abhi-call-audio-storage.server-BBLgNzCx.js";
import { s as startAbhiCallCallerTranscriptProcessing } from "./abhi-call-caller-transcript.server-DKIal2t-.js";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import { e as getErrorMessage, z as getStringFormValue, h as getDomainUrl, q as getOptionalTeam } from "./misc-DM3BUXHg.js";
import { d as getErrorForAudio, e as getErrorForNotes, f as getErrorForTitle } from "./abhi-call-HST9AF8V.js";
import { s as sendMessageFromDiscordBot } from "./user-info.server-DQEJabU4.js";
import { m as markdownToHtml } from "./markdown.server-C6vYtRmU.js";
import { prisma } from "./prisma.server-MnXt9BdG.js";
import { s as sendEmail } from "./send-email.server-BOafejnl.js";
import { requireUser, requireAdminUser } from "./session.server-BVOCbXUc.js";
import { x as teamEmoji } from "./root-BtDGpB2R.js";
import { createEpisode } from "./transistor.server-DFkoIrlM.js";
import "node:stream";
import "@aws-sdk/client-s3";
import "zod";
import "./cloudflare-ai-utils.server-D2ZFqcMo.js";
import "node:buffer";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "clsx";
import "emoji-regex";
import "./cache.server-BWnHcoUK.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "lru-cache";
import "litefs-js";
import "litefs-js/remix";
import "./timing.server-Ckj1L-xw.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./misc-react-D8yAGzlT.js";
import "react/jsx-runtime";
import "@sentry/react-router";
import "md5-hash";
import "react";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-BOCNblj8.js";
import "node:url";
import "@prisma/client/runtime/client";
import "@tanstack/react-hotkeys";
import "framer-motion";
import "spin-delay";
import "@reach/dialog";
import "./icons-Xl-Om4A1.js";
import "./typography-DDpAXXrz.js";
import "./arrow-button-DBVn13Kl.js";
import "./button-B-8RrXF2.js";
import "error-stack-parser";
import "./grid-Bsvu4qfo.js";
import "./cloudinary-video-DeT-8neH.js";
import "mdx-bundler/client/index.js";
import "./theme-D6IyWRbl.js";
import "@conform-to/zod/v4";
import "cookie";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
import "@epic-web/invariant";
import "./form-elements-D3OfaKUp.js";
import "./external-links-BEDnFUME.js";
import "downshift";
import "./promotification-omJeRY6i.js";
import "./spacer-CSktuGpg.js";
import "./client.server-CTs0DPxN.js";
import "uuid";
import "./login.server-Bn92r_Ja.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./seo-B3cPpSFw.js";
import "./theme.server-D5mszc13.js";
import "./header-section-BSZTMYmt.js";
import "./hero-section-CoHGsAuJ.js";
import "@sindresorhus/slugify";
const cloudflareQueueEnqueueTimeoutMs = 1e4;
async function enqueueAbhiCallEpisodeAudioJobToCloudflare({
  draftId,
  callAudioKey,
  responseAudioKey
}) {
  const env = getEnv();
  const queueId = env.ABHI_CALL_AUDIO_CF_QUEUE_ID;
  if (!queueId) {
    throw new Error("ABHI_CALL_AUDIO_CF_QUEUE_ID is required.");
  }
  const url = `${env.ABHI_CALL_AUDIO_CF_API_BASE_URL}/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/queues/${queueId}/messages`;
  const body = {
    content_type: "json",
    body: {
      draftId,
      callAudioKey,
      responseAudioKey
    }
  };
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(cloudflareQueueEnqueueTimeoutMs)
    });
  } catch (error) {
    if (error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError")) {
      throw new Error(
        `Cloudflare queue enqueue timed out after ${cloudflareQueueEnqueueTimeoutMs}ms`
      );
    }
    throw new Error(
      `Cloudflare queue enqueue failed: ${getErrorMessage(error)}`
    );
  }
  let text;
  try {
    text = await res.text();
  } catch (error) {
    throw new Error(
      `Cloudflare queue enqueue failed: unable to read response body: ${getErrorMessage(error)}`
    );
  }
  if (!res.ok) {
    throw new Error(
      `Cloudflare queue enqueue failed: ${res.status} ${res.statusText}${text ? `
${text}` : ""}`
    );
  }
  if (!text.trim()) {
    throw new Error("Cloudflare queue enqueue failed: empty response");
  }
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Cloudflare queue enqueue failed: invalid JSON response");
  }
  if (typeof parsed !== "object" || parsed === null) {
    throw new Error(
      "Cloudflare queue enqueue failed: response must include success=true"
    );
  }
  const parsedRecord = parsed;
  if (parsedRecord.success !== true) {
    throw new Error(
      "Cloudflare queue enqueue failed: response must include success=true"
    );
  }
}
async function requestAbhiCallEpisodeAudioGeneration({
  draftId,
  callAudioKey,
  responseAudioKey
}) {
  await enqueueAbhiCallEpisodeAudioJobToCloudflare({
    draftId,
    callAudioKey,
    responseAudioKey
  });
}
const abhiCallEpisodeArtworkSize = 200;
function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function getPublishedAbhiCallEpisodeEmail({
  firstName,
  episodeTitle,
  episodeUrl,
  imageUrl
}) {
  const safeFirstName = escapeHtml(firstName);
  const safeEpisodeTitle = escapeHtml(episodeTitle);
  const safeEpisodeUrl = escapeHtml(episodeUrl);
  const safeImageUrl = imageUrl ? escapeHtml(imageUrl) : null;
  const text = `
Hi ${firstName},

Thanks for your call. Kent just replied and the episode has been published to the podcast!

${episodeTitle}
${episodeUrl}
`.trim();
  const artworkMarkup = safeImageUrl ? `
      <p style="margin: 16px 0;">
        <a href="${safeEpisodeUrl}" style="display: inline-block; text-decoration: none;">
          <img
            src="${safeImageUrl}"
            alt="call AbhiDev episode artwork for ${safeEpisodeTitle}"
            width="${abhiCallEpisodeArtworkSize}"
            height="${abhiCallEpisodeArtworkSize}"
            style="display: block; width: ${abhiCallEpisodeArtworkSize}px; height: ${abhiCallEpisodeArtworkSize}px; object-fit: cover; border-radius: 8px; border: 0;"
          />
        </a>
      </p>
    `.trim() : "";
  const html = `
<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <body style="font-family: ui-sans-serif, sans-serif; line-height: 1.5; color: #111827;">
    <p style="margin: 0 0 12px;">Hi ${safeFirstName},</p>
    <p style="margin: 0 0 12px;">
      Thanks for your call. Kent just replied and the episode has been published to the podcast!
    </p>
    ${artworkMarkup}
    <p style="margin: 0;">
      <a href="${safeEpisodeUrl}" style="color: #2563eb;">${safeEpisodeTitle}</a>
    </p>
  </body>
</html>
`.trim();
  return { text, html };
}
function getCheckboxFormValue(formData, key) {
  const value = formData.get(key);
  return value === "on" || value === "true";
}
function getActionData(formData) {
  const fields = {
    audio: getStringFormValue(formData, "audio"),
    title: getStringFormValue(formData, "title"),
    notes: getStringFormValue(formData, "notes")
  };
  const actionData = {
    fields: {
      title: fields.title,
      notes: fields.notes
    },
    errors: {
      audio: getErrorForAudio(fields.audio),
      title: getErrorForTitle(fields.title),
      notes: getErrorForNotes(fields.notes)
    }
  };
  return {
    actionData,
    fields
  };
}
function hasActionErrors(actionData) {
  return Object.values(actionData.errors).some((error) => error !== null);
}
function redirectCallNotFound() {
  const searchParams = new URLSearchParams();
  searchParams.set("message", "Call not found");
  return redirect(`/calls/admin?${searchParams.toString()}`);
}
async function createCall({
  request,
  formData
}) {
  const {
    actionData,
    fields
  } = getActionData(formData);
  if (hasActionErrors(actionData)) {
    return data(actionData, 400);
  }
  const isAnonymous = getCheckboxFormValue(formData, "anonymous");
  try {
    const user = await requireUser(request);
    const domainUrl = getDomainUrl(request);
    const {
      audio,
      title,
      notes
    } = fields;
    if (!audio || !title) {
      return data(actionData, 400);
    }
    const callId = randomUUID();
    const stored = await putCallAudioFromDataUrl({
      callId,
      dataUrl: audio
    });
    let createdCall;
    try {
      createdCall = await prisma.call.create({
        data: {
          id: callId,
          title,
          notes: notes?.trim() || null,
          userId: user.id,
          isAnonymous,
          audioKey: stored.key,
          audioContentType: stored.contentType,
          audioSize: stored.size
        },
        select: {
          id: true
        }
      });
    } catch (error) {
      await deleteAudioObject({
        key: stored.key
      }).catch(() => {
      });
      throw error;
    }
    void startAbhiCallCallerTranscriptProcessing(createdCall.id);
    try {
      const env = getEnv();
      const channelId = env.DISCORD_PRIVATE_BOT_CHANNEL;
      const adminUserId = env.DISCORD_ADMIN_USER_ID;
      const {
        firstName,
        team,
        discordId
      } = user;
      const userMention = discordId ? `<@!${discordId}>` : firstName;
      const emoji = teamEmoji[getOptionalTeam(team)];
      const baseMessage = `📳 <@!${adminUserId}> ring ring! New call from ${userMention} ${emoji}: "${title}"${isAnonymous ? " (anonymous)" : ""}`;
      const callAdminUrl = `${domainUrl}/calls/admin/${createdCall.id}`;
      const discordMaxLength = 2e3;
      const notesHeader = `

Notes:
`;
      const trimmedNotes = notes?.trim();
      let message = `${baseMessage}

${callAdminUrl}`;
      if (trimmedNotes) {
        const maxNotesLength = discordMaxLength - (baseMessage.length + notesHeader.length + 2 + callAdminUrl.length);
        if (maxNotesLength > 0) {
          const truncatedNotes = trimmedNotes.length > maxNotesLength ? maxNotesLength > 3 ? `${trimmedNotes.slice(0, maxNotesLength - 3)}...` : trimmedNotes.slice(0, maxNotesLength) : trimmedNotes;
          message = `${baseMessage}${notesHeader}${truncatedNotes}

${callAdminUrl}`;
        }
      }
      void sendMessageFromDiscordBot(channelId, message);
    } catch (error) {
      console.error("Problem sending a call message", error);
    }
    return redirect(`/calls/record/${createdCall.id}`);
  } catch (error) {
    actionData.errors.generalError = getErrorMessage(error);
    return data(actionData, 500);
  }
}
async function publishCall({
  request,
  formData
}) {
  let publishedTransistorEpisodeId = null;
  try {
    await requireAdminUser(request);
    const callId = getStringFormValue(formData, "callId");
    if (!callId) return redirectCallNotFound();
    const formCallTitle = getStringFormValue(formData, "callTitle");
    const formNotes = getStringFormValue(formData, "notes");
    const call = await prisma.call.findFirst({
      where: {
        id: callId
      },
      include: {
        user: true,
        episodeDraft: true
      }
    });
    if (!call) {
      return redirectCallNotFound();
    }
    let callTitle = call.title;
    if (formCallTitle !== null) {
      const nextTitle = formCallTitle.trim();
      if (!nextTitle) {
        const searchParams = new URLSearchParams();
        searchParams.set("error", "Call title is required.");
        return redirect(`/calls/admin/${callId}?${searchParams.toString()}`);
      }
      callTitle = nextTitle;
      await prisma.call.update({
        where: {
          id: callId
        },
        data: {
          title: callTitle
        }
      });
    }
    const callNotes = formNotes !== null ? formNotes.trim() ? formNotes.trim() : null : call.notes;
    if (formNotes !== null) {
      await prisma.call.update({
        where: {
          id: callId
        },
        data: {
          notes: callNotes
        }
      });
    }
    const draft = call.episodeDraft;
    if (!draft || draft.status !== "READY") {
      const searchParams = new URLSearchParams();
      searchParams.set("error", "Draft episode is not ready to publish yet.");
      return redirect(`/calls/admin/${callId}?${searchParams.toString()}`);
    }
    const formTitle = getStringFormValue(formData, "title");
    const formDescription = getStringFormValue(formData, "description");
    const formKeywords = getStringFormValue(formData, "keywords");
    const formTranscript = getStringFormValue(formData, "transcript");
    const shouldUpdateFromForm = formTitle !== null || formDescription !== null || formKeywords !== null || formTranscript !== null;
    if (shouldUpdateFromForm) {
      const updateData = {};
      const nextTitle = formTitle?.trim();
      const nextDescription = formDescription?.trim();
      const nextKeywords = formKeywords?.trim();
      const nextTranscript = formTranscript?.trim();
      if (nextTitle) updateData.title = nextTitle;
      if (nextDescription) updateData.description = nextDescription;
      if (nextKeywords) updateData.keywords = nextKeywords;
      if (nextTranscript) updateData.transcript = nextTranscript;
      if (Object.keys(updateData).length) {
        await prisma.abhiCallEpisodeDraft.update({
          where: {
            callId
          },
          data: updateData
        });
      }
    }
    const title = (formTitle?.trim() || draft.title || "").trim();
    const description = (formDescription?.trim() || draft.description || "").trim();
    const keywords = (formKeywords?.trim() || draft.keywords || "").trim();
    const transcriptText = (formTranscript?.trim() || draft.transcript || "").trim();
    const episodeAudioKey = draft.episodeAudioKey;
    if (!title || !description || !keywords || !transcriptText || !episodeAudioKey) {
      const searchParams = new URLSearchParams();
      searchParams.set("error", "Draft is missing required fields (audio/transcript/title/description/keywords).");
      return redirect(`/calls/admin/${callId}?${searchParams.toString()}`);
    }
    const episodeAudio = await getAudioBuffer({
      key: episodeAudioKey
    });
    const summaryName = call.isAnonymous ? "Anonymous" : call.user.firstName;
    const published = await createEpisode({
      request,
      audio: episodeAudio,
      title,
      summary: `${summaryName} asked this on ${format(call.createdAt, "yyyy-MM-dd")}`,
      description: await markdownToHtml(description),
      user: call.user,
      keywords,
      isAnonymous: call.isAnonymous,
      transcriptText
    });
    publishedTransistorEpisodeId = published.transistorEpisodeId;
    if (published.episodeUrl) {
      try {
        const email = getPublishedAbhiCallEpisodeEmail({
          firstName: call.user.firstName,
          episodeTitle: title,
          episodeUrl: published.episodeUrl,
          imageUrl: published.imageUrl
        });
        void sendEmail({
          to: call.user.email,
          from: `"AbhiDev" <hello+calls@abhidev.com>`,
          subject: `Your "call AbhiDev" episode has been published`,
          text: email.text,
          html: email.html
        });
      } catch (error) {
        console.error(`Problem sending email about a call: ${published.episodeUrl}`, error);
      }
    }
    try {
      await prisma.$transaction([prisma.abhiCallCallerEpisode.create({
        data: {
          userId: call.userId,
          callTitle,
          callNotes,
          isAnonymous: call.isAnonymous,
          transistorEpisodeId: published.transistorEpisodeId
        }
      }), prisma.call.delete({
        where: {
          id: call.id
        }
      })]);
    } catch (error) {
      console.error("Transistor episode already created but DB cleanup failed.", {
        transistorEpisodeId: published.transistorEpisodeId,
        callId: call.id
      }, error);
      throw error;
    }
    const keysToDelete = [call.audioKey, draft.episodeAudioKey, draft.responseAudioKey, draft.callerSegmentAudioKey, draft.responseSegmentAudioKey].filter((k) => typeof k === "string" && k.length > 0);
    await Promise.all(keysToDelete.map(async (key) => deleteAudioObject({
      key
    }).catch(() => {
    })));
    return redirect("/calls");
  } catch (error) {
    if (publishedTransistorEpisodeId) {
      console.error("Publish failed after Transistor episode creation.", {
        transistorEpisodeId: publishedTransistorEpisodeId
      }, error);
    }
    const callId = getStringFormValue(formData, "callId");
    const searchParams = new URLSearchParams();
    searchParams.set("error", getErrorMessage(error));
    return redirect(callId ? `/calls/admin/${callId}?${searchParams.toString()}` : "/calls/admin");
  }
}
async function createEpisodeDraft({
  request,
  formData
}) {
  const callId = getStringFormValue(formData, "callId");
  const responseAudio = getStringFormValue(formData, "audio");
  const formCallTitle = getStringFormValue(formData, "callTitle");
  const formNotes = getStringFormValue(formData, "notes");
  if (!callId) return redirectCallNotFound();
  if (getErrorForAudio(responseAudio)) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", "Response audio file is required.");
    return redirect(`/calls/admin/${callId}?${searchParams.toString()}`);
  }
  await requireAdminUser(request);
  const call = await prisma.call.findFirst({
    where: {
      id: callId
    }
  });
  if (!call) return redirectCallNotFound();
  if (formCallTitle !== null) {
    const nextTitle = formCallTitle.trim();
    if (!nextTitle) {
      const searchParams = new URLSearchParams();
      searchParams.set("error", "Call title is required.");
      return redirect(`/calls/admin/${callId}?${searchParams.toString()}`);
    }
    await prisma.call.update({
      where: {
        id: callId
      },
      data: {
        title: nextTitle
      }
    });
  }
  if (formNotes !== null) {
    const nextNotes = formNotes.trim();
    await prisma.call.update({
      where: {
        id: callId
      },
      data: {
        notes: nextNotes ? nextNotes : null
      }
    });
  }
  const existingDraft = await prisma.abhiCallEpisodeDraft.findFirst({
    where: {
      callId
    },
    select: {
      episodeAudioKey: true,
      responseAudioKey: true,
      callerSegmentAudioKey: true,
      responseSegmentAudioKey: true
    }
  });
  const existingKeysToDelete = [existingDraft?.episodeAudioKey, existingDraft?.responseAudioKey, existingDraft?.callerSegmentAudioKey, existingDraft?.responseSegmentAudioKey].filter((key) => typeof key === "string" && key.length > 0);
  if (existingKeysToDelete.length) {
    await Promise.all(existingKeysToDelete.map(async (key) => deleteAudioObject({
      key
    }).catch(() => {
    })));
  }
  const [, draft] = await prisma.$transaction([prisma.abhiCallEpisodeDraft.deleteMany({
    where: {
      callId
    }
  }), prisma.abhiCallEpisodeDraft.create({
    data: {
      callId
    }
  })]);
  try {
    if (!call.audioKey) {
      throw new Error("Call audio is missing (audioKey is null).");
    }
    const parsedResponseAudio = parseBase64DataUrl(responseAudio);
    const storedResponseAudio = await putEpisodeDraftResponseAudioFromBuffer({
      draftId: draft.id,
      audio: parsedResponseAudio.buffer,
      contentType: parsedResponseAudio.contentType
    });
    await prisma.abhiCallEpisodeDraft.updateMany({
      where: {
        id: draft.id,
        status: "PROCESSING"
      },
      data: {
        responseAudioKey: storedResponseAudio.key,
        responseAudioContentType: storedResponseAudio.contentType,
        responseAudioSize: storedResponseAudio.size,
        step: "GENERATING_AUDIO",
        errorMessage: null
      }
    });
    await requestAbhiCallEpisodeAudioGeneration({
      draftId: draft.id,
      callAudioKey: call.audioKey,
      responseAudioKey: storedResponseAudio.key
    });
  } catch (error) {
    await prisma.abhiCallEpisodeDraft.updateMany({
      where: {
        id: draft.id,
        status: "PROCESSING"
      },
      data: {
        status: "ERROR",
        errorMessage: getErrorMessage(error),
        step: "DONE"
      }
    });
    const searchParams = new URLSearchParams();
    searchParams.set("error", `Unable to start draft audio generation: ${getErrorMessage(error)}`);
    return redirect(`/calls/admin/${callId}?${searchParams.toString()}`);
  }
  return redirect(`/calls/admin/${callId}`);
}
async function generateCallerTranscript({
  request,
  formData
}) {
  const callId = getStringFormValue(formData, "callId");
  if (!callId) return redirectCallNotFound();
  await requireAdminUser(request);
  const call = await prisma.call.findFirst({
    where: {
      id: callId
    },
    select: {
      id: true
    }
  });
  if (!call) return redirectCallNotFound();
  await prisma.call.update({
    where: {
      id: callId
    },
    data: {
      callerTranscriptStatus: "PROCESSING",
      callerTranscriptErrorMessage: null
    }
  });
  void startAbhiCallCallerTranscriptProcessing(callId, {
    force: true
  });
  return redirect(`/calls/admin/${callId}`);
}
async function updateCallerTranscript({
  request,
  formData
}) {
  const callId = getStringFormValue(formData, "callId");
  if (!callId) return redirectCallNotFound();
  await requireAdminUser(request);
  const call = await prisma.call.findFirst({
    where: {
      id: callId
    },
    select: {
      id: true
    }
  });
  if (!call) return redirectCallNotFound();
  const transcriptText = getStringFormValue(formData, "callerTranscript");
  const nextTranscript = transcriptText?.trim() ?? "";
  if (!nextTranscript) {
    await prisma.call.update({
      where: {
        id: callId
      },
      data: {
        callerTranscript: null,
        callerTranscriptStatus: "NOT_STARTED",
        callerTranscriptErrorMessage: null
      }
    });
  } else {
    await prisma.call.update({
      where: {
        id: callId
      },
      data: {
        callerTranscript: nextTranscript,
        callerTranscriptStatus: "READY",
        callerTranscriptErrorMessage: null
      }
    });
  }
  return redirect(`/calls/admin/${callId}`);
}
async function undoEpisodeDraft({
  request,
  formData
}) {
  const callId = getStringFormValue(formData, "callId");
  if (!callId) return redirectCallNotFound();
  await requireAdminUser(request);
  const drafts = await prisma.abhiCallEpisodeDraft.findMany({
    where: {
      callId
    },
    select: {
      episodeAudioKey: true,
      responseAudioKey: true,
      callerSegmentAudioKey: true,
      responseSegmentAudioKey: true
    }
  });
  const keysToDelete = drafts.flatMap((draft) => [draft.episodeAudioKey, draft.responseAudioKey, draft.callerSegmentAudioKey, draft.responseSegmentAudioKey]).filter((k) => typeof k === "string" && k.length > 0);
  if (keysToDelete.length) {
    await Promise.all(keysToDelete.map(async (key) => deleteAudioObject({
      key
    }).catch(() => {
    })));
  }
  await prisma.abhiCallEpisodeDraft.deleteMany({
    where: {
      callId
    }
  });
  return redirect(`/calls/admin/${callId}`);
}
async function updateEpisodeDraft({
  request,
  formData
}) {
  const callId = getStringFormValue(formData, "callId");
  if (!callId) return redirectCallNotFound();
  const callTitle = getStringFormValue(formData, "callTitle");
  const notes = getStringFormValue(formData, "notes");
  const title = getStringFormValue(formData, "title");
  const description = getStringFormValue(formData, "description");
  const keywords = getStringFormValue(formData, "keywords");
  const transcript = getStringFormValue(formData, "transcript");
  await requireAdminUser(request);
  try {
    if (callTitle !== null) {
      const nextTitle2 = callTitle.trim();
      if (!nextTitle2) {
        const searchParams = new URLSearchParams();
        searchParams.set("error", "Call title is required.");
        return redirect(`/calls/admin/${callId}?${searchParams.toString()}`);
      }
      await prisma.call.update({
        where: {
          id: callId
        },
        data: {
          title: nextTitle2
        }
      });
    }
    if (notes !== null) {
      const nextNotes = notes.trim();
      await prisma.call.update({
        where: {
          id: callId
        },
        data: {
          notes: nextNotes ? nextNotes : null
        }
      });
    }
    const updateData = {};
    const nextTitle = title?.trim();
    const nextDescription = description?.trim();
    const nextKeywords = keywords?.trim();
    const nextTranscript = transcript?.trim();
    if (nextTitle) updateData.title = nextTitle;
    if (nextDescription) updateData.description = nextDescription;
    if (nextKeywords) updateData.keywords = nextKeywords;
    if (nextTranscript) updateData.transcript = nextTranscript;
    if (Object.keys(updateData).length) {
      await prisma.abhiCallEpisodeDraft.update({
        where: {
          callId
        },
        data: updateData
      });
    }
    return redirect(`/calls/admin/${callId}`);
  } catch (error) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", getErrorMessage(error));
    return redirect(`/calls/admin/${callId}?${searchParams.toString()}`);
  }
}
async function deleteCall({
  request,
  formData
}) {
  const callId = getStringFormValue(formData, "callId");
  if (!callId) {
    return redirectCallNotFound();
  }
  await requireAdminUser(request);
  const call = await prisma.call.findFirst({
    where: {
      id: callId
    },
    select: {
      id: true,
      audioKey: true,
      episodeDraft: {
        select: {
          episodeAudioKey: true,
          responseAudioKey: true,
          callerSegmentAudioKey: true,
          responseSegmentAudioKey: true
        }
      }
    }
  });
  if (!call) {
    return redirectCallNotFound();
  }
  await prisma.call.delete({
    where: {
      id: callId
    }
  });
  const keysToDelete = [call.audioKey, call.episodeDraft?.episodeAudioKey, call.episodeDraft?.responseAudioKey, call.episodeDraft?.callerSegmentAudioKey, call.episodeDraft?.responseSegmentAudioKey].filter((k) => typeof k === "string" && k.length > 0);
  if (keysToDelete.length) {
    await Promise.all(keysToDelete.map(async (key) => deleteAudioObject({
      key
    }).catch(() => {
    })));
  }
  return redirect("/calls/admin");
}
async function action({
  request
}) {
  const formData = await request.formData();
  const intent = getStringFormValue(formData, "intent");
  if (intent === "create-call") {
    return createCall({
      request,
      formData
    });
  }
  if (intent === "create-episode-draft") return createEpisodeDraft({
    request,
    formData
  });
  if (intent === "generate-caller-transcript") return generateCallerTranscript({
    request,
    formData
  });
  if (intent === "update-caller-transcript") return updateCallerTranscript({
    request,
    formData
  });
  if (intent === "undo-episode-draft") return undoEpisodeDraft({
    request,
    formData
  });
  if (intent === "update-episode-draft") return updateEpisodeDraft({
    request,
    formData
  });
  if (intent === "publish-episode-draft") return publishCall({
    request,
    formData
  });
  if (intent === "delete-call") {
    return deleteCall({
      request,
      formData
    });
  }
  return data({
    fields: {},
    errors: {
      generalError: "Unknown recording form intent."
    }
  }, 400);
}
export {
  action
};
//# sourceMappingURL=save-BS8duehJ.js.map
