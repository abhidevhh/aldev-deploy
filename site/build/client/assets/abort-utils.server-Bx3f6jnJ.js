const defaultSleep = async (ms) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};
function createAbortError() {
  const error = new Error("Operation aborted");
  error.name = "AbortError";
  return error;
}
function throwIfAborted(signal) {
  if (!signal?.aborted) return;
  throw createAbortError();
}
function isAbortError(error) {
  return typeof error === "object" && error !== null && error.name === "AbortError";
}
async function waitForDelay({
  sleep,
  delayMs,
  signal
}) {
  if (!signal) {
    const activeSleep = sleep ?? defaultSleep;
    await activeSleep(delayMs);
    return;
  }
  throwIfAborted(signal);
  if (!sleep) {
    await new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        signal.removeEventListener("abort", onAbort);
        resolve();
      }, delayMs);
      const onAbort = () => {
        clearTimeout(timeoutId);
        signal.removeEventListener("abort", onAbort);
        reject(createAbortError());
      };
      signal.addEventListener("abort", onAbort, { once: true });
    });
    return;
  }
  await new Promise((resolve, reject) => {
    let settled = false;
    const onAbort = () => {
      if (settled) return;
      settled = true;
      signal.removeEventListener("abort", onAbort);
      reject(createAbortError());
    };
    signal.addEventListener("abort", onAbort, { once: true });
    sleep(delayMs).then(
      () => {
        if (settled) return;
        settled = true;
        signal.removeEventListener("abort", onAbort);
        resolve();
      },
      (error) => {
        if (settled) return;
        settled = true;
        signal.removeEventListener("abort", onAbort);
        reject(error);
      }
    );
  });
}
export {
  defaultSleep as d,
  isAbortError as i,
  throwIfAborted as t,
  waitForDelay as w
};
//# sourceMappingURL=abort-utils.server-Bx3f6jnJ.js.map
