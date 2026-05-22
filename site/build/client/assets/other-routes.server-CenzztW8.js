import "lodash/groupBy.js";
import isEqual from "lodash/isEqual.js";
import "lodash/omit.js";
import "lodash/orderBy.js";
import "lodash/pick.js";
import "lodash/shuffle.js";
import "lodash/sortBy.js";
import { h as getDomainUrl, u as removeTrailingSlash, B as typedBoolean } from "./misc-CQO4K9rH.js";
import "date-fns";
async function getSitemapXml(request, remixContext) {
  const domainUrl = getDomainUrl(request);
  function getEntry({ route, lastmod, changefreq, priority }) {
    return `
<url>
  <loc>${domainUrl}${route}</loc>
  ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
  ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ""}
  ${priority ? `<priority>${priority}</priority>` : ""}
</url>
  `.trim();
  }
  const rawSitemapEntries = (await Promise.all(
    Object.entries(remixContext.routeModules).map(async ([id, mod]) => {
      if (!mod) return;
      if (id === "root") return;
      if (id.startsWith("routes/_")) return;
      if (id.startsWith("__test_routes__")) return;
      const handle = mod.handle;
      if (handle?.getSitemapEntries) {
        return handle.getSitemapEntries(request);
      }
      if (!("default" in mod)) return;
      const manifestEntry = remixContext.manifest.routes[id];
      if (!manifestEntry) {
        console.warn(`Could not find a manifest entry for ${id}`);
        return;
      }
      let parentId = manifestEntry.parentId;
      let parent = parentId ? remixContext.manifest.routes[parentId] : null;
      let path;
      if (manifestEntry.path) {
        path = removeTrailingSlash(manifestEntry.path);
      } else if (manifestEntry.index) {
        path = "";
      } else {
        return;
      }
      while (parent) {
        const parentPath = parent.path ? removeTrailingSlash(parent.path) : "";
        path = `${parentPath}/${path}`;
        parentId = parent.parentId;
        parent = parentId ? remixContext.manifest.routes[parentId] : null;
      }
      if (path.includes(":")) return;
      if (id === "root") return;
      const entry = { route: removeTrailingSlash(path) };
      return entry;
    })
  )).flatMap((z) => z).filter(typedBoolean);
  const sitemapEntries = [];
  for (const entry of rawSitemapEntries) {
    const existingEntryForRoute = sitemapEntries.find(
      (e) => e.route === entry.route
    );
    if (existingEntryForRoute) {
      if (!isEqual(existingEntryForRoute, entry)) {
        console.warn(
          `Duplicate route for ${entry.route} with different sitemap data`,
          { entry, existingEntryForRoute }
        );
      }
    } else {
      sitemapEntries.push(entry);
    }
  }
  return `
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
  ${sitemapEntries.map((entry) => getEntry(entry)).join("")}
</urlset>
  `.trim();
}
const pathedRoutes = {
  "/sitemap.xml": async (request, remixContext) => {
    const sitemap = await getSitemapXml(request, remixContext);
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Content-Length": String(Buffer.byteLength(sitemap))
      }
    });
  }
};
Object.entries(pathedRoutes).map(
  ([path, handler]) => {
    return (request, remixContext) => {
      if (new URL(request.url).pathname !== path) return null;
      return handler(request, remixContext);
    };
  }
);
export {
  pathedRoutes
};
