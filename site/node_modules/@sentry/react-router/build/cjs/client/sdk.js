Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const browser = require('@sentry/browser');
const core = require('@sentry/core');

const BROWSER_TRACING_INTEGRATION_ID = 'BrowserTracing';

/**
 * Initializes the client side of the React Router SDK.
 */
function init(options) {
  // If BrowserTracing integration was passed to options, emit a warning
  if (options.integrations && Array.isArray(options.integrations)) {
    const hasBrowserTracing = options.integrations.some(
      integration => integration.name === BROWSER_TRACING_INTEGRATION_ID,
    );

    if (hasBrowserTracing) {
      core.consoleSandbox(() => {
        // eslint-disable-next-line no-console
        console.warn(
          'browserTracingIntegration is not fully compatible with @sentry/react-router. Please use reactRouterTracingIntegration instead.',
        );
      });
    }
  }

  core.applySdkMetadata(options, 'react-router', ['react-router', 'browser']);

  const client = browser.init(options);

  core.setTag('runtime', 'browser');

  return client;
}

exports.init = init;
//# sourceMappingURL=sdk.js.map
