import { buildImageUrl } from "cloudinary-build-url";
import __cjsInterop2__ from "@remark-embedder/core";
import __cjsInterop1__ from "@remark-embedder/transformer-oembed";
import lz from "lz-string";
import { bundleMDX } from "mdx-bundler";
import PQueue from "p-queue";
import calculateReadingTime from "reading-time";
import remarkAutolinkHeadings from "remark-autolink-headings";
import gfm from "remark-gfm";
import remarkSlug from "remark-slug";
import { visit } from "unist-util-visit";
import http from "http";
import https from "https";
import { cachified, verboseReporter } from "@epic-web/cachified";
import makeMetascraper from "metascraper";
import mDescription from "metascraper-description";
import mImage from "metascraper-image";
import mTitle from "metascraper-title";
import { c as cache, l as lruCache, b as cachified$1 } from "./cache.server-BtbXQaCP.js";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import { f as fetchWithTimeout } from "./fetch-with-timeout.server-BL1zZ7UJ.js";
import { B as typedBoolean, b as formatDate, d as formatNumber } from "./misc-CQO4K9rH.js";
import { b as downloadMdxFileOrDirectory, g as getGitHubContentPath, d as downloadDirList } from "./github.server-u_4PqFTT.js";
import { b as markdownToHtmlUnwrapped, s as stripHtml } from "./markdown.server-rwSwVnMd.js";
const SYNDICATION_URL = "https://cdn.syndication.twimg.com";
class TwitterApiError extends Error {
  constructor({
    message,
    status,
    data
  }) {
    super(message);
    this.name = "TwitterApiError";
    this.status = status;
    this.data = data;
  }
}
const TWEET_ID = /^[0-9]+$/;
function getToken(id) {
  return (Number(id) / 1e15 * Math.PI).toString(6 ** 2).replace(/(0+|\.)/g, "");
}
async function getTweet(id) {
  if (id.length > 40 || !TWEET_ID.test(id)) {
    throw new Error(`Invalid tweet id: ${id}`);
  }
  const url = new URL(`${SYNDICATION_URL}/tweet-result`);
  url.searchParams.set("id", id);
  url.searchParams.set("lang", "en");
  url.searchParams.set("token", getToken(id));
  url.searchParams.set(
    "features",
    [
      "tfw_timeline_list:",
      "tfw_follower_count_sunset:true",
      "tfw_tweet_edit_backend:on",
      "tfw_refsrc_session:on",
      "tfw_show_business_verified_badge:on",
      "tfw_duplicate_scribes_to_settings:on",
      "tfw_show_blue_verified_badge:on",
      "tfw_legacy_timeline_sunset:true",
      "tfw_show_gov_verified_badge:on",
      "tfw_show_business_affiliate_badge:on",
      "tfw_tweet_edit_frontend:on"
    ].join(";")
  );
  const res = await fetch(url.toString());
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : void 0;
  if (res.ok) {
    if (data && Object.keys(data).length) return data;
    console.error("Empty response from Twitter API", data);
    return null;
  }
  if (res.status === 404) return null;
  throw new TwitterApiError({
    message: typeof data.error === "string" ? data.error : "Bad request.",
    status: res.status,
    data
  });
}
const metascraper = makeMetascraper([mTitle(), mDescription(), mImage()]);
async function getMetadata(url) {
  if (getEnv().MOCKS) return {};
  const html = await fetchWithTimeout(url, {}, 2e3).then((res) => res.text());
  return metascraper({ html, url });
}
function unshorten(urlString, maxFollows = 10) {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(urlString);
      if (url.protocol) {
        const { request } = url.protocol === "https:" ? https : http;
        request(urlString, { method: "HEAD" }, (response) => {
          const {
            headers: { location }
          } = response;
          if (location && location !== urlString && maxFollows > 0) {
            const fullLocation = location.startsWith("/") ? new URL(location, url).toString() : location;
            void unshorten(fullLocation, maxFollows - 1).then(resolve);
          } else {
            resolve(urlString);
          }
        }).end();
      } else {
        reject(`Invalid URL: ${urlString}`);
      }
    } catch (error) {
      reject(error);
    }
  });
}
async function getTweetCached(tweetId) {
  const result = await cachified(
    {
      key: `tweet:${tweetId}`,
      cache: lruCache,
      ttl: 1e3 * 60,
      swr: 1e3 * 60 * 60 * 24 * 30 * 6,
      async getFreshValue({ background }) {
        const tweet = await getTweet(tweetId);
        if (tweet) return tweet;
        if (background) {
          throw new Error(`Tweet not found: ${tweetId}`);
        }
        return null;
      }
    },
    verboseReporter()
  ).catch((e) => {
    console.error("Error getting tweet", tweetId, e);
    return null;
  });
  return result;
}
const playSvg = `<svg width="75" height="75" viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg"><circle cx="37.4883" cy="37.8254" r="37" fill="white" /><path fillRule="evenodd" clipRule="evenodd" d="M35.2643 33.025L41.0017 36.9265C41.6519 37.369 41.6499 38.3118 40.9991 38.7518L35.2616 42.6276C34.5113 43.1349 33.4883 42.6077 33.4883 41.7143V33.9364C33.4883 33.0411 34.5146 32.5151 35.2643 33.025" /></svg>`;
function buildMediaList(mediaDetails, link) {
  const width = mediaDetails.length > 1 ? "50%" : "100%";
  const imgs = mediaDetails.map((media) => {
    const src = media.media_url_https;
    const imgHTML = `<img src="${src}" width="${width}" loading="lazy" alt="Tweet media" />`;
    if (media.type === "animated_gif" || media.type === "video") {
      return `<div class="tweet-media-with-play-button"><div class="tweet-media-play-button">${playSvg}</div>${imgHTML}</div>`;
    } else {
      return imgHTML;
    }
  }).join("");
  const grid = `<div class="tweet-media-container"><div class="tweet-media-grid" data-count="${mediaDetails.length}">${imgs}</div></div>`;
  if (link) {
    return `<a href="${link}" target="_blank" rel="noreferrer noopener">${grid}</a>`;
  } else {
    return grid;
  }
}
const likesSVG = `<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>`;
const repliesSVG = `<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>`;
const retweetSVG = `<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>`;
const linkSvg = `<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><g><path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path><path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path></g></svg>`;
const arrowSvg = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
	<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 15.25V6.75H8.75"></path>
	<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 7L6.75 17.25"></path>
</svg>
`;
function getTweetTextInfo(tweet) {
  const fullNoteTweetText = tweet.note_tweet?.note_tweet_results?.result?.text?.trim();
  if (fullNoteTweetText) {
    return { text: fullNoteTweetText, hasMoreContent: false };
  }
  const hasMoreContent = Boolean(tweet.note_tweet?.id);
  return { text: tweet.text, hasMoreContent };
}
async function buildTweetHTML(tweet, expandQuotedTweet) {
  const author = tweet.user;
  const postURL = `https://x.com/${author.screen_name}/status/${tweet.id_str}`;
  const { text: tweetText, hasMoreContent } = getTweetTextInfo(tweet);
  const authorImg = author.profile_image_url_https.replace("_normal", "_bigger");
  const authorHTML = `
		<a class="tweet-author" href="https://x.com/${author.screen_name}" target="_blank" rel="noreferrer noopener">
			<img src="${authorImg}" loading="lazy" alt="${author.name} avatar" />
			<div>
				<span class="tweet-author-name">${author.name}</span>
				<span class="tweet-author-handle">@${author.screen_name}</span>
			</div>
		</a>`;
  const links = (await Promise.all(
    [...tweetText.matchAll(/https:\/\/t.co\/\w+/g)].map(
      async ([shortLink]) => {
        if (!shortLink) return;
        const longLink = await unshorten(shortLink).catch(() => shortLink);
        const longUrl = new URL(longLink);
        const isXLink = longUrl.host === "twitter.com" || longUrl.host === "x.com";
        let replacement = `<a href="${longLink}" target="_blank" rel="noreferrer noopener">${longUrl.hostname + longUrl.pathname}</a>`;
        const isReferenced = tweet.quoted_tweet?.id_str && longLink.includes(tweet.quoted_tweet.id_str);
        let metadata = null;
        if (isReferenced) {
          replacement = "";
        }
        const isXMediaLink = isXLink && /\/(video|photo)\//.test(longUrl.pathname);
        if (isXMediaLink) {
          replacement = "";
        }
        if (!isXLink) {
          metadata = await getMetadata(longLink).catch(() => null);
        }
        if (metadata) {
          replacement = `<a href="${longLink}" target="_blank" rel="noreferrer noopener">${metadata.title?.trim() || longUrl.hostname + longUrl.pathname}</a>`;
        }
        return {
          shortLink,
          isXLink,
          longLink,
          longUrl,
          replacement,
          metadata
        };
      }
    )
  )).filter(typedBoolean);
  let blockquote = tweetText;
  for (let index = 0; index < links.length; index++) {
    const linkInfo = links[index];
    if (!linkInfo) continue;
    const { shortLink, replacement } = linkInfo;
    blockquote = blockquote.replaceAll(shortLink, replacement);
  }
  let expandedQuoteTweetHTML = "";
  if (expandQuotedTweet && tweet.quoted_tweet) {
    const quotedTweet = await getTweetCached(tweet.quoted_tweet.id_str).catch(
      () => {
      }
    );
    if (quotedTweet) {
      const quotedHTML = await buildTweetHTML(quotedTweet, false).catch(
        () => {
        }
      );
      if (quotedHTML) {
        expandedQuoteTweetHTML = `<div class="tweet-quoted">${quotedHTML}</div>`;
      }
    }
  }
  blockquote = blockquote.replace(
    /@(\w+)/g,
    `<a href="https://x.com/$1" target="_blank" rel="noreferrer noopener">$&</a>`
  );
  if (hasMoreContent) {
    const spacing = /\s$/.test(blockquote) ? "" : " ";
    blockquote += `${spacing}<a class="tweet-read-more" href="${postURL}" target="_blank" rel="noreferrer noopener">...</a>`;
  }
  const tweetHTML = `<blockquote>${blockquote.trim()}</blockquote>`;
  const mediaHTML = tweet.mediaDetails?.length ? buildMediaList(tweet.mediaDetails, postURL) : "";
  const lastMetadataLink = links.reverse().find((l) => l.metadata);
  let linkMetadataHTML = "";
  if (lastMetadataLink && !mediaHTML) {
    const { metadata: md, longLink, longUrl } = lastMetadataLink;
    if (md) {
      const title = md.title ?? "Unknown title";
      const titleHtml = `<div class="tweet-ref-metadata-title">${title}</div>`;
      const imgHtml = md.image ? `<img class="tweet-ref-metadata-image" src="${md.image}" loading="lazy" alt="Referenced media" />` : "";
      const descHtml = md.description ? `<div class="tweet-ref-metadata-description">${md.description}</div>` : "";
      const urlHtml = `<div class="tweet-ref-metadata-domain">${linkSvg}<span>${longUrl.hostname}</span></div>`;
      linkMetadataHTML = `
<a href="${longLink}" class="tweet-ref-metadata" target="_blank" rel="noreferrer noopener">
	${imgHtml}
	${titleHtml}
	${descHtml}
	${urlHtml}
</a>
			`.trim();
    }
  }
  const createdAtHTML = `<div class="tweet-time"><a href="${postURL}" target="_blank" rel="noreferrer noopener">${formatDate(
    tweet.created_at,
    "h:mm a"
  )} (UTC) · ${formatDate(new Date(tweet.created_at))}</a></div>`;
  const likeIntent = `https://x.com/intent/like?tweet_id=${tweet.id_str}`;
  const retweetIntent = `https://x.com/intent/retweet?tweet_id=${tweet.id_str}`;
  const replyIntent = postURL;
  const { favorite_count, conversation_count } = tweet;
  const likeCount = formatNumber(favorite_count);
  const replyCount = formatNumber(conversation_count);
  const statsHTML = `
		<div class="tweet-stats">
			<a href="${replyIntent}" class="tweet-reply" target="_blank" rel="noreferrer noopener">${repliesSVG}<span>${replyCount}</span></a>
			<a href="${retweetIntent}" class="tweet-retweet" target="_blank" rel="noreferrer noopener">${retweetSVG}</a>
			<a href="${likeIntent}" class="tweet-like" target="_blank" rel="noreferrer noopener">${likesSVG}<span>${likeCount}</span></a>
			<a href="${postURL}" class="tweet-link" target="_blank" rel="noreferrer noopener">${arrowSvg}<span></span></a>
		</div>
	`;
  return `
		<div class="tweet-embed">
			${authorHTML}
			${tweetHTML}
			${mediaHTML}
			${linkMetadataHTML}
			${expandedQuoteTweetHTML}
			${createdAtHTML}
			${statsHTML}
		</div>
	`.trim();
}
async function getTweetEmbedHTML(urlString) {
  return cachified(
    {
      key: `tweet:embed:${urlString}`,
      ttl: 1e3 * 60 * 60 * 24,
      cache,
      staleWhileRevalidate: 1e3 * 60 * 60 * 24 * 30 * 6,
      getFreshValue: () => getTweetEmbedHTMLImpl(urlString)
    },
    verboseReporter()
  );
}
async function getTweetEmbedHTMLImpl(urlString) {
  const url = new URL(urlString);
  const tweetId = url.pathname.split("/").pop();
  if (!tweetId) {
    console.error("TWEET ID NOT FOUND", urlString, tweetId);
    return "";
  }
  let tweet = null;
  const failureHtml = `<callout-danger>𝕏 post data not available: <a href="${urlString}">${urlString}</a></callout-danger>`;
  try {
    tweet = await getTweetCached(tweetId);
    if (!tweet) {
      return failureHtml;
    }
    const html = await buildTweetHTML(tweet, true);
    return html;
  } catch (error) {
    console.error("Error processing tweet", {
      urlString,
      tweetId,
      error,
      tweet
    });
    return failureHtml;
  }
}
function isXUrl(urlString) {
  const url = new URL(urlString);
  return /\.?twitter\.com/.test(url.hostname) || /\.?x\.com/.test(url.hostname);
}
const { default: remarkEmbedder = __cjsInterop2__ } = __cjsInterop2__?.default?.__esModule ? __cjsInterop2__.default : __cjsInterop2__;
const { default: oembedTransformer = __cjsInterop1__ } = __cjsInterop1__?.default?.__esModule ? __cjsInterop1__.default : __cjsInterop1__;
function rehypeCodeBlocksShiki() {
  return async function transformer(tree) {
    return tree;
  };
}
function handleEmbedderError({ url }) {
  return `<p>Error embedding <a href="${url}">${url}</a></p>.`;
}
function handleEmbedderHtml(html, info) {
  if (!html) return null;
  const url = new URL(info.url);
  if (/youtu\.?be/.test(url.hostname)) {
    return makeEmbed(html, "youtube");
  }
  if (url.hostname.includes("codesandbox.io")) {
    return makeEmbed(html, "codesandbox", "80%");
  }
  return html;
}
function makeEmbed(html, type, heightRatio = "56.25%") {
  return `
  <div class="embed" data-embed-type="${type}">
    <div style="padding-bottom: ${heightRatio}">
      ${html}
    </div>
  </div>
`;
}
function trimCodeBlocks() {
  return async function transformer(tree) {
    visit(tree, "element", (preNode) => {
      if (preNode.tagName !== "pre" || !preNode.children.length) {
        return;
      }
      const codeNode = preNode.children[0];
      if (!codeNode || codeNode.type !== "element" || codeNode.tagName !== "code") {
        return;
      }
      const [codeStringNode] = codeNode.children;
      if (!codeStringNode) return;
      if (codeStringNode.type !== "text") {
        console.warn(
          `trimCodeBlocks: Unexpected: codeStringNode type is not "text": ${codeStringNode.type}`
        );
        return;
      }
      codeStringNode.value = codeStringNode.value.trim();
    });
  };
}
const cloudinaryUrlRegex = /^https?:\/\/res\.cloudinary\.com\/(?<cloudName>.+?)\/image\/upload\/((?<transforms>(.+?_.+?)+?)\/)?(\/?(?<version>v\d+)\/)?(?<publicId>.+$)/;
function optimizeCloudinaryImages() {
  return async function transformer(tree) {
    visit(tree, "mdxJsxFlowElement", function visitor(node) {
      if (node?.name !== "img") return;
      const srcAttr = node.attributes?.find(
        (attr) => attr?.type === "mdxJsxAttribute" && attr?.name === "src"
      );
      const urlString = srcAttr?.value ? String(srcAttr.value) : null;
      if (!srcAttr || !urlString) {
        console.error("image without url?", node);
        return;
      }
      const newUrl = handleImageUrl(urlString);
      if (newUrl) {
        srcAttr.value = newUrl;
      }
    });
    visit(tree, "element", function visitor(node) {
      if (node.tagName !== "img") return;
      const urlString = node.properties?.src ? String(node.properties.src) : null;
      if (!node.properties?.src || !urlString) {
        console.error("image without url?", node);
        return;
      }
      const newUrl = handleImageUrl(urlString);
      if (newUrl) {
        node.properties.src = newUrl;
      }
    });
  };
  function handleImageUrl(urlString) {
    const match = urlString.match(cloudinaryUrlRegex);
    const groups = match?.groups;
    if (groups) {
      const { cloudName, transforms, version, publicId } = groups;
      if (transforms) return;
      const defaultTransforms = [
        "f_auto",
        "q_auto",
        // gifs can't do dpr transforms
        publicId.endsWith(".gif") ? "" : "dpr_2.0",
        "w_1600"
      ].filter(Boolean).join(",");
      return [
        `https://res.cloudinary.com/${cloudName}/image/upload`,
        defaultTransforms,
        version,
        publicId
      ].filter(Boolean).join("/");
    }
  }
}
const twitterTransformer = {
  shouldTransform: isXUrl,
  getHTML: getTweetEmbedHTML
};
const eggheadTransformer = {
  shouldTransform: (url) => {
    const { host, pathname } = new URL(url);
    return host === "egghead.io" && pathname.includes("/lessons/") && !pathname.includes("/embed");
  },
  getHTML: (url) => {
    const { host, pathname, searchParams } = new URL(url);
    if (!searchParams.has("preload")) {
      searchParams.set("preload", "false");
    }
    if (!searchParams.has("af")) {
      searchParams.set("af", "5236ad");
    }
    const iframeSrc = `https://${host}${pathname}/embed?${searchParams.toString()}`;
    return makeEmbed(
      `<iframe src="${iframeSrc}" allowfullscreen></iframe>`,
      "egghead"
    );
  }
};
function autoAffiliates() {
  return async function affiliateTransformer(tree) {
    visit(tree, "link", function visitor(linkNode) {
      if (linkNode.url.includes("amazon.com")) {
        const amazonUrl = new URL(linkNode.url);
        if (!amazonUrl.searchParams.has("tag")) {
          amazonUrl.searchParams.set("tag", "kentcdodds-20");
          linkNode.url = amazonUrl.toString();
        }
      }
      if (linkNode.url.includes("egghead.io")) {
        const eggheadUrl = new URL(linkNode.url);
        if (!eggheadUrl.searchParams.has("af")) {
          eggheadUrl.searchParams.set("af", "5236ad");
          linkNode.url = eggheadUrl.toString();
        }
      }
    });
  };
}
function removePreContainerDivs() {
  return async function preContainerDivsTransformer(tree) {
    visit(
      tree,
      { type: "element", tagName: "pre" },
      function visitor(node, index, parent) {
        if (parent?.type !== "element") return;
        if (parent.tagName !== "div") return;
        if (parent.children.length !== 1 && index === 0) return;
        Object.assign(parent, node);
      }
    );
  };
}
function mdxStringExpressionAttribute(name, value) {
  return {
    type: "mdxJsxAttribute",
    name,
    value: {
      type: "mdxJsxAttributeValueExpression",
      value: JSON.stringify(value),
      // This hack brought to you by this:
      // https://github.com/syntax-tree/hast-util-to-estree/blob/e5ccb97e9f42bba90359ea6d0f83a11d74e0dad6/lib/handlers/mdx-expression.js#L35-L38
      // No idea why we're required to have estree here, but I'm pretty sure
      // someone is supposed to add it automatically for us and it just never
      // happens...
      data: {
        estree: {
          type: "Program",
          sourceType: "script",
          body: [
            {
              type: "ExpressionStatement",
              expression: {
                type: "Literal",
                value
              }
            }
          ]
        }
      }
    }
  };
}
async function getMermaidSvg({
  code,
  theme
}) {
  const trimmed = code.trim();
  if (!trimmed) return null;
  const compressed = lz.compressToEncodedURIComponent(trimmed);
  if (!compressed) return null;
  const url = new URL("https://mermaid-to-svg.kentcdodds.workers.dev/svg");
  url.searchParams.set("mermaid", compressed);
  url.searchParams.set("theme", theme);
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const svgText = await response.text();
    if (!svgText || !svgText.startsWith("<svg")) return null;
    return svgText;
  } catch {
    return null;
  }
}
function remarkMermaidCodeToThemedSvg() {
  return async function transformer(tree) {
    const promises = [];
    visit(tree, "code", (node, index, parent) => {
      if (node.lang !== "mermaid") return;
      if (!parent || typeof index !== "number") return;
      const promise = (async () => {
        const code = node.value;
        const [lightSvg, darkSvg] = await Promise.all([
          getMermaidSvg({ code, theme: "default" }),
          getMermaidSvg({ code, theme: "dark" })
        ]);
        if (!lightSvg && !darkSvg) return;
        const attributes = [
          mdxStringExpressionAttribute("code", code),
          ...lightSvg ? [mdxStringExpressionAttribute("lightSvg", lightSvg)] : [],
          ...darkSvg ? [mdxStringExpressionAttribute("darkSvg", darkSvg)] : []
        ];
        parent.children[index] = {
          type: "mdxJsxFlowElement",
          name: "MermaidDiagram",
          attributes,
          children: []
        };
      })();
      promises.push(promise);
    });
    await Promise.all(promises);
  };
}
const remarkPlugins = [
  remarkMermaidCodeToThemedSvg,
  [
    remarkEmbedder,
    {
      handleError: handleEmbedderError,
      handleHTML: handleEmbedderHtml,
      transformers: [twitterTransformer, eggheadTransformer, oembedTransformer]
    }
  ],
  autoAffiliates
];
const rehypePlugins = [
  optimizeCloudinaryImages,
  trimCodeBlocks,
  rehypeCodeBlocksShiki,
  removePreContainerDivs
];
async function compileMdx(slug, githubFiles) {
  const indexRegex = new RegExp(`${slug}\\/index.mdx?$`);
  const indexFile = githubFiles.find(({ path }) => indexRegex.test(path));
  if (!indexFile) return null;
  const rootDir = indexFile.path.replace(/index.mdx?$/, "");
  const relativeFiles = githubFiles.map(
    ({ path, content }) => ({
      path: path.replace(rootDir, "./"),
      content
    })
  );
  const files = arrayToObj(relativeFiles, {
    keyName: "path",
    valueName: "content"
  });
  try {
    const { frontmatter, code } = await bundleMDX({
      source: indexFile.content,
      files,
      mdxOptions(options) {
        options.remarkPlugins = [
          ...options.remarkPlugins ?? [],
          remarkSlug,
          [remarkAutolinkHeadings, { behavior: "wrap" }],
          gfm,
          ...remarkPlugins
        ];
        options.rehypePlugins = [
          ...options.rehypePlugins ?? [],
          ...rehypePlugins
        ];
        return options;
      }
    });
    const readTime = calculateReadingTime(indexFile.content);
    return {
      code,
      readTime,
      frontmatter
    };
  } catch (error) {
    console.error(`Compilation error for slug: `, slug);
    throw error;
  }
}
function arrayToObj(array, {
  keyName,
  valueName
}) {
  const obj = {};
  for (const item of array) {
    const key = item[keyName];
    if (typeof key !== "string") {
      throw new Error(`${String(keyName)} of item must be a string`);
    }
    const value = item[valueName];
    obj[key] = value;
  }
  return obj;
}
let _queue = null;
async function getQueue() {
  if (_queue) return _queue;
  _queue = new PQueue({
    concurrency: 1,
    timeout: MDX_COMPILE_QUEUE_TIMEOUT_MS
  });
  return _queue;
}
const MDX_COMPILE_QUEUE_TIMEOUT_MS = 1e3 * 90;
async function queuedCompileMdx(...args) {
  const queue = await getQueue();
  const result = await queue.add(() => compileMdx(...args));
  return result;
}
const defaultTTL = 1e3 * 60 * 60 * 24 * 14;
const defaultStaleWhileRevalidate = 1e3 * 60 * 60 * 24 * 365 * 100;
const notFoundTTL = 1e3 * 60 * 60 * 24;
const notFoundStaleWhileRevalidate = 0;
function staleRefreshJitterMs(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = Math.imul(31, h) + key.charCodeAt(i);
  }
  return Math.abs(h) % 2500;
}
function applyNotFoundCacheMetadata(metadata, maxTtl) {
  const effectiveMaxTtl = typeof maxTtl === "number" ? maxTtl : Infinity;
  metadata.ttl = Math.min(effectiveMaxTtl, notFoundTTL);
  metadata.swr = notFoundStaleWhileRevalidate;
}
const checkCompiledValue = (value) => typeof value === "object" && (value === null || "code" in value && "frontmatter" in value);
async function getMdxPage({
  contentDir,
  slug
}, options) {
  const { forceFresh, ttl = defaultTTL, request, timings } = options;
  const key = `mdx-page:${contentDir}:${slug}:compiled`;
  try {
    const page = await cachified$1({
      key,
      cache,
      request,
      timings,
      ttl,
      staleWhileRevalidate: defaultStaleWhileRevalidate,
      staleRefreshTimeout: staleRefreshJitterMs(key),
      forceFresh,
      checkValue: checkCompiledValue,
      getFreshValue: async (context) => {
        const pageFiles = await downloadMdxFilesCached(
          contentDir,
          slug,
          options
        );
        const compiledPage = await compileMdxCached({
          contentDir,
          slug,
          ...pageFiles,
          options
        }).catch((err) => {
          console.error(`Failed to get a fresh value for mdx:`, {
            contentDir,
            slug
          });
          return Promise.reject(err);
        });
        if (!compiledPage) {
          applyNotFoundCacheMetadata(context.metadata, ttl);
        }
        return compiledPage;
      }
    });
    return page;
  } catch (error) {
    console.error(
      `mdx: failed to load page ${contentDir}/${slug}, returning null`,
      error
    );
    return null;
  }
}
async function getMdxPagesInDirectory(contentDir, options) {
  const dirList = await getMdxDirList(contentDir, options);
  const pageDatas = await Promise.all(
    dirList.map(async ({ slug }) => {
      return {
        ...await downloadMdxFilesCached(contentDir, slug, options),
        slug
      };
    })
  );
  const pages = await Promise.all(
    pageDatas.map(
      (pageData) => compileMdxCached({ contentDir, ...pageData, options })
    )
  );
  return pages.filter(typedBoolean);
}
const getDirListKey = (contentDir) => `${contentDir}:dir-list`;
async function getMdxDirList(contentDir, options) {
  const { forceFresh, ttl = defaultTTL, request, timings } = options ?? {};
  const key = getDirListKey(contentDir);
  return cachified$1({
    cache,
    request,
    timings,
    ttl,
    staleWhileRevalidate: defaultStaleWhileRevalidate,
    staleRefreshTimeout: staleRefreshJitterMs(key),
    forceFresh,
    key,
    checkValue: (value) => Array.isArray(value),
    getFreshValue: async () => {
      try {
        const fullContentDirPath = getGitHubContentPath(contentDir);
        const dirList = (await downloadDirList(fullContentDirPath)).map(({ name, path }) => ({
          name,
          slug: path.replace(/\\/g, "/").replace(`${fullContentDirPath}/`, "").replace(/\.mdx$/, "")
        })).filter(({ name }) => name !== "README.md");
        return dirList;
      } catch (error) {
        console.error(
          `mdx: failed to fetch GitHub dir list for ${contentDir}, returning empty`,
          error
        );
        return [];
      }
    }
  });
}
async function getBlogMdxListItems(options) {
  const { request, forceFresh, ttl = defaultTTL, timings } = options;
  const key = "blog:mdx-list-items";
  try {
    return await cachified$1({
      cache,
      request,
      timings,
      ttl,
      staleWhileRevalidate: defaultStaleWhileRevalidate,
      staleRefreshTimeout: staleRefreshJitterMs(key),
      forceFresh,
      key,
      getFreshValue: async () => {
        let pages = await getMdxPagesInDirectory("blog", options).then(
          (allPosts) => allPosts.filter(
            (p) => !p.frontmatter.draft && !p.frontmatter.unlisted
          )
        );
        pages = pages.sort((a, z) => {
          const aTime = new Date(a.frontmatter.date ?? "").getTime();
          const zTime = new Date(z.frontmatter.date ?? "").getTime();
          return aTime > zTime ? -1 : aTime === zTime ? 0 : 1;
        });
        return pages.map(({ code: _code, ...rest }) => rest);
      }
    });
  } catch (error) {
    console.error(
      `mdx: failed to load blog list items, returning empty fallback`,
      error
    );
    return [];
  }
}
async function downloadMdxFilesCached(contentDir, slug, options) {
  const { forceFresh, ttl = defaultTTL, request, timings } = options;
  const key = `${contentDir}:${slug}:downloaded`;
  const downloaded = await cachified$1({
    cache,
    request,
    timings,
    ttl,
    staleWhileRevalidate: defaultStaleWhileRevalidate,
    staleRefreshTimeout: staleRefreshJitterMs(key),
    forceFresh,
    key,
    checkValue: (value) => {
      if (typeof value !== "object") {
        return `value is not an object`;
      }
      if (value === null) {
        return `value is null`;
      }
      const download = value;
      if (!Array.isArray(download.files)) {
        return `value.files is not an array`;
      }
      if (typeof download.entry !== "string") {
        return `value.entry is not a string`;
      }
      return true;
    },
    getFreshValue: async (context) => {
      const result = await downloadMdxFileOrDirectory(`${contentDir}/${slug}`);
      if (!result.files.length) {
        applyNotFoundCacheMetadata(context.metadata, ttl);
      }
      return result;
    }
  });
  return downloaded;
}
async function compileMdxCached({
  contentDir,
  slug,
  entry,
  files,
  options
}) {
  const { ttl = defaultTTL } = options;
  const key = `${contentDir}:${slug}:compiled`;
  const page = await cachified$1({
    cache,
    ttl: defaultTTL,
    staleWhileRevalidate: defaultStaleWhileRevalidate,
    ...options,
    key,
    staleRefreshTimeout: staleRefreshJitterMs(key),
    checkValue: checkCompiledValue,
    getFreshValue: async (context) => {
      const compiledPage = await queuedCompileMdx(slug, files);
      if (compiledPage) {
        if (compiledPage.frontmatter.bannerCloudinaryId && !compiledPage.frontmatter.bannerBlurDataUrl) {
          try {
            compiledPage.frontmatter.bannerBlurDataUrl = await getBlurDataUrl(
              compiledPage.frontmatter.bannerCloudinaryId
            );
          } catch (error) {
            console.error(
              "oh no, there was an error getting the blur image data url",
              error
            );
          }
        }
        if (compiledPage.frontmatter.bannerCredit) {
          const credit = await markdownToHtmlUnwrapped(
            compiledPage.frontmatter.bannerCredit
          );
          compiledPage.frontmatter.bannerCredit = credit;
          const noHtml = await stripHtml(credit);
          if (!compiledPage.frontmatter.bannerAlt) {
            compiledPage.frontmatter.bannerAlt = noHtml.replace(/(photo|image)/i, "").trim();
          }
          if (!compiledPage.frontmatter.bannerTitle) {
            compiledPage.frontmatter.bannerTitle = noHtml;
          }
        }
        return {
          dateDisplay: compiledPage.frontmatter.date ? formatDate(compiledPage.frontmatter.date) : void 0,
          ...compiledPage,
          slug,
          editLink: `https://github.com/kentcdodds/kentcdodds.com/edit/main/${entry}`
        };
      } else {
        applyNotFoundCacheMetadata(context.metadata, ttl);
        return null;
      }
    }
  });
  return page;
}
async function getBlurDataUrl(cloudinaryId) {
  const imageURL = buildImageUrl(cloudinaryId, {
    transformations: {
      resize: { width: 100 },
      quality: "auto",
      format: "webp",
      effect: {
        name: "blur",
        value: "1000"
      }
    }
  });
  const dataUrl = await getDataUrlForImage(imageURL);
  return dataUrl;
}
async function getDataUrlForImage(imageUrl) {
  const res = await fetch(imageUrl);
  const arrayBuffer = await res.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const mime = res.headers.get("Content-Type") ?? "image/webp";
  const dataUrl = `data:${mime};base64,${base64}`;
  return dataUrl;
}
export {
  getMdxDirList as a,
  getMdxPage as b,
  getMdxPagesInDirectory as c,
  getBlogMdxListItems as g
};
