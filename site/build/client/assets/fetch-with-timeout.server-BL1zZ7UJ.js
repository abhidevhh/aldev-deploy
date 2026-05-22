function fetchWithTimeout(url, options = {}, timeoutMs = 1e3) {
  const requestOptions = { ...options };
  delete requestOptions.signal;
  const timeoutPromise = new Promise((_, reject) => {
    const id = setTimeout(() => reject(new Error("Request timeout")), timeoutMs);
    id.unref?.();
  });
  return Promise.race([fetch(url, requestOptions), timeoutPromise]);
}
export {
  fetchWithTimeout as f
};
//# sourceMappingURL=fetch-with-timeout.server-BL1zZ7UJ.js.map
