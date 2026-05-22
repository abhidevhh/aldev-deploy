async function loader({
  request
}) {
  try {
    void request;
    return new Response("OK");
  } catch (error) {
    console.error(request.url, "healthcheck ❌", {
      error
    });
    return new Response("ERROR", {
      status: 500
    });
  }
}
export {
  loader
};
//# sourceMappingURL=healthcheck-G2krb4fY.js.map
