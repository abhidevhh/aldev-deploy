import { invariantResponse } from "@epic-web/invariant";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import "zod";
async function action({
  request
}) {
  const env = getEnv();
  if (env.MOCKS) {
    await request.text().catch(() => "");
    return new Response(null, {
      status: 204
    });
  }
  const sentryHost = (() => {
    const dsn2 = env.SENTRY_DSN;
    if (!dsn2) return null;
    try {
      return new URL(dsn2).hostname;
    } catch {
      return null;
    }
  })();
  const sentryProjectIds = env.SENTRY_PROJECT_ID ? [env.SENTRY_PROJECT_ID] : [];
  if (!sentryHost) {
    throw new Response("Sentry is not configured", {
      status: 404
    });
  }
  const envelope = await request.text();
  const piece = envelope.split("\n")[0];
  invariantResponse(piece, "no piece in envelope");
  let header;
  try {
    header = JSON.parse(piece);
  } catch {
    throw new Response("Invalid Sentry envelope format: first line must be valid JSON", {
      status: 400
    });
  }
  if (!header.dsn || typeof header.dsn !== "string") {
    throw new Response("Invalid Sentry envelope format: missing or invalid dsn field", {
      status: 400
    });
  }
  let dsn;
  try {
    dsn = new URL(header.dsn);
  } catch {
    throw new Response("Invalid Sentry envelope format: invalid dsn URL", {
      status: 400
    });
  }
  const projectId = dsn.pathname.slice(1);
  invariantResponse(dsn.hostname === sentryHost, `Invalid sentry hostname: ${dsn.hostname}`);
  invariantResponse(projectId && sentryProjectIds.includes(projectId), `Invalid sentry project id: ${projectId}`);
  const upstreamSentryURL = `https://${sentryHost}/api/${projectId}/envelope/`;
  try {
    return await fetch(upstreamSentryURL, {
      method: "POST",
      body: envelope,
      signal: AbortSignal.timeout(5e3)
    });
  } catch {
    throw new Response("Failed to proxy request to Sentry", {
      status: 502
    });
  }
}
export {
  action
};
//# sourceMappingURL=lookout-CGx1vI8K.js.map
