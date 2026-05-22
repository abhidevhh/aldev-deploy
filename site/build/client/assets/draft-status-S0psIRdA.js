import { data } from "react-router";
import { prisma } from "./prisma.server-MnXt9BdG.js";
import { requireAdminUser } from "./session.server-BVOCbXUc.js";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./favorites-BOCNblj8.js";
import "litefs-js";
import "litefs-js/remix";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
async function loader({
  request
}) {
  await requireAdminUser(request);
  const url = new URL(request.url);
  const callId = url.searchParams.get("callId");
  if (!callId) throw new Response("callId is required", {
    status: 400
  });
  const draft = await prisma.abhiCallEpisodeDraft.findUnique({
    where: {
      callId
    },
    select: {
      id: true,
      status: true,
      step: true,
      errorMessage: true
    }
  });
  if (!draft) throw new Response("Not found", {
    status: 404
  });
  return data({
    status: draft.status,
    step: draft.step,
    errorMessage: draft.errorMessage
  });
}
export {
  loader
};
//# sourceMappingURL=draft-status-S0psIRdA.js.map
