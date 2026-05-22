import nodePath from "path";
import { redirect, data } from "react-router";
import { c as cache } from "./cache.server-BtbXQaCP.js";
import { g as getPeople } from "./credits.server-BCsf817q.js";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import "litefs-js";
import { ensurePrimary } from "litefs-js/remix";
import { b as getMdxPage, g as getBlogMdxListItems, a as getMdxDirList } from "./mdx.server-CWSqTQTg.js";
import { g as getResumeData } from "./resume.server-SKSphO1F.js";
import { g as getTalksAndTags } from "./talks.server-CC1vC5Fa.js";
import { g as getTestimonials } from "./testimonials.server-DAGtgv6g.js";
function isRefreshShaInfo(value) {
  return typeof value === "object" && value !== null && "sha" in value && typeof value.sha === "string" && "date" in value && typeof value.date === "string";
}
const commitShaKey = "meta:last-refresh-commit-sha";
async function action({
  request
}) {
  await ensurePrimary();
  if (request.headers.get("auth") !== getEnv().REFRESH_CACHE_SECRET) {
    return redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }
  const body = await request.json();
  function setShaInCache() {
    const {
      commitSha: sha
    } = body;
    if (sha) {
      const value = {
        sha,
        date: (/* @__PURE__ */ new Date()).toISOString()
      };
      cache.set(commitShaKey, {
        value,
        metadata: {
          createdTime: (/* @__PURE__ */ new Date()).getTime(),
          swr: Number.MAX_SAFE_INTEGER,
          ttl: Number.MAX_SAFE_INTEGER
        }
      });
    }
  }
  if ("keys" in body && Array.isArray(body.keys)) {
    for (const key of body.keys) {
      void cache.delete(key);
    }
    setShaInCache();
    return data({
      message: "Deleting cache keys",
      keys: body.keys,
      commitSha: body.commitSha
    });
  }
  if ("contentPaths" in body && Array.isArray(body.contentPaths)) {
    const refreshingContentPaths = [];
    const promises = [];
    for (const contentPath of body.contentPaths) {
      if (typeof contentPath !== "string") {
        continue;
      }
      if (contentPath.startsWith("blog") || contentPath.startsWith("pages")) {
        const [contentDir, dirOrFilename] = contentPath.split("/");
        if (!contentDir || !dirOrFilename) {
          continue;
        }
        const slug = nodePath.parse(dirOrFilename).name;
        refreshingContentPaths.push(contentPath);
        promises.push(getMdxPage({
          contentDir,
          slug
        }, {
          forceFresh: true
        }));
      }
      if (contentPath === "data/testimonials.yml") {
        refreshingContentPaths.push(contentPath);
        promises.push(getTestimonials({
          forceFresh: true
        }));
      }
      if (contentPath === "data/talks.yml") {
        refreshingContentPaths.push(contentPath);
        promises.push(getTalksAndTags({
          forceFresh: true
        }));
      }
      if (contentPath === "data/resume.yml") {
        refreshingContentPaths.push(contentPath);
        promises.push(getResumeData({
          forceFresh: true
        }));
      }
      if (contentPath === "data/credits.yml") {
        refreshingContentPaths.push(contentPath);
        promises.push(getPeople({
          forceFresh: true
        }));
      }
    }
    if (refreshingContentPaths.some((p) => p.startsWith("blog"))) {
      promises.push(getBlogMdxListItems({
        request,
        forceFresh: "blog:dir-list,blog:mdx-list-items"
      }));
    }
    if (refreshingContentPaths.some((p) => p.startsWith("pages"))) {
      promises.push(getMdxDirList("pages", {
        forceFresh: true
      }));
    }
    if (promises.length) {
      await Promise.all(promises);
    }
    setShaInCache();
    return data({
      message: "Refreshing cache for content paths",
      contentPaths: refreshingContentPaths,
      commitSha: body.commitSha
    });
  }
  return data({
    message: "no action taken"
  }, {
    status: 400
  });
}
const loader = () => redirect("/", {
  status: 404
});
export {
  action as a,
  commitShaKey as c,
  isRefreshShaInfo as i,
  loader as l
};
