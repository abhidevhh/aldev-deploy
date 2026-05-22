import { format, parseISO, add } from "date-fns";
const teams = ["RED", "BLUE", "YELLOW"];
const optionalTeams = [...teams, "UNKNOWN"];
const isTeam = (team) => teams.includes(team);
const getTeam = (team) => isTeam(team) ? team : null;
const getOptionalTeam = (team) => isTeam(team) ? team : "UNKNOWN";
const teamTextColorClasses = {
  YELLOW: "text-team-yellow",
  BLUE: "text-team-blue",
  RED: "text-team-red",
  UNKNOWN: "text-team-unknown"
};
const teamDisplay = {
  RED: "Red",
  BLUE: "Blue",
  YELLOW: "Yellow"
};
function formatDuration(seconds) {
  const totalSeconds = Math.max(0, Math.round(seconds));
  const mins = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const secs = (totalSeconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}
const formatNumber = (num) => new Intl.NumberFormat().format(num);
function formatAbbreviatedNumber(num) {
  return num < 1e3 ? formatNumber(num) : num < 1e6 ? `${formatNumber(Number((num / 1e3).toFixed(2)))}k` : num < 1e9 ? `${formatNumber(Number((num / 1e6).toFixed(2)))}m` : num < 1e12 ? `${formatNumber(Number((num / 1e9).toFixed(2)))}b` : "a lot";
}
function parseDate(dateString) {
  const parsed = parseISO(dateString);
  return add(parsed, { minutes: (/* @__PURE__ */ new Date()).getTimezoneOffset() });
}
function formatDate(dateString, format$1 = "PPP") {
  if (typeof dateString !== "string") {
    dateString = dateString.toISOString();
  }
  return format(parseDate(dateString), format$1);
}
function getErrorMessage(error, fallback = "Unknown Error") {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return fallback;
}
function getStringFormValue(formData, key) {
  const value = formData.get(key);
  return typeof value === "string" ? value : null;
}
function getErrorStack(error, fallback = "Unknown Error") {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.stack;
  return fallback;
}
function assertNonNull(possibleNull, errorMessage) {
  if (possibleNull == null) throw new Error(errorMessage);
}
function getNonNull(obj) {
  for (const [key, val] of Object.entries(obj)) {
    assertNonNull(val, `The value of ${key} is null but it should not be.`);
  }
  return obj;
}
function typedBoolean(value) {
  return Boolean(value);
}
function getDiscordAuthorizeURL(domainUrl) {
  const url = new URL("https://discord.com/api/oauth2/authorize");
  url.searchParams.set("client_id", ENV.DISCORD_CLIENT_ID);
  url.searchParams.set("redirect_uri", `${domainUrl}/discord/callback`);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "identify guilds.join email guilds");
  return url.toString();
}
function getDomainUrl(request) {
  const host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  if (!host) {
    throw new Error("Could not determine domain URL.");
  }
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}
function isResponse(response) {
  return typeof response === "object" && response !== null && "status" in response && "headers" in response && "body" in response;
}
function removeTrailingSlash(s) {
  return s.endsWith("/") ? s.slice(0, -1) : s;
}
function getDisplayUrl(requestInfo) {
  return getUrl(requestInfo).replace(/^https?:\/\//, "");
}
function getOrigin(requestInfo) {
  return requestInfo?.origin ?? "https://kentcdodds.com";
}
function getUrl(requestInfo) {
  return removeTrailingSlash(
    `${getOrigin(requestInfo)}${requestInfo?.path ?? ""}`
  );
}
function toBase64(string) {
  if (typeof window === "undefined") {
    return Buffer.from(string, "utf8").toString("base64");
  } else {
    const bytes = new TextEncoder().encode(string);
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return window.btoa(binary);
  }
}
const reuseUsefulLoaderHeaders = ({
  loaderHeaders,
  parentHeaders
}) => {
  const headers = new Headers();
  const usefulHeaders = ["Cache-Control", "Vary", "Server-Timing"];
  for (const headerName of usefulHeaders) {
    if (loaderHeaders.has(headerName)) {
      headers.set(headerName, loaderHeaders.get(headerName));
    }
  }
  const appendHeaders = ["Server-Timing"];
  for (const headerName of appendHeaders) {
    if (parentHeaders.has(headerName)) {
      headers.append(headerName, parentHeaders.get(headerName));
    }
  }
  const useIfNotExistsHeaders = ["Cache-Control", "Vary"];
  for (const headerName of useIfNotExistsHeaders) {
    if (!headers.has(headerName) && parentHeaders.has(headerName)) {
      headers.set(headerName, parentHeaders.get(headerName));
    }
  }
  return headers;
};
function requireValidSlug(slug) {
  if (typeof slug !== "string" || !/^[a-zA-Z0-9-_.]+$/.test(slug)) {
    throw new Response(`This is not a valid slug: "${slug}"`, { status: 400 });
  }
}
export {
  teamTextColorClasses as A,
  assertNonNull as B,
  formatDuration as a,
  getDisplayUrl as b,
  getOrigin as c,
  getDiscordAuthorizeURL as d,
  getErrorMessage as e,
  formatDate as f,
  getUrl as g,
  getDomainUrl as h,
  isResponse as i,
  getTeam as j,
  isTeam as k,
  formatAbbreviatedNumber as l,
  formatNumber as m,
  getNonNull as n,
  optionalTeams as o,
  parseDate as p,
  getOptionalTeam as q,
  reuseUsefulLoaderHeaders as r,
  typedBoolean as s,
  toBase64 as t,
  teams as u,
  getErrorStack as v,
  requireValidSlug as w,
  teamDisplay as x,
  removeTrailingSlash as y,
  getStringFormValue as z
};
//# sourceMappingURL=misc-DM3BUXHg.js.map
