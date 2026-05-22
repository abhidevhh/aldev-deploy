Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const node_stream = require('node:stream');
const core = require('@sentry/core');

/**
 * Injects Sentry trace meta tags into the HTML response by piping through a transform stream.
 * This enables distributed tracing by adding trace context to the HTML document head.
 *
 * @param body - PassThrough stream containing the HTML response body to modify
 */
function getMetaTagTransformer(body) {
  const headClosingTag = '</head>';
  const htmlMetaTagTransformer = new node_stream.Transform({
    transform(chunk, _encoding, callback) {
      const html = Buffer.isBuffer(chunk) ? chunk.toString() : String(chunk);
      if (html.includes(headClosingTag)) {
        const modifiedHtml = html.replace(headClosingTag, `${core.getTraceMetaTags()}${headClosingTag}`);
        callback(null, modifiedHtml);
        return;
      }
      callback(null, chunk);
    },
  });
  htmlMetaTagTransformer.pipe(body);
  return htmlMetaTagTransformer;
}

exports.getMetaTagTransformer = getMetaTagTransformer;
//# sourceMappingURL=getMetaTagTransformer.js.map
