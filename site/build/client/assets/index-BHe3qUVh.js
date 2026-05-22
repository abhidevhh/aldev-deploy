import { redirect } from "react-router";
import { getAuthInfoFromOAuthFromRequest } from "./session.server-BVOCbXUc.js";
import { AsyncLocalStorage } from "node:async_hooks";
import { invariant } from "@epic-web/invariant";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { z } from "zod";
import { i as getKitSubscriber, f as addSubscriberToForm } from "./user-info.server-DQEJabU4.js";
import { g as getBlogRecommendations } from "./blog.server-C4fS0n4p.js";
import groupBy from "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import "lodash/orderBy.js";
import "lodash/pick.js";
import "lodash/shuffle.js";
import "lodash/sortBy.js";
import { d as downloadMdxFilesCached } from "./mdx.server-CumfvRLd.js";
import { e as getErrorMessage, h as getDomainUrl } from "./misc-DM3BUXHg.js";
import { prisma } from "./prisma.server-MnXt9BdG.js";
import { s as searchKCD } from "./search.server-CEHFJkNx.js";
import { getSeasons as getCachedSeasons } from "./simplecast.server-Cliy-rrj.js";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import "litefs-js";
import "litefs-js/remix";
import "./timing.server-Ckj1L-xw.js";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-BOCNblj8.js";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "clsx";
import "emoji-regex";
import "./cache.server-BWnHcoUK.js";
import "node:fs";
import "node:sqlite";
import "@epic-web/cachified";
import "lru-cache";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./misc-react-D8yAGzlT.js";
import "react/jsx-runtime";
import "@sentry/react-router";
import "md5-hash";
import "react";
import "date-fns";
import "p-limit";
import "match-sorter";
import "./client.server-CTs0DPxN.js";
import "uuid";
import "./root-BtDGpB2R.js";
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
import "./form-elements-D3OfaKUp.js";
import "./external-links-BEDnFUME.js";
import "downshift";
import "./promotification-omJeRY6i.js";
import "./spacer-CSktuGpg.js";
import "./login.server-Bn92r_Ja.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./seo-B3cPpSFw.js";
import "./theme.server-D5mszc13.js";
import "./header-section-BSZTMYmt.js";
import "./hero-section-CoHGsAuJ.js";
import "@remark-embedder/core";
import "@remark-embedder/transformer-oembed";
import "lz-string";
import "mdx-bundler";
import "p-queue";
import "reading-time";
import "remark-autolink-headings";
import "remark-gfm";
import "remark-slug";
import "unist-util-visit";
import "http";
import "https";
import "metascraper";
import "metascraper-description";
import "metascraper-image";
import "metascraper-title";
import "./github.server-CeJRQaMc.js";
import "path";
import "@octokit/plugin-throttling";
import "@octokit/rest";
import "./markdown.server-C6vYtRmU.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "node:crypto";
import "node:fs/promises";
import "@sindresorhus/slugify";
import "yaml";
import "hast-util-to-html";
import "mdast-util-to-hast";
import "rehype-remark";
const VERIFIER_API_KEY = getEnv().VERIFIER_API_KEY;
async function verifyEmailAddress(emailAddress) {
  const verifierUrl = new URL(`https://verifyright.co/verify/${emailAddress}`);
  verifierUrl.searchParams.append("token", VERIFIER_API_KEY);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2e3);
  try {
    const response = await fetch(verifierUrl.toString(), {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    const verifierResult = await response.json();
    return verifierResult;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Email verification timed out:", emailAddress);
    } else {
      console.error("Error verifying email:", getErrorMessage(error));
    }
    return {
      status: true,
      email: emailAddress,
      domain: emailAddress.split("@")[1]
    };
  }
}
async function isEmailVerified(email) {
  const userExists = Boolean(
    await prisma.user.findUnique({
      select: { id: true },
      where: { email }
    })
  );
  if (userExists) return { verified: true };
  const kitSubscriber = await getKitSubscriber(email);
  if (kitSubscriber) return { verified: true };
  const verifierResult = await verifyEmailAddress(email);
  if (verifierResult.status) return { verified: true };
  return { verified: false, message: verifierResult.error.message };
}
const requestStorage = new AsyncLocalStorage();
const transports = /* @__PURE__ */ new Map();
function createServer() {
  const server = new McpServer(
    {
      name: "abhidev.com",
      version: "1.0.0"
    },
    {
      capabilities: {
        tools: {}
      }
    }
  );
  server.registerTool(
    "whoami",
    {
      description: "Get the user ID of the current user",
      inputSchema: {}
    },
    async (_, extra) => {
      const user = await requireUser(extra.authInfo);
      return { content: [{ type: "text", text: JSON.stringify(user) }] };
    }
  );
  server.registerTool(
    "update_user_info",
    {
      description: "Update the user info for the current user",
      inputSchema: {
        firstName: z.string().optional().describe("The first name of the user")
      }
    },
    async ({ firstName }, extra) => {
      const user = await requireUser(extra.authInfo);
      await prisma.user.update({
        where: { id: user.id },
        data: { firstName }
      });
      return { content: [{ type: "text", text: "User info updated" }] };
    }
  );
  server.registerTool(
    "get_post_reads",
    {
      description: "Get the post reads for the current user",
      inputSchema: {}
    },
    async (_, extra) => {
      const request = requireRequest();
      const user = await requireUser(extra.authInfo);
      const postReads = await prisma.postRead.findMany({
        where: { userId: user.id },
        select: {
          postSlug: true,
          createdAt: true
        },
        orderBy: {
          createdAt: "desc"
        }
      });
      const domainUrl = getDomainUrl(request);
      const groupedBySlug = groupBy(postReads, "postSlug");
      const posts = Object.entries(groupedBySlug).map(([postSlug, reads]) => ({
        url: `${domainUrl}/blog/${postSlug}`,
        readCount: reads.length,
        reads: reads.map(({ createdAt }) => createdAt.toISOString())
      }));
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(posts)
          }
        ]
      };
    }
  );
  server.registerTool(
    "get_recommended_posts",
    {
      description: "Get recommended posts for the current user",
      inputSchema: {}
    },
    async () => {
      const request = requireRequest();
      const domainUrl = getDomainUrl(request);
      const recommendations = await getBlogRecommendations({ request });
      const posts = recommendations.map(
        ({
          frontmatter: {
            // remove this because it's not needed and it's kinda big
            bannerBlurDataUrl: _bannerBlurDataUrl,
            ...frontmatter
          },
          ...recommendation
        }) => ({
          ...recommendation,
          url: `${domainUrl}/blog/${recommendation.slug}`,
          frontmatter
        })
      );
      return {
        content: [{ type: "text", text: JSON.stringify(posts) }]
      };
    }
  );
  server.registerTool(
    "get_most_popular_posts",
    {
      description: "Get the most popular posts on abhidev.com",
      inputSchema: {}
    },
    async () => {
      const request = requireRequest();
      const domainUrl = getDomainUrl(request);
      const mostPopularPosts = await prisma.postRead.groupBy({
        by: ["postSlug"],
        _count: true,
        orderBy: {
          _count: {
            postSlug: "desc"
          }
        },
        take: 10
      });
      const posts = mostPopularPosts.map(({ postSlug, _count }) => ({
        url: `${domainUrl}/blog/${postSlug}`,
        readCount: _count
      }));
      return {
        content: [{ type: "text", text: JSON.stringify(posts) }]
      };
    }
  );
  server.registerTool(
    "find_content",
    {
      description: "Search for content on abhidev.com",
      inputSchema: {
        query: z.string().describe(
          `The query to search for. This searches across indexed content (blog posts, pages, podcasts, talks, resume, credits, testimonials, and YouTube videos). Simpler and shorter queries are better.`
        ),
        category: z.union([
          z.literal("Blog"),
          z.literal("Engineering with AbhiDev Podcast"),
          z.literal("call AbhiDev Podcast"),
          z.literal("Talks"),
          z.literal("YouTube"),
          z.literal("Resume"),
          z.literal("Credits"),
          z.literal("Testimonials")
        ]).optional().describe(
          "The category to search in, if omitted, it will search all categories"
        )
      }
    },
    async ({ query, category }) => {
      const request = requestStorage.getStore();
      if (!request) {
        throw new Error("No request found");
      }
      const domainUrl = getDomainUrl(request);
      const allowedTypesByCategory = {
        Blog: ["blog"],
        "Engineering with AbhiDev Podcast": ["cwk"],
        "call AbhiDev Podcast": ["ck"],
        Talks: ["talk"],
        YouTube: ["youtube"],
        Resume: ["resume"],
        Credits: ["credit"],
        Testimonials: ["testimonial"]
      };
      if (category && allowedTypesByCategory[category].length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `${category} is not currently included in semantic search.`
            }
          ]
        };
      }
      const { results, noCloseMatches } = await searchKCD({
        query,
        topK: 15,
        request
      });
      const filteredResults = category && allowedTypesByCategory[category].length ? results.filter(
        (r) => r.type ? allowedTypesByCategory[category].includes(r.type) : false
      ) : results;
      if (filteredResults.length) {
        return {
          content: [
            {
              type: "text",
              text: filteredResults.map((r) => {
                const url = r.url ?? (r.id.startsWith("/") ? r.id : "");
                const absoluteUrl = url.startsWith("http") ? url : url.startsWith("/") ? `${domainUrl}${url}` : url ? `${domainUrl}/${url}` : domainUrl;
                return JSON.stringify({
                  title: r.title ?? url ?? r.id,
                  url: absoluteUrl,
                  category: r.type ?? "Results",
                  summary: r.summary ?? r.snippet ?? null,
                  imageUrl: r.imageUrl ?? null,
                  imageAlt: r.imageAlt ?? null
                });
              }).join("\n")
            }
          ]
        };
      } else {
        const weak = noCloseMatches && !category ? " (Related pages were indexed but none met the relevance threshold—try rephrasing.)" : "";
        return {
          content: [
            {
              type: "text",
              text: `No content found for ${category ? `${category}: ` : ""}${query}${weak}`
            }
          ]
        };
      }
    }
  );
  server.registerTool(
    "get_blog_post",
    {
      description: "Get the content of a specific blog post by its slug",
      inputSchema: {
        slug: z.string().describe("The slug of the blog post to retrieve")
      }
    },
    async ({ slug }) => {
      const { files } = await downloadMdxFilesCached("blog", slug, {});
      if (!files.length) {
        return {
          content: [
            { type: "text", text: `No blog post found with slug: ${slug}` }
          ]
        };
      }
      return {
        content: files.map(
          (file) => ({
            type: "text",
            text: `${file.path}:

${file.content}`
          })
        )
      };
    }
  );
  server.registerTool(
    "get_chats_with_abhi_episode_details",
    {
      description: "Get the details (title, description, transcript, etc.) for a specific episode of the Engineering with AbhiDev podcast by its season number and episode number",
      inputSchema: {
        seasonNumber: z.number().describe("The number of the season to retrieve"),
        episodeNumber: z.number().describe("The number of the episode to retrieve")
      }
    },
    async ({ episodeNumber, seasonNumber }) => {
      const request = requestStorage.getStore();
      if (!request) {
        throw new Error("No request found");
      }
      const seasons = await getCachedSeasons({ request });
      const season = seasons.find((s) => s.seasonNumber === seasonNumber);
      if (!season) {
        throw new Response(`Season ${seasonNumber} not found`, { status: 404 });
      }
      const episode = season.episodes.find(
        (e) => e.episodeNumber === episodeNumber
      );
      if (!episode) {
        throw new Response(`Episode ${episodeNumber} not found`, {
          status: 404
        });
      }
      return {
        content: [
          {
            type: "text",
            text: `Title: ${episode.title}
`
          },
          {
            type: "text",
            text: `Description:
${episode.description}
`
          },
          {
            type: "text",
            text: episode.transcriptHTML ? `Transcript:

${episode.transcriptHTML}` : `Transcript: No transcript found for ${episode.title} (Engineering with AbhiDev S${seasonNumber}E${episodeNumber})`
          }
        ]
      };
    }
  );
  server.registerTool(
    "subscribe_to_newsletter",
    {
      description: "Subscribe to AbhiDev newsletter and get regular updates about new articles and courses",
      inputSchema: {
        email: z.email().optional().describe(
          "The email address to subscribe (make sure to ask the user for their email address before calling this tool. They will receive a confirmation email if not already subscribed)"
        ),
        firstName: z.string().optional().describe("Your first name (optional)")
      }
    },
    async ({ email, firstName }) => {
      if (!email) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `No email address provided. Please provide the user's email address before calling this tool.`
            }
          ]
        };
      }
      const isVerified = await isEmailVerified(email);
      if (!isVerified.verified) {
        return {
          isError: true,
          content: [{ type: "text", text: isVerified.message }]
        };
      }
      try {
        await addSubscriberToForm({
          email,
          firstName: firstName ?? "",
          kitFormId: "827139"
        });
        return {
          content: [
            {
              type: "text",
              text: `Successfully subscribed ${email} to Kent's newsletter! If you're not already on Kent's mailing list, you'll receive a confirmation email.`
            }
          ]
        };
      } catch (error) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Failed to subscribe to the newsletter: ${getErrorMessage(error)}`
            }
          ]
        };
      }
    }
  );
  return server;
}
async function connect(sessionId) {
  if (sessionId) {
    const existingEntry = transports.get(sessionId);
    if (existingEntry) {
      return await existingEntry;
    }
    const transportPromise = (async () => {
      let transport2;
      let server2;
      try {
        transport2 = new WebStandardStreamableHTTPServerTransport({
          sessionIdGenerator: () => sessionId,
          async onsessioninitialized(initializedSessionId) {
            if (transport2) transports.set(initializedSessionId, transport2);
          },
          async onsessionclosed(closedSessionId) {
            transports.delete(closedSessionId);
          }
        });
        transport2.onclose = () => {
          if (transport2?.sessionId) transports.delete(transport2.sessionId);
        };
        server2 = createServer();
        await server2.connect(transport2);
        return transport2;
      } catch (error) {
        await Promise.allSettled([transport2?.close(), server2?.close()]);
        throw error;
      }
    })();
    transports.set(sessionId, transportPromise);
    transportPromise.catch(() => {
      if (transports.get(sessionId) === transportPromise) {
        transports.delete(sessionId);
      }
    });
    return await transportPromise;
  }
  let transport;
  let server;
  try {
    transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: () => crypto.randomUUID(),
      async onsessioninitialized(initializedSessionId) {
        if (transport) transports.set(initializedSessionId, transport);
      },
      async onsessionclosed(closedSessionId) {
        transports.delete(closedSessionId);
      }
    });
    transport.onclose = () => {
      if (transport?.sessionId) transports.delete(transport.sessionId);
    };
    server = createServer();
    await server.connect(transport);
    return transport;
  } catch (error) {
    if (transport) {
      for (const [key, entry] of transports.entries()) {
        if (entry === transport) transports.delete(key);
      }
    }
    await Promise.allSettled([transport?.close(), server?.close()]);
    throw error;
  }
}
function getUserId(authInfo) {
  if (authInfo && authInfo.extra && typeof authInfo.extra.userId === "string") {
    return authInfo.extra.userId;
  }
  return null;
}
async function getUser(authInfo) {
  const userId = getUserId(authInfo);
  if (!userId) return null;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      email: true,
      team: true,
      _count: {
        select: { postReads: true }
      }
    }
  });
  if (!user) return null;
  return user;
}
async function requireUser(authInfo) {
  const user = await getUser(authInfo);
  invariant(user, "User not found");
  return user;
}
function requireRequest() {
  const request = requestStorage.getStore();
  invariant(request, "No request found");
  return request;
}
async function loader({
  request
}) {
  if (request.headers.get("accept")?.includes("text/html")) {
    throw redirect("/about-mcp");
  }
  const response = await requestStorage.run(request, async () => {
    const sessionId = request.headers.get("mcp-session-id") ?? void 0;
    const authInfo = await requireAuth(request);
    const transport = await connect(sessionId);
    return transport.handleRequest(request, {
      authInfo
    });
  });
  return response;
}
async function action({
  request
}) {
  const response = await requestStorage.run(request, async () => {
    const sessionId = request.headers.get("mcp-session-id") ?? void 0;
    const authInfo = await requireAuth(request);
    const transport = await connect(sessionId);
    return transport.handleRequest(request, {
      authInfo
    });
  });
  return response;
}
async function requireAuth(request) {
  const authInfo = await getAuthInfoFromOAuthFromRequest(request);
  if (!authInfo) {
    throw new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": `Bearer error="unauthorized", error_description="Unauthorized"`
      }
    });
  }
  return authInfo;
}
export {
  action,
  loader
};
//# sourceMappingURL=index-BHe3qUVh.js.map
