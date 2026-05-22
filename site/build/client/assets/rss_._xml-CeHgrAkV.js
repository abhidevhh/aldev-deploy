import { g as getBlogMdxListItems } from "./mdx.server-CWSqTQTg.js";
import { h as getDomainUrl, b as formatDate } from "./misc-CQO4K9rH.js";
import "cloudinary-build-url";
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
import "@epic-web/cachified";
import "metascraper";
import "metascraper-description";
import "metascraper-image";
import "metascraper-title";
import "./cache.server-BtbXQaCP.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/remember";
import "lru-cache";
import "react-router";
import "./env.server-DPCBxZtL.js";
import "zod";
import "litefs-js";
import "litefs-js/remix";
import "./session.server-DZ6f3pgH.js";
import "./prisma.server-Cj9LRFmw.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-Bsg0upig.js";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./github.server-u_4PqFTT.js";
import "path";
import "@octokit/plugin-throttling";
import "@octokit/rest";
import "./markdown.server-rwSwVnMd.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "date-fns";
async function loader({
  request
}) {
  const posts = await getBlogMdxListItems({
    request
  });
  const blogUrl = `${getDomainUrl(request)}/blog`;
  const rss = `
    <rss xmlns:blogChannel="${blogUrl}" version="2.0">
      <channel>
        <title>AbhiDev Blog</title>
        <link>${blogUrl}</link>
        <description>The AbhiDev Blog</description>
        <language>en-us</language>
        <generator>AbhiBuddy the Koala</generator>
        <ttl>40</ttl>
        ${posts.map((post) => `
            <item>
              <title>${cdata(post.frontmatter.title ?? "Untitled Post")}</title>
              <description>${cdata(post.frontmatter.description ?? "This post is... indescribable")}</description>
              <pubDate>${formatDate(post.frontmatter.date ?? /* @__PURE__ */ new Date(), "yyyy-MM-dd")}</pubDate>
              <link>${blogUrl}/${post.slug}</link>
              <guid>${blogUrl}/${post.slug}</guid>
            </item>
          `.trim()).join("\n")}
      </channel>
    </rss>
  `.trim();
  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Content-Length": String(Buffer.byteLength(rss))
    }
  });
}
function cdata(s) {
  return `<![CDATA[${s}]]>`;
}
export {
  loader
};
