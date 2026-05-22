import { redirect } from "react-router";
async function loader({
  request,
  params
}) {
  const q = typeof params.query === "string" ? params.query.trim() : "";
  if (!q) return redirect("/search");
  const currentUrl = new URL(request.url);
  const to = new URL("/search", currentUrl.origin);
  to.searchParams.set("q", q);
  return redirect(`${to.pathname}${to.search}`);
}
export {
  loader
};
//# sourceMappingURL=s._query-DY9ttKYV.js.map
