import { g as getEnv } from "./env.server-DPCBxZtL.js";
const EMBEDDING_GEMMA_MODEL_SEGMENT = "embeddinggemma-300m";
function usesEmbeddingGemmaModel(model) {
  return model.includes(EMBEDDING_GEMMA_MODEL_SEGMENT);
}
function getWorkersAiRunUrl(options) {
  const { model, accountId, gatewayId } = typeof options === "string" ? { model: options } : options;
  const env = getEnv();
  const resolvedAccountId = accountId ?? env.CLOUDFLARE_ACCOUNT_ID;
  const resolvedGatewayId = gatewayId ?? (usesEmbeddingGemmaModel(model) ? env.CLOUDFLARE_AI_EMBEDDING_GATEWAY_ID : env.CLOUDFLARE_AI_GATEWAY_ID);
  return `https://gateway.ai.cloudflare.com/v1/${resolvedAccountId}/${resolvedGatewayId}/workers-ai/${model}`;
}
function unwrapWorkersAiText(result) {
  if (!result) return null;
  if (typeof result === "string") return result;
  const nested = result.result;
  if (nested && nested !== result) {
    const unwrapped = unwrapWorkersAiText(nested);
    if (unwrapped) return unwrapped;
  }
  if (typeof result.response === "string") return result.response;
  if (typeof result.output === "string") return result.output;
  if (typeof result.text === "string") return result.text;
  const choiceContent = result?.choices?.[0]?.message?.content;
  if (typeof choiceContent === "string") return choiceContent;
  return null;
}
export {
  getWorkersAiRunUrl as g,
  unwrapWorkersAiText as u
};
//# sourceMappingURL=cloudflare-ai-utils.server-D2ZFqcMo.js.map
