async function time(fn, {
  type,
  desc,
  timings
}) {
  const start = performance.now();
  const promise = typeof fn === "function" ? fn() : fn;
  if (!timings) return promise;
  const result = await promise;
  let timingType = timings[type];
  if (!timingType) {
    timingType = timings[type] = [];
  }
  timingType.push({ desc, type, time: performance.now() - start });
  return result;
}
async function withTimeout(promise, {
  timeoutMs,
  fallback,
  label = "operation",
  onTimeout
}) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      try {
        onTimeout?.();
      } catch (error) {
        console.error(`${label}: onTimeout hook failed`, error);
      }
      reject(new Error(`${label} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutId);
    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn(`${label}: timeout or error, using fallback`, error);
    return fallback;
  }
}
function getServerTimeHeader(timings) {
  return Object.entries(timings).map(([key, timingInfos]) => {
    const dur = timingInfos.reduce((acc, timingInfo) => acc + timingInfo.time, 0).toFixed(1);
    const desc = timingInfos.map((t) => t.desc).filter(Boolean).join(" & ");
    return [
      key.replaceAll(/(:| |@|=|;|,)/g, "_"),
      desc ? `desc=${JSON.stringify(desc)}` : null,
      `dur=${dur}`
    ].filter(Boolean).join(";");
  }).join(",");
}
export {
  getServerTimeHeader as g,
  time as t,
  withTimeout as w
};
//# sourceMappingURL=timing.server-Ckj1L-xw.js.map
